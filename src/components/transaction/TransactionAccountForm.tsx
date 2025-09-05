import { useEffect,useState } from "react";
import Image from "next/image";

import type { Bank,TransactionAccount } from "@/types/transaction";

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
      alert("Please fill all fields");
      return;
    }
    onConfirm({ bank: selectedBank, accountName, accountNumber });
  };

  return (
    <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
      <h1>{isEditMode ? "Edit Your Transaction Account" : "Create New Transaction Account"}</h1>

      <div className="flex items-center gap-16">
        <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="m-2">Select Your Bank</p>
            <div className="grid grid-cols-4 gap-4">
              {banks.map((bank) => (
                <button
                  type="button"
                  key={bank.name}
                  onClick={() => setSelectedBank(bank)}
                  className={`p-2 rounded-full ${
                    selectedBank?.name === bank.name
                      ? "border-2 border-red-500"
                      : "border border-gray-300"
                  }`}
                >
                  <Image src={bank.logoUrl} alt={bank.name} width={50} height={50} className="rounded-full" />
                </button>
              ))}
            </div>
        </div>

        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex gap-4">
              <label htmlFor="accountName">Account Name</label>
              <input
                id="accountName"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter your Account Name"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="accountNumber">Account Number</label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your Account Number"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>
        </div>


      <div className="flex gap-4">
        {isEditMode && onDelete && (
          <button className="border border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white" type="button" onClick={() => onDelete(initialData.id)}>
            Delete
          </button>
        )}
        {!isEditMode && (
          <button className="border border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="border border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}