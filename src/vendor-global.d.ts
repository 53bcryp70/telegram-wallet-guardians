interface Slip39Node {
  mnemonics: string[];
}

interface Slip39Instance {
  fromPath(path: string): Slip39Node;
}

interface Slip39Api {
  fromArray(
    masterSecret: number[],
    options: {
      passphrase: string;
      threshold: number;
      groups: Array<[number, number, string?]>;
      iterationExponent: number;
      title?: string;
    },
  ): Slip39Instance;
  recoverSecret(mnemonics: string[], passphrase: string): ArrayLike<number>;
}

interface Window {
  slip39libs?: {
    slip39?: Slip39Api;
  };
}

declare module "*.css";
