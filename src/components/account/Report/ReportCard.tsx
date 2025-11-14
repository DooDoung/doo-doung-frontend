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
    <div className="bg-neutral-white flex w-[90%] items-center gap-4 rounded-2xl shadow-md backdrop-blur-sm transition-shadow hover:shadow-lg">
      {/* Book/Card Image */}
      <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-2xl">
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
      <div className="flex-shrink-0 px-4">
        <span className="from-accent-pink to-accent-violet inline-flex rounded-full bg-gradient-to-r p-[2px]">
          <span className="bg-neutral-white text-neutral-black inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
            {issueType.replaceAll("_", " ")}
          </span>
        </span>
      </div>
    </div>
  );
}
