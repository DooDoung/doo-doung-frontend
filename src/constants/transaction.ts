import { Bank, TransactionAccount } from "@/types/transaction";

export const BANKS: Bank[] = [
  { name: "BBL", logoUrl: "/images/transaction-bank/BBL.webp" },
  { name: "KTB", logoUrl: "/images/transaction-bank/KTB.webp" },
  { name: "KBANK", logoUrl: "/images/transaction-bank/KBANK.webp" },
  { name: "SCB", logoUrl: "/images/transaction-bank/SCB.webp" },
  { name: "BAY", logoUrl: "/images/transaction-bank/BAY.webp" },
  { name: "TTB", logoUrl: "/images/transaction-bank/TTB.webp" },
  { name: "CIMB", logoUrl: "/images/transaction-bank/CIMB.webp" },
  { name: "UOB", logoUrl: "/images/transaction-bank/UOB.webp" },
  { name: "GSB", logoUrl: "/images/transaction-bank/GSB.webp" },
  { name: "BAAC", logoUrl: "/images/transaction-bank/BAAC.webp" },
];

export const MOCK_ACCOUNTS: TransactionAccount[] = [
  {
    id: "1",
    bank: BANKS[0], // BBL
    accountName: "Raksakul Hiranas",
    accountNumber: "123-4-56789-0",
    isDefault: true,
  },
  {
    id: "2",
    bank: BANKS[1], // KTB
    accountName: "Raksakul Hiranas",
    accountNumber: "987-6-54321-0",
  },
  {
    id: "3",
    bank: BANKS[2], // KBANK
    accountName: "Raksakul Hiranas",
    accountNumber: "123-4-56789-0",
  },
  {
    id: "4",
    bank: BANKS[5], // TTB
    accountName: "Raksakul Hiranas",
    accountNumber: "123-4-56789-0",
  },
  {
    id: "5",
    bank: BANKS[8], // GSB
    accountName: "Raksakul Hiranas",
    accountNumber: "123-4-56789-0",
  },
];
