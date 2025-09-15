export interface Report {
  id: number;
  timestamp: Date;
  user: string;
  title: string;
  content: string;
}


export const WARNING_THRESHOLD: number = 5;

export const mockReports: Report[] = [
  {
    id: 1,
    timestamp: new Date('2025-08-09T12:00:00'),
    user: "AOMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 1 คำถาม",
    content: "ดูดวงกับคุณนี่เหมือนเล่นเกมเดาใจอะ บอกว่าปีนี้จะเหนื่อย แต่ก็มีโอกาสดี ๆ เข้ามา เอ้า ใครมันไม่เหนื่อยวะ? ใครมันไม่มีโอกาสเข้ามาบ้างล่ะพูดแบบนี้ผมก็เป็นหมอดูได้เหมือนกัน ขอดาวน์โหลดแอปสุ่มคำพูดก่อนนะครับ จะได้ทายแม่นพอ ๆ กัน",
  },
  {
    id: 2,
    timestamp: new Date('2025-08-10T13:00:00'),
    user: "BEAMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 2 คำถาม",
    content: "เสียตังค์มาฟังคำพูดมั่ว ๆ ที่ Google ก็ตอบได้ นี้เรียกว่าหมอดูหรือหมอ copy-paste?",
  },
  {
    id: 3,
    timestamp: new Date('2025-08-11T14:00:00'),
    user: "NEENYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 3 คำถาม",
    content: "โอ้โห ดวงที่ให้มาเป๊ะจริง ๆ เลยนะคะ เป๊ะจนจับฉลากก็ได้คำตอบแบบเดียวกัน!",
  },
  {
    id: 4,
    timestamp: new Date('2025-08-12T15:00:00'),
    user: "CHINCHINYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 4 คำถาม",
    content: "รายงานเรื่องที่ 4...",
  },
  {
    id: 5,
    timestamp: new Date('2025-08-13T16:00:00'),
    user: "PRIMYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 5 คำถาม",
    content: "รายงานเรื่องที่ 5...",
  },
  {
    id: 6,
    timestamp: new Date('2025-08-14T17:00:00'),
    user: "FLOOKYAKDOODOUNG",
    title: "คอร์สดูดวงดาวการเรียน 6 คำถาม",
    content: "รายงานเรื่องที่ 6... รายงานนี้ทำให้เกิน 5 แล้ว!",
  },
];