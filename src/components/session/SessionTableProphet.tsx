import { useEffect,useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { generateMockAvailableTimes } from "./mockProphetAvailData";
import SessionTableBase from "./SessionTableBase";

export default function SessionTableProphet() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [weeklyAvailability, setWeeklyAvailability] = useState<
    Record<number, Array<{ day: string; time: string }>>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  // Load availability data for all weeks on component mount
  useEffect(() => {
    const loadAvailabilityData = async () => {
      setIsLoading(true);
      const availability: Record<
        number,
        Array<{ day: string; time: string }>
      > = {};

      try {
        for (let week = 0; week < 4; week++) {
          availability[week] = await generateAvailableSlots(week);
        }
        setWeeklyAvailability(availability);
      } catch (error) {
        console.error("Failed to load availability data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailabilityData();
  }, []);

  const ToggleProphetAvail = async (day: Date, time: string) => {
    if (!isEdit) {
      return;
    }

    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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

      console.log(
        `${updateType === "add" ? "Added" : "Removed"} availability:`,
        day.toDateString(),
        time,
      );

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
      // TODO: Show user-friendly error message
    }
  };

  // Convert API data to individual slots
  async function generateAvailableSlots(
    weekIndex: number,
  ): Promise<Array<{ day: string; time: string }>> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const data = responseData.data ?? [];

      const slots: Array<{ day: string; time: string }> = [];
      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

      // Calculate the Monday of the target week
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

      // Filter and convert data for the target week
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
    } catch (error) {
      console.error("Failed to fetch availability data:", error);
      // Fallback to mock data if API fails
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
  }

  const getCurrentWeekMonday = () => {
    const today = new Date();
    const currentMonday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    currentMonday.setDate(today.getDate() + daysToMonday);
    currentMonday.setDate(currentMonday.getDate() + currentWeek * 7);
    return currentMonday;
  };

  const applyToMonth = async () => {
    const currentWeekAvailability = weeklyAvailability[currentWeek];

    try {
      // Collect all items to update across all weeks
      const itemsToUpdate: Array<{
        date: string;
        start_time: string;
        update_type: "add" | "delete";
      }> = [];

      // Process each week (0-3)
      for (let week = 0; week < 4; week++) {
        const weekAvailability = weeklyAvailability[week] || [];
        const targetWeekMonday = getCurrentWeekMondayForWeek(week);

        // Create a map of current week slots for quick lookup
        const currentWeekSlotMap = new Map<string, boolean>();
        currentWeekAvailability.forEach((slot) => {
          currentWeekSlotMap.set(`${slot.day}-${slot.time}`, true);
        });

        // Create a map of target week slots for quick lookup
        const targetWeekSlotMap = new Map<string, boolean>();
        weekAvailability.forEach((slot) => {
          targetWeekSlotMap.set(`${slot.day}-${slot.time}`, true);
        });

        // Find slots to delete (exist in target week but not in current week)
        weekAvailability.forEach((slot) => {
          const slotKey = `${slot.day}-${slot.time}`;
          if (!currentWeekSlotMap.has(slotKey)) {
            // Calculate the actual date for this slot
            const dayIndex = [
              "SUN",
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
            ].indexOf(slot.day);
            const slotDate = new Date(targetWeekMonday);
            slotDate.setDate(slotDate.getDate() + dayIndex);

            itemsToUpdate.push({
              date: slotDate.toISOString().split("T")[0],
              start_time: slot.time,
              update_type: "delete",
            });
          }
        });

        // Find slots to add (exist in current week but not in target week)
        currentWeekAvailability.forEach((slot) => {
          const slotKey = `${slot.day}-${slot.time}`;
          if (!targetWeekSlotMap.has(slotKey)) {
            // Calculate the actual date for this slot
            const dayIndex = [
              "SUN",
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
            ].indexOf(slot.day);
            const slotDate = new Date(targetWeekMonday);
            slotDate.setDate(slotDate.getDate() + dayIndex);

            itemsToUpdate.push({
              date: slotDate.toISOString().split("T")[0],
              start_time: slot.time,
              update_type: "add",
            });
          }
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

        console.log(
          `Applied ${itemsToUpdate.length} availability changes to all weeks`,
        );
      }

      // Update local state after successful API call
      const newAvailability = { ...weeklyAvailability };
      for (let week = 0; week < 4; week++) {
        newAvailability[week] = [...currentWeekAvailability];
      }
      setWeeklyAvailability(newAvailability);

      alert("Successfully applied current week's availability to all weeks!");
    } catch (error) {
      console.error("Failed to apply to month:", error);
      alert("Failed to apply changes. Please try again.");
    }
  };

  // Helper function to get Monday for a specific week
  const getCurrentWeekMondayForWeek = (weekIndex: number) => {
    const today = new Date();
    const currentMonday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    currentMonday.setDate(today.getDate() + daysToMonday);
    currentMonday.setDate(currentMonday.getDate() + weekIndex * 7);
    return currentMonday;
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-8">
          <p>Loading availability data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousWeek}
            disabled={currentWeek === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Week
          </Button>

          <span className="font-medium">Week {currentWeek + 1} of 4</span>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextWeek}
            disabled={currentWeek === 3}
          >
            Next Week
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={isEdit ? "destructive" : "secondary"}
            size="sm"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Stop Edit" : "Edit"}
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={applyToMonth}
            disabled={!isEdit}
          >
            Apply to Month
          </Button>
        </div>
      </div>

      <SessionTableBase
        variant="prophet"
        availableSlots={availableSlots}
        startMonday={getCurrentWeekMonday()}
        onToggleProphetAvail={ToggleProphetAvail}
        isEdit={isEdit}
      />
    </div>
  );
}
