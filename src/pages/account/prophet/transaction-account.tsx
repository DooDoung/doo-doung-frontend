"use client"
import { useState } from "react";

import { DefaultLayout } from "@/components/globalComponents";
import { AccountListItem } from "@/components/transaction/AccountListItem";
import { Bank, TransactionAccount } from "@/types/transaction";

import { CirclePlus } from "lucide-react";

type pageMode = "list" | "create" | "edit";

const MOCK_BANKS: Bank[] = [
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

const MOCK_ACCOUNTS: TransactionAccount[] = [
  {
    id: "1",
    bank: MOCK_BANKS[0], // BBL
    accountName: "Raksakul Hiranas",
    accountNumber: "123-4-56789-0",
  },
  {
    id: "2",
    bank: MOCK_BANKS[1], // KTB
    accountName: "Raksakul Hiranas",
    accountNumber: "987-6-54321-0",
  },
  {
    id: "3",
    bank: MOCK_BANKS[2], // KBANK
    accountName: "Raksakul Hiranas",
    accountNumber: "987-6-54321-0",
  },
  {
    id: "4",
    bank: MOCK_BANKS[6], // CIMB
    accountName: "Raksakul Hiranas",
    accountNumber: "987-6-54321-0",
  },
  {
    id: "5",
    bank: MOCK_BANKS[4], // BAY
    accountName: "Raksakul Hiranas",
    accountNumber: "987-6-54321-0",
  },
];

export default function ProphetTransactionAccountPage() {

    const [mode, setMode] = useState<pageMode>("list");

    if (mode === "create") {
        return (
            <DefaultLayout>
                <h1>Create Prophet Transaction Account</h1>
            </DefaultLayout>
        );
    }
    if (mode === "edit") {
        return (
            <DefaultLayout>
                <h1>Edit Prophet Transaction Account</h1>
            </DefaultLayout>
        );
    }

  return (
    <DefaultLayout>
        <div className="justify-center items-center flex flex-col gap-4">
            <div className="flex flex gap-4">
                <h1>Select Your Transaction Account</h1>
                <button className="cursor-pointer" onClick={() => setMode("create")}>
                    <CirclePlus className="inline-block mr-1" size={32} strokeWidth={1} />
                </button>
            </div>
            <div className="border border-2 bg-black rounded-lg gap-4 w-3/4 h-100 overflow-y-scroll justify-center items-center flex flex-col border border-black px-8 py-16">
                {MOCK_ACCOUNTS.map((account) => (
                    <AccountListItem 
                        key={account.id}
                        account={account}
                        isSelected={true}
                        onSelect={() => {}}
                    />
                ))}
            </div>
            <button className="border border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white">Confirm</button>
        </div>
    </DefaultLayout>
  );
}
