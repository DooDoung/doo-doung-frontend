import { useEffect, useState } from "react";
import axios from "axios";
import {
  CourseAPI,
  CourseItem,
  CourseFilterParams,
  PaginationInfo,
} from "@/types/course";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

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

// Transform API response to frontend format
const transformCourseData = (
  apiCourse: CourseAPI,
  index: number,
): CourseItem => {
  const prophetName = `${apiCourse.name} ${apiCourse.lastname}`;
  const sector = (apiCourse.horoscopeSector || "work").toLowerCase();

  return {
    id: apiCourse.id,
    prophetId: apiCourse.prophetId,
    courseName: apiCourse.courseName,
    horoscopeSector: apiCourse.horoscopeSector,
    durationMin: apiCourse.durationMin,
    price: apiCourse.price,
    isActive: apiCourse.isActive,
    prophetName: apiCourse.name,
    prophetFullname: prophetName,
    lineId: apiCourse.lineId,
    imageUrl: mockCourseImages[sector] || mockCourseImages.work,
    score: Math.floor(Math.random() * 2) + 4, // Random score between 4-5
    description: `${apiCourse.courseName} course by ${prophetName}. Duration: ${apiCourse.durationMin} minutes.`,
    date: "Next class: Coming soon",
    time: "14:00",
  };
};

interface UseFetchCoursesReturn {
  courses: CourseItem[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  refetch: (params?: CourseFilterParams) => Promise<void>;
}

export const useFetchCourses = (
  initialParams?: CourseFilterParams,
): UseFetchCoursesReturn => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const fetchCourses = async (params: CourseFilterParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Build query string
      const queryParams = new URLSearchParams();

      if (params.horoscope_sector) {
        queryParams.append("horoscope_sector", params.horoscope_sector);
      }
      if (params.price_min !== undefined) {
        queryParams.append("price_min", params.price_min.toString());
      }
      if (params.price_max !== undefined) {
        queryParams.append("price_max", params.price_max.toString());
      }
      if (params.limit !== undefined) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params.offset !== undefined) {
        queryParams.append("offset", params.offset.toString());
      }
      if (params.sort_by) {
        queryParams.append("sort_by", params.sort_by);
      }
      if (params.search) {
        queryParams.append("search", params.search);
      }

      const url = `${backendUrl}/course${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

      const response = await axios.get(url);

      // Handle response structure from backend
      const data = response.data.data || response.data;

      // Transform data
      const transformedCourses = (Array.isArray(data) ? data : []).map(
        (course, index) => transformCourseData(course, index),
      );

      setCourses(transformedCourses);

      // Set pagination if available
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to fetch courses";
      setError(errorMessage);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCourses(initialParams);
  }, [initialParams]);

  return {
    courses,
    loading,
    error,
    pagination,
    refetch: fetchCourses,
  };
};
