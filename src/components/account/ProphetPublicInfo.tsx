import * as React from "react";

import { mockCourse } from "@/constants/mock-account";

import CourseSection from "./Course/CourseSection";


function ProphetPublicInfo() {
  return (
    <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
      <CourseSection courses={mockCourse} />
    </div>
  );
}

export default ProphetPublicInfo;