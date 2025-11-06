import React, { useEffect, useState } from "react";

import ReportItem from "@/components/account/Report/ReportItem";
import WarningBanner from "@/components/account/Report/WarningBanner";
import UserProfile from "@/components/account/UserProfile";
import { DefaultLayout } from "@/components/globalComponents";
import { type Report, WARNING_THRESHOLD } from "@/constants/reportConstants";
import { useSession } from "next-auth/react";

export default function ProphetReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null); // store account data
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const fetchAccount = async (token: string) => {
    const res = await fetch("http://localhost:8000/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    console.log("👤 Account response:", json);

    if (!res.ok) throw new Error("Failed to fetch account data");
    return json.data; // ✅ assuming account data is inside json.data
  };

  // ✅ Fetch Prophet Reports
  const fetchReports = async (token: string) => {
    const res = await fetch("http://localhost:8000/report", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    console.log("📦 Reports response:", json);

    if (!res.ok) throw new Error("Failed to fetch reports");
    // ✅ now reports are in json.data
    return Array.isArray(json.data?.reports) ? json.data.reports : [];
  };

  useEffect(() => {
    if (!token) return; // wait until session is ready
    setIsLoading(true);

    (async () => {
      try {
        const [accountData, reportData] = await Promise.all([
          fetchAccount(token),
          fetchReports(token),
        ]);

        setUser(accountData);
        setReports(reportData);
      } catch (error) {
        console.error("❌ Fetch error:", error);
        setUser(null);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [token]);

  const hasExceededThreshold = reports.length > WARNING_THRESHOLD;

  return (
    <DefaultLayout>
      <div className="mx-auto my-5 flex h-[73%] w-[87%] justify-start rounded-3xl bg-black/20 backdrop-blur-xl">
        {/* ✅ Pass actual user data to UserProfile, not 'role' */}
        {user && <UserProfile user={user} />}

        <main className="flex-1 p-8">
          {isLoading ? (
            <div className="p-10 text-center text-lg">Loading reports...</div>
          ) : (
            <div className="relative h-[70vh]">
              <div className="flex h-full flex-col">
                {hasExceededThreshold && (
                  <div className="sticky top-3 z-10 mb-4">
                    <WarningBanner threshold={WARNING_THRESHOLD} />
                  </div>
                )}
                <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-4">
                  {reports.map((report, index) => (
                    <ReportItem key={index} report={report} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </DefaultLayout>
  );
}
