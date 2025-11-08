import React from "react";
import Image from "next/image";

import type { TransactionAccount } from "@/types/transaction";
import { getBankImageUrl } from "@/utils/getBankImageUrl";

function TransactionAccountSelectItem({
  account,
}: {
  account: TransactionAccount;
}) {
  return (
    <div className="flex-rol flex min-w-[400px] items-center justify-between">
      <Image
        src={getBankImageUrl(account.bank)}
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
