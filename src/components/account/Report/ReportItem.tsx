import type { Report } from '@/constants/reportConstants';

type ReportItemProps = {
  report: Report;
};

const ReportItem = ({ report }: ReportItemProps) => (
  <div className="rounded-[10px] border-2 border-[#ECE1DA] bg-white p-4 shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)]">
    
    <div className="flex items-center text-xs text-gray-600 mb-2">
      <span className="mr-4">{report.timestamp.split(' | ')[0]}</span>
      <span>{report.timestamp.split(' | ')[1]}</span>
    </div>

    <div className="flex items-center flex-wrap mb-3">
      
      <div className="w-8 h-8 rounded-full bg-[#F8E1E9] mr-3 flex-shrink-0">
      </div>

      <div>
        <span className="font-chakra text-sm font-bold text-[#4B2F39]">{report.user}</span>
        <span className="font-chakra text-sm text-gray-500 ml-2">- {report.title}</span>
      </div>
    </div>

    <div className="rounded-[10px] border border-[#DC7CA0] bg-[#FFEAEA] p-3">
      <p className="font-chakra text-sm text-gray-800">{report.content}</p>
    </div>

  </div>
);

export default ReportItem;