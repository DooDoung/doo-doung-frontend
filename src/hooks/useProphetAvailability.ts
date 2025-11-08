import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { dayNames, weekdayNames } from "@/lib/session-availible-table";

async function generateAvailableSlots(
  weekIndex: number,
  accessToken: string | undefined,
): Promise<Array<{ day: string; time: string }>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  const data = responseData.data ?? [];
  const timeBlocks = data;
  const slots: Array<{ day: string; time: string }> = [];

  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentMonday.setDate(today.getDate() + daysToMonday);
  currentMonday.setDate(currentMonday.getDate() + weekIndex * 7);

  // Calculate the date range for the target week
  const weekStart = new Date(currentMonday);
  const weekEnd = new Date(currentMonday);
  weekEnd.setDate(weekEnd.getDate() + 6);

  data.forEach((item: any) => {
    const itemDate = new Date(item.date);

    // Check if the item falls within the target week
    if (itemDate >= weekStart && itemDate <= weekEnd) {
      const dayName = dayNames[itemDate.getDay()];
      const time = item.startTime; // API returns time in HH:MM format

      slots.push({ day: dayName, time });
    }
  });

  return slots;
}

export function useProphetAvailability() {
  const { data: session } = useSession();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [weeklyAvailability, setWeeklyAvailability] = useState<
    Record<number, Array<{ day: string; time: string }>>
  >({});
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    const fetchAvailData = async () => {
      const availabilityTemp: Record<
        number,
        Array<{ day: string; time: string }>
      > = {};
      for (let week = 0; week < 4; week++) {
        availabilityTemp[week] = await generateAvailableSlots(
          week,
          accessToken,
        );
      }
      setWeeklyAvailability(availabilityTemp);
    };
    fetchAvailData();
  }, [accessToken]);

  const ToggleProphetAvail = async (day: Date, time: string) => {
    // Only allow toggle when in edit mode
    if (!isEdit) {
      return;
    }

    // frontend part
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

    // backend intergrate part
    // Calculate the correct slot date for PATCH API
    const weekMonday = getCurrentWeekMonday(currentWeek);
    const dayIndex = day.getDay(); // 0=Sun, 1=Mon, ...
    const slotDate = new Date(weekMonday);
    slotDate.setDate(weekMonday.getDate() + dayIndex);
    const slotDateString = slotDate.toISOString().split("T")[0];


    const currentAvailability = weeklyAvailability[currentWeek];
    const existingSlot = currentAvailability.find(
      (slot) => slot.day === dayName && slot.time === time,
    );

    const updateType = existingSlot ? "delete" : "add";

    try {
      // Use calculated slotDateString for API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            items: [
              {
                date: slotDateString, // Correct date for the slot
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

      toast.success(
        `success to ${updateType}  ${slotDate.getDate()}/${slotDate.getMonth() + 1} - ${time}`,
      );
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  const getCurrentWeekMonday = (currentWeek: number = 0) => {
    const today = new Date();
    const currentMonday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    currentMonday.setDate(today.getDate() + daysToMonday);
    currentMonday.setDate(currentMonday.getDate() + currentWeek * 7);
    return currentMonday;
  };

  const applyToMonth = async () => {
    // frontend part
    const currentWeekAvailability = weeklyAvailability[currentWeek];
    const newAvailability = { ...weeklyAvailability };

    for (let week = 0; week < 4; week++) {
      newAvailability[week] = [...currentWeekAvailability];
    }
    setWeeklyAvailability(newAvailability);

    // backend part
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
        const targetWeekMonday = getCurrentWeekMonday(week);

        // STEP 1: Delete ALL existing slots in this week (clear everything first)
        weekAvailability.forEach((slot) => {
          // Calculate the actual date for this slot using dayNames mapping
          const dayIndex = dayNames.indexOf(slot.day);
          const slotDate = new Date(targetWeekMonday);
          slotDate.setDate(targetWeekMonday.getDate() + dayIndex);
          const slotDateString = slotDate.toISOString().split("T")[0];

          itemsToUpdate.push({
            date: slotDateString,
            start_time: slot.time,
            update_type: "delete",
          });
        });

        // STEP 2: Add all slots from current week to this week
        currentWeekAvailability.forEach((slot) => {
          // Calculate the actual date for this slot in the target week using dayNames mapping
          const dayIndex = dayNames.indexOf(slot.day);
          const slotDate = new Date(targetWeekMonday);
          slotDate.setDate(targetWeekMonday.getDate() + dayIndex);
          const slotDateString = slotDate.toISOString().split("T")[0];

          itemsToUpdate.push({
            date: slotDateString,
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
              Authorization: `Bearer ${accessToken}`,
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
function azync() {
  throw new Error("Function not implemented.");
}
