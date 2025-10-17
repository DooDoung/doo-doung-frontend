import { SquarePen } from "lucide-react";
import Image from "next/image";
import { getBankImageUrl } from "@/utils/getBankImageUrl";
import type { TransactionAccount } from "@/types/transaction";
import { get } from "http";

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
      className={`font-chakra flex w-full cursor-pointer items-center justify-between rounded-[25px] border-[3px] p-4 transition-all ${
        isSelected
          ? "border-[#DC7CA0] bg-[#FDECF2] shadow-[inset_-4px_-4px_4px_0_#B389EC,inset_5px_5px_15px_0_#DC7CA0]"
          : "border-[#DC7CA0] bg-white shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-gradient-to-r hover:from-[rgba(220,124,160,0.4)] hover:to-[rgba(179,137,236,0.4)] hover:shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]"
      } `}
      onClick={() => onSelect(account.id)}
    >
      <div className="flex min-w-0 items-center">
        <Image
          key={String(account.bank)}
          src={getBankImageUrl(String(account.bank))}
          alt={`${String(account.bank)}`}
          width={60}
          height={60}
          className="mr-4 flex-shrink-0"
        />
        <div className="min-w-0">
          <div className="font-chakra truncate font-semibold">
            {account.accountName}
          </div>
          <div className="font-chakra text-md text-gray-500">
            {account.accountNumber}
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center pl-4">
        {isDefault && (
          <div className="font-chakra mr-4 flex items-center justify-center rounded-[25px] border-2 border-[#DC7CA0] bg-white px-4 py-1 text-sm font-semibold text-[#DC7CA0]">
            Default
          </div>
        )}
        <button
          className="cursor-pointer p-2 text-black hover:text-black"
          onClick={handleEditClick}
        >
          <SquarePen size={28} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
