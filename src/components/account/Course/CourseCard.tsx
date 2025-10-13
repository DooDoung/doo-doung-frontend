import React from "react";

import StarRating from "@/components/account/StarRating";

type CourseCardProps = {
  imageUrl: string;
  score: number;
  courseName: string;
  prophetName: string;
  description: string;
  price: number;
  date: string;
  time: string;
};

function CourseCard({
  imageUrl,
  score,
  courseName,
  prophetName,
  description,
  price,
  date,
  time,
}: CourseCardProps) {
  return (
    <div className="flex w-full rounded-3xl border bg-white shadow-md">
      <img
        src={imageUrl}
        alt={courseName}
        className="mr-6 w-40 rounded-3xl object-cover"
      />
      <div className="text-neutral-black flex w-full justify-between gap-20 py-6 pr-6">
        <div>
          <div className="flex justify-between">
            <StarRating score={score} className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mt-1">{courseName}</h3>
          <p className="text-sm mt-1">{description}</p>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="self-end rounded-lg bg-[#a9607b] px-8 py-3 text-base font-medium text-white">
            {price}.-
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;