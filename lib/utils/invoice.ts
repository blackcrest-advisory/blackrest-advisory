export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const number = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `BCA-${year}-${number}`;
}
