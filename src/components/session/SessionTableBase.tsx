import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SessionTableBase() {
  // Generate 7 days starting from today
  const generateWeekDays = () => {
    const today = new Date();
    const days = [];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = dayNames[date.getDay()];
      const day = date.getDate();
      const month = date.getMonth() + 1;

      days.push({
        dayName,
        display: `${dayName} ${day}/${month}`,
        date: date,
      });
    }

    return days;
  };

  // Generate time slots (15-minute intervals for 24 hours)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const weekDays = generateWeekDays();
  const timeSlots = generateTimeSlots();

  return (
    <div className="relative h-130 w-full overflow-scroll rounded-2xl bg-gray-100">
      <Table>
        <TableCaption>Prophet available time slot</TableCaption>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="bg-background sticky left-0 w-[100px]">
              Time
            </TableHead>
            {weekDays.map((day, index) => (
              <TableHead key={index} className="min-w-[120px] text-center">
                {day.display}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time, timeIndex) => (
            <TableRow key={timeIndex}>
              <TableCell className="bg-background sticky left-0 border-r font-medium">
                {time}
              </TableCell>
              {weekDays.map((day, dayIndex) => (
                <TableCell
                  key={dayIndex}
                  className="relative h-12 p-1 text-center"
                ></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
