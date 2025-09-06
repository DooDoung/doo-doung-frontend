import SessionTableBase from "./SessionTableBase";
import SessionTableTimeBlock from "./SessionTableTimeBlock";

export default function SessionTableProphet() {
  // Mock available times with variance and max 4 hours continuous
  const generateMockAvailableTimes = () => {
    const timeBlocks = [
      // Monday morning block (2 hours)
      {
        startDay: "MON",
        startTime: "09:00",
        endDay: "MON",
        endTime: "11:00",
      },
      // Tuesday afternoon to evening (3.5 hours)
      {
        startDay: "TUE",
        startTime: "14:00",
        endDay: "TUE",
        endTime: "17:30",
      },
      // Wednesday late evening to Thursday early morning (cross-day, 4 hours)
      {
        startDay: "WED",
        startTime: "22:00",
        endDay: "THU",
        endTime: "02:00",
      },
      // Friday afternoon (2.5 hours)
      {
        startDay: "FRI",
        startTime: "15:00",
        endDay: "FRI",
        endTime: "17:30",
      },
      // Saturday morning (3 hours)
      {
        startDay: "SAT",
        startTime: "08:00",
        endDay: "SAT",
        endTime: "11:00",
      },
      // Sunday afternoon to evening (4 hours max)
      {
        startDay: "SUN",
        startTime: "13:00",
        endDay: "SUN",
        endTime: "17:00",
      },
    ];

    return timeBlocks;
  };

  const availableTimeBlocks = generateMockAvailableTimes();

  return (
    <div className="relative">
      <SessionTableBase />
      <SessionTableTimeBlock timeBlocks={availableTimeBlocks} />
    </div>
  );
}
