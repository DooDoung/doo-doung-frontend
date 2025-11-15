import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../globalComponents";
import { useSession } from "next-auth/react";
import { AppToast } from "@/lib/app-toast";

export type StatusType =
  | "PENDING"
  | "DONE"
  | "DISCARD";

export type ReportType =
  | "OTHER"
  | "COURSE_ISSUE"
  | "PROPHET_ISSUE"
  | "PAYMENT_ISSUE"
  | "WEBSITE_ISSUE";

function ReportCard({
  id,
//   imageUrl,
  customerProfile,
  customerName,
  reportStatus,
  reportType,
  topic,
  description,
  createdDate,
  createdTime
}: {
  id: string;
//   imageUrl: string;
  customerProfile: string;
  customerName: string;
  reportStatus: StatusType;
  reportType: ReportType;
  topic: string;
  description: string;
  createdDate: string;
  createdTime: string;
}) {
  const { data: session } = useSession();
  const [status, setStatus] = useState<StatusType>(reportStatus);

  const authToken = session?.accessToken;

  const handleChange = async (val: StatusType) => {
    setStatus(val);

    try {
      await updateReportStatus(id, val, authToken);
      if(val === "DISCARD") 
        AppToast.success("This report is discarded");
      else if(val === "DONE")
        AppToast.success("This report is done");
      else AppToast.success("Status updated");
    } catch (error) {
      AppToast.error(error instanceof Error ? error.message : String(error));
      setStatus(reportStatus);
      return;
    }
  };

  const setStyleStatus = () => {
    switch(status){
      case "PENDING": 
        return "shadow-[0_0_6px_rgba(245,158,11,0.7)] border border-warning text-warning text-2xl";
      case "DONE":
        return "shadow-[0_0_6px_rgba(34,197,94,0.7)] border border-success text-success text-2xl";
      case "DISCARD":
        return "shadow-[0_0_6px_rgba(239,68,68,0.7)] border border-error text-error text-2xl";
      default:
        return "shadow-[0_0_6px_rgba(0,0,0,0.7)] border border-neutral-black text-base";
    }
  };

  return (
    <div
      className={`font-chakra relative flex justify-between w-[90%] h-fit p-6 rounded-3xl border bg-white shadow-md`}
    >
      <div className="h-fit w-6/7 flex flex-col gap-2 justify-between">
          <div className="flex gap-6 items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full text-xs">
                  Profile
              </div>

              <p className="text-lg">{customerName?.toUpperCase() ?? "ANONYMOUS"}</p>
              <p className="text-sm mt-1">{createdDate} {createdTime}</p>
          </div>
          <p className="text-lg font-bold">{topic}</p>
          <p className="text-base">{description}</p>
      </div>
      <div className="flex flex-col p-4 gap-4 w-auto h-auto items-center justify-center">
        <Select
          value={status}
          onValueChange={(val) => handleChange(val as StatusType)}
          disabled={status==="DONE" || status==="DISCARD"}
        >
          <SelectTrigger className={`bg-white text-center stroke-1 ${setStyleStatus()}`}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
            <SelectItem value="DISCARD">Discard</SelectItem>
          </SelectContent>
        </Select>
        <div className="p-0.5 rounded-full bg-gradient-to-r from-accent-pink to-accent-violet flex items-center justify-center">
          <div className="pr-2 pl-2 bg-neutral-white rounded-full text-black text-center text-sm">
            {reportType
              ? reportType[0] + (reportType.slice(1).replace(/_/g, " ")).toLowerCase()
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;

async function updateReportStatus(
  reportId: string,
  newStatus: string,
  authToken?: string,
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const response = await fetch(`${backendUrl}/report/admin/reports/${reportId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify({ reportStatus: newStatus}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update report status.");
  }

  return data;
}
