export const CURRENCY_OPTIONS = [
  { value: "EUR", label: "EUR (Euro)" },
  { value: "USD", label: "USD (US Dollar)" },
  { value: "GBP", label: "GBP (British Pound)" },
  { value: "CHF", label: "CHF (Swiss Franc)" },
  { value: "BDT", label: "BDT (Bangladeshi Taka)" },
] as const;

export type Currency = (typeof CURRENCY_OPTIONS)[number]["value"];

export function formatCurrency(
  amount: number,
  currency: string | null | undefined = "EUR",
): string {
  const resolvedCurrency = currency?.trim().toUpperCase() || "EUR";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: resolvedCurrency,
      currencyDisplay: "code",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${resolvedCurrency}`;
  }
}
