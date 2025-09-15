// auth.ts
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { refreshAccessToken } from "@/mock-auth";

/**
 * NextAuth session format:
 * {
 *   user: {
 *      id,
 *      username,
 *      email,
 *      role
 * },
 *   accessToken: string
 * }
 * If expired -> session = null.
 */

const isDevMock = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
        return token;
      }

      // In dev mock mode, refresh token using mock logic if expired
      if (isDevMock) {
        if (!token.expiresAt || Date.now() > (token.expiresAt as number)) {
          return refreshAccessToken(token);
        }
        return token;
      }

      // If access token is still valid, return it
      if (
        token.accessToken &&
        token.expiresAt &&
        Date.now() < (token.expiresAt as number)
      ) {
        return token;
      }

      // If expired, return empty (could trigger refresh logic in real app)
      return {};
    },

    async session({ session, token }) {
      if (!token?.accessToken || Date.now() > (token.expiresAt as number)) {
        return null as any; // force user to log in again
      }
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          email: token.email,
          role: token.role,
        },
        accessToken: token.accessToken,
      };
    },
  },
});
