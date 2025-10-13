import { ZodiacSign } from "@/types/user";

export interface AccountData {
  username: string;
  profileUrl: string;
  role: string;
  zodiacSign: string;
  gender: string;
}
