import { DefaultLayout } from "@/components/globalComponents";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface AccountData {
  username: string;
  profileUrl: string;
  role: string;
  zodiacSign: string;
  gender: string;
}

export default function AccountDetailsPage() {
  const router = useRouter();
  const { "account-id": accountId } = router.query;
  
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!accountId || typeof accountId !== 'string') {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        
        const fullUrl = `${backendUrl}/account/${accountId}`;
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch account data: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Extract required fields from the response data
        const extractedData: AccountData = {
          username: result.data.username || '',
          profileUrl: result.data.profileUrl || '',
          role: result.data.role || '',
          zodiacSign: result.data.zodiacSign || '',
          gender: result.data.gender || ''
        };
        
        setAccountData(extractedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [accountId]);

  return (
    <DefaultLayout>
      <p>This is Account Details page</p>
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      {accountData && (
        <div>
          <p>Account ID: {accountId}</p>
          <p>Username: {accountData.username}</p>
          <p>Profile URL: {accountData.profileUrl}</p>
          <p>Role: {accountData.role}</p>
          <p>Zodiac Sign: {accountData.zodiacSign}</p>
          <p>Gender: {accountData.gender}</p>
        </div>
      )}
    </DefaultLayout>
  );
}
