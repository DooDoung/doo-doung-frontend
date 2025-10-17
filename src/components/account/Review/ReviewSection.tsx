import React from "react";

import ReviewCard from "@/components/account/Review/ReviewCard";
import { AccountData } from "@/interface/User";

function ReviewSection({
  reviews,
  account,
}: {
  reviews: Review[];
  account: AccountData;
}) {
  return (
    <section className="my-8">
      <h2 className="mb-2 text-lg font-light text-white uppercase">
        My Reviews
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} account={account} />
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
