import Image from "next/image";

export type ReportCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  reportStatus: string;
  issueType: string;
};

export default function ReportCard({
  imageUrl,
  title,
  description,
  reportStatus,
  issueType,
}: ReportCardProps) {

  const setStyleStatus = () => {
    switch(reportStatus){
      case "PENDING": 
        return "shadow-[0_0_6px_rgba(245,158,11,0.7)] border-2 border-warning text-warning";
      case "DONE":
        return "shadow-[0_0_6px_rgba(34,197,94,0.7)] border-2 border-success text-success";
      case "DISCARD":
        return "shadow-[0_0_6px_rgba(239,68,68,0.7)] border-2 border-error text-error";
      default:
        return "shadow-[0_0_6px_rgba(0,0,0,0.7)] border-2 border-neutral-black";
    }
  };

  return (
    <div className="bg-neutral-white flex w-[90%] items-center gap-4 rounded-2xl shadow-md backdrop-blur-sm transition-shadow hover:shadow-lg">
      {/* Book/Card Image */}
      <div className="relative h-32 w-48 shrink-0 overflow-hidden rounded-2xl">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pl-2">
        <h3 className="font-chakra text-neutral-black mb-1 line-clamp-1 text-base font-semibold">
          {title}
        </h3>
        <p className="font-chakra text-neutral-black line-clamp-2 text-sm">
          {description}
        </p>
      </div>

      {/* Issue Type Badge */}
      <div className="shrink-0 flex flex-col px-4 gap-4">
        <span className={`bg-white text-center stroke-1 rounded-full text-base ${setStyleStatus()}`}>
          {reportStatus}
        </span>
        <span className="from-accent-pink to-accent-violet inline-flex rounded-full bg-linear-to-r p-0.5">
          <span className="bg-neutral-white text-neutral-black inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
            {issueType.replaceAll("_", " ")}
          </span>
        </span>
      </div>
    </div>
  );
}
