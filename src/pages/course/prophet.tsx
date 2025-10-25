import { useEffect, useState } from "react";
import router from "next/router";
import { useSession } from "next-auth/react";

import ProphetCard from "@/components/account/ProphetCard";
import ProphetCourseCard from "@/components/course/Prophet/ProphetCourseCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";
import { useFetchProphetCourses } from "@/hooks/useFetchProphetCourses";

export default function CourseProphetPage() {
  const { data: session } = useSession();
  const prophetId = (session?.user as any)?.id;
  const { courses, loading, error } = useFetchProphetCourses(prophetId);

  const availabilityCalendar = {
    name: "Availability Calendar",
    imageUrl: "/images/prophet-feature/calendar.svg",
    goTo: "/account/prophet/availability",
  };
  const mySession = {
    name: "My Sessions",
    imageUrl: "/images/prophet-feature/discussion.svg",
    goTo: "/course/prophet/my-session",
  };

  return (
    <DefaultLayout contentClassName="flex flex-col justify-center items-center">
      <h1 className="font-sanctuary text-neutral-white text-center text-8xl">
        DooDoung
      </h1>

      <GlassContainer2>
        {/*My course section*/}
        <div className="flex w-full flex-col">
          <p className="font-chakra mb-6 w-full text-3xl text-white">
            My Courses
          </p>

          {/* Added 'flex' class here to activate the flexbox layout */}
          <div className="custom-scrollbar flex h-2/3 flex-col gap-6 overflow-y-scroll">
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
                  editability="VIEW"
                />
              ))
            )}
          </div>

          <GlobalButton
            variant={"primary"}
            size="default"
            className="mt-4 mr-13 self-end"
            onClick={() => {
              try {
                router.push("/course/prophet/my-courses");
              } catch (error) {
                console.error("Navigation error:", error);
              }
            }}
          >
            VIEW MY COURSES
          </GlobalButton>

          <div className="mt-4 flex gap-24">
            {/* my sessions */}
            <div className="flex w-1/2 flex-col">
              <p className="font-chakra mb-4 w-full text-3xl text-white">
                My Sessions
              </p>

              <ProphetCard feat={mySession} transaction={undefined} />
            </div>

            {/* Availability Calendar */}
            <div className="flex w-1/2 flex-col">
              <p className="font-chakra mb-4 w-full text-3xl text-white">
                Availability Calendar
              </p>

              <ProphetCard
                feat={availabilityCalendar}
                transaction={undefined}
              />
            </div>
          </div>
        </div>
      </GlassContainer2>
    </DefaultLayout>
  );
}
