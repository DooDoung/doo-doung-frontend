import { JWT } from "next-auth/jwt";

// mock-auth.ts
export const devAccounts = {
  dev_customer: {
    id: "1",
    username: "dev_customer",
    email: "dev_customer@example.com",
    role: "customer",
    accessToken: "mock-access-token-customer",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 1 day
  },
  dev_prophet: {
    id: "2",
    username: "dev_prophet",
    email: "dev_prophet@example.com",
    role: "prophet",
    accessToken: "mock-access-token-prophet",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  },
  dev_admin: {
    id: "3",
    username: "dev_admin",
    email: "dev_admin@example.com",
    role: "admin",
    accessToken: "mock-access-token-admin",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  },
};

export const useMock = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";

//Simulate refreshing a mock access token.
export function refreshAccessToken(token: JWT): JWT {
  const username = token.username as keyof typeof devAccounts;
  const account = devAccounts[username];

  if (!account) {
    return token;
  }

  // Generate a new accessToken string, here we just append a timestamp
  const newAccessToken = `${account.accessToken}-${Date.now()}`;

  return {
    ...token,
    accessToken: newAccessToken,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24, // extend 1 day
    id: account.id,
    username: account.username,
    email: account.email,
    role: account.role,
  };
}
