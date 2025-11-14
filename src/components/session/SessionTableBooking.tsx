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
  courseId,
  goToNextWeek,
  goToPreviousWeek,
}: {
  onSelectedChange?: (slots: { day: string; time: string }[]) => void;
  currentWeek: number;
  availableSlots: { day: string; time: string }[];
  bookingSlots: { id: string; day: string; time: string; variant: string }[]; 
  durationMinutes: number;
  courseId?: string;
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
    if (isPastSlot(day, time, currentMonday)) {
      AppToast.error("You cannot select a past time slot and must book at least 15 minutes in advance.");
      return;
    }

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
      
      newSet.add(key);

      const slotsArray = Array.from(newSet).map((s) => {
        const [day, time] = s.split("-");
        return { day, time };
      });

      const dayIndex: Record<string, number> = {
        Mon: 0,Tue: 1,Wed: 2,Thu: 3,Fri: 4,Sat: 5,Sun: 6,
      };

      const sortedSlots = slotsArray.sort((a, b) => {
        if (a.day !== b.day) {
          return dayIndex[a.day] - dayIndex[b.day];
        }
        return a.time.localeCompare(b.time);
      });

      const convertSlotsArray = formatSlotToTimeData(sortedSlots, durationMinutes, currentMonday);
      
      localStorage.setItem("selectedSlots", JSON.stringify(convertSlotsArray));

      onSelectedChange?.(slotsArray);
      return newSet;
    });
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <SessionTableBase
        variant="customer"
        availableSlots={availableSlots}
        bookingSlots={bookingSlots.map(slot => ({
          ...slot,
          variant: slot.variant === "FREE" ? "FREE" : "TAKEN",
        }))}
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
              const slotsArray = Array.from(selectedSlots).map((s) => {
                const [day, time] = s.split("-");
                return { day, time };
              });
              const sortedSlots = slotsArray.sort((a, b) => {
                if (a.day !== b.day) {
                  return dayIndex[a.day] - dayIndex[b.day];
                }
                return a.time.localeCompare(b.time);
              });
              const convertSlotsArray = formatSlotToTimeData(sortedSlots, durationMinutes, currentMonday);
              localStorage.setItem("selectedSlots", JSON.stringify(convertSlotsArray));
              
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
              router.push(`/booking/confirm-slot/${courseId}`);
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

const DAY = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function formatSlotToTimeData(
  slots: { day: string; time: string }[],
  durationMin: number,
  currentMonday: Date,
) {
  // same day
  const day = slots[0].day;
  const startTime = slots[0].time;

  const baseDate = new Date(currentMonday);
  baseDate.setDate(currentMonday.getDate() + DAY.indexOf(day));

  const y = baseDate.getFullYear();
  const m = baseDate.getMonth();
  const d = baseDate.getDate();

  const [startH, startM] = startTime.split(":").map(Number);

  const startDate = new Date(y, m, d, startH, startM, 0, 0);
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + durationMin);

  return {
    start_datetime: fmtLocal(startDate),
    end_datetime: fmtLocal(endDate),
  };
}

function fmtLocal(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:00`;
}

function isPastSlot(
  day: string, 
  time: string, 
  currentMonday: Date
) {
  const slotDate = new Date(currentMonday);
  slotDate.setDate(slotDate.getDate() + DAY.indexOf(day));

  const [hour, minute] = time.split(":").map(Number);
  slotDate.setHours(hour, minute, 0, 0);
  
  const now = new Date();
  const cutoff = new Date(now.getTime() + 15 * 60 * 1000);

  return slotDate <= cutoff;
};
