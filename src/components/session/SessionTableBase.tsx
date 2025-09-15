"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
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
  currentWeek = 0,
  totalWeeks = 4,
  goToPreviousWeek = () => {}, 
  goToNextWeek = () => {},
}: SessionTableBaseProps) {
  
  const weekDays = useMemo(() => generateWeekDays(startMonday), [startMonday]);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const availableSlotsSet = useMemo(() => 
    new Set(availableSlots.map(slot => `${slot.day}-${slot.time}`))
  , [availableSlots]);

  const bookingSlotsMap = useMemo(() => 
    new Map(bookingSlots.map(slot => [`${slot.day}-${slot.time}`, slot]))
  , [bookingSlots]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (dayDate: Date) => {
    const dateToCompare = new Date(dayDate);
    dateToCompare.setHours(0, 0, 0, 0);
    return today.getTime() === dateToCompare.getTime();
  };

  return (
    <div className="custom-scrollbar relative h-[70vh] w-full rounded-[2.5rem] overflow-hidden backdrop-blur-sm bg-[#3E3757]/50 backdrop-blur-md shadow-all-around">

      <div className="sticky top-0 py-2 z-10 grid grid-cols-[100px_1fr_80px] items-center">
        {/* Col 1: Left Arrow */}
        <div className="flex items-center justify-end pl-4">
          <button 
            onClick={goToPreviousWeek}
            disabled={currentWeek === 0}
            className="disabled:opacity-25"
          >
            <ChevronLeft className="h-8 w-8" color="white" strokeWidth={1.5}/>
          </button>
        </div>

        {/* Col 2: Day Headers */}
        <div className="flex justify-around text-white">
          {weekDays.map((day) => (
            <div key={day.dayName} className={`min-w-[120px] text-center text-white py-2 flex flex-col items-center ${isToday(day.date) ? "bg-primary rounded-lg" : ""}`}>
              <span className="font-sanctuary text-3xl">{day.dayAbbr}</span>
              <span className="font-chakra text-md font-sans">{day.displayDate}</span>
            </div>
          ))}
        </div>

        {/* Col 3: Right Arrow */}
        <div className="flex items-center justify-start pr-4">
          <button 
            onClick={goToNextWeek}
            disabled={currentWeek >= totalWeeks - 1}
            className="disabled:opacity-25"
          >
            <ChevronRight className="h-8 w-8" color="white" strokeWidth={1.5}/>
          </button>
        </div>
      </div>
      
      <div className="h-[calc(70vh-5rem)] overflow-y-auto py-4 px-4 bg-neutral-white">
          <Table className="w-full bg-neutral-white">
          {/* caption and header can be removed if header is handled outside */}
          <TableCaption>Prophet available time slot</TableCaption>
          {/* <TableHeader> is now handled by the div grid above */}
          <TableBody className="relative">
            {timeSlots.map((time) => (
              <TableRow key={time} className="border-none">
                <TableCell className="sticky left-0 w-[100px] border-r border-neutral-gray p-0 ">
                  <div className="flex h-full items-center">
                      <span className="absolute inset-0 -translate-y-1.5 bg-neutral-white">{time}</span>
                  </div>
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
                <TableCell className="sticky right-0 w-[80px] border-neutral-gray border-l bg-neutral-white"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}