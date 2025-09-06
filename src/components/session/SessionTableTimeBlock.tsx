interface TimeBlock {
  startDay: string;
  startTime: string;
  endDay: string;
  endTime: string;
}

interface SessionTableTimeBlockProps {
  timeBlocks: TimeBlock[];
}

export default function SessionTableTimeBlock({
  timeBlocks,
}: SessionTableTimeBlockProps) {
  // Convert time to minutes from 00:00
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Convert day name to index
  const dayToIndex = (day: string): number => {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return days.indexOf(day);
  };

  // Calculate position and size for each time block
  const calculateBlockStyle = (block: TimeBlock) => {
    const startDayIndex = dayToIndex(block.startDay);
    const endDayIndex = dayToIndex(block.endDay);
    const startMinutes = timeToMinutes(block.startTime);
    const endMinutes = timeToMinutes(block.endTime);

    // Handle cross-day blocks
    let totalMinutes = 0;
    let daySpan = 1;

    if (endDayIndex === startDayIndex) {
      // Same day
      totalMinutes = endMinutes - startMinutes;
    } else {
      // Cross day - calculate total minutes
      const minutesFirstDay = 24 * 60 - startMinutes; // Rest of first day
      const minutesLastDay = endMinutes; // Start of last day
      const fullDaysInBetween = Math.max(0, endDayIndex - startDayIndex - 1);

      totalMinutes =
        minutesFirstDay + minutesLastDay + fullDaysInBetween * 24 * 60;
      daySpan = endDayIndex - startDayIndex + 1;
    }

    // Each 15-minute slot is one row (48px height)
    const height = (totalMinutes / 15) * 48;
    const top = (startMinutes / 15) * 48;
    const left = (startDayIndex + 1) * 120 + 100; // Account for time column width
    const width = daySpan * 120;

    return {
      position: "absolute" as const,
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: "rgb(236 72 153)", // bg-pink-500
      opacity: 0.8,
      borderRadius: "4px",
      border: "2px solid rgb(219 39 119)", // border-pink-600
      zIndex: 10,
      pointerEvents: "none" as const,
    };
  };

  return (
    <>
      {timeBlocks.map((block, index) => (
        <div
          key={index}
          style={calculateBlockStyle(block)}
          className="flex items-center justify-center text-sm font-medium text-white"
        >
          Available
        </div>
      ))}
    </>
  );
}
