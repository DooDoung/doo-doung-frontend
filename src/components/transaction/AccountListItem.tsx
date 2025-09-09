import { SquarePen } from "lucide-react";
import Image from "next/image";

import type { TransactionAccount } from "@/types/transaction";

interface AccountListItemProps {
  account: TransactionAccount;
  isSelected: boolean;
  onSelect: (accountId: string) => void;
  onEdit: (account: TransactionAccount) => void;
}

export function AccountListItem({
  account,
  isSelected,
  onSelect,
  onEdit,
}: AccountListItemProps) {
  const isDefault = account.isDefault;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(account);
  };

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
        isSelected
          ? "border-pink-500 bg-pink-200"
          : "bg-white hover:bg-gray-100"
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
        {isDefault && (
          <div className="mr-4 rounded-lg border border-2 border-green-600 bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
            Default
          </div>
        )}
        <button
          className="cursor-pointer p-2 text-black hover:text-black"
          onClick={handleEditClick}
        >
          <SquarePen size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
