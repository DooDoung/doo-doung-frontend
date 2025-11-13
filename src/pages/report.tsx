import { useRouter } from "next/router";

import ReportCard, {
  ReportCardProps,
} from "@/components/account/Report/ReportCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";

// Mock report data
const mockReports: ReportCardProps[] = [
  {
    id: "1",
    imageUrl: "/images/course.svg",
    title: "แจ้งขอปัญหาจากหมอดู",
    description:
      "หมอดู ไม่ตรงเวลานัดหมาย ทำให้เสียเวลารอคอยนาน ไม่มีการชดเชยในสิ่งที่เกิดขึ้นหรือปรับปรุงการบริการเลยค่ะ อยากให้มีการดูแลเรื่องนี้มากขึ้น",
    issueType: "Prophet Issue",
  },
  {
    id: "2",
    imageUrl: "/images/course.svg",
    title: "กดชำระให้จ่ายเงินแล้ว แต่ไม่เห็นประวัติการจอง",
    description:
      "ทดสอบ Chatgpt งานทำมาขายในอนาคตที่พี่กำหนดไว้จาก 5 ขั้นข้อ ในประวัติการจองมีแจ้งแค่โบนัสพิเศษเท่านั้น ไม่มีรายละเอียดเกี่ยวกับขั้นตอนการเงิน😭😭",
    issueType: "Website Issue",
  },
  {
    id: "3",
    imageUrl: "/images/course.svg",
    title: "กดชำระให้จ่ายเงินแล้ว แต่ไม่เห็นประวัติการจอง",
    description:
      "ทดสอบ Chatgpt งานทำมาขายในอนาคตที่พี่กำหนดไว้จาก 5 ขั้นข้อ ในประวัติการจองมีแจ้งแค่โบนัสพิเศษเท่านั้น ไม่มีรายละเอียดเกี่ยวกับขั้นตอนการเงิน😭😭",
    issueType: "Website Issue",
  },
];

export default function ReportPage() {
  const router = useRouter();

  const handleCreateNewReport = () => {
    // Navigate to create report page
    router.push("/report/create");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DefaultLayout>
      <div className="flex h-screen w-full items-center justify-center">
        <GlassContainer2>
          <div className="flex w-full flex-col items-center p-6 sm:p-8">
            {/* Header */}
            <div className="font-sanctuary mb-8 text-4xl font-light text-white">
              My Report
            </div>

            {/* Report List */}
            <div className="custom-scrollbar mb-8 flex h-[60vh] w-[90%] flex-col items-center justify-center space-y-4 overflow-y-scroll pt-4">
              {mockReports.map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
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
