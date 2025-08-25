export interface RegisterFormData{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: 'male' | 'female' | 'other' | '';
    email: string;
    isProphet: boolean;
    transactionAccount?: string;
    lineId?: string;
}