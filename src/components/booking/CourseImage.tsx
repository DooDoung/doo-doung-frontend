import Image from "next/image";

interface CourseImageProps {
  src: string;
  alt: string;
}

export default function CourseImage({ src, alt }: CourseImageProps) {
  return (
    <div className="w-full sm:w-64 h-48 sm:h-full rounded-lg shadow-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        width={64}
        height={96}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
