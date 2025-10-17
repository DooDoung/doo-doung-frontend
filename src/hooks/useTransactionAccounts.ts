import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AppToast } from "@/lib/app-toast";
import type { TransactionAccount } from "@/types/transaction";

export type PageMode = "list" | "create" | "edit";

export function useTransactionAccounts() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const [mode, setMode] = useState<PageMode>("list");
  const [accounts, setAccounts] = useState<TransactionAccount[]>([]);
  const [editingAccount, setEditingAccount] = useState<TransactionAccount>();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  // ✅ Step 1: reusable fetch function
  const fetchAccounts = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${API_BASE_URL}/tx-account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to fetch accounts: ${errText}`);
      }

      const data = await response.json();
      setAccounts(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchAccounts();
  }, [status, session]);

  const handleCreateConfirm = async (data: Omit<TransactionAccount, "id">) => {
    try {
      const dataInput = { ...data, bank: data.bank.name };
      const response = await fetch(`${API_BASE_URL}/tx-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataInput),
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to create account: ${errText}`);
      }
      AppToast.success("Account Created!");
      await fetchAccounts();
      setMode("list");
    } catch (error) {
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleEditConfirm = async (data: Omit<TransactionAccount, "id">) => {
    if (!editingAccount) return;
    try {
      const dataInput = { ...data, bank: data.bank.name };
      const response = await fetch(
        `${API_BASE_URL}/tx-account/${editingAccount.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataInput),
        },
      );
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to update account: ${errText}`);
      }
      AppToast.success("Account Updated!");
      await fetchAccounts();
      setMode("list");
      setEditingAccount(undefined);
    } catch (error) {
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tx-account/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to delete account: ${errText}`);
      }
      AppToast.info("Account Deleted!");
      await fetchAccounts();
    } catch (error) {
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleStartCreate = () => setMode("create");
  const handleStartEdit = (account: TransactionAccount) => {
    setEditingAccount(account);
    setMode("edit");
  };
  const handleCancel = () => {
    setEditingAccount(undefined);
    setMode("list");
  };
  const handleSelectAccount = (id: string) => setSelectedAccountId(id);

  const handleSetDefault = async (accountId: string) => {
    try {
      await fetch(`${API_BASE_URL}/tx-account/default/${accountId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDefault: true }),
      });
      AppToast.success("Default account updated!");
      await fetchAccounts();
    } catch (error) {
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
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
