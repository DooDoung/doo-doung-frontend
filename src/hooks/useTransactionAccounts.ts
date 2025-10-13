import { useEffect, useState } from "react";

// import { MOCK_ACCOUNTS } from "@/constants/transaction";
import { AppToast } from "@/lib/app-toast";
import type { TransactionAccount } from "@/types/transaction";
import { useSession } from "next-auth/react";

import { ca, da, se } from "date-fns/locale";
import { MOCK_ACCOUNTS } from "@/constants/transaction";
import { set } from "zod";

export type PageMode = "list" | "create" | "edit";

export function useTransactionAccounts() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  const { data: session ,status} = useSession();
  const token = session?.accessToken;
  console.log("session: ",session);
  const [mode, setMode] = useState<PageMode>("list");
  const [accounts, setAccounts] = useState<TransactionAccount[]>([]);
  const [editingAccount, setEditingAccount] = useState<
    TransactionAccount | undefined
  >(undefined);

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!session) return;
    // console.log("token: ",token)
    try {
      async function fetchAccounts() {
        const response = await fetch(`${API_BASE_URL}/tx-account`,{
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Failed to fetch accounts: ${errText}`);
        }
        const data = await response.json();
        console.log("Fetched response:", data);
        console.log(data.data);
        setAccounts(Array.isArray(data.data) ? data.data : []);
      }

      fetchAccounts();
    }
    catch (error) {
      console.error("Error fetching accounts:", error);
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
  }, [status, session]);
  

  const handleStartCreate = () => {
    setMode("create");
  };

  const handleStartEdit = (account: TransactionAccount) => {
    setEditingAccount(account);
    setMode("edit");
  };

  const handleCancel = () => {
    if (mode === "create") {
      AppToast.info("Account Creation Cancelled");
    }
    setEditingAccount(undefined);
    setMode("list");
  };

  const handleCreateConfirm = async (data: Omit<TransactionAccount, "id">) => {
    const newAccount: TransactionAccount = {
      id: Date.now().toString(),
      ...data,
    };
    try {
      const dataInput = {...data, bank : data.bank.name};
      console.log(dataInput);
      const response = await fetch(`${API_BASE_URL}/tx-account`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(dataInput),
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to create account: ${errText}`);
      }
    }
    catch (error) {
      console.error("Error creating account:", error);
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setMode("list");
    AppToast.success("Account Created!");
  };

const handleEditConfirm = async (data: Omit<TransactionAccount, "id">) => {
  if (!editingAccount) return;

  // Update frontend state (optimistic update)
  setAccounts((prevAccounts) =>
    prevAccounts.map((acc) =>
      acc.id === editingAccount.id ? { ...acc, ...data } : acc,
    ),
  );
  // AppToast.info("Updating account...");
  try {
    AppToast.info(`${API_BASE_URL}/tx-account/${editingAccount.id}`);
    const dataInput = {...data, bank : data.bank.name};
    console.log(editingAccount.id);
    const response = await fetch(
      `${API_BASE_URL}/tx-account/${editingAccount.id}`,
      {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(dataInput),
      },
    );

    if (!response.ok) {
      // backend returned 4xx or 5xx
      const errText = await response.text();
      throw new Error(`Failed to update account: ${errText}`);
    }

    AppToast.success("Account Updated!");
  } catch (error) {
    console.error("Error updating account:", error);
    AppToast.error(error instanceof Error ? error.message : "Unknown error");
  }

  setMode("list");
  setEditingAccount(undefined);
};


  const handleDelete = async (id: string) => {
    setAccounts((prevAccounts) => prevAccounts.filter((acc) => acc.id !== id));
    setMode("list");
    setEditingAccount(undefined);
    try {
      const response = await fetch(`${API_BASE_URL}/tx-account/${id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
         },
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to delete account: ${errText}`);
      }
    }
    catch (error) {
      console.error("Error deleting account:", error);
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
    AppToast.info("Account Deleted!");
  };

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleSetDefault = (accountId: string) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === accountId
          ? { ...acc, isDefault: true }
          : { ...acc, isDefault: false },
      ),
    );

    try {
      fetch(`${API_BASE_URL}/tx-account/default/${accountId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDefault: true }),
      });
    }
    catch (error) {
      console.error("Error setting default account:", error);
      AppToast.error(error instanceof Error ? error.message : "Unknown error");
    }
    AppToast.success("Default account updated!");
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
