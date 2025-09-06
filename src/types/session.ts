export interface SessionTableBaseProps {
  variant?: "prophet" | "customer" | "base";
  availableSlots?: Array<{ day: string; time: string }>;
  bookingSlots?: Array<{
    id: string;
    day: string;
    time: string;
    variant: "FREE" | "TAKEN";
  }>;
  renderBookingSlot?: (slot: {
    id: string;
    day: string;
    time: string;
    variant: "FREE" | "TAKEN";
  }) => React.ReactNode;
}
