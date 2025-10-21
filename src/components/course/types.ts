export type Review = {
  id: string;
  profileName: string;
  profileBadge: string;
  rating: number; // 1–5
  title: string;
  content: string;
  dateISO: string;
};

export type CourseItem = {
  id: string;
  courseName: string;
  prophetName: string;
  prophetMethod: string;
  horoscopeSector: string;
  name: string;
  lastname: string;
  durationMin: number;
  description: string;
  price: number;
  prophetProfileUrl: string; // mock Prophet Profile URL
  courseProfileUrl: string; // mock Course Profile URL
  reviews: Review[];
};
