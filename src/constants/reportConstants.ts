export interface Report {
  id: number;
  timestamp: string;
  user: string;
  title: string;
  content: string;
}

export const WARNING_THRESHOLD: number = 5;

export const mockReports: Report[] = [
  {
    id: 1,
    timestamp: "12:00 PM | 9 AUG 2025",
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 1 คำถาม",
    content: "ดูดวงกับคุณนี่เหมือนเล่นเกมเดาใจอะ บอกว่าปีนี้จะเหนื่อย แต่ก็มีโอกาสดี ๆ เข้ามา เอ้า ใครมันไม่เหนื่อยวะ? ใครมันไม่มีโอกาสเข้ามาบ้างล่ะพูดแบบนี้ผมก็เป็นหมอดูได้เหมือนกัน ขอดาวน์โหลดแอปสุ่มคำพูดก่อนนะครับ จะได้ทายแม่นพอ ๆ กัน",
  },
  {
    id: 2,
    timestamp: "13:00 PM | 10 AUG 2025",
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 2 คำถาม",
    content: "เสียตังค์มาฟังคำพูดมั่ว ๆ ที่ Google ก็ตอบได้ นี้เรียกว่าหมอดูหรือหมอ copy-paste?",
  },
  {
    id: 3,
    timestamp: "14:00 PM | 11 AUG 2025",
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 3 คำถาม",
    content: "โอ้โห ดวงที่ให้มาเป๊ะจริง ๆ เลยนะคะ เป๊ะจนจับฉลากก็ได้คำตอบแบบเดียวกัน!",
  },
  {
    id: 4,
    timestamp: "15:00 PM | 12 AUG 2025",
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 4 คำถาม",
    content: "รายงานเรื่องที่ 4...",
  },
  {
    id: 5,
    timestamp: "16:00 PM | 13 AUG 2025",
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 5 คำถาม",
    content: "รายงานเรื่องที่ 5...",
  },
  {
    id: 6,
    timestamp: "17:00 PM | 14 AUG 2025",
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 6 คำถาม",
    content: "รายงานเรื่องที่ 6... รายงานนี้ทำให้เกิน 5 แล้ว!",
  },
];