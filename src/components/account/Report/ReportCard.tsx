import Image from "next/image";

export type ReportCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  issueType: string;
};

export default function ReportCard({
  imageUrl,
  title,
  description,
  issueType,
}: ReportCardProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-neutral-white backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow w-[90%]"
    >
      {/* Book/Card Image */}
      <div className="relative h-32 w-48 flex-shrink-0 rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pl-2">
        <h3 className="font-chakra text-base font-semibold text-neutral-black mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="font-chakra text-sm text-neutral-black line-clamp-2">
          {description}
        </p>
      </div>

      {/* Issue Type Badge */}
      <div className="flex-shrink-0 px-4">
        <span className="inline-flex rounded-full bg-gradient-to-r from-accent-pink to-accent-violet p-[2px]">
            <span className="inline-flex items-center rounded-full bg-neutral-white px-3 py-1 text-xs font-medium text-neutral-black">
                {issueType}
            </span>
        </span>
      </div>
    </div>
  );
}
