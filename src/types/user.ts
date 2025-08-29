export enum Sex {
  Male = "Male",
  Female = "Female",
  LGBTQ_Plus = "LGBTQ_Plus",
  Undefined = "Undefined",
}

export interface RegisterFormData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Sex | "";
  email: string;
  isProphet: boolean;
  transactionAccount?: string;
  lineId?: string;
}
