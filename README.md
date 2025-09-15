## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```


## How to Enable Mock Auth


Set the environment variable in your `.env` file:
    ```
    NEXT_PUBLIC_USE_MOCK_AUTH=true
    ```


## Dev Accounts

| Username      | Password      | Role      |
|---------------|--------------|-----------|
| dev_customer  | dev_password | CUSTOMER  |
| dev_prophet   | dev_password | PROPHET   |
| dev_admin     | dev_password | ADMIN     |

---

For login system, call `signIn` with username and passowrd like this

```typescript
import { signIn } from "next-auth/react";

// Example: Sign in with dev_account
await signIn("credentials", {
  username: "dev_customer",
  password: "dev_password",
});

//For real login system, use username and password from input

```

**To test real backend auth:**  
  Set `NEXT_PUBLIC_USE_MOCK_AUTH=false` (or remove it) in your `.env` and restart the dev server.


## NextAuth Session Example

When a user signs in with `signIn("credentials")`, the session object returned by NextAuth will look like this:

```jsonc
{
  "user": {
    "id": "123",
    "username": "dev_customer",
    "email": "customer@example.com",
    "role": "CUSTOMER",
    "name": "dev_customer",
    "image": null
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": 1757209872, // access token expire time
  "expires": "2025-09-07T08:36:47.000Z" // next auth token expire time
}
```

### Notes

 You can access this session in:
  * **Client components** with `useSession()`
  * **Server components / API routes** with `getServerSession(authOptions)`

### Example usage
---
**Client:**

```tsx
"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
```

**Server:**

```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <div>Welcome {session?.user.username}</div>;
}
```