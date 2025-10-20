// Backend API Response Types
export interface CourseAPI {
  id: string;
  prophetId: string;
  courseName: string;
  horoscopeSector: string;
  durationMin: number;
  price: number;
  isActive: boolean;
  name: string;
  lastname: string;
  lineId: string;
}

// Frontend Display Types
export interface CourseItem {
  id: string;
  prophetId: string;
  courseName: string;
  horoscopeSector: string;
  durationMin: number;
  price: number;
  isActive: boolean;
  prophetName: string;
  prophetFullname: string;
  lineId: string;
  imageUrl: string;
  score: number;
  description: string;
  date: string;
  time: string;
}

// Filter Query Parameters
export interface CourseFilterParams {
  horoscope_sector?: string;
  price_min?: number;
  price_max?: number;
  limit?: number;
  offset?: number;
  sort_by?: string;
  search?: string; // For searching course name or prophet name
}

// Pagination Info
export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// API Response Wrapper
export interface CoursesApiResponse {
  data: CourseAPI[];
  pagination?: PaginationInfo;
  message?: string;
}
