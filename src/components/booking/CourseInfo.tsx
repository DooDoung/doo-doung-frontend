import CourseDetail from "./CourseDetail";
import ProphetProfile from "./ProphetProfile";

interface CourseInfoProps {
  title: string;
  method: string;
  duration: string;
  description: string;
  price: string;
  prophetName: string;
  prophetImageSrc: string;
  prophetLineId?: string;
}

export default function CourseInfo({
  title,
  method,
  duration,
  description,
  price,
  prophetName,
  prophetImageSrc,
  prophetLineId
}: CourseInfoProps) {
  return (
    <div className="flex-1 space-y-4 min-w-0 h-full bg-neutral-white/90 p-4 sm:p-6 rounded-2xl">
      <div className="ml-2 sm:ml-4 mt-2 mb-4">
        <p className="text-neutral-black font-chakra text-lg sm:text-xl lg:text-2xl break-words">
          {title}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row pl-2 sm:pl-4 justify-between">
        <div className="space-y-3 flex-1">
          <CourseDetail label="Prophet method" value={method} />
          <CourseDetail label="Duration (min)" value={duration} />
          <CourseDetail label="Description" value={description} />
          <CourseDetail label="Prices (Baht)" value={price} />
          {prophetLineId && <CourseDetail label="Prophet Line ID" value={prophetLineId} />}
        </div>
        <ProphetProfile imageSrc={prophetImageSrc} name={prophetName} />
      </div>
    </div>
  );
}
