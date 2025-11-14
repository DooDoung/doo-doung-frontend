"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import CourseLeftPanel from "@/components/course/CourseLeftPanel";
import CourseRightPanel from "@/components/course/CourseRightPanel";
import { mockCourseData } from "@/components/course/mockData";
import { CourseItem } from "@/components/course/types";
import { DefaultLayout } from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function ProphetCoursePage() {
  const pathname = usePathname() || "";
  const courseId = pathname.split("/").pop();
  const { data: session } = useSession();

  const [items, setItems] = useState<CourseItem[] | null>(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${backendUrl}/course/${courseId}`);
        const courseData = response.data.data || response.data;

        // Transform API data to match CourseItem structure
        const transformedData: CourseItem[] = [courseData];
        setItems(transformedData);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch course data";
        setError(errorMessage);
        AppToast.error(errorMessage);
        // Fallback to mock data if API fails
        setItems(mockCourseData());
      } finally {
        setLoading(false);
      }
    };

    if (courseId && courseId !== "[courseld]") {
      fetchCourseData();
    }
  }, [courseId]);

  const activeItem = useMemo(
    () =>
      items && items.length ? items[Math.min(active, items.length - 1)] : null,
    [items, active],
  );

  if (error) {
    return (
      <DefaultLayout>
        <main className="min-h-screen bg-gradient-to-b from-rose-100 via-white to-violet-50 p-6 md:p-10">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </main>
      </DefaultLayout>
    );
  }

  if (loading || !items) {
    return (
      <DefaultLayout>
        <main className="min-h-screen bg-gradient-to-b from-rose-100 via-white to-violet-50 p-6 md:p-10">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-gray-600">Loading course data...</p>
          </div>
        </main>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <h1 className="font-sanctuary my-4 text-center text-6xl font-bold text-white">
        DooDoung
      </h1>
      <div className="mx-auto flex max-w-6xl gap-0">
        <CourseLeftPanel
          activeItem={activeItem}
          items={items}
          active={active}
          setActive={setActive}
        />
        <CourseRightPanel
          activeItem={activeItem}
          reviews={activeItem?.reviews || []}
        />
      </div>
    </DefaultLayout>
  );
}
