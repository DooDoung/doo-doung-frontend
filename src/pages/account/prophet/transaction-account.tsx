"use client";
import { CirclePlus } from "lucide-react";

import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
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
      <GlassContainer>
        <div className="-mt-12 flex flex-col items-center gap-2 p-8">
          <div className="flex items-center gap-2">
            <h1 className="font-sanctuary text-4xl text-white">
              Choose Your Default Account
            </h1>
            <button className="cursor-pointer" onClick={handleStartCreate}>
              <CirclePlus
                className="mr-1 inline-block text-white"
                size={32}
                strokeWidth={1}
              />
            </button>
          </div>
          <div className="mt-4 flex h-[45vh] w-[90vh] flex-col items-center gap-4 overflow-y-auto px-4">
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
    <DefaultLayout contentClassName="flex items-start justify-center pt-5">
      {renderContent()}
    </DefaultLayout>
  );
}
