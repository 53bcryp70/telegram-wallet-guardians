import { describe, expect, it } from "vitest";
import { entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import {
  entropyTo24WordMnemonic,
  mnemonicTo32ByteEntropy,
  normalizeMnemonic,
  validate24WordMnemonic,
} from "../src/bip39";

const fixedEntropy = Uint8Array.from(
  Array.from({ length: 32 }, (_, index) => index),
);
const fixedMnemonic = entropyToMnemonic(fixedEntropy, wordlist);

describe("BIP-39 adapter", () => {
  it("normalizes whitespace and uppercase input", () => {
    expect(normalizeMnemonic(`  ${fixedMnemonic.toUpperCase().replace(/ /gu, "\n\t")}  `)).toBe(
      fixedMnemonic,
    );
  });

  it("accepts the fixed 24-word test mnemonic", () => {
    expect(validate24WordMnemonic(fixedMnemonic)).toEqual({
      ok: true,
      normalized: fixedMnemonic,
    });
  });

  it("rejects an invalid checksum", () => {
    const words = fixedMnemonic.split(" ");
    words[23] = words[23] === "abandon" ? "ability" : "abandon";
    expect(validate24WordMnemonic(words.join(" "))).toEqual({
      ok: false,
      error: "The recovery phrase checksum is invalid.",
    });
  });

  it("rejects the wrong word count", () => {
    expect(validate24WordMnemonic(fixedMnemonic.split(" ").slice(0, 23).join(" "))).toEqual({
      ok: false,
      error: "Enter exactly 24 English BIP-39 words.",
    });
  });

  it("round-trips exactly 32 bytes", () => {
    const entropy = mnemonicTo32ByteEntropy(fixedMnemonic);
    expect(Array.from(entropy)).toEqual(Array.from(fixedEntropy));
    expect(entropyTo24WordMnemonic(entropy)).toBe(fixedMnemonic);
  });
});
