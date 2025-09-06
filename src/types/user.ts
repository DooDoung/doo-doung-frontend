export enum Sex {
  Male = "Male",
  Female = "Female",
  LGBTQ_Plus = "LGBTQ_Plus",
  Undefined = "Undefined",
}

export enum ZodiacSign {
  Aries = "aries",
  Taurus = "taurus",
  Gemini = "gemini",
  Cancer = "cancer",
  Leo = "leo",
  Virgo = "virgo",
  Libra = "libra",
  Scorpio = "scorpio",
  Sagittarius = "sagittarius",
  Capricorn = "capricorn",
  Aquarius = "aquarius",
  Pisces = "pisces",
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Sex | "";
  email: string;
  role: "prophet" | "customer" | "";
  transactionAccount?: string;
  lineId?: string;

  birthDate?: Date;
  birthTime?: string;
  zodiacSign?: ZodiacSign | "";
}
