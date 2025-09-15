import React from "react";
import clsx from "clsx";

import { TableCell } from "@/components/ui/table";
import { SessionTableBaseProps } from "@/types/session";

type BookingSlot = NonNullable<SessionTableBaseProps['bookingSlots']>[number];

interface AvailabilityTableCellProps {
  day: { date: Date; dayName: string };
  time: string;
  isAvailable: boolean;
  isEdit: boolean;
  bookingSlot?: BookingSlot;
  renderBookingSlot?: SessionTableBaseProps['renderBookingSlot'];
  variant: SessionTableBaseProps['variant'];
  onClick: (dayDate: Date, time: string) => void;
}

const AvailabilityTableCell = React.memo(({ 
  day, 
  time, 
  isAvailable, 
  isEdit,
  bookingSlot,
  renderBookingSlot,
  variant,
  onClick,
}: AvailabilityTableCellProps) => {
  
  const cellClasses = clsx(
    "relative h-12 border-l border-b border-t border-neutral-gray p-1 text-center",
    {
      "bg-primary-500": variant === 'prophet' && isAvailable,
      "bg-transparent": variant === 'prophet' && !isAvailable,
      "cursor-pointer hover:bg-primary-250": variant === 'prophet' && isEdit,
      "cursor-default": variant === 'prophet' && !isEdit,
    }
  );

  return (
    <TableCell
      className={cellClasses}
      onClick={() => (variant === 'prophet' && isEdit) && onClick(day.date, time)}
    >
      {variant === "customer" && bookingSlot && renderBookingSlot && renderBookingSlot(bookingSlot)}
    </TableCell>
  );
});

AvailabilityTableCell.displayName = 'AvailabilityTableCell';
export default AvailabilityTableCell;