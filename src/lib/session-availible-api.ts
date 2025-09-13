import toast from "react-hot-toast";
import { dayNames, weekdayNames } from "./session-availible-table";

export const ToggleProphetAvail = async (
  day: Date,
  time: string,
  isEdit: boolean,
  currentWeek: number,
  weeklyAvailability: Record<number, Array<{ day: string; time: string }>>,
  setWeeklyAvailability: React.Dispatch<
    React.SetStateAction<Record<number, Array<{ day: string; time: string }>>>
  >,
) => {
  if (!isEdit) {
    return;
  }

  const dayName = dayNames[day.getDay()];

  // Check if slot currently exists
  const currentAvailability = weeklyAvailability[currentWeek];
  const existingSlot = currentAvailability.find(
    (slot) => slot.day === dayName && slot.time === time,
  );

  const updateType = existingSlot ? "delete" : "add";

  try {
    // Create Date object for the API - use time string format for start_time
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              date: day.toISOString().split("T")[0], // Format as YYYY-MM-DD
              start_time: time, // Send time in HH:mm format
              update_type: updateType,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Update local state after successful API call
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
  } catch (error) {
    console.error("Failed to update availability:", error);
    toast.error("Failed to update availability");
  }
};

export const applyToMonth = async (
  currentWeek: number,
  weeklyAvailability: Record<number, Array<{ day: string; time: string }>>,
  setWeeklyAvailability: React.Dispatch<
    React.SetStateAction<Record<number, Array<{ day: string; time: string }>>>
  >,
) => {
  const currentWeekAvailability = weeklyAvailability[currentWeek];

  try {
    // Collect all items to update across all weeks
    const itemsToUpdate: Array<{
      date: string;
      start_time: string;
      update_type: "add" | "delete";
    }> = [];

    // Process each week (0-3), but skip the current week since it's already correct
    for (let week = 0; week < 4; week++) {
      if (week === currentWeek) {
        continue; // Skip current week since it's the template
      }

      const weekAvailability = weeklyAvailability[week] || [];
      const targetWeekMonday = getCurrentWeekMondayForWeek(week);

      // STEP 1: Delete ALL existing slots in this week (clear everything first)
      weekAvailability.forEach((slot) => {
        // Calculate the actual date for this slot
        const dayIndex = weekdayNames.indexOf(slot.day);

        const slotDate = new Date(targetWeekMonday);

        slotDate.setDate(slotDate.getDate() + dayIndex);

        itemsToUpdate.push({
          date: slotDate.toISOString().split("T")[0],
          start_time: slot.time,
          update_type: "delete",
        });
      });

      // STEP 2: Add all slots from current week to this week
      currentWeekAvailability.forEach((slot) => {
        // Calculate the actual date for this slot in the target week
        const dayIndex = weekdayNames.indexOf(slot.day);
        const slotDate = new Date(targetWeekMonday);
        slotDate.setDate(slotDate.getDate() + dayIndex);

        itemsToUpdate.push({
          date: slotDate.toISOString().split("T")[0],
          start_time: slot.time,
          update_type: "add",
        });
      });
    }

    // Make API call if there are items to update
    if (itemsToUpdate.length > 0) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: itemsToUpdate,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    // Update local state after successful API call
    const newAvailability = { ...weeklyAvailability };
    for (let week = 0; week < 4; week++) {
      newAvailability[week] = [...currentWeekAvailability];
    }
    setWeeklyAvailability(newAvailability);

    toast.success(
      "Successfully applied current week's availability to all weeks!",
    );
  } catch (error) {
    console.error("Failed to apply to month:", error);
    toast.error("Failed to apply changes. Please try again.");
  }
};

// Helper function ----------------------
const getCurrentWeekMondayForWeek = (weekIndex: number) => {
  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  currentMonday.setDate(today.getDate() + daysToMonday);
  currentMonday.setDate(currentMonday.getDate() + weekIndex * 7);
  return currentMonday;
};
