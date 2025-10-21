import { CourseItem } from "./types";

export const mockCourseData = (): CourseItem[] => {
  // Mock image URLs (replace with your own later)
  const prophetImgs = [
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=640",
    "https://images.unsplash.com/photo-1541534401786-2077eed87a62?q=80&w=640",
    "https://images.unsplash.com/photo-1545996124-0501ebae84d0?q=80&w=640",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=640",
  ];

  const courseImgs = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=960",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=960",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=960",
    "https://images.unsplash.com/photo-1517817748491-59b0f54d0a3b?q=80&w=960",
    "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=960",
  ];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: `course-${i + 1}`,
    title:
      i === 0 ? "คอร์สดูดวงความรัก 3 คำถาม" : `คอร์สดูดวงหัวข้อพิเศษ #${i + 1}`,
    prophetName: ["AOMYAKDOO", "ORION", "MIRA", "JUNO", "LYRA"][i],
    prophetMethod: i === 0 ? "Current method" : "Tarot & Oracle",
    durationMin: i === 0 ? 30 : 45,
    description:
      i === 0
        ? "Current course description description"
        : "Personalized reading session with follow-up summary.",
    price: [1750, 1290, 1490, 990, 1890][i],
    prophetProfileUrl: prophetImgs[i], // mock Prophet Profile URL
    courseProfileUrl: courseImgs[i], // mock Course Profile URL
    reviews: [
      {
        id: `r-${i}-1`,
        profileName: "AOMYAKDOOODOUNG",
        profileBadge: "Profile",
        rating: 5,
        title: "คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมอออม",
        content:
          "แม่นเว่อออ ยุบแม่มาก ๆ ค่ะ อย่างกับเห็นอนาคต แม่หมอบอกว่าลุยทยอยคุยเรื่องสำคัญ 2 วันถัดมา จับได้ว่าเป็นอย่างที่ว่าเลย",
        dateISO: "2025-08-26T09:30:00.000Z",
      },
      {
        id: `r-${i}-2`,
        profileName: "KANYA",
        profileBadge: "Profile",
        rating: 5,
        title: "ละเอียดและใจดี",
        content:
          "ตอบละเอียด ให้แนวทางที่ทำได้จริงค่ะ ประทับใจมาก ๆ จะกลับมาอีกแน่นอน",
        dateISO: "2025-07-12T18:00:00.000Z",
      },
    ],
  }));
};
