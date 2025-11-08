import React from "react";
import Image from "next/image";
import router from "next/router";

import StarRating from "@/components/account/StarRating";

import { Circle, PencilIcon } from "lucide-react";

function ReportCard({
  id,
//   imageUrl,
  customerProfile,
  customerName,
  reportStatus,
  reportType,
  topic,
  description,
  createdDate,
  createdTime
}: {
  id: string;
//   imageUrl: string;
  customerProfile: string;
  customerName: string;
  reportStatus: "Pending" | "Done" | "Discard";
  reportType: "Other" | "Course issue" | "Prophet issue" | "Payment issue" | "Website issue";
  topic: string;
  description: string;
  createdDate: string;
  createdTime: string;
}) {
  return (
    <div
      className={`font-chakra relative flex h-40 w-[97%] rounded-3xl border bg-white shadow-md`}
    >
        <div className="flex justify-between">
            <div className="flex flex-col justify-between">
                <div className="flex p-3 gap-2 items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full text-xs">
                        Profile
                    </div>

                    <p className="font-chakra text-xl">{customerName}</p>
                    <p className="font-chakra text-sm">{createdDate} {createdTime}</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ReportCard;
