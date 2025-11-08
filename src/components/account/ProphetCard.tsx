import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getBankImageUrl } from "@/utils/getBankImageUrl";

function ProphetCard({
  feat,
  transaction,
}: {
  feat: ProphetFeat;
  transaction?: TransactionAccount;
}) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center"
      onClick={() => (feat.goTo ? router.push(feat.goTo) : null)}
      title={feat.goTo ? `${feat.goTo}` : undefined}
    >
      <h2 className="mb-1 block self-start font-light text-white uppercase">
        {feat.name}
      </h2>
      <div className="group from-accent-pink to-accent-violet flex w-full rounded-4xl bg-gradient-to-r p-[4px] shadow-md transition-all duration-300 hover:cursor-pointer">
        <div className="bg-neutral-white group-hover:from-accent-pink/20 group-hover:to-accent-violet/20 flex h-24 w-full justify-center rounded-4xl p-2 transition-all duration-300 group-hover:bg-gradient-to-r">
          {feat.name != "Transaction Account" ? (
            <Image
              src={feat.imageUrl}
              alt={feat.name}
              width={80}
              height={50}
              className="h-full object-cover"
            />
          ) : (
            <div className="flex w-full px-2">
              <Image
                src={getBankImageUrl(transaction?.bank ?? "")}
                alt={transaction?.bank || ""}
                className="mr-3 mb-2 h-full self-start rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-neutral-black">{transaction?.accountName}</p>
                <p className="text-neutral-black text-sm">
                  {transaction?.accountNumber}
                </p>
                <p className="text-primary mt-2 text-xs">
                  Click to view other accounts!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProphetCard;
