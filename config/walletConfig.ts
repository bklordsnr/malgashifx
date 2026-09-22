export const withdrawalMethods = {
  MOBILE_MONEY: {
    label: "Mobile Money",
    providers: [
      {
        key: "MPESA",
        label: "M-Pesa",
        countries: ["KE"],
      },
      {
        key: "AIRTEL_MONEY",
        label: "Airtel Money",
        countries: ["KE", "UG", "TZ"],
      },
      {
        key: "EVC",
        label: "EVC Plus",
        countries: ["SO"],
      },
      {
        key: "TELESOM",
        label: "Telesom",
        countries: ["SO"],
      },
      {
        key: "GOLIS",
        label: "Golis",
        countries: ["SO"],
      },
    ],
  },

  CRYPTO: {
    label: "Cryptocurrency",
    providers: [
      {
        key: "USDT",
        label: "USDT",
        networks: ["TRC20", "ERC20", "BEP20"],
      },
    ],
  },

  CARD: {
    label: "Bank Card",
    providers: [
      {
        key: "CARD",
        label: "Visa / Mastercard",
      },
    ],
  },

  LOCAL_WALLET: {
    label: "Local Wallet",
    providers: [
      {
        key: "INSTAPAY",
        label: "InstaPay",
        countries: ["EG"],
      },
    ],
  },
} as const;

export type WithdrawalMethod =
  keyof typeof withdrawalMethods;

export type WithdrawalProvider =
  | (typeof withdrawalMethods.MOBILE_MONEY.providers)[number]["key"]
  | (typeof withdrawalMethods.CRYPTO.providers)[number]["key"]
  | (typeof withdrawalMethods.CARD.providers)[number]["key"]
  | (typeof withdrawalMethods.LOCAL_WALLET.providers)[number]["key"];