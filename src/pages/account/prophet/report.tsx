import React, { useEffect, useState } from "react";

import ReportItem from "@/components/account/Report/ReportItem";
import WarningBanner from "@/components/account/Report/WarningBanner";
import UserProfile from "@/components/account/UserProfile";
import { DefaultLayout } from "@/components/globalComponents";
import { type Report, WARNING_THRESHOLD } from "@/constants/reportConstants";

export default function ProphetReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReportById = async (id: string) => {
    const res = await fetch(`http://localhost:8000/report/${id}`);
    const json = await res.json();
    if (!res.ok) throw new Error("Failed to fetch report");
    return json.data as Report;
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchReports = async () => {
      const mockIds = [
        "11328be415f34f0a",
        "56e41cb48a29444b",
        "d1f102a78785433c",
        "aca2f4765ac6443d",
        "87b9ed110f1f4c55",
        "92385d22fc0640bd",
      ];
      const fetchedReports: Report[] = [];

      for (const id of mockIds) {
        const report = await fetchReportById(id);
        fetchedReports.push(report);
      }

      setReports(fetchedReports);
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      fetchReports();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const hasExceededThreshold = reports.length > WARNING_THRESHOLD;

  return (
    <DefaultLayout>
      <div className="mx-auto mt-[10%] flex h-[73%] w-[87%] justify-start">
        <UserProfile role="prophet" />
        <main className="flex-1 p-8">
          {isLoading ? (
            <div className="p-10 text-center text-lg">Loading reports...</div>
          ) : (
            <>
              {hasExceededThreshold && (
                <div className="mb-4">
                  <WarningBanner threshold={WARNING_THRESHOLD} />
                </div>
              )}
              <div className="h-[50vh] space-y-4 overflow-y-auto pr-4">
                {reports.map((report, index) => (
                  <ReportItem key={index} report={report} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </DefaultLayout>
  );
}
