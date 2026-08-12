export const CURRENCY_OPTIONS = [
  { value: "EUR", label: "EUR (Euro)" },
  { value: "USD", label: "USD (US Dollar)" },
  { value: "GBP", label: "GBP (British Pound)" },
  { value: "CHF", label: "CHF (Swiss Franc)" },
  { value: "BDT", label: "BDT (Bangladeshi Taka)" },
] as const;

export type Currency = (typeof CURRENCY_OPTIONS)[number]["value"];
