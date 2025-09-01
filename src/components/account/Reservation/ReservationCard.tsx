import React from "react";

function ReservationCard({
  imageUrl,
  rating,
  courseName,
  prophetName,
  price,
  date,
  time,
}: {
  imageUrl: string;
  rating: number;
  courseName: string;
  prophetName: string;
  price: number;
  date: string;
  time: string;
}) {
  return (
    <div className="flex w-full rounded-md border p-4 shadow-md">
      <img
        src={imageUrl}
        alt={courseName}
        className="mr-4 h-24 w-24 rounded-md object-cover"
      />
      <div className="flex w-full flex-col">
        <p className="text-sm text-gray-500">{rating} stars</p>
        <h3 className="text-lg font-semibold">{courseName}</h3>
        <p className="text-sm text-gray-500">{prophetName}</p>
        <p className="self-end text-sm font-bold">{price.toFixed(2)}.-</p>
        <p className="text-sm text-gray-500">
          {date} at {time}
        </p>
      </div>
    </div>
  );
}

export default ReservationCard;
