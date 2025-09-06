import React from "react";

function ReviewCard({
  profileUrl,
  userName,
  courseName,
  comment,
  rating,
  date,
  time,
}: {
  profileUrl: string;
  userName: string;
  courseName: string;
  comment: string;
  rating: number;
  date: string;
  time: string;
}) {
  return (
    <div className="flex w-full rounded-md border p-4 shadow-md">
      <img
        src={profileUrl}
        alt="Profile"
        className="mr-4 h-24 w-24 rounded-full object-cover"
      />
      <div className="flex w-full flex-col">
        <h4 className="text-md font-semibold">{userName}</h4>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{courseName}</h3>
          <p className="text-sm text-gray-500">{rating} stars</p>
        </div>
        <p className="rounded-2xl border-2 border-pink-300 bg-pink-100 text-sm text-gray-500">
          {comment}
        </p>
        <p className="text-sm text-gray-500">
          {date} at {time}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
