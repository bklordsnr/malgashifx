// lib/currency.ts

export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  KE: "KES",
  SO: "SOS",
  UG: "UGX",
  TZ: "TZS",
  ET: "ETB",
  RW: "RWF",
  DJ: "DJF",
  ER: "ERN",
  GB: "GBP",
  US: "USD",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  ZA: "ZAR",
  NG: "NGN",
  GH: "GHS",
  EG: "EGP",
  AE: "AED",
  SA: "SAR",
  IN: "INR",
  PK: "PKR",
  BD: "BDT",
  MY: "MYR",
  SG: "SGD",
  JP: "JPY",
  CN: "CNY",
  TR: "TRY",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  PT: "EUR",
  IE: "EUR",
  MZ: "MZN",
};

export function getCurrencyFromCountry(country?: string | null) {
  if (!country) return "USD";

  return COUNTRY_CURRENCY_MAP[country.toUpperCase()] ?? "USD";
}