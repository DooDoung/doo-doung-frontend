import type { Report } from '@/constants/reportConstants';

type ReportItemProps = {
  report: Report;
};

const ReportItem = ({ report }: ReportItemProps) => {

  const timeString = report.timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const dateString = report.timestamp.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();

  return (
    <div className="rounded-[10px] border-2 border-cream bg-white p-4 shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)]">
      
      <div className="flex items-center text-xs text-gray-600 mb-2">
        <span className="mr-4">{timeString}</span>
        <span>{dateString}</span>
      </div>

      <div className="flex items-center flex-wrap mb-3">
        <div className="w-8 h-8 rounded-full bg-primary-250 mr-3 flex-shrink-0"></div>
        <div>
          <span className="font-chakra text-sm font-bold text-neutral-black">{report.user}</span>
          <span className="font-chakra text-sm text-gray-500 ml-2">- {report.title}</span>
        </div>
      </div>

      <div className="rounded-sm border border-primary bg-primary-250 p-3">
        <p className="font-chakra text-sm text-gray-800">{report.content}</p>
      </div>
    </div>
  );
};

export default ReportItem;