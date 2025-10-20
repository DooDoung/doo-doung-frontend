"use client";

import { useState } from "react";
import router from "next/router";

import { AppToast } from "@/lib/app-toast";
import { generateTimeSlots } from "@/lib/session-availible-table";

import { GlobalButton } from "../globalComponents";

import SessionTableBase from "./SessionTableBase";

export default function SessionTableBooking({
  onSelectedChange,
}: {
  onSelectedChange?: (slots: { day: string; time: string }[]) => void;
}) {
  const {
    currentWeek,
    availableSlots,
    bookingSlots,
    goToPreviousWeek,
    goToNextWeek,
    durationMinutes = 60,
  } = MockBooking;

  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentMonday.setDate(today.getDate() + daysToMonday + currentWeek * 7);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const MAX_SLOTS = durationMinutes / 15;

  const handleSelectSlot = (day: string, time: string) => {
    const timeOrder = generateTimeSlots();

    setSelectedSlots((prev) => {
      const newSet = new Set(prev);

      const key = `${day}-${time}`;
      if (newSet.has(key)) {
        newSet.delete(key);
        return newSet;
      }

      const selectedDays = [...newSet].map((k) => k.split("-")[0]);
      const uniqueDays = [...new Set(selectedDays)];

      if (uniqueDays.length > 1 || uniqueDays[0] !== day) {
        AppToast.info("You can only select one day.");
        return new Set([key]);
      }

      const selectedTimes = [...newSet].map((k) => k.split("-")[1]);
      const currentIndex = timeOrder.indexOf(time);
      const isAdjacent = selectedTimes.some(
        (t) => Math.abs(timeOrder.indexOf(t) - currentIndex) === 1,
      );

      if (!isAdjacent) {
        AppToast.error("Slots must be adjacent.");
        return prev;
      }

      if (newSet.size >= MAX_SLOTS) {
        AppToast.error(`You can select up to ${MAX_SLOTS} slots only.`);
        return prev;
      }

      const slotsArray = Array.from(newSet).map((s) => {
        const [day, time] = s.split("-");
        return { day, time };
      });

      newSet.add(key);
      onSelectedChange?.(slotsArray);
      return newSet;
    });
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <SessionTableBase
        variant="customer"
        availableSlots={availableSlots}
        bookingSlots={bookingSlots}
        startMonday={currentMonday}
        onToggleProphetAvail={undefined}
        isEdit={true}
        currentWeek={currentWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToNextWeek={goToNextWeek}
        /** Customer mode */
        selectedSlots={Array.from(selectedSlots).map((s) => {
          const [day, time] = s.split("-");
          return { day, time };
        })}
        onSelectSlots={handleSelectSlot}
      />

      <div className="mt-3 flex items-center justify-between space-x-4">
        <GlobalButton
          className="w-36"
          variant="secondary"
          size="lg"
          onClick={() => (window.location.href = "/account")}
        >
          Back
        </GlobalButton>

        <GlobalButton
          disabled={selectedSlots.size < MAX_SLOTS}
          onClick={() => {
            if (selectedSlots.size > 0) {
              AppToast.success(
                `Selected slot(s): ` +
                  Array.from(selectedSlots)
                    .map((s) => {
                      const [day, time] = s.split("-");
                      return { day, time };
                    })
                    .map((s) => `${s.day} at ${s.time}`)
                    .join(", "),
              );
              router.push("/booking/confirm-slot/[bookingld]");
            }
          }}
          className="w-44"
          size="lg"
          variant={"primary"}
        >
          Select Slot
        </GlobalButton>
      </div>
    </div>
  );
}

const MockBooking = {
  //
  currentWeek: 0,
  // from Prophet's available slots
  availableSlots: [
    { day: "MON", time: "09:00" },
    { day: "MON", time: "09:15" },
    { day: "MON", time: "09:30" },
    { day: "MON", time: "09:45" },
    { day: "MON", time: "10:00" },
    { day: "TUE", time: "10:15" },
    { day: "TUE", time: "10:30" },
    { day: "TUE", time: "10:45" },
    { day: "TUE", time: "11:00" },
    { day: "TUE", time: "11:15" },
    { day: "WED", time: "14:00" },
    { day: "WED", time: "14:15" },
    { day: "WED", time: "14:30" },
    { day: "WED", time: "14:45" },
    { day: "FRI", time: "11:00" },
    { day: "FRI", time: "11:15" },
    { day: "FRI", time: "11:30" },
  ],
  // from Prophet's existing bookings
  bookingSlots: [
    { id: "1", day: "MON", time: "09:00", variant: "TAKEN" },
    { id: "2", day: "TUE", time: "14:00", variant: "FREE" },
    { id: "3", day: "WED", time: "14:00", variant: "TAKEN" },
  ],
  // from Couserse duration
  durationMinutes: 60,
  // navigation handlers
  goToPreviousWeek: () => console.log("Go to previous week"),
  goToNextWeek: () => console.log("Go to next week"),

  // new booking from customer to send to backend
  selectedSlot: null,
};
