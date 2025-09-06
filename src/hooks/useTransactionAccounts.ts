import { useState } from "react";

import { MOCK_ACCOUNTS } from "@/constants/transaction";
import type { TransactionAccount } from "@/types/transaction";

export type PageMode = "list" | "create" | "edit";

export function useTransactionAccounts() {
  const [mode, setMode] = useState<PageMode>("list");
  const [accounts, setAccounts] = useState<TransactionAccount[]>(MOCK_ACCOUNTS);
  const [editingAccount, setEditingAccount] = useState<TransactionAccount | undefined>(undefined);

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleStartCreate = () => {
    setMode("create");
  };

  const handleStartEdit = (account: TransactionAccount) => {
    setEditingAccount(account);
    setMode("edit");
  };

  const handleCancel = () => {
    setEditingAccount(undefined);
    setMode("list");
  };

  const handleCreateConfirm = (data: Omit<TransactionAccount, 'id'>) => {
    alert("Creating account:" + JSON.stringify(data));
    const newAccount: TransactionAccount = {
      id: Date.now().toString(),
      ...data,
    };
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
    setMode("list");
  };

  const handleEditConfirm = (data: Omit<TransactionAccount, 'id'>) => {
    if (!editingAccount) return;
    setAccounts(prevAccounts => 
      prevAccounts.map(acc => 
        acc.id === editingAccount.id ? { ...acc, ...data } : acc
      )
    );
    setMode("list");
    setEditingAccount(undefined);
  };

  const handleDelete = (id: string) => {
    setAccounts(prevAccounts => prevAccounts.filter(acc => acc.id !== id));
    setMode("list");
    setEditingAccount(undefined);
    alert("Delete Success");
  };

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleSetDefault = (accountId: string) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(acc =>
        acc.id === accountId ? { ...acc, isDefault: true } : { ...acc, isDefault: false }
      )
    );
    alert("Default account set successfully");
  };

  return {
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
  };
}