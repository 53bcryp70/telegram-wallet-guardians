import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

const fixture = JSON.parse(
  readFileSync(
    new URL("../tests/fixtures/slip39-vector-23.json", import.meta.url),
    "utf8",
  ),
) as {
  mnemonics: string[];
  passphrase: string;
  expectedMasterSecretHex: string;
};

declare global {
  interface Window {
    __secureRandomCalls?: number;
  }
}

const fixedEntropyHex =
  "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f";
const fixedEntropy = Uint8Array.from(
  Array.from({ length: fixedEntropyHex.length / 2 }, (_, index) =>
    Number.parseInt(fixedEntropyHex.slice(index * 2, index * 2 + 2), 16),
  ),
);
const fixedMnemonic = entropyToMnemonic(fixedEntropy, wordlist);

function toHex(bytes: number[]): string {
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

test.describe("SLIP-39 cryptographic checkpoint", () => {
  test.setTimeout(60_000);

  test("loads the pinned browser engine, passes vector 23, and round-trips every pair", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      permissions: ["clipboard-read", "clipboard-write"],
    });
    await context.addInitScript(() => {
      const original = Crypto.prototype.getRandomValues;
      Object.defineProperty(window, "__secureRandomCalls", {
        configurable: true,
        value: 0,
        writable: true,
      });
      Crypto.prototype.getRandomValues = function <T extends ArrayBufferView>(array: T): T {
        window.__secureRandomCalls = (window.__secureRandomCalls ?? 0) + 1;
        return (original as (value: unknown) => unknown).call(this, array) as T;
      };
    });

    const page = await context.newPage();
    const initialRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().startsWith("http")) {
        initialRequests.push(request.url());
      }
    });

    await page.goto("/");
    await page.waitForFunction(
      () => document.documentElement.dataset.appReady === "true",
    );
    expect(initialRequests.every((url) => new URL(url).origin === "http://127.0.0.1:4173")).toBe(true);
    await expect(
      page.getByText(
        "Supports only the English 24-word BIP-39 recovery phrase from Wallet in Telegram's DeFi Account.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "This project is not affiliated with or approved by Telegram, Wallet in Telegram, Trezor, SatoshiLabs, or Ian Coleman.",
        { exact: true },
      ),
    ).toBeVisible();

    const checkpoint = await page.evaluate(
      ({ testFixture, entropyHex }) => {
        const api = window.slip39libs?.slip39;
        if (!api) {
          throw new Error("Missing SLIP-39 API");
        }

        const vectorResult = Array.from(
          api.recoverSecret(testFixture.mnemonics, testFixture.passphrase),
        );
        const entropy = Array.from(
          { length: entropyHex.length / 2 },
          (_, index) => Number.parseInt(entropyHex.slice(index * 2, index * 2 + 2), 16),
        );
        const shares = api
          .fromArray(entropy, {
            passphrase: "",
            threshold: 1,
            groups: [[2, 3, "Local Seed Shares"]],
            iterationExponent: 0,
            title: "Local Seed Shares",
          })
          .fromPath("r/0").mnemonics;
        const recoveredPairs = [
          api.recoverSecret([shares[0], shares[1]], ""),
          api.recoverSecret([shares[0], shares[2]], ""),
          api.recoverSecret([shares[1], shares[2]], ""),
        ].map((result) => Array.from(result));

        return { vectorResult, shares, recoveredPairs, secureRandomCalls: window.__secureRandomCalls };
      },
      { testFixture: fixture, entropyHex: fixedEntropyHex },
    );

    expect(toHex(checkpoint.vectorResult)).toBe(fixture.expectedMasterSecretHex);
    expect(checkpoint.shares).toHaveLength(3);
    expect(checkpoint.shares.every((share) => share.split(" ").length === 33)).toBe(true);
    for (const recovered of checkpoint.recoveredPairs) {
      expect(toHex(recovered)).toBe(fixedEntropyHex);
    }
    expect(checkpoint.secureRandomCalls).toBeGreaterThan(0);

    initialRequests.length = 0;
    await expect(page.locator("#open-defi-wallet")).toBeDisabled();
    await expect(page.locator("#institution-escrow")).toBeDisabled();
    await page.getByRole("button", { name: "Create shares from seed phrase" }).click();
    await expect(page.locator("#create-panel")).toBeVisible();
    await page.locator("#seed-input").fill(fixedMnemonic);
    await page.getByRole("button", { name: "Create 3 shares" }).click();
    await expect(page.locator("#share-section")).toBeVisible();
    await expect(
      page.getByText(
        "These shares reconstruct your original 24-word phrase through Local Seed Shares. Do not enter them directly into Trezor or another wallet's SLIP-39 recovery flow because that may restore a different wallet.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Normal Telegram Cloud Chats are stored in Telegram's cloud. When chat transfer is necessary, prefer a Secret Chat and keep the shares separated.",
        { exact: true },
      ),
    ).toBeVisible();
    const shareOne = await page.locator("#share-1").inputValue();
    const shareTwo = await page.locator("#share-2").inputValue();
    const shareThree = await page.locator("#share-3").inputValue();
    expect([shareOne, shareTwo, shareThree].every((share) => share.split(" ").length === 33)).toBe(true);
    await expect(page.getByRole("button", { name: /copy all/i })).toHaveCount(0);

    await page.locator("#copy-share-1").click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(shareOne);
    await expect(page.locator("#copy-share-1")).toHaveText("Copied");

    await page.locator('[data-reveal-share="0"]').click();
    await expect(page.locator("#share-1")).toBeVisible();
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
    });
    await expect(page.locator("#share-1")).toBeHidden();

    await page.locator("#back-from-create").click();
    await page.getByRole("button", { name: "Recover phrase from shares" }).click();
    await expect(page.locator("#recover-panel")).toBeVisible();
    await page.locator("#recover-share-a").fill(shareOne);
    await page.locator("#recover-share-b").fill(shareTwo);
    await page.getByRole("button", { name: "Recover 24 words" }).click();
    await expect(page.locator("#recovered-seed")).toHaveValue(fixedMnemonic);

    await page.locator("#recovered-seed-reveal").click();
    await expect(page.locator("#recovered-seed")).toHaveAttribute("type", "text");
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
    });
    await expect(page.locator("#recovered-seed")).toHaveAttribute("type", "password");

    await page.locator("#clear-recovery").click();
    await page.locator("#recover-share-a").fill(shareOne);
    await page.locator("#recover-share-b").fill(shareOne);
    await page.getByRole("button", { name: "Recover 24 words" }).click();
    await expect(page.locator("#recover-error")).toHaveText(
      "Enter two different compatible 33-word shares from the same set.",
    );

    await page.locator("#clear-recovery").click();
    await page.locator("#recover-share-a").fill(shareOne.split(" ").slice(0, -1).join(" "));
    await page.locator("#recover-share-b").fill(shareTwo);
    await page.getByRole("button", { name: "Recover 24 words" }).click();
    await expect(page.locator("#recover-error")).toHaveText(
      "Each share must contain exactly 33 words.",
    );

    const corruptedWords = shareOne.split(" ");
    corruptedWords[0] = corruptedWords[0] === "abandon" ? "ability" : "abandon";
    await page.locator("#clear-recovery").click();
    await page.locator("#recover-share-a").fill(corruptedWords.join(" "));
    await page.locator("#recover-share-b").fill(shareTwo);
    await page.getByRole("button", { name: "Recover 24 words" }).click();
    await expect(page.locator("#recover-error")).toHaveText(
      "Enter two different compatible 33-word shares from the same set.",
    );

    await page.locator("#back-from-recover").click();
    await page.getByRole("button", { name: "Create shares from seed phrase" }).click();
    await page.locator("#clear-seed").click();
    await expect(page.locator("#share-section")).toBeHidden();
    await expect(page.locator("#share-1")).toHaveValue("");
    await page.locator("#seed-input").fill(fixedMnemonic);
    await page.getByRole("button", { name: "Create 3 shares" }).click();
    await expect(page.locator("#share-2")).not.toHaveValue("");
    const replacementShareTwo = await page.locator("#share-2").inputValue();
    expect(replacementShareTwo).not.toBe(shareTwo);
    await page.locator("#back-from-create").click();
    await page.getByRole("button", { name: "Recover phrase from shares" }).click();
    await page.locator("#clear-recovery").click();
    await page.locator("#recover-share-a").fill(shareOne);
    await page.locator("#recover-share-b").fill(replacementShareTwo);
    await page.getByRole("button", { name: "Recover 24 words" }).click();
    await expect(page.locator("#recover-error")).toHaveText(
      "Enter two different compatible 33-word shares from the same set.",
    );

    expect(
      await page.evaluate(async () => ({
        localStorageEntries: localStorage.length,
        sessionStorageEntries: sessionStorage.length,
        serviceWorkerRegistrations: (await navigator.serviceWorker.getRegistrations()).length,
      })),
    ).toEqual({
      localStorageEntries: 0,
      sessionStorageEntries: 0,
      serviceWorkerRegistrations: 0,
    });
    expect(initialRequests).toEqual([]);
    await context.close();
  });
});
