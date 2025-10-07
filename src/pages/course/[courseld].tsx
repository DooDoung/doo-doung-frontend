"use client";

import { useEffect, useMemo, useState } from "react";

import CourseLeftPanel from "@/components/course/CourseLeftPanel";
import CourseRightPanel from "@/components/course/CourseRightPanel";
import { mockCourseData } from "@/components/course/mockData";
import { CourseItem } from "@/components/course/types";
import { DefaultLayout } from "@/components/globalComponents";

export default function ProphetCoursePage() {
  const [items, setItems] = useState<CourseItem[] | null>(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Use mock data instead of fetching from API
  useEffect(() => {
    setItems(mockCourseData());
  }, []);

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

  return (
    <DefaultLayout>
      <div className="mx-auto flex h-[90vh] max-w-6xl gap-0">
        <CourseLeftPanel
          activeItem={activeItem}
          items={items}
          active={active}
          setActive={setActive}
        />
        <CourseRightPanel activeItem={activeItem} />
      </div>
    </DefaultLayout>
  );
}
