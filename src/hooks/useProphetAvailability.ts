import { useState } from "react";
import { generateMockAvailableTimes } from "@/components/session/mockProphetAvailData";

function generateAvailableSlots(
weekIndex: number,
): Array<{ day: string; time: string }> {
const timeBlocks = generateMockAvailableTimes(weekIndex);
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
} 

export function useProphetAvailability() {
 const [currentWeek, setCurrentWeek] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [weeklyAvailability, setWeeklyAvailability] = useState(() => {
    const availability: Record<
      number,
      Array<{ day: string; time: string }>
    > = {};
    for (let week = 0; week < 4; week++) {
      availability[week] = generateAvailableSlots(week);
    }
    return availability;
  });

  const ToggleProphetAvail = (day: Date, time: string) => {
    // Only allow toggle when in edit mode
    if (!isEdit) {
      return;
    }

    // TODO : API toggle here
    console.log(day.toDateString(), time);

    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayName = dayNames[day.getDay()];
    setWeeklyAvailability((prev) => {
      const currentAvailability = [...prev[currentWeek]];
      const existingIndex = currentAvailability.findIndex(
        (slot) => slot.day === dayName && slot.time === time,
      );

      if (existingIndex >= 0) {
        currentAvailability.splice(existingIndex, 1);
      } else {
        currentAvailability.push({ day: dayName, time });
      }

      return {
        ...prev,
        [currentWeek]: currentAvailability,
      };
    });
  };

  const getCurrentWeekMonday = () => {
    const today = new Date();
    const currentMonday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    currentMonday.setDate(today.getDate() + daysToMonday);
    currentMonday.setDate(currentMonday.getDate() + currentWeek * 7);
    return currentMonday;
  };

  const applyToMonth = () => {
    const currentWeekAvailability = weeklyAvailability[currentWeek];
    const newAvailability = { ...weeklyAvailability };

    for (let week = 0; week < 4; week++) {
      newAvailability[week] = [...currentWeekAvailability];
    }

    setWeeklyAvailability(newAvailability);
    alert("Apply to Month");
  };

  // Pagination Table ----------------
  const goToPreviousWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const goToNextWeek = () => {
    if (currentWeek < 3) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const availableSlots = weeklyAvailability[currentWeek] || [];
  return {
    currentWeek,
    isEdit,
    setIsEdit,
    availableSlots,
    ToggleProphetAvail,
    applyToMonth,
    goToPreviousWeek,
    goToNextWeek,
  };
}    