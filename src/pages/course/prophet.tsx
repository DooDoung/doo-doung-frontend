import router from "next/router";

import CourseCard from "@/components/account/Course/CourseCard";
import ProphetCard from "@/components/account/ProphetCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";
import { mockCourse } from "@/constants/mock-account";

export default function CourseProphetPage() {
  const courses = mockCourse;
  const availabilityCalendar = {
    imageUrl: "/images/prophet-feature/calendar.svg",
    goTo: "/account/prophet/availability",
  };
  const mySession = {
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
          <div className="flex h-1/2 flex-col gap-6 overflow-y-scroll">
            {/* <custom-scrollbar /> */}
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <GlobalButton
            variant={"primary"}
            size="default"
            className="mt-4 self-end"
            onClick={() => {
              router.push("/prophet/my-course");
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

              <ProphetCard feat={mySession} transaction={null} />
            </div>

            {/* Availability Calendar */}
            <div className="flex w-1/2 flex-col">
              <p className="font-chakra mb-4 w-full text-3xl text-white">
                Availability Calendar
              </p>

              <ProphetCard feat={availabilityCalendar} transaction={null} />
            </div>
          </div>
        </div>
      </GlassContainer2>
    </DefaultLayout>
  );
}
