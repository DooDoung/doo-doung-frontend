import React from "react";
import Image from "next/image";
import StarRating from "../StarRating";

function SmallReviewCard({
  review,
}: {
  review: {
    customerProfileURL: string;
    customerName: string;
    star: number;
    describtion: string;
  };
}) {
  return (
    <div className="bg-neutral-white my-3 flex h-25 w-full items-center rounded-3xl">
      <div className="mx-5 overflow-hidden rounded-full">
        <Image
          src={review.customerProfileURL}
          alt="cutomerProfile"
          className="h-20 w-20 flex-shrink-0 rounded-full border-2 object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="mr-3 font-bold">{review.customerName}</div>
          <StarRating
            score={review.star}
            className="text-primary-1000 min-h-5"
            color="#f16987"
          />
        </div>

        <div>{review.describtion}</div>
      </div>
    </div>
  );
}

export default SmallReviewCard;
