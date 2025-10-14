import router from "next/router";

import ProphetCard from "@/components/account/ProphetCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";
import ProphetCourseCard from "@/components/course/Prophet/ProphetCourseCard";

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
          <div className="custom-scrollbar flex h-1/2 flex-col gap-6 overflow-y-scroll">
            {/* <custom-scrollbar /> */}
            {courses.map((course) => (
              <ProphetCourseCard
                key={course.id}
                editability={"VIEW"}
                {...course}
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

const mockCourse: {
  id: string;
  imageUrl: string;
  score: number;
  status: "OPEN" | "CLOSE";
  courseName: string;
  prophetName: string;
  price: number;
}[] = [
  {
    id: "course-01",
    imageUrl: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500",
    score: 5,
    status: "OPEN",
    courseName: "Tarot Reading for Beginners",
    prophetName: "Prophet Jane",
    price: 500,
  },
  {
    id: "course-02",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
    score: 4,
    status: "OPEN",
    courseName: "Advanced Astrology",
    prophetName: "Prophet John",
    price: 750,
  },
  {
    id: "course-03",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500",
    score: 5,
    status: "CLOSE",
    courseName: "Numerology Insights",
    prophetName: "Prophet Alice",
    price: 6000,
  },
  {
    id: "course-04",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    score: 3,
    status: "OPEN",
    courseName: "Palm Reading Basics",
    prophetName: "Prophet Bob",
    price: 400,
  },
  {
    id: "course-05",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500",
    score: 4,
    status: "CLOSE",
    courseName: "Dream Interpretation",
    prophetName: "Prophet Eve",
    price: 550,
  },
];
