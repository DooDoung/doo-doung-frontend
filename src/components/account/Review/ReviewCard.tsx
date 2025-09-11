import React from "react";
import StarRating from "@/components/account/StarRating";

function ReviewCard({
  profileUrl,
  userName,
  courseName,
  comment,
  score,
  date,
  time,
}: {
  profileUrl: string;
  userName: string;
  courseName: string;
  comment: string;
  score: number;
  date: string;
  time: string;
}) {
  return (
    <div className="text-neutral-black w-full rounded-md border bg-white p-4 shadow-md">
      <div className="flex">
        <img
          src={profileUrl}
          alt="Profile"
          className="mr-4 h-24 w-24 rounded-full object-cover"
        />
        <div className="flex w-full flex-col space-y-2 py-2">
          <div className="flex justify-between">
            <h4 className="text-md font-semibold">{userName}</h4>
            <StarRating score={score} className="h-6 w-6" />
          </div>
          <h3 className="text-md font-semibold">{courseName}</h3>
          <p className="border-accent-pink bg-primary-250 rounded-2xl border-1 p-2 text-sm text-gray-500">
            "{comment}"
          </p>
        </div>
      </div>
      <p className="text-sm uppercase">
        {date} {time}
      </p>
    </div>
  );
}

export default ReviewCard;
