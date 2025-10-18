import CourseImage from "./CourseImage";
import CourseInfo from "./CourseInfo";

interface CourseCardProps {
  courseImageSrc: string;
  courseImageAlt: string;
  title: string;
  method: string;
  duration: string;
  description: string;
  price: string;
  prophetName: string;
  prophetImageSrc: string;
}

export default function CourseCard({
  courseImageSrc,
  courseImageAlt,
  title,
  method,
  duration,
  description,
  price,
  prophetName,
  prophetImageSrc
}: CourseCardProps) {
  return (
    <div className="bg-neutral-white/90 backdrop-blur-sm rounded-3xl w-full max-w-4xl flex flex-col lg:flex-row items-start">
      <CourseImage src={courseImageSrc} alt={courseImageAlt} />
      <CourseInfo
        title={title}
        method={method}
        duration={duration}
        description={description}
        price={price}
        prophetName={prophetName}
        prophetImageSrc={prophetImageSrc}
      />
    </div>
  );
}
