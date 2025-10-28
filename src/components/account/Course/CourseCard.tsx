import React from "react";
import Image from "next/image";
import Link from "next/link";

import StarRating from "@/components/account/StarRating";

type CourseCardProps = {
  id?: string | number;
  imageUrl: string;
  score: number;
  courseName: string;
  prophetName: string;
  description: string;
  price: number;
  date: string;
  time: string;
  showProphetName?: boolean;
};

function CourseCard({
  id,
  imageUrl,
  score,
  courseName,
  prophetName,
  description,
  price,
  showProphetName = true,
}: CourseCardProps) {
  const cardContent = (
    <div className="my-2 flex w-full cursor-pointer rounded-3xl border bg-white shadow-md transition-shadow hover:shadow-lg">
      <Image
        src={imageUrl}
        alt={courseName}
        className="mr-6 w-40 rounded-3xl object-cover"
      />
      <div className="text-neutral-black flex w-full justify-between gap-20 py-6 pr-6">
        <div>
          <div className="flex justify-start gap-2">
            {showProphetName && <div>{prophetName}</div>}
            <StarRating
              score={score}
              className="h-6 w-6"
              color={showProphetName ? "#F0E34B" : "#A0522D"}
            />
          </div>
          <h3 className="mt-1 text-lg font-semibold">{courseName}</h3>
          <p className="mt-1 text-sm">{description}</p>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="self-end rounded-lg bg-[#a9607b] px-8 py-3 text-base font-medium text-white">
            {price}.-
          </div>
        </div>
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/course/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
}

export default CourseCard;
