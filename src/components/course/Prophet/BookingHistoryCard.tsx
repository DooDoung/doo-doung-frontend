import React from "react";
import Image from "next/image";

import StarRating from "@/components/account/StarRating";
function BookingHistoryCard({
  customerProfileUrl,
  customerName,
  status,
  bookingDate,
  bookingTime,
  score,
  review,
}: {
  customerProfileUrl: string;
  customerName: string;
  status: "COMPLETED" | "SCHEDULED" | "FAILED";
  bookingDate: string;
  bookingTime: string;
  score: number;
  review: string;
}) {
  const statusColors = {
    COMPLETED: "text-[#7AA37A]",
    SCHEDULED: "text-[#D188A1]",
    FAILED: "text-gray-400",
  }[status];
  return (
    <div className="font-chakra relative flex w-full items-start gap-4 rounded-2xl border border-[#E9E4E1] bg-white px-6 py-4 shadow-md">
      {/* Profile circle */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm">
        <Image
          alt="Profile"
          className="bg-secondary h-full w-full rounded-full object-cover"
          src={customerProfileUrl}
        />
      </div>

      {/* Main content */}
      <div className="text-neutral-black flex w-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold tracking-wide">
            {customerName}
          </h3>
          <p className={`text-lg font-medium ${statusColors}`}>{status}</p>
        </div>

        {/* Booking Info */}
        <div className="mt-2 flex flex-wrap gap-x-10 text-base">
          <p>
            <span className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
              Booking Date:
            </span>{" "}
            <span className="text-neutral-black font-medium">
              {bookingDate}
            </span>
          </p>
          <p>
            <span className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
              Booking Time:
            </span>{" "}
            <span className="text-neutral-black font-medium">
              {bookingTime}
            </span>
          </p>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <span className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
            Review
          </span>
          <StarRating score={score} className="h-5 w-5" />
        </div>

        {/* Review Text */}
        <div className="from-accent-pink to-accent-violet rounded-md bg-gradient-to-r p-[1.5px]">
          <div className="text-neutral-black bg-primary-250 rounded-md-minus px-4 py-2 text-sm">
            “{review}”
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistoryCard;
