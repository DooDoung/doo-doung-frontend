import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";
import OtherAccountLayout from "@/components/otherAccount/OtherAccountLayout";
import { AccountData } from "@/interface/User";
import { ZodiacSign } from "@/types/user";
import { mapStringToZodiacSign } from "@/types/user";

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

        const fullUrl = `${backendUrl}/account/${accountId}`;

        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch account data: ${response.status}`);
        }

        const result = await response.json();

        // Extract required fields from the response data
        const extractedData: AccountData = {
          username: result.data.username || "",
          profileUrl: result.data.profileUrl || "",
          role: result.data.role || "",
          zodiacSign: result.data.zodiacSign || "cancer",
          gender: result.data.gender || "",
        };

        setAccountData(extractedData);
        console.log("Fetched account data:", extractedData);
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
      {error && <p>Error: {error}</p>}
      {accountData && <OtherAccountLayout user={accountData} />}
    </DefaultLayout>
  );
}
