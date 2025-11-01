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
    // The <section> tag itself doesn't need flex properties for this layout
    <section className="my-8">
      <h2 className="mb-4 text-2xl font-semibold text-white uppercase">
        Available Courses
      </h2>

      {/* Added 'flex' class here to activate the flexbox layout */}
      <div className="mt-4 flex flex-col gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}

export default CourseSection;
