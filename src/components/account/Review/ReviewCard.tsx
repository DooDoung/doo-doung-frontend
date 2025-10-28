import React from "react";
import Image from "next/image";

import StarRating from "@/components/account/StarRating";
import { AccountData } from "@/interface/User";

function ReviewCard({
  review,
  account,
}: {
  review: Review;
  account: AccountData;
}) {
  return (
    <div className="text-neutral-black w-full rounded-md border bg-white p-4 shadow-md">
      <div className="flex gap-4">
        <Image
          src={`${account?.profileUrl || ""}`}
          alt="Profile"
          className="h-24 w-24 flex-shrink-0 rounded-full border-1 border-black/20 object-cover"
        />
        <div className="mr-4 flex w-full flex-col space-y-2 py-2">
          <div className="flex justify-between">
            <h4 className="text-md font-semibold">{account?.username}</h4>
            <StarRating score={review?.score} className="h-6 w-6" />
          </div>
          <h3 className="text-md font-semibold">{review?.courseName}</h3>
          <p className="border-accent-pink bg-primary-250 rounded-2xl border-1 p-2 text-sm text-gray-500">
            "{review?.description}"
          </p>
        </div>
      </div>
      <p className="text-sm uppercase">
        {review?.date} {review?.time}
      </p>
    </div>
  );
}

export default ReviewCard;
