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
    handleSetDefault,
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
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          <h1>Choose Your Default Account</h1>
          <button className="cursor-pointer" onClick={handleStartCreate}>
            <CirclePlus
              className="mr-1 inline-block"
              size={32}
              strokeWidth={1}
            />
          </button>
        </div>
        <div className="flex h-100 w-3/4 flex-col items-center justify-center gap-4 overflow-y-scroll rounded-lg border-2 border-black bg-black px-8 py-16">
          <div className="mt-32" />
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
        <button
          className="rounded-md border-2 border-black px-4 py-2 hover:border-white hover:bg-black hover:text-white"
          onClick={() => {
            if (selectedAccountId) {
              handleSetDefault(selectedAccountId);
            }
          }}
        >
          Set as Default Account
        </button>
      </div>
    );
  };

  return <DefaultLayout>{renderContent()}</DefaultLayout>;
}
