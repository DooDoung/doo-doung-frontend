import type { TransactionAccount } from "@/types/transaction";

interface AccountListItemProps {
  account: TransactionAccount;
  isSelected: boolean;
  onSelect: (accountId: string) => void;
}



export function AccountListItem({ account, isSelected, onSelect }: AccountListItemProps) {
    return (
        <div
            className={`bg-white border p-4 w-full cursor-pointer ${isSelected ? "bg-blue" : "border-gray-300 hover:bg-gray-100"}`}
            onClick={() => onSelect(account.id)}
        >
            <div className="flex items-center">
                {/* <img src={account.bank.logoUrl} alt={account.bank.name} className="h-8 w-8 mr-2" /> */}
                <div className="h-16 w-16 rounded-full border-2 border-gray-300 mr-2"></div>
                <div>
                    <div className="font-semibold">{account.accountName}</div>
                    <div className="text-sm text-gray-500">{account.accountNumber}</div>
                </div>
            </div>
        </div> 
    );
}