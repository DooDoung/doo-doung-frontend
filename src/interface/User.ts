import { TransactionAccount } from "@/types/transaction";

export interface BaseAccountData {
  username: string;
  profileUrl: string;
  role: "CUSTOMER" | "PROPHET";
  gender: string;
  zodiacSign: string;
}

export interface CustomerAccount extends BaseAccountData {
  role: "CUSTOMER";
  name: string;
  lastName: string;
  birthDate: string;
  birthTime: string;
  email: string;
  phoneNumber: string;
}

export interface ProphetAccount extends BaseAccountData {
  role: "PROPHET";
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  lineId: string;
  txAccounts: TransactionAccount[];
}

export type AccountData = CustomerAccount | ProphetAccount;
