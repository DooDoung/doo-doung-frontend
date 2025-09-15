import * as React from "react";

import { mockReview } from "@/constants/mock-account";

import ReviewSection from "./Review/ReviewSection";


function CustomerPublicInfo() {
  return (
    <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
      <ReviewSection myReview={mockReview} />
    </div>
  );
}

export default CustomerPublicInfo;