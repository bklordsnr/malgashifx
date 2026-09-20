export const supportedWallets = [
  {
    key: "EVC",
    prefixes: ["061"],
  },
  {
    key: "Telesom",
    prefixes: ["063"],
  },
  {
    key: "Golis",
    prefixes: ["09"],
  },
] as const;

export type Network = (typeof supportedWallets)[number]["key"];
