"use client";
import { CirclePlus } from "lucide-react";

import { DefaultLayout } from "@/components/globalComponents";
import { AccountListItem } from "@/components/transaction/AccountListItem";
import TransactionAccountForm from "@/components/transaction/TransactionAccountForm";
import { BANKS } from "@/constants/transaction";
import { useTransactionAccounts } from "@/hooks/useTransactionAccounts";

export default function ProphetTransactionAccountPage() {
  const {
    mode,
    accounts,
    editingAccount,
    selectedAccountId,
    handleStartCreate,
    handleStartEdit,
    handleCancel,
    handleCreateConfirm,
    handleEditConfirm,
    handleDelete,
    handleSelectAccount,
  } = useTransactionAccounts();

  const renderContent = () => {
    if (mode === "create") {
      return (
        <TransactionAccountForm
          banks={BANKS}
          onConfirm={handleCreateConfirm}
          onCancel={handleCancel}
        />
      );
    }

    if (mode === "edit") {
      return (
        <TransactionAccountForm
          initialData={editingAccount}
          banks={BANKS}
          onConfirm={handleEditConfirm}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      );
    }

    return (
      <div className="justify-center items-center flex flex-col gap-4">
        <div className="flex flex gap-4">
          <h1>Select Your Transaction Account</h1>
          <button className="cursor-pointer" onClick={handleStartCreate}>
            <CirclePlus className="inline-block mr-1" size={32} strokeWidth={1} />
          </button>
        </div>
        <div className="border border-2 bg-black rounded-lg gap-4 w-3/4 h-100 overflow-y-scroll justify-center items-center flex flex-col border border-black px-8 py-16">
          {accounts.map((account) => (
            <AccountListItem
              key={account.id}
              account={account}
              isSelected={selectedAccountId === account.id}
              onSelect={() => handleSelectAccount(account.id)}
              onEdit={handleStartEdit}
            />
          ))}
        </div>
        <button className="border border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-white">
          Confirm
        </button>
      </div>
    );
  };

  return (
    <DefaultLayout>
      {renderContent()}
    </DefaultLayout>
  );
}