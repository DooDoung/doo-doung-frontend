import { SquarePen } from "lucide-react";
import Image from "next/image";

import type { TransactionAccount } from "@/types/transaction";

interface AccountListItemProps {
  account: TransactionAccount;
  isSelected: boolean;
  onSelect: (accountId: string) => void;
  onEdit: (account: TransactionAccount) => void;
}

export function AccountListItem({ account, isSelected, onSelect, onEdit }: AccountListItemProps) {

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(account);
    };

    return (
        <div
            className={`border p-4 w-full flex items-center justify-between rounded-lg cursor-pointer transition-colors ${
                isSelected ? "bg-blue-200 border-blue-500" : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => onSelect(account.id)}
        >
            <div className="flex items-center">
                <Image
                src={account.bank.logoUrl}
                alt={`${account.bank.name} logo`}
                width={50}
                height={50}
                className="mr-4"
                />
                <div>
                <div className="font-semibold">{account.accountName}</div>
                <div className="text-sm text-gray-500">{account.accountNumber}</div>
                </div>
            </div>

            <button className="text-black hover:text-black cursor-pointer p-2" onClick={handleEditClick}>
                <SquarePen size={24} strokeWidth={1.5} />
            </button>
        </div>
    );
}