"use client";

import { useMemo } from "react";

import {
  generateTimeSlots,
  generateWeekDays,
} from "@/lib/session-availible-table";
import { SessionTableBaseProps } from "@/types/session";

type UseSessionTableProps = Pick<
  SessionTableBaseProps,
  "startMonday" | "availableSlots" | "bookingSlots"
>;

export function useSessionTable({
  startMonday,
  availableSlots = [],
  bookingSlots = [],
}: UseSessionTableProps) {
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

  const isSlotAvailable = (day: string, time: string): boolean => {
    return availableSlotsSet.has(`${day}-${time}`);
  };

  const getBookingSlot = (day: string, time: string) => {
    return bookingSlotsMap.get(`${day}-${time}`);
  };

  return {
    weekDays,
    timeSlots,
    isSlotAvailable,
    getBookingSlot,
  };
}
