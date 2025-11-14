import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReportCard, {
  ReportCardProps,
} from "@/components/account/Report/ReportCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export default function ReportPage() {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.accessToken;
  const userId = session.data?.user.id;

  const [reports, setReports] = useState<ReportCardProps[]>([]);

  const fetchReports = async () => {
    try {
      if (!token || !userId) return;

      const res = await fetch(`${API_BASE_URL}/report/account/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();

      const formattedReports: ReportCardProps[] = data.data.reports.map(
        (report: any) => ({
          id: report.id,
          imageUrl: "/images/course.svg",
          title: report.topic,
          description: report.description,
          issueType: report.reportType,
        }),
      );

      setReports(formattedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [userId, token]);

  const handleCreateNewReport = () => router.push("/report/create");
  const handleBack = () => router.push("/");

  return (
    <DefaultLayout>
      <div className="flex h-screen w-full items-center justify-center">
        <GlassContainer2>
          <div className="flex w-full flex-col items-center p-6 sm:p-8">
            {/* Header */}
            <h1 className="font-sanctuary mb-8 text-4xl font-light text-white">
              My Reports
            </h1>

            {/* Report List */}
            <div className="custom-scrollbar mb-8 flex h-[60vh] w-[90%] flex-col items-center space-y-4 overflow-y-scroll pt-4">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <ReportCard key={report.id} {...report} />
                ))
              ) : (
                <p className="text-white">No reports found.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <GlobalButton
                variant="secondary"
                onClick={handleBack}
                size="lg"
                className="w-30"
              >
                Back
              </GlobalButton>
              <GlobalButton
                variant="primary"
                onClick={handleCreateNewReport}
                size="lg"
                className="px-6"
              >
                Create New Report
              </GlobalButton>
            </div>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
