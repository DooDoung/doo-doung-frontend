export interface BaseAccountData {
  username: string;
  profileUrl: string;
  role: "CUSTOMER" | "PROPHET";
  gender: string;
  zodiacSign: string;
}

export interface CustomerAccount extends BaseAccountData {
  role: "CUSTOMER";
  firstName: string;
  lastName: string;
  birthDate: string;
  birthTime: string;
  email: string;
  phoneNumber: string;
}

export interface ProphetAccount extends BaseAccountData {
  role: "PROPHET";
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  line: string;
  transaction: TransactionAccount;
}

export type AccountData = CustomerAccount | ProphetAccount;
