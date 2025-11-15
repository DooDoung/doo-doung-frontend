import { useEffect, useState } from "react";
import axios from "axios";

import CourseSection from "./Course/CourseSection";
import { useRouter } from "next/router";

import { AccountData } from "@/interface/User";

type Course = {
  id: number | string;
  imageUrl: string;
  score: number;
  courseName: string;
  prophetName: string;
  description: string;
  price: number;
  date: string;
  time: string;
};

function ProphetPublicInfo({ user }: { user: AccountData }) {
  const router = useRouter();
  const { "account-id": accountId } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCouses = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

        const response = await axios.get(
          `${backendUrl}/course/prophet/${accountId}`,
        );

        if (response.status !== 200) {
          throw new Error(`Failed to fetch account data: ${response.status}`);
        }

        const mappedCourses: Course[] = response.data.data.map(
          (course: any) => ({
            id: course.id,
            imageUrl: null,
            score: 0,
            courseName: course.courseName,
            prophetName: user.username,
            description: null,
            price: course.price,
            date: course.createAt,
            time: null,
          }),
        );
        setCourses(mappedCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchCouses();
  });

  return (
    <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
      <CourseSection courses={courses} />
    </div>
  );
}

export default ProphetPublicInfo;
