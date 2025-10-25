import { useEffect, useState } from "react";
import router from "next/router";
import { useSession } from "next-auth/react";

import ProphetCourseCard from "@/components/course/Prophet/ProphetCourseCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";
import { useFetchProphetCourses } from "@/hooks/useFetchProphetCourses";

export default function MyCoursesPage() {
  const { data: session } = useSession();
  const prophetId = (session?.user as any)?.id;
  const { courses, loading, error } = useFetchProphetCourses(prophetId);

  return (
    <DefaultLayout contentClassName="relative flex flex-col justify-center items-center">
      <h1 className="font-sanctuary text-neutral-white text-center text-8xl">
        DooDoung
      </h1>

      <GlobalButton
        variant="secondary"
        size="lg"
        className="absolute top-16 left-17 w-36"
        onClick={() => router.back()}
      >
        BACK
      </GlobalButton>

      <GlassContainer2>
        {/*My course section*/}
        <div className="flex w-full flex-col">
          <p className="font-chakra mb-6 w-full text-3xl text-white">
            My Courses
          </p>

          {/* Added 'flex' class here to activate the flexbox layout */}
          <div className="custom-scrollbar flex h-full flex-col gap-10 overflow-y-scroll">
            {loading ? (
              <p className="text-white">Loading courses...</p>
            ) : error ? (
              <p className="text-red-400">Error: {error}</p>
            ) : courses.length === 0 ? (
              <p className="text-white">No courses yet</p>
            ) : (
              courses.map((course) => (
                <ProphetCourseCard
                  key={course.id}
                  id={course.id}
                  imageUrl={course.imageUrl}
                  score={course.score}
                  status={course.status}
                  courseName={course.courseName}
                  prophetName={course.prophetName}
                  price={course.price}
                  editability="EDIT"
                />
              ))
            )}
          </div>
        </div>
      </GlassContainer2>
    </DefaultLayout>
  );
}
