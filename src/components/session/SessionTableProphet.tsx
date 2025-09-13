import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import SessionTableBase from "./SessionTableBase";
import { useProphetAvailability } from "@/hooks/useProphetAvailability";

export default function SessionTableProphet() {
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
  currentMonday.setDate(today.getDate() + daysToMonday + (currentWeek * 7));

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
        startMonday={currentMonday}
        onToggleProphetAvail={ToggleProphetAvail}
        isEdit={isEdit}
      />
    </div>
  );
}
