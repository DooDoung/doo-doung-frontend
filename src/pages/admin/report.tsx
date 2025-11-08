import { DefaultLayout, GlassContainer2, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/globalComponents";
import ReportCard from "@/components/report/reportCard";
import { useState } from "react";

export default function AdminReportPage() {
  const [reportType, setReportType] = useState("all");

  // Event handlers
  const handleChange = (val : any) => {
    setReportType(val);
  };

  return (
    <DefaultLayout className="flex flex-col items-center">
      <p className="mt-10 font-sanctuary text-7xl text-neutral-white text-center">Report</p>
      
      <GlassContainer2>
        <div className="w-full h-full flex flex-col items-center">
          <Select
            value={reportType}
            onValueChange={(val) => handleChange(val)}
          >
            <SelectTrigger className="w-1/2 bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="discard">Discard</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          {/* report card session */}
          <div className="mt-10 w-full overflow-y-scroll custom-scrollbar">
            <ReportCard
              id="mock-review1"
            //   imageUrl,
              customerProfile=""
              customerName="aomyakdoodoung"
              reportStatus="Pending"
              reportType="Website issue"
              topic="แม่หมอตลกเกินไป"
              description="สวัสดีค่ะ ได้ทำการจองคอร์สดูดวง 199 คำถาม ของแม่หมอซักคนที่ไม่ใช่บีมไป แล้วได้ทำการนัดแม่หมอไว้ตอนเจ็ดโมงสี่สิบห้าของวันนี้ แต่แม่หมอไม่ตื่นมาดูดวงให้ แล้วมาบอกว่าดูดวงให้ในฝันไปแล้ววว งงมากก ได้หรอแอดมิน"
              createdDate="9 AUG 2025"
              createdTime="12:00 PM"
            />
          </div>
        </div>
      </GlassContainer2>
    </DefaultLayout>
  );
}
