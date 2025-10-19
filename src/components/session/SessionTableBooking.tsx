"use client";

import { useState } from "react";
import router from "next/router";

import { AppToast } from "@/lib/app-toast";

import { GlobalButton } from "../globalComponents";

import SessionTableBase from "./SessionTableBase";

export default function SessionTableBooking() {
  const {
    currentWeek,
    availableSlots,
    bookingSlots,
    goToPreviousWeek,
    goToNextWeek,
  } = MockBooking;

  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentMonday.setDate(today.getDate() + daysToMonday + currentWeek * 7);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string} | null>(null);

  const handleSelectSlot = (day: string, time: string) => {
    if (selectedSlot?.day === day && selectedSlot?.time === time) {
      setSelectedSlot(null);
    } else {
        setSelectedSlot({ day, time });
    }
  };

  return (
    <div className="space-y-4 flex flex-col w-full items-center">
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
        selectedSlot={selectedSlot}
        onSelectSlot={handleSelectSlot}
      />

      <div className="flex items-center justify-between space-x-4">
        <GlobalButton
            className="w-36"
            variant="secondary"
            size="lg"
            onClick={() => (window.location.href = "/account")}
            >
            Back
        </GlobalButton>

        <GlobalButton
            disabled={!selectedSlot}
            onClick={() => {
                if(selectedSlot) {
                    AppToast.success(`You have selected ${selectedSlot.day} at ${selectedSlot.time}`);
                    router.push("/account");
                }
            }}
            className="w-44"
            size="lg"
            variant={"primary"}      >
            Select Slot
        </GlobalButton>
      </div>

    </div>
  );
}

const MockBooking = {
  currentWeek: 0,
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
  bookingSlots: [
    { id: "1", day: "MON", time: "09:00", variant: "TAKEN" },
    { id: "2", day: "TUE", time: "14:00", variant: "FREE" },
    { id: "3", day: "WED", time: "14:00", variant: "TAKEN" },
  ],
  goToPreviousWeek: () => console.log("Go to previous week"),
  goToNextWeek: () => console.log("Go to next week"),

  selectedSlot: null,
  onSelectSlot: (day: string, time: string) => {
      console.log(`Selected slot: ${day} at ${time}`);
  }
};

