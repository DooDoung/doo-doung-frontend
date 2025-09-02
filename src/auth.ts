// auth.ts
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.username = (user as any).username;
        token.email = (user as any).email;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
        token.expiresAt = (user as any).expiresAt;
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

      // If expired, return empty
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
