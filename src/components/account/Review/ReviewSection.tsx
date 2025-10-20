import React from "react";
import { MessageSquare } from "lucide-react";

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
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} account={account} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <MessageSquare className="h-16 w-16 text-white opacity-50" />
            <p className="font-chakra text-center font-light text-white opacity-70">
              No reviews yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewSection;
