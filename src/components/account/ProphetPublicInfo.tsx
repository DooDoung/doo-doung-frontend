import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { AppToast } from "@/lib/app-toast";

import CourseSection from "./Course/CourseSection";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

interface ProphetPublicInfoProps {
  prophetId: string;
}

function ProphetPublicInfo({ prophetId }: ProphetPublicInfoProps) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendUrl}/course/prophet/${prophetId}`,
        );
        setCourses(response.data.data || response.data);
      } catch (error: any) {
        AppToast.error(`Error fetching courses: ${error.message}`);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (prophetId) {
      fetchCourses();
    }
  }, [prophetId]);

  if (loading) {
    return (
      <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
      <CourseSection courses={courses} />
    </div>
  );
}

export default ProphetPublicInfo;
