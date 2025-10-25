// utils/getBankImageUrl.ts
import type { Bank } from "@/types/transaction";

export function getBankImageUrl(bank: Bank | string): string {
  const bankName = typeof bank === "string" ? bank : bank.name;
  return `/images/transaction-bank/${bankName}.webp`;
}
