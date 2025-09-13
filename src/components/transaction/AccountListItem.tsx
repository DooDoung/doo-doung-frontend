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
            className={`p-4 w-[853px] h-[106px] shrink-0 flex items-center justify-between cursor-pointer transition-all rounded-[25px] border-[3px] ${
                isSelected
                ? "border-[#DC7CA0] bg-[#FDECF2] shadow-[inset_-4px_-4px_4px_0_#B389EC,inset_5px_5px_15px_0_#DC7CA0]"
                : "border-[#DC7CA0] bg-white shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] hover:bg-gradient-to-r hover:from-[rgba(220,124,160,0.4)] hover:to-[rgba(179,137,236,0.4)]"
            }`}
            onClick={() => onSelect(account.id)}
        >
            <div className="flex items-center">
                <Image
                src={account.bank.logoUrl}
                alt={`${account.bank.name} logo`}
                width={60}
                height={60}
                className="mr-4"
                />
                <div>
                <div className="font-semibold">{account.accountName}</div>
                <div className="text-md text-gray-500">{account.accountNumber}</div>
                </div>
            </div>

            <div className="flex items-center">
                {isDefault && <div className="text-sm font-semibold mr-4 border-2 border-[#DC7CA0] rounded-[25px] bg-white text-[#DC7CA0] w-[92px] h-[30px] shrink-0 flex items-center justify-center">Default</div>}
                <button className="text-black hover:text-black cursor-pointer p-2" onClick={handleEditClick}>
                    <SquarePen size={28} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}
