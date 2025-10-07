export function getBankImageUrl(bank: string | undefined) {
  if (!bank) return "/images/transaction-bank/default.webp";
  const normalizedBank = bank.trim().toUpperCase();
  return `/images/transaction-bank/${normalizedBank}.webp`;
}