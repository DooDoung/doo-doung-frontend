import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import AccountLayout from "@/components/account/AccountLayout";
import { DefaultLayout } from "@/components/globalComponents";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  console.log("Session data:", session);
  const token = session?.accessToken;

  useEffect(() => {
    const fetchAccount = async () => {
      if (status === "loading" || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/account/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.data);
        console.log("Fetched account data:", response.data);
      } catch (error: any) {
        console.error("Error fetching account data:", error);
        setError(error.message || "Failed to fetch account data");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [token, status]);
  return (
    <DefaultLayout contentClassName="flex justify-center items-center">
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      {user && <AccountLayout user={user} editing={false} />}
    </DefaultLayout>
  );
}
