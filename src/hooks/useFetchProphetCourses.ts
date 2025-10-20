import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Mock images mapped by horoscope sector
const courseImagesBySector: Record<string, string> = {
  love: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPGA1OrVL7SNCMOzNz4F6fjc-AgNASxraHg&s",
  work: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500",
  study:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  money:
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  luck: "https://images.unsplash.com/photo-1582744709859-2d89c6920cfb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  family: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
};

export interface ProphetCourse {
  id: string;
  courseName: string;
  prophetName: string;
  prophetLastname: string;
  isPublic: boolean;
  price: number;
  rating: number;
  horoscopeSector: string;
  durationMin: number;
  horoscopeMethodId: number;
  methodSlug: string;
  methodName: string;
  createdAt: string;
  isActive: boolean;
  imageUrl: string;
  score: number;
  status: "OPEN" | "CLOSE";
}

interface UseFetchProphetCoursesReturn {
  courses: ProphetCourse[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetchProphetCourses = (
  accountId?: string,
): UseFetchProphetCoursesReturn => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<ProphetCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = (session?.user as any)?.accessToken;

  const fetchCourses = async () => {
    try {
      if (!accountId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const config = accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : {};

      const response = await axios.get(
        `${backendUrl}/courses/prophet/${accountId}`,
        config,
      );

      // Handle response data
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      // Transform data with images
      const transformedCourses: ProphetCourse[] = data.map((course: any) => {
        const sector = (course.horoscopeSector || "work").toLowerCase();
        const imageUrl =
          courseImagesBySector[sector] || courseImagesBySector.work;

        return {
          ...course,
          imageUrl,
          score: course.rating || 4,
          status: course.isActive ? "OPEN" : "CLOSE",
        };
      });

      setCourses(transformedCourses);
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

  useEffect(() => {
    fetchCourses();
  }, [accountId, accessToken]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
};
