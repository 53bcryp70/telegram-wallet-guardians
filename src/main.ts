import {
  entropyTo24WordMnemonic,
  mnemonicTo32ByteEntropy,
  normalizeMnemonic,
  validate24WordMnemonic,
} from "./bip39";
import { generateTwoOfThree, recoverTwoOfThree } from "./slip39";
import "./style.css";

type AppState = {
  busy: boolean;
  generatedShares: [string, string, string] | null;
  recoveredMnemonic: string | null;
};

const state: AppState = {
  busy: false,
  generatedShares: null,
  recoveredMnemonic: null,
};

const appElement = document.querySelector<HTMLElement>("#app");

if (!appElement) {
  throw new Error("Application root is missing.");
}

const app = appElement;

app.innerHTML = `
  <main class="app-shell" aria-busy="false">
    <header>
      <p class="eyebrow">Local Seed Shares</p>
      <h1>Split a test recovery phrase locally</h1>
      <p class="warning"><strong>Hackathon prototype.</strong> Use only with a disposable test wallet containing no real funds.</p>
      <p>After this page loads, cryptographic processing happens locally on this device. This app does not read your clipboard automatically.</p>
    </header>

    <section aria-labelledby="create-heading">
      <h2 id="create-heading">Create 3 shares</h2>
      <p>Paste an English 24-word BIP-39 phrase. The app creates a fixed 2-of-3 backup.</p>
      <label for="seed-input">24-word recovery phrase</label>
      <div class="input-row">
        <input id="seed-input" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" translate="no" lang="en" />
        <button id="seed-reveal" type="button" aria-pressed="false">Reveal</button>
      </div>
      <p class="word-count" id="seed-count">0 / 24 words</p>
      <div class="actions">
        <button id="create-shares" type="button">Create 3 shares</button>
        <button id="clear-seed" type="button" class="secondary">Clear</button>
      </div>
      <p id="split-error" class="error" role="alert" hidden></p>
    </section>

    <section id="share-section" aria-labelledby="shares-heading" hidden>
      <h2 id="shares-heading">Your three shares</h2>
      <p class="warning">Anyone with two shares can recover the wallet phrase. Do not send or store two shares through the same Telegram account, chat, device, or storage location.</p>
      <p>These shares must be recovered through this application before importing the resulting 24 words into a wallet.</p>
      <div class="share-output">
        <h3>Share 1 <span>33 words · 2 required</span></h3>
        <textarea id="share-1" readonly aria-label="Share 1" hidden></textarea>
        <div class="actions"><button type="button" data-reveal-share="0">Reveal</button><button id="copy-share-1" type="button">Copy share</button></div>
      </div>
      <div class="share-output">
        <h3>Share 2 <span>33 words · 2 required</span></h3>
        <textarea id="share-2" readonly aria-label="Share 2" hidden></textarea>
        <div class="actions"><button type="button" data-reveal-share="1">Reveal</button><button id="copy-share-2" type="button">Copy share</button></div>
      </div>
      <div class="share-output">
        <h3>Share 3 <span>33 words · 2 required</span></h3>
        <textarea id="share-3" readonly aria-label="Share 3" hidden></textarea>
        <div class="actions"><button type="button" data-reveal-share="2">Reveal</button><button id="copy-share-3" type="button">Copy share</button></div>
      </div>
    </section>

    <section aria-labelledby="recover-heading">
      <h2 id="recover-heading">Recover 24 words</h2>
      <p>Paste two different compatible 33-word shares.</p>
      <label for="recover-share-a">Share A</label>
      <div class="input-row"><input id="recover-share-a" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" translate="no" lang="en" /><button type="button" data-reveal-input="recover-share-a" aria-pressed="false">Reveal</button></div>
      <p class="word-count" id="recover-share-a-count">0 / 33 words</p>
      <label for="recover-share-b">Share B</label>
      <div class="input-row"><input id="recover-share-b" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" translate="no" lang="en" /><button type="button" data-reveal-input="recover-share-b" aria-pressed="false">Reveal</button></div>
      <p class="word-count" id="recover-share-b-count">0 / 33 words</p>
      <div class="actions"><button id="recover-button" type="button">Recover 24 words</button><button id="clear-recovery" type="button" class="secondary">Clear</button></div>
      <p id="recover-error" class="error" role="alert" hidden></p>
      <div id="recovered-section" class="result" hidden>
        <label for="recovered-seed">Recovered recovery phrase</label>
        <div class="input-row"><input id="recovered-seed" type="password" readonly /><button id="recovered-seed-reveal" type="button" aria-pressed="false">Reveal</button></div>
        <p>Copying places the complete wallet recovery phrase in your device clipboard.</p>
        <button id="copy-recovered-seed" type="button">Copy phrase</button>
      </div>
    </section>
    <p id="status-message" class="status" aria-live="polite"></p>
  </main>
`;

