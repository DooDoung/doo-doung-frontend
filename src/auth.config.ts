// auth.config.ts
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// --- MOCK DEV ACCOUNTS (easy to remove later) ---
const devAccounts = {
  dev_customer: {
    id: "1",
    username: "dev_customer",
    email: "dev_customer@example.com",
    role: "CUSTOMER",
    accessToken: "mock-access-token-customer",
    expiresAt: Date.now() + 1000 * 60 * 60, // 1 hour
  },
  dev_prophet: {
    id: "2",
    username: "dev_prophet",
    email: "dev_prophet@example.com",
    role: "PROPHET",
    accessToken: "mock-access-token-prophet",
    expiresAt: Date.now() + 1000 * 60 * 60,
  },
  dev_admin: {
    id: "3",
    username: "dev_admin",
    email: "dev_admin@example.com",
    role: "ADMIN",
    accessToken: "mock-access-token-admin",
    expiresAt: Date.now() + 1000 * 60 * 60,
  },
};

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";
// --- END MOCK DEV ACCOUNTS ---

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Called on signIn("credentials", { username, password })
      authorize: async (credentials) => {
        if (!credentials) return null;
        
        if (
          useMock &&
          credentials.password === "dev_password" &&
          devAccounts[credentials.username as keyof typeof devAccounts]
        ) {
          return devAccounts[credentials.username as keyof typeof devAccounts];
        }

        // REAL AUTH
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        // status code 200-299
        if (!res.ok) return null;

        const apiResponse = await res.json();
        // Expected shape: { success: true, data: { accessToken, expiresAt, user } }
        if (!apiResponse?.success || !apiResponse?.data) return null;

        const data = apiResponse.data;

        if (!data?.accessToken || !data?.user) return null;

        return {
          id: String(data.user.id),
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          accessToken: data.accessToken,
          expiresAt: data.expiresAt,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
