import { SquarePen } from "lucide-react";
import Image from "next/image";

import type { TransactionAccount } from "@/types/transaction";

interface AccountListItemProps {
  account: TransactionAccount;
  isSelected: boolean;
  onSelect: (accountId: string) => void;
}



export function AccountListItem({ account, isSelected, onSelect }: AccountListItemProps) {
    return (
        <div
            className={`bg-white border p-4 w-full ${isSelected ? "bg-blue" : "border-gray-300 hover:bg-gray-100"}`}
            onClick={() => onSelect(account.id)}
        >
            <div className="flex items-center">
                <Image
                    src={account.bank.logoUrl} 
                    alt={`${account.bank.name} logo`}
                    width={50} 
                    height={50}
                />
                <div>
                    <div className="font-semibold">{account.accountName}</div>
                    <div className="text-sm text-gray-500">{account.accountNumber}</div>
                </div>
                <div className="ml-auto">
                    <button className="text-black cursor-pointer">
                        <SquarePen className="inline-block mr-1" size={32} strokeWidth={1} />
                    </button>
                </div>
            </div>
        </div> 
    );
}