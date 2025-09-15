import React from "react";
import CourseCard from "@/components/account/Course/CourseCard";

type Course = {
  id: number | string;
  imageUrl: string;
  score: number;
  courseName: string;
  prophetName: string;
  description: string;
  price: number;
  date: string;
  time: string;
};

function CourseSection({ courses }: { courses: Course[] }) {
  return (
    <section className="flex-col my-8">
      <h2 className="mb-4 text-2xl font-semibold text-white uppercase">
        Available Courses
      </h2>
      <div className="mt-4 flex-col gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}

export default CourseSection;