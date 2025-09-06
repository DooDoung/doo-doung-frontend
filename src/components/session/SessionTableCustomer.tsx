import { useState } from "react";

import SessionTableBase from "./SessionTableBase";
import SessionTableBookSlot from "./SessionTableBookSlot";

export default function SessionTableCustomer() {
  // Mock booking data - some slots are FREE, some are TAKEN
  const generateMockBookingSlots = () => {
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

  // Render function for booking slots
  const renderBookingSlot = (slot: {
    id: string;
    day: string;
    time: string;
    variant: "FREE" | "TAKEN";
  }) => {
    return (
      <SessionTableBookSlot
        id={slot.id}
        time={slot.time}
        day={slot.day}
        variant={slot.variant}
      />
    );
  };

  return (
    <SessionTableBase
      variant="customer"
      bookingSlots={bookingSlots}
      renderBookingSlot={renderBookingSlot}
    />
  );
}
