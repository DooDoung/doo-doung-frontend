"use client"
import { useState } from "react";
import { CirclePlus } from "lucide-react";

import { DefaultLayout } from "@/components/globalComponents";
import { AccountListItem } from "@/components/transaction/AccountListItem";
import { MOCK_ACCOUNTS } from "@/constants/transaction";

type pageMode = "list" | "create" | "edit";
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
