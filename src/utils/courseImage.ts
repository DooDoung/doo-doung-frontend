import { CourseItem } from "@/components/course/types";

// Mock images mapped by horoscope sector
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

/**
 * Get course image based on horoscope sector
 * @param item - Course item or null
 * @returns Image URL for the course based on its horoscope sector
 */
export function getCourseImage(item: CourseItem | null): string {
  if (!item) return mockCourseImages.work;
  const sector = (item.horoscopeSector || "work").toLowerCase();
  return mockCourseImages[sector] || mockCourseImages.work;
}
