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

interface SessionTableBaseProps {
  variant?: "prophet" | "customer" | "base";
  availableSlots?: Array<{ day: string; time: string }>;
  bookingSlots?: Array<{
    id: string;
    day: string;
    time: string;
    variant: "FREE" | "TAKEN";
  }>;
  renderBookingSlot?: (slot: {
    id: string;
    day: string;
    time: string;
    variant: "FREE" | "TAKEN";
  }) => React.ReactNode;
}

export default function SessionTableBase({
  variant = "base",
  availableSlots = [],
  bookingSlots = [],
  renderBookingSlot,
}: SessionTableBaseProps) {
  // Generate 7 days starting from today
  const generateWeekDays = () => {
    const today = new Date();
    const days = [];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = dayNames[date.getDay()];
      const day = date.getDate();
      const month = date.getMonth() + 1;

      days.push({
        dayName,
        display: `${dayName} ${day}/${month}`,
        date: date,
      });
    }

    return days;
  };

  // Generate time slots (15-minute intervals for 24 hours)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

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
