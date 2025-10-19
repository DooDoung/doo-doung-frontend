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
  startMonday?: Date; // Optional parameter for what Monday should be
  onToggleProphetAvail?: (day: Date, time: string) => void;
  isEdit?: boolean; // Controls whether the table is in edit mode
  currentWeek?: number;
  totalWeeks?: number;
  goToPreviousWeek?: () => void;
  goToNextWeek?: () => void;
    
  /** customer mode */
  selectedSlot?: { day: string; time: string } | null;
  onSelectSlot?: (day: string, time: string) => void;
}
