import { useState } from "react";
import localFont from "next/font/local";
import Image from "next/image";

import GlobalButton from "@/components/globalComponents/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppToast } from "@/lib/app-toast";
import { cn } from "@/lib/utils";
import type { Bank, TransactionAccount } from "@/types/transaction";

const sanctuaryOrnate = localFont({
  src: "../../../public/fonts/SanctuaryOrnate-PersonalUse.ttf",
  display: "swap",
});

interface TransactionAccountFormProps {
  initialData?: TransactionAccount;
  banks: Bank[]; 
  onConfirm: (data: Omit<TransactionAccount, 'id'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

export default function TransactionAccountForm({
  initialData,
  banks,
  onConfirm,
  onCancel,
  onDelete,
}: TransactionAccountFormProps) {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(initialData?.bank || null);
  const [accountName, setAccountName] = useState(initialData?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "");

  const isEditMode = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBank || !accountName || !accountNumber) {
      AppToast.error("Every field must be completed.");
      return;
    }
    onConfirm({ bank: selectedBank, accountName, accountNumber });
  };

  return (
    <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
      <h1 className={cn(sanctuaryOrnate.className, "text-4xl")}>{isEditMode ? "Edit Your Transaction Account" : "Create New Transaction Account"}</h1>

      <div className="flex items-center gap-16">
        <div className="flex flex-col p-10 rounded-lg">
            <p className="m-2">Select Your Bank</p>
            <div className="grid grid-cols-4 gap-4">
              {banks.map((bank) => {
                const isSelected = selectedBank?.name === bank.name;
                return (
                  <button
                    type="button"
                    key={bank.name}
                    onClick={() => setSelectedBank(bank)}
                    className={`rounded-full transition-all duration-150 ease-in-out active:scale-90 drop-shadow-[0_0_4px_rgba(255,255,255,0.75)] ${
                      !isSelected && selectedBank ? "opacity-30 hover:opacity-100" : "opacity-100"
                    }`}
                  >
                    <div
                      className={cn(
                        "rounded-full",
                        isSelected && "bg-gradient-to-r from-[#DC7CA0] to-[#B389EC] p-0.5"
                      )}
                    >
                      <div className={cn("p-1 rounded-full", !isSelected && "border border-gray-300")}>
                        <Image src={bank.logoUrl} alt={bank.name} width={60} height={60} className="rounded-full" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
        </div>

        <div className="flex flex-col gap-4 p-10 rounded-lg">
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter your Account Name"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your Account Number"
              />
            </div>
          </div>
        </div>


      <div className="flex gap-4">
        {isEditMode && onDelete && (
          <GlobalButton variant="secondary" type="button" onClick={() => onDelete(initialData.id)}>
            Delete
          </GlobalButton>
        )}
        <GlobalButton variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </GlobalButton>
        <GlobalButton variant="primary" type="submit">
          Confirm
        </GlobalButton>
      </div>
    </form>
  );
}