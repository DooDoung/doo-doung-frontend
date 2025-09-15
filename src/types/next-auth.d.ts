import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
    accessToken: string;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    accessToken: string;
    expiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    expiresAt?: number;
  }
}
