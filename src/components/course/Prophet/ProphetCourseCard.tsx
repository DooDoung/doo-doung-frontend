import React from "react";
import Image from "next/image";
import router from "next/router";

import StarRating from "@/components/account/StarRating";

import { PencilIcon } from "lucide-react";

function ProphetCourseCard({
  id,
  imageUrl,
  score,
  status,
  courseName,
  prophetName,
  price,
  editability = "VIEW",
}: {
  id: string;
  imageUrl: string;
  score: number;
  status: "OPEN" | "CLOSE";
  courseName: string;
  prophetName: string;
  price: number;
  editability?: "EDIT" | "VIEW";
}) {
  return (
    <div
      className={`font-chakra relative flex h-40 w-[97%] rounded-3xl border bg-white shadow-md ${editability === "EDIT" ? "hover:bg-primary-250 cursor-pointer" : ""}`}
      // click to go to course detail page
      onClick={() => {
        if (editability === "EDIT") {
          router.push(`/course/prophet/my-courses/details/${id}`);
        } else {
          router.push(`/course/${id}`);
        }
      }}
    >
      <Image
        src={imageUrl}
        alt={courseName}
        className="mr-4 w-64 rounded-3xl object-cover"
      />
      <div className="text-neutral-black flex w-full py-4 pr-4">
        <div className="flex flex-col">
          <StarRating score={score} className="h-5 w-5" />
          <h3 className="text-lg font-semibold">{courseName}</h3>
          <p className="text-md">{prophetName}</p>
        </div>

        <div className="flex flex-1 flex-col items-end gap-2">
          <span
            className={`mr-3 text-3xl ${status === "OPEN" ? "text-primary" : "text-neutral-black"}`}
          >
            {status}
          </span>
          <p className="font-chakra flex h-12 w-24 items-center justify-center self-end rounded-full bg-[#a9607b] px-2 text-lg text-white">
            {price}.-
          </p>
        </div>
      </div>

      {editability === "EDIT" && (
        <div className="bg-primary-500 absolute -right-5 -bottom-5 flex h-[50px] w-[50px] items-center justify-center rounded-full">
          <PencilIcon
            size={32}
            strokeWidth={1.5}
            className="text-neutral-black m-auto"
          />
        </div>
      )}
    </div>
  );
}

export default ProphetCourseCard;
