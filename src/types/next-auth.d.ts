import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      prophetId?: string;
      prophetProfileUrl?: string;
    } & DefaultSession["user"];
    accessToken: string;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    prophetId?: string;
    prophetProfileUrl?: string;
    accessToken: string;
    expiresAt: number;
  }
}

declare module "next-auth/jwt" {
  // Extend the JWT shape used internally by next-auth
  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    expiresAt?: number;
    prophetProfileUrl?: string;
  }
}
