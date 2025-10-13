interface SessionTableBookSlotProps {
  id: string;
  time: string;
  day: string;
  variant: "FREE" | "TAKEN";
}

export default function SessionTableBookSlot({
  id,
  time,
  day,
  variant,
}: SessionTableBookSlotProps) {
  const BookingSession = (time: string, day: string) => {
    return;
  };

  const handleClick = () => {
    if (variant === "FREE") {
      BookingSession(time, day);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={variant === "TAKEN"}
      className={`h-full w-full rounded text-xs font-medium ${
        variant === "FREE"
          ? "cursor-pointer bg-pink-500 text-white hover:bg-pink-600"
          : "cursor-not-allowed bg-gray-500 text-gray-300"
      } transition-colors duration-200`}
    >
      {variant === "FREE" ? "BOOK" : "TAKEN"}
    </button>
  );
}
