import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProphetAvailability } from "@/hooks/useProphetAvailability";
import { applyToMonth, ToggleProphetAvail } from "@/lib/session-availible-api";
import { dayNames, getCurrentWeekMonday } from "@/lib/session-availible-table";

import { GlobalButton } from "../globalComponents";

import SessionTableBase from "./SessionTableBase";

export default function SessionTableProphet() {
  // NEEN -----------
  // const [currentWeek, setCurrentWeek] = useState(0);
  // const [isEdit, setIsEdit] = useState(false);
  // const [weeklyAvailability, setWeeklyAvailability] = useState<
  //   Record<number, Array<{ day: string; time: string }>>
  // >({});
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const loadAvailabilityData = async () => {
  //     setIsLoading(true);
  //     const availability: Record<
  //       number,
  //       Array<{ day: string; time: string }>
  //     > = {};

  //     try {
  //       for (let week = 0; week < 4; week++) {
  //         availability[week] = await generateAvailableSlots(week);
  //       }
  //       setWeeklyAvailability(availability);
  //     } catch (error) {
  //       console.error("Failed to load availability data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadAvailabilityData();
  // }, []);

  // async function generateAvailableSlots(
  //   weekIndex: number,
  // ): Promise<Array<{ day: string; time: string }>> {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/prophet/availability`,
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     const data = responseData.data ?? [];

  //     const slots: Array<{ day: string; time: string }> = [];

  // Calculate the Monday of the target week
  // const today = new Date();
  // const currentMonday = new Date(today);
  // const dayOfWeek = today.getDay();
  // const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  // currentMonday.setDate(today.getDate() + daysToMonday);
  // currentMonday.setDate(currentMonday.getDate() + weekIndex * 7);

  // // Calculate the date range for the target week
  // const weekStart = new Date(currentMonday);
  // const weekEnd = new Date(currentMonday);
  // weekEnd.setDate(weekEnd.getDate() + 6);

  //     // Filter and convert data for the target week
  //     data.forEach((item: any) => {
  //       const itemDate = new Date(item.date);

  //       // Check if the item falls within the target week
  //       if (itemDate >= weekStart && itemDate <= weekEnd) {
  //         const dayName = dayNames[itemDate.getDay()];
  //         const time = item.startTime; // API returns time in HH:MM format

  //         slots.push({ day: dayName, time });
  //       }
  //     });

  //     return slots;
  //   } catch (error) {
  //     toast.error("Failed to fetch availability data");
  //     return [];
  //   }
  // }

  // // Wrapper functions to pass state to external functions
  // const handleToggleProphetAvail = async (day: Date, time: string) => {
  //   await ToggleProphetAvail(
  //     day,
  //     time,
  //     isEdit,
  //     currentWeek,
  //     weeklyAvailability,
  //     setWeeklyAvailability,
  //   );
  // };

  // const handleApplyToMonth = async () => {
  //   await applyToMonth(currentWeek, weeklyAvailability, setWeeklyAvailability);
  // };

  // // Pagination Table ----------------
  // const goToPreviousWeek = () => {
  //   if (currentWeek > 0) {
  //     setCurrentWeek(currentWeek - 1);
  //   }
  // };

  // const goToNextWeek = () => {
  //   if (currentWeek < 3) {
  //     setCurrentWeek(currentWeek + 1);
  //   }
  // };

  // BEAM ---------------
  // const availableSlots = weeklyAvailability[currentWeek] || [];
  const {
    currentWeek,
    isEdit,
    setIsEdit,
    availableSlots,
    ToggleProphetAvail,
    applyToMonth,
    goToPreviousWeek,
    goToNextWeek,
  } = useProphetAvailability();

  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentMonday.setDate(today.getDate() + daysToMonday + currentWeek * 7);

  // if (isLoading) {
  //   return (
  //     <div className="space-y-4">
  //       <div className="flex items-center justify-center p-8">
  //         <p>Loading availability data...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GlobalButton
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = "/account/prophet")}
          >
            Back
          </GlobalButton>
        </div>

        <div className="flex items-center space-x-2">
          <GlobalButton
            variant={isEdit ? "secondary" : "primary"}
            size="sm"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Stop Edit" : "Edit"}
          </GlobalButton>

          <GlobalButton
            variant="secondary"
            size="sm"
            onClick={applyToMonth}
            disabled={!isEdit}
          >
            Apply to Month
          </GlobalButton>
        </div>
      </div>

      {/*  startMonday={getCurrentWeekMonday(currentWeek)}
        onToggleProphetAvail={handleToggleProphetAvail} */}
      <SessionTableBase
        variant="prophet"
        availableSlots={availableSlots}
        startMonday={currentMonday}
        onToggleProphetAvail={ToggleProphetAvail}
        isEdit={isEdit}
        currentWeek={currentWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToNextWeek={goToNextWeek}
      />
    </div>
  );
}
