import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationSection({
  myReservation,
}: {
  myReservation: Reservation[];
}) {
  return (
    <section className="my-8 w-full">
      <h2 className="mb-2 text-lg font-bold">My Reservations</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {myReservation.map((reservation, index) => (
          <ReservationCard key={index} {...reservation} />
        ))}
      </div>
    </section>
  );
}

export default ReservationSection;
