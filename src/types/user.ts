export enum Sex {
  Male = "male",
  Female = "female",
  LGBTQ_Plus = "lgbtq_plus",
  Undefined = "undefined",
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
  role: "PROPHET" | "CUSTOMER" | "";
  transactionAccount?: string;
  lineId?: string;

  birthDate?: Date;
  birthTime?: string;
  zodiacSign?: ZodiacSign | "";
}
