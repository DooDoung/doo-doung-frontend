import React from "react";

import CourseCard from "@/components/account/Course/CourseCard";

// Mock images mapped by horoscope sector (same as useFetchCourses)
const mockCourseImages: Record<string, string> = {
  love: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPGA1OrVL7SNCMOzNz4F6fjc-AgNASxraHg&s",
  work: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500",
  study:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  money:
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  luck: "https://images.unsplash.com/photo-1582744709859-2d89c6920cfb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  family: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
};

type Course = {
  id: number | string;
  imageUrl?: string;
  horoscopeSector?: string;
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
        {courses.map((course) => {
          const sector = (course.horoscopeSector || "work").toLowerCase();
          const imageUrl = mockCourseImages[sector] || mockCourseImages.work;

          return <CourseCard key={course.id} {...course} imageUrl={imageUrl} />;
        })}
      </div>
    </section>
  );
}

export default CourseSection;
