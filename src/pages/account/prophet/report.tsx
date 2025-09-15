import React, { useEffect, useState } from "react";

import ReportItem from "@/components/account/Report/ReportItem";
import WarningBanner from "@/components/account/Report/WarningBanner";
import UserProfile from "@/components/account/UserProfile";
import { DefaultLayout } from "@/components/globalComponents";
import {
  mockReports,
  type Report,
  WARNING_THRESHOLD,
} from "@/constants/reportConstants";

export default function ProphetReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
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
