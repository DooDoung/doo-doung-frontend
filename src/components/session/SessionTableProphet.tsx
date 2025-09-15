import { Button } from "@/components/ui/button";
import { useProphetAvailability } from "@/hooks/useProphetAvailability";

import SessionTableBase from "./SessionTableBase";

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
            variant="default"
            size="lg"
          >
            Back
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={isEdit ? "secondary" : "default"}
            size="sm"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Stop Edit" : "Edit"}
          </Button>

          <Button
            variant="secondary"
            size="lg"
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
        currentWeek={currentWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToNextWeek={goToNextWeek}
      />
    </div>
  );
}
