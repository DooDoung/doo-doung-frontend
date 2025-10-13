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

export function mapStringToZodiacSign(zodiac: string): ZodiacSign {
  switch (zodiac) {
    case "aries":
      return ZodiacSign.Aries;
    case "taurus":
      return ZodiacSign.Taurus;
    case "gemini":
      return ZodiacSign.Gemini;
    case "cancer":
      return ZodiacSign.Cancer;
    case "leo":
      return ZodiacSign.Leo;
    case "virgo":
      return ZodiacSign.Virgo;
    case "libra":
      return ZodiacSign.Libra;
    case "scorpio":
      return ZodiacSign.Scorpio;
    case "sagittarius":
      return ZodiacSign.Sagittarius;
    case "capricorn":
      return ZodiacSign.Capricorn;
    case "aquarius":
      return ZodiacSign.Aquarius;
    case "pisces":
      return ZodiacSign.Pisces;
    default:
      return ZodiacSign.Cancer;
  }
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
