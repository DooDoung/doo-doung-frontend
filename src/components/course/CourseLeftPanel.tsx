import Image from "next/image";

import { GlobalInput } from "../globalComponents";

import { CourseItem } from "./types";

// Mock images mapped by horoscope sector (same as useFetchCourses)
const mockCourseImages: Record<string, string> = {
  love: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPGA1OrVL7SNCMOzNz4F6fjc-AgNASxraHg&s",
  work: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500",
  study:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  money:
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  luck: "https://images.unsplash.com/photo-1582744709859-2d89c6920cfb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  family: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
};

interface CourseLeftPanelProps {
  activeItem: CourseItem | null;
  items: CourseItem[] | null;
  active: number;
  setActive: (index: number) => void;
}

export default function CourseLeftPanel({
  activeItem,
  items,
  active,
  setActive,
}: CourseLeftPanelProps) {
  // Get course image based on horoscope sector
  const getCourseImage = (item: CourseItem | null) => {
    if (!item) return mockCourseImages.work;
    const sector = (item.horoscopeSector || "work").toLowerCase();
    return mockCourseImages[sector] || mockCourseImages.work;
  };

  return (
    <aside className="bg-neutral-black/60 flex w-2/5 flex-col items-center justify-start space-y-2 rounded-4xl p-12 text-center">
      <div className="relative mb-6 h-[150px] w-[150px] flex-shrink-0 rounded-full border-2 bg-white">
        {activeItem && (
          <Image
            src={activeItem.prophetProfileUrl}
            alt="Prophet Profile"
            width={500}
            height={500}
            className="h-full w-full rounded-full object-cover p-1"
          />
        )}
      </div>

      <div className="flex w-8/10 flex-col items-start">
        <p className="font-chakra mb-4 text-start text-xl text-white">
          PROPHET
        </p>
        <GlobalInput
          type="text"
          size="lg"
          className="mb-3 w-[150%] cursor-not-allowed"
          value={activeItem?.name ?? "Loading..."}
          readOnly
        />
      </div>

      <div className="w-full rounded-2xl bg-white/90 p-4">
        <div className="flex aspect-[1.3/1] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100">
          {activeItem && (
            <Image
              src={activeItem.courseProfileUrl || "/images/course.svg"}
              alt="Course Profile"
              width={600}
              height={460}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </aside>
  );
}
