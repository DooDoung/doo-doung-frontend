import ProphetCourseCard from "@/components/course/Prophet/ProphetCourseCard";
import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";
import router from "next/router";

export default function MyCoursesPage() {
  const courses = mockCourse;

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
            {/* <custom-scrollbar /> */}
            {courses.map((course) => (
              <ProphetCourseCard
                key={course.id}
                editability={"EDIT"}
                {...course}
              />
            ))}
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
