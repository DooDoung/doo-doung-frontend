import SessionTableBase from "./SessionTableBase";

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

  // Convert time blocks to individual slots
  const generateAvailableSlots = () => {
    const timeBlocks = generateMockAvailableTimes();
    const slots: Array<{ day: string; time: string }> = [];

    timeBlocks.forEach((block) => {
      const startHour = parseInt(block.startTime.split(":")[0]);
      const startMinute = parseInt(block.startTime.split(":")[1]);
      const endHour = parseInt(block.endTime.split(":")[0]);
      const endMinute = parseInt(block.endTime.split(":")[1]);

      let currentDay = block.startDay;
      let currentHour = startHour;
      let currentMinute = startMinute;

      // Handle same day blocks
      if (block.startDay === block.endDay) {
        while (
          currentHour < endHour ||
          (currentHour === endHour && currentMinute < endMinute)
        ) {
          const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
          slots.push({ day: currentDay, time: timeString });

          currentMinute += 15;
          if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
          }
        }
      } else {
        // Handle cross-day blocks
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const startDayIndex = days.indexOf(block.startDay);
        const endDayIndex = days.indexOf(block.endDay);

        // First day (from start time to end of day)
        while (currentHour < 24) {
          const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
          slots.push({ day: currentDay, time: timeString });

          currentMinute += 15;
          if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
          }
        }

        // Second day (from start of day to end time)
        currentDay = block.endDay;
        currentHour = 0;
        currentMinute = 0;

        while (
          currentHour < endHour ||
          (currentHour === endHour && currentMinute < endMinute)
        ) {
          const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
          slots.push({ day: currentDay, time: timeString });

          currentMinute += 15;
          if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
          }
        }
      }
    });

    return slots;
  };

  const availableSlots = generateAvailableSlots();

  return <SessionTableBase variant="prophet" availableSlots={availableSlots} />;
}
