import React from "react";
import type { TransactionAccount } from "@/types/transaction";
import Image from "next/image";

function TransactionAccountSelectItem({
  account,
}: {
  account: TransactionAccount;
}) {
  return (
    <div className="flex-rol flex min-w-[400px] items-center justify-between">
      <Image
        src={account.bank.logoUrl}
        alt={`${account.bank.name} logo`}
        width={30}
        height={30}
      />
      <div>{account.accountName}</div>
      <div>{account.accountNumber}</div>
    </div>
  );
}
export default TransactionAccountSelectItem;
