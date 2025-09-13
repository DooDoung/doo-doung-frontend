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
            // 👇 การเปลี่ยนแปลงทั้งหมดอยู่ที่นี่
            className={`
                p-4 w-full flex items-center justify-between cursor-pointer 
                transition-all rounded-[25px] border-[3px] font-chakra
                ${
                    isSelected
                    ? "border-[#DC7CA0] bg-[#FDECF2] shadow-[inset_-4px_-4px_4px_0_#B389EC,inset_5px_5px_15px_0_#DC7CA0]"
                    : "border-[#DC7CA0] bg-white shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] hover:bg-gradient-to-r hover:from-[rgba(220,124,160,0.4)] hover:to-[rgba(179,137,236,0.4)]"
                }
            `}
            onClick={() => onSelect(account.id)}
        >
            <div className="flex items-center min-w-0"> {/* เพิ่ม min-w-0 เพื่อให้ข้อความตัดได้สวยงาม */}
                <Image
                    src={account.bank.logoUrl}
                    alt={`${account.bank.name} logo`}
                    width={60}
                    height={60}
                    className="mr-4 flex-shrink-0" // เพิ่ม flex-shrink-0 เพื่อไม่ให้รูปย่อ
                />
                <div className="min-w-0"> {/* เพิ่ม min-w-0 อีกชั้น */}
                    <div className="font-chakra font-semibold truncate">{account.accountName}</div> {/* เพิ่ม truncate */}
                    <div className="font-chakra text-md text-gray-500">{account.accountNumber}</div>
                </div>
            </div>

            <div className="flex items-center flex-shrink-0 pl-4"> {/* เพิ่ม flex-shrink-0 และ padding left */}
                {isDefault && (
                    // (แนะนำ) ปรับปุ่ม Default ให้ยืดหยุ่นด้วย padding แทน w, h คงที่
                    <div className="font-chakra text-sm font-semibold mr-4 border-2 border-[#DC7CA0] rounded-[25px] bg-white text-[#DC7CA0] px-4 py-1 flex items-center justify-center">
                        Default
                    </div>
                )}
                <button className="text-black hover:text-black cursor-pointer p-2" onClick={handleEditClick}>
                    <SquarePen size={28} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}