function byId<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required element: ${id}`);
  }
  return element as T;
}

const shell = app.querySelector<HTMLElement>(".app-shell")!;
const seedInput = byId<HTMLInputElement>("seed-input");
const seedCount = byId<HTMLParagraphElement>("seed-count");
const createButton = byId<HTMLButtonElement>("create-shares");
const recoverButton = byId<HTMLButtonElement>("recover-button");
const splitError = byId<HTMLParagraphElement>("split-error");
const recoverError = byId<HTMLParagraphElement>("recover-error");
const statusMessage = byId<HTMLParagraphElement>("status-message");
const shareSection = byId<HTMLElement>("share-section");
const recoverShareA = byId<HTMLInputElement>("recover-share-a");
const recoverShareB = byId<HTMLInputElement>("recover-share-b");
const recoveredSection = byId<HTMLElement>("recovered-section");
const recoveredSeed = byId<HTMLInputElement>("recovered-seed");

function setError(target: HTMLParagraphElement, message: string | null): void {
  target.hidden = message === null;
  target.textContent = message ?? "";
}

function setStatus(message: string): void {
  statusMessage.textContent = message;
}

function countWords(value: string): number {
  const normalized = normalizeMnemonic(value);
  return normalized === "" ? 0 : normalized.split(" ").length;
}

function updateWordCount(input: HTMLInputElement, targetId: string, expected: number): void {
  byId<HTMLParagraphElement>(targetId).textContent = `${countWords(input.value)} / ${expected} words`;
}

function setInputVisibility(input: HTMLInputElement, reveal: boolean, button: HTMLButtonElement): void {
  input.type = reveal ? "text" : "password";
  button.textContent = reveal ? "Hide" : "Reveal";
  button.setAttribute("aria-pressed", String(reveal));
}

function hideSensitiveViews(): void {
  setInputVisibility(seedInput, false, byId<HTMLButtonElement>("seed-reveal"));
  for (const inputId of ["recover-share-a", "recover-share-b"]) {
    const input = byId<HTMLInputElement>(inputId);
    const button = app.querySelector<HTMLButtonElement>(`[data-reveal-input="${inputId}"]`)!;
    setInputVisibility(input, false, button);
  }
  setInputVisibility(recoveredSeed, false, byId<HTMLButtonElement>("recovered-seed-reveal"));
  for (const index of [0, 1, 2]) {
    const field = byId<HTMLTextAreaElement>(`share-${index + 1}`);
    field.hidden = true;
    app.querySelector<HTMLButtonElement>(`[data-reveal-share="${index}"]`)!.textContent = "Reveal";
  }
}

function wipe(bytes: Uint8Array): void {
  bytes.fill(0);
}

function clearGeneratedShares(): void {
  state.generatedShares = null;
  shareSection.hidden = true;
  for (const id of ["share-1", "share-2", "share-3"]) {
    byId<HTMLTextAreaElement>(id).value = "";
  }
}

function clearRecovery(): void {
  state.recoveredMnemonic = null;
  recoverShareA.value = "";
  recoverShareB.value = "";
  recoveredSeed.value = "";
  recoveredSection.hidden = true;
  updateWordCount(recoverShareA, "recover-share-a-count", 33);
  updateWordCount(recoverShareB, "recover-share-b-count", 33);
  setError(recoverError, null);
  hideSensitiveViews();
}

function sharesVerify(entropy: Uint8Array, shares: readonly [string, string, string]): boolean {
  const pairs: Array<[string, string]> = [[shares[0], shares[1]], [shares[0], shares[2]], [shares[1], shares[2]]];
  try {
    return pairs.every(([left, right]) => {
      const recovered = recoverTwoOfThree(left, right);
      const matches = recovered.length === entropy.length && recovered.every((value, index) => value === entropy[index]);
      wipe(recovered);
      return matches;
    });
  } catch {
    return false;
  }
}

async function runBusy(label: string, task: () => void): Promise<void> {
  if (state.busy) return;
  state.busy = true;
  createButton.disabled = true;
  recoverButton.disabled = true;
  shell.setAttribute("aria-busy", "true");
  setStatus(label);
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  try {
    task();
  } finally {
    state.busy = false;
    createButton.disabled = false;
    recoverButton.disabled = false;
    shell.setAttribute("aria-busy", "false");
  }
}

function splitErrorFor(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  const allowed = new Set([
    "Enter exactly 24 English BIP-39 words.",
    "The recovery phrase contains an unknown word or invalid character.",
    "The recovery phrase checksum is invalid.",
    "The phrase did not decode to 32 bytes.",
    "SLIP-39 engine failed to load.",
    "Secure random-number generation is unavailable.",
  ]);
  return allowed.has(message) ? message : "Share verification failed. No shares were displayed.";
}

function recoverErrorFor(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (message === "Each share must contain exactly 33 words.") return message;
  if (message === "Recovered data did not contain 32 bytes.") return message;
  return "Enter two different compatible 33-word shares from the same set.";
}

async function createShares(): Promise<void> {
  setError(splitError, null);
  const validation = validate24WordMnemonic(seedInput.value);
  if (!validation.ok) {
    setError(splitError, validation.error);
    return;
  }
  if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
    setError(splitError, "Secure random-number generation is unavailable.");
    return;
  }

  await runBusy("Creating and verifying shares…", () => {
    let entropy: Uint8Array | null = null;
    try {
      entropy = mnemonicTo32ByteEntropy(validation.normalized);
      const shares = generateTwoOfThree(entropy);
      if (!sharesVerify(entropy, shares)) {
        throw new Error("Share verification failed. No shares were displayed.");
      }
      state.generatedShares = [shares[0], shares[1], shares[2]];
      shares.forEach((share, index) => {
        byId<HTMLTextAreaElement>(`share-${index + 1}`).value = share;
      });
      seedInput.value = "";
      updateWordCount(seedInput, "seed-count", 24);
      hideSensitiveViews();
      shareSection.hidden = false;
      setStatus("Three verified shares are ready. Copy them one at a time.");
    } catch (error) {
      clearGeneratedShares();
      seedInput.value = "";
      updateWordCount(seedInput, "seed-count", 24);
      setError(splitError, splitErrorFor(error));
    } finally {
      if (entropy) wipe(entropy);
    }
  });
}

async function recoverPhrase(): Promise<void> {
  setError(recoverError, null);
  if (recoverShareA.value.trim() === "" || recoverShareB.value.trim() === "") {
    setError(recoverError, "Enter two shares.");
    return;
  }

  await runBusy("Recovering phrase…", () => {
    let entropy: Uint8Array | null = null;
    try {
      entropy = recoverTwoOfThree(recoverShareA.value, recoverShareB.value);
      const mnemonic = entropyTo24WordMnemonic(entropy);
      state.recoveredMnemonic = mnemonic;
      recoveredSeed.value = mnemonic;
      recoveredSection.hidden = false;
      setInputVisibility(recoveredSeed, false, byId<HTMLButtonElement>("recovered-seed-reveal"));
      setStatus("Recovery phrase reconstructed locally.");
    } catch (error) {
      state.recoveredMnemonic = null;
      recoveredSeed.value = "";
      recoveredSection.hidden = true;
      setError(recoverError, recoverErrorFor(error));
    } finally {
      if (entropy) wipe(entropy);
    }
  });
}

async function copyValue(value: string, fallback: HTMLInputElement | HTMLTextAreaElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
    setStatus("Sensitive recovery information copied to your clipboard.");
  } catch {
    fallback.hidden = false;
    fallback.focus();
    fallback.select();
    setStatus("Copy failed. Select the text and copy it manually.");
  }
}

byId<HTMLButtonElement>("seed-reveal").addEventListener("click", () => {
  setInputVisibility(seedInput, seedInput.type === "password", byId<HTMLButtonElement>("seed-reveal"));
});

for (const input of [seedInput, recoverShareA, recoverShareB]) {
  input.addEventListener("input", () => {
    if (input === seedInput) updateWordCount(input, "seed-count", 24);
    if (input === recoverShareA) updateWordCount(input, "recover-share-a-count", 33);
    if (input === recoverShareB) updateWordCount(input, "recover-share-b-count", 33);
  });
}

app.querySelectorAll<HTMLButtonElement>("[data-reveal-input]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = byId<HTMLInputElement>(button.dataset.revealInput!);
    setInputVisibility(input, input.type === "password", button);
  });
});

app.querySelectorAll<HTMLButtonElement>("[data-reveal-share]").forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.revealShare);
    const field = byId<HTMLTextAreaElement>(`share-${index + 1}`);
    field.hidden = !field.hidden;
    button.textContent = field.hidden ? "Reveal" : "Hide";
  });
});

createButton.addEventListener("click", () => void createShares());
recoverButton.addEventListener("click", () => void recoverPhrase());
byId<HTMLButtonElement>("clear-seed").addEventListener("click", () => {
  seedInput.value = "";
  updateWordCount(seedInput, "seed-count", 24);
  clearGeneratedShares();
  setError(splitError, null);
  hideSensitiveViews();
});
byId<HTMLButtonElement>("clear-recovery").addEventListener("click", clearRecovery);
byId<HTMLButtonElement>("recovered-seed-reveal").addEventListener("click", () => {
  setInputVisibility(recoveredSeed, recoveredSeed.type === "password", byId<HTMLButtonElement>("recovered-seed-reveal"));
});
byId<HTMLButtonElement>("copy-recovered-seed").addEventListener("click", () => {
  if (state.recoveredMnemonic) void copyValue(state.recoveredMnemonic, recoveredSeed);
});

for (const index of [0, 1, 2]) {
  byId<HTMLButtonElement>(`copy-share-${index + 1}`).addEventListener("click", () => {
    const value = state.generatedShares?.[index];
    if (value) void copyValue(value, byId<HTMLTextAreaElement>(`share-${index + 1}`));
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) hideSensitiveViews();
});

if (!window.slip39libs?.slip39) {
  document.documentElement.dataset.appReady = "error";
  createButton.disabled = true;
  recoverButton.disabled = true;
  setError(splitError, "SLIP-39 engine failed to load. Reload the application.");
} else {
  document.documentElement.dataset.appReady = "true";
  setStatus("Local cryptographic engine ready.");
}
