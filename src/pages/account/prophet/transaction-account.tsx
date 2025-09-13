"use client";
import { CirclePlus } from "lucide-react";
import localFont from 'next/font/local';

import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
import { AccountListItem } from "@/components/transaction/AccountListItem";
import TransactionAccountForm from "@/components/transaction/TransactionAccountForm";
import { BANKS } from "@/constants/transaction";
import { useTransactionAccounts } from "@/hooks/useTransactionAccounts";
import { cn } from "@/lib/utils";

const sanctuaryOrnate = localFont({
  src: '../../../../public/fonts/SanctuaryOrnate-PersonalUse.ttf',
  display: 'swap',
});

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
      <div className="justify-center items-center flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <h1 className={cn(sanctuaryOrnate.className, "text-4xl")}>Choose Your Default Account</h1>
          <button className="cursor-pointer" onClick={handleStartCreate}>
            <CirclePlus className="inline-block mr-1" size={32} strokeWidth={1} />
          </button>
        </div>
        <div className="border-2 bg-black rounded-lg gap-4 w-3/4 h-140 overflow-y-scroll justify-center items-center flex flex-col border border-black px-8 py-16">
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
        <GlobalButton
          variant="primary"
          onClick={() => {
            if (selectedAccountId) {
              handleSetDefault(selectedAccountId);
            }
          }}
          disabled={!selectedAccountId}
        >
          Set as Default Account
        </GlobalButton>
      </div>
    );
  };

  return (
    <DefaultLayout>
      {renderContent()}
    </DefaultLayout>
  );
}