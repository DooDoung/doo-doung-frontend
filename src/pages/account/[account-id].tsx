import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";
import OtherAccountLayout from "@/components/otherAccount/OtherAccountLayout";
import { AccountData } from "@/interface/User";
import axios from "axios";

export default function AccountDetailsPage() {
  const router = useRouter();
  const { "account-id": accountId } = router.query;

  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!accountId || typeof accountId !== "string") {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

        const response = await axios.get(`${backendUrl}/account/${accountId}`);

        if (response.status !== 200) {
          throw new Error(`Failed to fetch account data: ${response.status}`);
        }

        const result = response.data;
        setAccountData(result.data);
        console.log("Fetched account data:", result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [accountId]);

  return (
    <DefaultLayout contentClassName="flex justify-center items-center">
      {loading && <p>Loading account data...</p>}
      {accountData && typeof accountId === "string" && (
        <OtherAccountLayout user={accountData} accountId={accountId} />
      )}
    </DefaultLayout>
  );
}
