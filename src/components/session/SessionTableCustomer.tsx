import { useState } from "react";
import SessionTableBase from "./SessionTableBase";
import SessionTableBookSlot from "./SessionTableBookSlot";

export default function SessionTableCustomer() {
  // Mock booking data - some slots are FREE, some are TAKEN
  const generateMockBookingSlots = () => {
    const slots = [];
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const times = [];

    // Generate time slots (15-minute intervals)
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        times.push(timeString);
      }
    }

    // Create some sample booking slots
    const sampleSlots = [
      { day: "MON", time: "09:00", variant: "FREE" as const },
      { day: "MON", time: "09:15", variant: "FREE" as const },
      { day: "MON", time: "09:30", variant: "TAKEN" as const },
      { day: "MON", time: "10:00", variant: "FREE" as const },
      { day: "TUE", time: "14:00", variant: "FREE" as const },
      { day: "TUE", time: "14:15", variant: "TAKEN" as const },
      { day: "TUE", time: "15:00", variant: "FREE" as const },
      { day: "WED", time: "22:00", variant: "FREE" as const },
      { day: "THU", time: "01:00", variant: "TAKEN" as const },
      { day: "FRI", time: "15:00", variant: "FREE" as const },
      { day: "FRI", time: "16:30", variant: "TAKEN" as const },
      { day: "SAT", time: "08:00", variant: "FREE" as const },
      { day: "SAT", time: "10:15", variant: "FREE" as const },
      { day: "SUN", time: "13:00", variant: "TAKEN" as const },
      { day: "SUN", time: "16:00", variant: "FREE" as const },
    ];

    return sampleSlots.map((slot, index) => ({
      ...slot,
      id: `slot-${index}`,
    }));
  };

  const [bookingSlots] = useState(generateMockBookingSlots());

  // Calculate position for each booking slot
  const calculateSlotPosition = (day: string, time: string) => {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const dayIndex = days.indexOf(day);

    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const timeSlotIndex = totalMinutes / 15; // Each slot is 15 minutes

    // Calculate position based on table layout
    const top = timeSlotIndex * 48 + 64; // 48px per row + header height
    const left = (dayIndex + 1) * 120 + 100; // 120px per column + time column width

    return { top, left };
  };

  return (
    <div className="relative">
      <SessionTableBase />

      {/* Overlay booking slots */}
      {bookingSlots.map((slot) => {
        const position = calculateSlotPosition(slot.day, slot.time);
        return (
          <div
            key={slot.id}
            className="absolute z-20 h-[40px] w-[112px] p-1"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <SessionTableBookSlot
              id={slot.id}
              time={slot.time}
              day={slot.day}
              variant={slot.variant}
            />
          </div>
        );
      })}
    </div>
  );
}
