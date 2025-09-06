import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  generateTimeSlots,
  generateWeekDays,
} from "@/lib/session-availible-table";
import { SessionTableBaseProps } from "@/types/session";

export default function SessionTableBase({
  variant = "base",
  availableSlots = [],
  bookingSlots = [],
  renderBookingSlot,
}: SessionTableBaseProps) {
  const weekDays = generateWeekDays();
  const timeSlots = generateTimeSlots();

  // Check if a slot is available (for prophet variant)
  const isSlotAvailable = (day: string, time: string) => {
    return availableSlots.some(
      (slot) => slot.day === day && slot.time === time,
    );
  };

  // Get booking slot data (for customer variant)
  const getBookingSlot = (day: string, time: string) => {
    return bookingSlots.find((slot) => slot.day === day && slot.time === time);
  };

  return (
    <div className="relative h-130 w-full overflow-scroll rounded-2xl bg-gray-100">
      <Table>
        <TableCaption>Prophet available time slot</TableCaption>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="sticky left-0 w-[100px]">Time</TableHead>
            {weekDays.map((day, index) => (
              <TableHead key={index} className="min-w-[120px] text-center">
                {day.display}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time, timeIndex) => (
            <TableRow key={timeIndex} className="border-black">
              <TableCell className="border-neutral-gray sticky left-0 border-r border-l bg-white font-medium">
                {time}
              </TableCell>
              {weekDays.map((day, dayIndex) => {
                const isAvailable = isSlotAvailable(day.dayName, time);
                const bookingSlot = getBookingSlot(day.dayName, time);

                return (
                  <TableCell
                    key={dayIndex}
                    className={`relative h-12 border-1 bg-white p-1 text-center ${
                      variant === "prophet" && isAvailable
                        ? "bg-primary-500 border-primary-500"
                        : "border-neutral-gray"
                    }`}
                  >
                    {variant === "customer" &&
                      bookingSlot &&
                      renderBookingSlot &&
                      renderBookingSlot(bookingSlot)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
