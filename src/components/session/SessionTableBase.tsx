"use client";

import React, { useMemo } from "react";
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { generateTimeSlots, generateWeekDays } from "@/lib/session-availible-table";
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
}: SessionTableBaseProps) {
  
  const weekDays = useMemo(() => generateWeekDays(startMonday), [startMonday]);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const availableSlotsSet = useMemo(() => 
    new Set(availableSlots.map(slot => `${slot.day}-${slot.time}`))
  , [availableSlots]);

  const bookingSlotsMap = useMemo(() => 
    new Map(bookingSlots.map(slot => [`${slot.day}-${slot.time}`, slot]))
  , [bookingSlots]);

  return (
    <div className="custom-scrollbar relative h-[60vh] w-full overflow-y-auto rounded-2xl bg-gray-100">
      <Table>
        <TableCaption>Prophet available time slot</TableCaption>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="sticky left-0 w-[100px] bg-white">Time</TableHead>
            {weekDays.map((day) => (
              <TableHead key={day.dayName} className="min-w-[120px] text-center">
                {day.display}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time) => (
            <TableRow key={time} className="border-black">
              <TableCell className="sticky left-0 border-r border-l bg-white font-medium">
                {time}
              </TableCell>
              {weekDays.map((day) => (
                <AvailabilityTableCell
                  key={day.dayName}
                  day={day}
                  time={time}
                  variant={variant}
                  isAvailable={availableSlotsSet.has(`${day.dayName}-${time}`)}
                  isEdit={isEdit}
                  bookingSlot={bookingSlotsMap.get(`${day.dayName}-${time}`)}
                  renderBookingSlot={renderBookingSlot}
                  onClick={onToggleProphetAvail!}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}