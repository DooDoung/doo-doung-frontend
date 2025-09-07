export interface Bank {
  name: string;
  logoUrl: string;
}

export interface TransactionAccount {
  id: string;
  bank: Bank;
  accountName: string;
  accountNumber: string;
  isDefault?: boolean;
}