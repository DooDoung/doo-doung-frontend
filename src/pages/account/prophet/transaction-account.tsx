"use client";
import { CirclePlus } from "lucide-react";
import localFont from "next/font/local";

import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
// 1. Import the GlassContainer component
import { GlassContainer } from "@/components/globalComponents/GlassContainer";
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
        // 2. Wrap the form in the GlassContainer
        <GlassContainer>
          <TransactionAccountForm
            banks={BANKS}
            onConfirm={handleCreateConfirm}
            onCancel={handleCancel}
          />
        </GlassContainer>
      );
    }

    if (mode === "edit") {
      return (
        // 3. Wrap the form in the GlassContainer
        <GlassContainer>
          <TransactionAccountForm
            initialData={editingAccount}
            banks={BANKS}
            onConfirm={handleEditConfirm}
            onDelete={handleDelete}
            onCancel={handleCancel}
          />
        </GlassContainer>
      );
    }

    return (
      // 4. Wrap the default view content in the GlassContainer
      <GlassContainer>
        <div className="flex flex-col items-center gap-2 p-8 -mt-12">
          <div className="flex items-center gap-2">
            <h1 className="font-sanctuary text-white text-4xl">Choose Your Default Account</h1>
            <button className="cursor-pointer" onClick={handleStartCreate}>
              <CirclePlus
                className="mr-1 inline-block text-white"
                size={32}
                strokeWidth={1}
              />
            </button>
          </div>
          <div className="flex w-full max-h-96 flex-col items-center gap-4 overflow-y-auto px-4 mt-4">
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
            className="mt-4"
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
      </GlassContainer>
    );
  };

  return (
    <DefaultLayout 
      contentClassName="flex items-start justify-center pt-5"
    >
      {renderContent()}
    </DefaultLayout>
  );
}