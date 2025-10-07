"use client";

import { useEffect, useMemo, useState } from "react";

import { DefaultLayout } from "@/components/globalComponents";
import CourseLeftPanel from "@/components/course/CourseLeftPanel";
import CourseRightPanel from "@/components/course/CourseRightPanel";
import { CourseItem } from "@/components/course/types";
import { mockCourseData } from "@/components/course/mockData";

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
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-white to-violet-100 p-4 md:p-10">
        <div className="mx-auto flex max-w-6xl gap-6">
          <CourseLeftPanel
            activeItem={activeItem}
            items={items}
            active={active}
            setActive={setActive}
          />
          <CourseRightPanel activeItem={activeItem} />
        </div>
      </main>
    </DefaultLayout>
  );
}
