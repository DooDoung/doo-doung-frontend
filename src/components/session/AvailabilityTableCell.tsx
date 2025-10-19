import React from "react";
import clsx from "clsx";

import { TableCell } from "@/components/ui/table";
import { SessionTableBaseProps } from "@/types/session";

type BookingSlot = NonNullable<SessionTableBaseProps["bookingSlots"]>[number];

interface AvailabilityTableCellProps {
  day: { date: Date; dayName: string };
  time: string;
  isAvailable: boolean;
  isEdit: boolean;
  bookingSlot?: BookingSlot;
  renderBookingSlot?: SessionTableBaseProps["renderBookingSlot"];
  variant: SessionTableBaseProps["variant"];
  onClick: (dayDate: Date, time: string) => void;

  /** customer mode */
  selectedSlot?: { day: string; time: string } | null;
  onSelectSlot?: (day: string, time: string) => void;
}

const AvailabilityTableCell = React.memo(
  ({
    day,
    time,
    isAvailable,
    isEdit,
    bookingSlot,
    renderBookingSlot,
    variant,
    onClick,
    selectedSlot,
    onSelectSlot,
  }: AvailabilityTableCellProps) => {
    const isTaken = bookingSlot?.variant === "TAKEN";
    const isSelected = 
      selectedSlot?.day === day.dayName && selectedSlot?.time === time

    const cellClasses = clsx(
      "relative h-12 border-l border-b border-t border-neutral-gray p-1 text-center",
      {
        // Prophet variant styles
        "bg-primary-500": variant === "prophet" && isAvailable,
        "bg-transparent": variant === "prophet" && !isAvailable,
        "cursor-pointer hover:bg-primary-250": variant === "prophet" && isEdit,
        "cursor-default": variant === "prophet" && !isEdit,

        // Customer variant styles
        "bg-primary-500 cursor-pointer hover:bg-primary-600":
          variant === "customer" && isAvailable && !isTaken && !isSelected,
        "bg-primary": 
          variant === "customer" && isSelected,
        "bg-secondary pointer-events-none": 
          variant === "customer" && isTaken,
        "bg-neutral-white pointer-events-none":
          variant === "customer" && !isAvailable && !isTaken,
      },
    );


    const handleClick = () => {
      if (variant === "prophet" && isEdit) {
        onClick(day.date, time);
      } else if (variant === "customer" && !isTaken && onSelectSlot) {
        onSelectSlot(day.dayName, time);
      }
    };

    // console.log("Render cell", {
    //   dayName: day.dayName,
    //   time: time,
    //   selectedDay: selectedSlots?.day,
    //   selectedTime: selectedSlots?.time,
    //   isSelected,
    // });


    return (
      <TableCell
        className={cellClasses}
        onClick={handleClick}
      >
        {variant === "customer" &&
          bookingSlot &&
          renderBookingSlot &&
          renderBookingSlot(bookingSlot)}
      </TableCell>
    );
  },
);

AvailabilityTableCell.displayName = "AvailabilityTableCell";
export default AvailabilityTableCell;