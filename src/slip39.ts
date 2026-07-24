export type ShareTriplet = readonly [string, string, string];

function getSlip39(): Slip39Api {
  const api = window.slip39libs?.slip39;
  if (!api) {
    throw new Error("SLIP-39 engine failed to load.");
  }
  return api;
}

function normalizeShare(input: string): string {
  return input.normalize("NFKD").trim().replace(/\s+/gu, " ").toLowerCase();
}

function require33Words(share: string): string {
  const normalized = normalizeShare(share);
  if (normalized.split(" ").length !== 33) {
    throw new Error("Each share must contain exactly 33 words.");
  }
  return normalized;
}

function requireSecureRandomness(): void {
  if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
    throw new Error("Secure random-number generation is unavailable.");
  }
}

export function generateTwoOfThree(entropy: Uint8Array): ShareTriplet {
  if (entropy.length !== 32) {
    throw new Error("The phrase did not decode to 32 bytes.");
  }
  requireSecureRandomness();

  const generated = getSlip39()
    .fromArray(Array.from(entropy), {
      passphrase: "",
      threshold: 1,
      groups: [[2, 3, "Local Seed Shares"]],
      iterationExponent: 0,
      title: "Local Seed Shares",
    })
    .fromPath("r/0").mnemonics;

  if (generated.length !== 3) {
    throw new Error("Share verification failed. No shares were displayed.");
  }

  return [
    require33Words(generated[0]),
    require33Words(generated[1]),
    require33Words(generated[2]),
  ];
}

export function recoverTwoOfThree(shareA: string, shareB: string): Uint8Array {
  const normalizedA = require33Words(shareA);
  const normalizedB = require33Words(shareB);

  if (normalizedA === normalizedB) {
    throw new Error("Enter two different compatible 33-word shares from the same set.");
  }

  try {
    const entropy = Uint8Array.from(
      getSlip39().recoverSecret([normalizedA, normalizedB], ""),
    );
    if (entropy.length !== 32) {
      throw new Error("Recovered data did not contain 32 bytes.");
    }
    return entropy;
  } catch (error) {
    if (error instanceof Error && error.message === "Recovered data did not contain 32 bytes.") {
      throw error;
    }
    throw new Error("Enter two different compatible 33-word shares from the same set.");
  }
}
