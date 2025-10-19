"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  generateTimeSlots,
  generateWeekDays,
} from "@/lib/session-availible-table";
import { SessionTableBaseProps } from "@/types/session";

import AvailabilityTableCell from "./AvailabilityTableCell";

export default function SessionTableBase({
  variant = "base",
  availableSlots = [],
  bookingSlots = [],
  renderBookingSlot,
  startMonday,
  onToggleProphetAvail,
  isEdit = false,
  currentWeek = 0,
  totalWeeks = 4,
  goToPreviousWeek = () => {},
  goToNextWeek = () => {},
  selectedSlot = null,
  onSelectSlot,
}: SessionTableBaseProps) {
  const weekDays = useMemo(() => generateWeekDays(startMonday), [startMonday]);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const availableSlotsSet = useMemo(
    () => new Set(availableSlots.map((slot) => `${slot.day}-${slot.time}`)),
    [availableSlots],
  );

  const bookingSlotsMap = useMemo(
    () =>
      new Map(bookingSlots.map((slot) => [`${slot.day}-${slot.time}`, slot])),
    [bookingSlots],
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (dayDate: Date) => {
    const dateToCompare = new Date(dayDate);
    dateToCompare.setHours(0, 0, 0, 0);
    return today.getTime() === dateToCompare.getTime();
  };

  return (
    <div className="custom-scrollbar shadow-all-around relative h-[70vh] w-full overflow-hidden rounded-[2.5rem] bg-[#3E3757]/50 backdrop-blur-md select-none">
      <div className="sticky top-0 z-10 grid grid-cols-[100px_1fr_80px] items-center py-2">
        {/* Col 1: Left Arrow */}
        <div className="flex items-center justify-end pl-4">
          <button
            onClick={goToPreviousWeek}
            disabled={currentWeek === 0}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft className="h-8 w-8" color="white" strokeWidth={1.5} />
          </button>
        </div>

        {/* Col 2: Day Headers */}
        <div className="flex justify-around text-white">
          {weekDays.map((day) => (
            <div
              key={day.dayName}
              className={`flex min-w-[120px] flex-col items-center py-2 text-center text-white ${isToday(day.date) ? "bg-primary rounded-lg" : ""}`}
            >
              <span className="font-sanctuary text-3xl">{day.dayAbbr}</span>
              <span className="font-chakra text-md">{day.displayDate}</span>
            </div>
          ))}
        </div>

        {/* Col 3: Right Arrow */}
        <div className="flex items-center justify-start pr-4">
          <button
            onClick={goToNextWeek}
            disabled={currentWeek >= totalWeeks - 1}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight className="h-8 w-8" color="white" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="bg-neutral-white custom-scrollbar h-[calc(70vh-5rem)] overflow-y-auto px-4 py-4">
        <Table className="bg-neutral-white w-full">
          {/* caption and header can be removed if header is handled outside */}
          <TableCaption>
            {variant === "customer"
              ? "Available booking slots"
              : "Prophet available time slot"}
          </TableCaption>
          {/* <TableHeader> is now handled by the div grid above */}
          <TableBody className="relative">
            {timeSlots.map((time) => (
              <TableRow key={time} className="border-none hover:bg-transparent">
                <TableCell className="border-neutral-gray sticky left-0 w-[100px] border-r p-0">
                  <div className="flex h-full items-center">
                    <span className="bg-neutral-white absolute inset-0 -translate-y-1.5">
                      {time}
                    </span>
                  </div>
                </TableCell>

                {weekDays.map((day) => (
                  <AvailabilityTableCell
                    key={day.dayName}
                    day={day}
                    time={time}
                    variant={variant}
                    isAvailable={availableSlotsSet.has(
                      `${day.dayName}-${time}`,
                    )}
                    isEdit={isEdit}
                    bookingSlot={bookingSlotsMap.get(`${day.dayName}-${time}`)}
                    renderBookingSlot={renderBookingSlot}
                    onClick={onToggleProphetAvail!}
                    selectedSlot={selectedSlot}
                    onSelectSlot={onSelectSlot}
                  />
                ))}
                <TableCell className="border-neutral-gray bg-neutral-white sticky right-0 w-[80px] border-l"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
