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
    const isDefault = account.isDefault;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(account);
    };

    return (
        <div
            className={`border p-4 w-full flex items-center justify-between rounded-lg cursor-pointer transition-colors ${
                isSelected ? "bg-pink-200 border-pink-500" : "bg-white hover:bg-gray-100"
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

            <div className="flex items-center">
                {isDefault && <div className="text-sm text-green-600 font-semibold mr-4 border border-green-600 border-2 py-2 px-4 rounded-lg bg-green-100">Default</div>}
                <button className="text-black hover:text-black cursor-pointer p-2" onClick={handleEditClick}>
                    <SquarePen size={24} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}