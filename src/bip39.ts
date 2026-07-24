import {
  entropyToMnemonic,
  mnemonicToEntropy,
  validateMnemonic,
} from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

export type ValidationResult =
  | { ok: true; normalized: string }
  | { ok: false; error: string };

export function normalizeMnemonic(input: string): string {
  return input.normalize("NFKD").trim().replace(/\s+/gu, " ").toLowerCase();
}

export function validate24WordMnemonic(input: string): ValidationResult {
  const normalized = normalizeMnemonic(input);
  const words = normalized === "" ? [] : normalized.split(" ");

  if (words.length !== 24) {
    return { ok: false, error: "Enter exactly 24 English BIP-39 words." };
  }

  if (words.some((word) => !wordlist.includes(word))) {
    return {
      ok: false,
      error: "The recovery phrase contains an unknown word or invalid character.",
    };
  }

  if (!validateMnemonic(normalized, wordlist)) {
    return { ok: false, error: "The recovery phrase checksum is invalid." };
  }

  try {
    if (mnemonicToEntropy(normalized, wordlist).length !== 32) {
      return { ok: false, error: "The phrase did not decode to 32 bytes." };
    }
  } catch {
    return { ok: false, error: "The phrase did not decode to 32 bytes." };
  }

  return { ok: true, normalized };
}

export function mnemonicTo32ByteEntropy(normalizedMnemonic: string): Uint8Array {
  const entropy = mnemonicToEntropy(normalizedMnemonic, wordlist);
  if (entropy.length !== 32) {
    throw new Error("The phrase did not decode to 32 bytes.");
  }
  return Uint8Array.from(entropy);
}

export function entropyTo24WordMnemonic(entropy: Uint8Array): string {
  if (entropy.length !== 32) {
    throw new Error("Recovered data did not contain 32 bytes.");
  }
  const mnemonic = entropyToMnemonic(entropy, wordlist);
  if (mnemonic.split(" ").length !== 24 || !validateMnemonic(mnemonic, wordlist)) {
    throw new Error("Recovered data did not contain a valid 24-word phrase.");
  }
  return mnemonic;
}
