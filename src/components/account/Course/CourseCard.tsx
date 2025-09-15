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
        className="mr-4 w-32 rounded-3xl object-cover"
      />
      <div className="text-neutral-black flex justify-between w-full py-4 pr-4 gap-16">
        <div>
          <div className="flex justify-between">
            <StarRating score={score} className="h-5 w-5" />
          </div>
          <h3 className="text-md font-semibold">{courseName}</h3>
          <p className="text-xs">{description }</p>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="self-end rounded-2xl bg-[#a9607b] px-6 py-2 text-sm font-medium text-white">
            {price}.-
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;