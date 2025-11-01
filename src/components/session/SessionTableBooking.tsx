"use client";

import { useState } from "react";
import router from "next/router";

import { AppToast } from "@/lib/app-toast";
import { generateTimeSlots } from "@/lib/session-availible-table";

import { GlobalButton } from "../globalComponents";

import SessionTableBase from "./SessionTableBase";

export default function SessionTableBooking({
  onSelectedChange,
  currentWeek = 0,
  availableSlots,
  bookingSlots,
  durationMinutes = 15,
  courseld,
  goToNextWeek,
  goToPreviousWeek,
}: {
  onSelectedChange?: (slots: { day: string; time: string }[]) => void;
  currentWeek: number;
  availableSlots: { day: string; time: string }[];
  bookingSlots: { id: string; day: string; time: string; variant: string }[]; 
  durationMinutes: number;
  courseld?: string;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
}) {
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

      const convertSlotsArray = formatSlotToTimeData(slotsArray, durationMinutes, currentMonday);
      
      sessionStorage.setItem("selectedSlots", JSON.stringify(convertSlotsArray));

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
              router.push(`/booking/confirm-slot/${courseld}`);
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

// const MockBooking = {
//   //
//   currentWeek: 0,
//   // from Prophet's available slots
//   availableSlots: [
//     { day: "MON", time: "09:00" },
//     { day: "MON", time: "09:15" },
//     { day: "MON", time: "09:30" },
//     { day: "MON", time: "09:45" },
//     { day: "MON", time: "10:00" },
//     { day: "TUE", time: "10:15" },
//     { day: "TUE", time: "10:30" },
//     { day: "TUE", time: "10:45" },
//     { day: "TUE", time: "11:00" },
//     { day: "TUE", time: "11:15" },
//     { day: "WED", time: "14:00" },
//     { day: "WED", time: "14:15" },
//     { day: "WED", time: "14:30" },
//     { day: "WED", time: "14:45" },
//     { day: "FRI", time: "11:00" },
//     { day: "FRI", time: "11:15" },
//     { day: "FRI", time: "11:30" },
//   ],
//   // from Prophet's existing bookings
//   bookingSlots: [
//     { id: "1", day: "MON", time: "09:00", variant: "TAKEN" },
//     { id: "2", day: "TUE", time: "14:00", variant: "FREE" },
//     { id: "3", day: "WED", time: "14:00", variant: "TAKEN" },
//   ],
//   // from Couserse duration
//   durationMinutes: 60,
//   // navigation handlers
//   goToPreviousWeek: () => console.log("Go to previous week"),
//   goToNextWeek: () => console.log("Go to next week"),

//   // new booking from customer to send to backend
//   selectedSlot: null,
// };


const DAY = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const fmtLocalISO = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
const fmt = (d: Date) => fmtLocalISO(d);

function formatSlotToTimeData(
  slots: { day: string; time: string }[],
  durationMin: number,
  currentMonday: Date,
) {
  // same day
  const day = slots[0].day;
  const startTime = slots[0].time;
  const endTime = slots[slots.length - 1].time;

  const startDate = new Date(currentMonday);
  startDate.setDate(currentMonday.getDate() + DAY.indexOf(day));

  // starting time
  const [startH, startM] = startTime.split(":").map(Number);
  startDate.setHours(startH, startM, 0, 0);

  // ending time = starting time + duration
  const endDate = new Date(startDate);
  const [endH, endM] = endTime.split(":").map(Number);
  endDate.setHours(endH, endM, 0, 0);
  endDate.setMinutes(endDate.getMinutes() + durationMin);

  return {
    start_datetime: fmt(startDate),
    end_datetime: fmt(endDate),
  };
}
