import React from "react";

import StarRating from "@/components/account/StarRating";

type CourseCardProps = {
  imageUrl: string;
  score: number;
  courseName: string;
  prophetName: string;
  price: number;
  date: string;
  time: string;
};

function CourseCard({
  imageUrl,
  score,
  courseName,
  prophetName,
  price,
  date,
  time,
}: CourseCardProps) {
  return (
    <div className="flex w-full rounded-3xl border bg-white shadow-md">
      <img
        src={imageUrl}
        alt={courseName}
        className="mr-4 h-full w-30 rounded-3xl object-cover"
      />
      <div className="text-neutral-black flex w-full flex-col py-4 pr-4">
        <div className="flex justify-between">
          <StarRating score={score} className="h-5 w-5" />
        </div>
        <h3 className="text-md font-semibold">{courseName}</h3>
        <p className="text-xs">{prophetName}</p>
        <p className="self-end rounded-2xl bg-[#a9607b] px-2 text-sm font-medium text-white">
          {price}.-
        </p>
        <p className="text-xs uppercase">
          {date} {time}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;