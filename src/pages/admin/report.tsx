import { DefaultLayout, GlassContainer2, GlobalButton, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/globalComponents";
import Pagination from "@/components/report/pagination";
import ReportCard, { ReportType, StatusType } from "@/components/report/reportCard";
import { AppToast } from "@/lib/app-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ReportProps {
  id: string,
  customer: string,
  reportType: ReportType,
  topic: string,
  description: string,
  reportStatus: StatusType,
  createdAt: string,
  adminId: Array<string[]>[];
}

async function fetchReportsAPI(status: string, authToken?: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const response = await fetch(`${backendUrl}/report/admin/reports?status=${status}`, {
    headers: authToken
      ? { 'Authorization': `Bearer ${authToken}` }
      : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reports");
  }

  return data.data.reports;
}

export default function AdminReportPage() {
  const { data: session } = useSession();
  const [reportStatus, setReportStatus] = useState<StatusType | "ALL">("ALL");
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedReports = reports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const authToken = session?.accessToken;

  useEffect(() => {
    setLoading(true);
    
    console.log("accessToken: ", authToken);
    if (!authToken) {
      console.log("Please login to view reports.");
      setLoading(false);
      return;
    }

    const loadReports = async () => {
      try {
        const raw = await fetchReportsAPI(reportStatus, authToken);

        const parsed: ReportProps[] = raw.map((r: any) => ({
          id: r.id,
          customer: r.customer,
          reportType: r.reportType,
          topic: r.topic,
          description: r.description,
          reportStatus: r.reportStatus,
          createdAt: r.createdAt,
          adminId: r.adminId,
        }));

        setReports(parsed);
        console.log("Fetched all reports successfully.");
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [authToken, reportStatus]);

  const handleChange = (val : any) => {
    setReportStatus(val);
    setCurrentPage(1); // reset page
  };

  return (
    <DefaultLayout className="flex flex-col items-center">
      <p className="mt-10 font-sanctuary text-7xl text-neutral-white text-center">Report</p>
      <GlassContainer2>
        <div className="w-full h-full flex flex-col items-center">
          <Select
            value={reportStatus}
            onValueChange={(val) => handleChange(val)}
          >
            <SelectTrigger className="w-1/2 bg-white text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
              <SelectItem value="DISCARD">Discard</SelectItem>
            </SelectContent>
          </Select>

          {/* report card session */}
          <div className="mt-10 gap-8 flex flex-col items-center w-full h-2/3 overflow-y-scroll custom-scrollbar">
            {loading?  
              <p className="text-neutral-white text-xl">Loading reports...</p>
            :paginatedReports.map((r:ReportProps) => {
              const dt = new Date(r.createdAt);

              return (
                <ReportCard 
                  key={r.id} 
                  id={r.id} 
                  customerProfile={""} 
                  customerName={r.customer} 
                  reportStatus={r.reportStatus} 
                  reportType={r.reportType} 
                  topic={r.topic} 
                  description={r.description} 
                  createdDate={dt.toLocaleDateString()}
                  createdTime={dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                />
              );
            })}
          </div>
          <Pagination 
            goPrev={goPrev} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
            goNext={goNext} 
          />
        </div>
      </GlassContainer2>
    </DefaultLayout>
  );
}
