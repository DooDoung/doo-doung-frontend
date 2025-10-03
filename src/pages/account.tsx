import AccountLayout from "@/components/account/AccountLayout";
import { DefaultLayout } from "@/components/globalComponents";
import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/account/`);
        setUser(response.data.data);
        console.log("Fetched account data:", response.data);
      } catch (error: any) {
        console.error("Error fetching account data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);
  return (
    <DefaultLayout contentClassName="flex justify-center items-center">
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      {user && <AccountLayout user={user} editing={false} />}
    </DefaultLayout>
  );
}
