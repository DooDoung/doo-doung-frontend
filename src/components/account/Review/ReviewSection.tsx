import React from "react";

import ReviewCard from "@/components/account/Review/ReviewCard";

function ReviewSection({ myReview }: { myReview: Review[] }) {
  return (
    <section className="my-8">
      <h2 className="mb-2 text-lg font-light text-white uppercase">
        My Reviews
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {myReview.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
