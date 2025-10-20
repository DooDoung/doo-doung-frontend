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

export default function CourseProphetPage() {
  const { data: session } = useSession();
  const accountId = session?.user?.id;
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course?prophetId=${accountId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies for authentication
          }
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch courses (${res.status})`);
        }
        const result = await res.json();
        setCourses(result.data ?? []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [accountId]);

  const availabilityCalendar = {
    imageUrl: "/images/prophet-feature/calendar.svg",
    goTo: "/account/prophet/availability",
  };
  const mySession = {
    imageUrl: "/images/prophet-feature/discussion.svg",
    goTo: "/course/prophet/my-session",
  };

  const getRandomImage = (idx : number) =>
    mockCourseProfile[idx % mockCourseProfile.length].imageUrl;
  const getRandomScore = (idx : number) => {
    const scores = [5, 5, 4, 5, 3, 4, 5, 2, 4];
    return scores[idx % scores.length];
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
          <div className="custom-scrollbar flex h-1/2 flex-col gap-6 overflow-y-scroll">
            {/* <custom-scrollbar /> */}
            {courses.map((course, idx) => (
              <ProphetCourseCard
                key={course.id}
                id={course.id}
                imageUrl={getRandomImage(idx)}
                score={getRandomScore(idx)}
                status={course.isActive ? "OPEN" : "CLOSE"}
                courseName={course.courseName}
                prophetName={`${course.name} ${course.lastname}`}
                price={`${course.price} `}
                editability={"VIEW"}
              />
            ))}
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

const mockCourseProfile: {
  imageUrl: string;
}[] = [
  { imageUrl: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500",},
  { imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",},
  { imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500",},
  { imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",},
  { imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500",},
];
