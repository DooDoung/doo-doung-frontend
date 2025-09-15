import type { Report } from "@/constants/reportConstants";

type ReportItemProps = {
  report: Report;
};

const ReportItem = ({ report }: ReportItemProps) => {
  const timestamp = new Date(report.createdAt);

  const timeString = timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = timestamp
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <div className="border-cream rounded-[10px] border-2 bg-white p-4 shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)]">
      <div className="mb-2 flex items-center text-xs text-gray-600">
        <span className="mr-4">{timeString}</span>
        <span>{dateString}</span>
      </div>

      <div className="mb-3 flex flex-wrap items-center">
        <div className="bg-primary-250 mr-3 h-8 w-8 flex-shrink-0 rounded-full"></div>
        <div>
          <span className="font-chakra text-neutral-black text-sm font-bold">
            {report.customer}
          </span>
          <span className="font-chakra ml-2 text-sm text-gray-500">
            - {report.topic}
          </span>
        </div>
      </div>

      <div className="border-primary bg-primary-250 rounded-sm border p-3">
        <p className="font-chakra text-sm text-gray-800">
          {report.description}
        </p>
      </div>
    </div>
  );
};

export default ReportItem;
