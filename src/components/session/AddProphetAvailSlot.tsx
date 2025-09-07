"use client";

import * as React from "react";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

const dayNames: Day[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const hours = Array.from({ length: 25 }, (_, i) => i); // 0..24
const minutes = ["00", "15", "30", "45"] as const;

function toWeekMinutes(day: Day, hour: number, minute: number) {
  const d = dayNames.indexOf(day);
  return d * 24 * 60 + hour * 60 + minute;
}

export default function AddProphetAvailSlot() {
  const [open, setOpen] = React.useState(false);

  const [startDay, setStartDay] = React.useState<Day>("MON");
  const [startHour, setStartHour] = React.useState<number>(0);
  const [startMin, setStartMin] = React.useState<number>(0);

  const [endDay, setEndDay] = React.useState<Day>("MON");
  const [endHour, setEndHour] = React.useState<number>(0);
  const [endMin, setEndMin] = React.useState<number>(0);

  // If hour is 24, force minute to 00 (valid time)
  React.useEffect(() => {
    if (startHour === 24) setStartMin(0);
  }, [startHour]);
  React.useEffect(() => {
    if (endHour === 24) setEndMin(0);
  }, [endHour]);

  const startTotal = toWeekMinutes(startDay, startHour, startMin);
  const endTotal = toWeekMinutes(endDay, endHour, endMin);
  const valid = endTotal > startTotal;

  const handleSave = () => {
    if (!valid) return;
    console.log({
      start: { day: startDay, hour: startHour, minute: startMin },
      end: { day: endDay, hour: endHour, minute: endMin },
    });
    // You can reset or close after save if you want:
    // setOpen(false)
  };

  return (
    <div className="w-full max-w-xl">
      {!open ? (
        <Button onClick={() => setOpen(true)} variant="default">
          Add Slot
        </Button>
      ) : (
        <>
          <Button onClick={() => setOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Card className="rounded-3xl border border-transparent bg-gradient-to-tr from-pink-300/40 to-violet-300/40 p-[2px]">
            <div className="rounded-3xl bg-white">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">New availability</h3>
                </div>

                {/* Start date */}
                <div className="mb-4 grid gap-2">
                  <Label>Start date</Label>
                  <Select
                    value={startDay}
                    onValueChange={(v) => setStartDay(v as Day)}
                  >
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayNames.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Start time */}
                <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                  <div className="grid gap-2">
                    <Label>Start time</Label>
                    <Select
                      value={String(startHour)}
                      onValueChange={(v) => setStartHour(Number(v))}
                    >
                      <SelectTrigger className="w-full rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-64">
                        {hours.map((h) => (
                          <SelectItem key={h} value={String(h)}>
                            {String(h).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pb-8 text-center text-lg">:</div>

                  <div className="grid gap-2">
                    <Select
                      value={String(startMin)}
                      onValueChange={(v) => setStartMin(Number(v))}
                    >
                      <SelectTrigger
                        className={clsx(
                          "w-full rounded-2xl",
                          startHour === 24 && "pointer-events-none opacity-60",
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map((m) => (
                          <SelectItem
                            key={m}
                            value={String(Number(m))}
                            disabled={startHour === 24 && m !== "00"}
                          >
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* End date */}
                <div className="mb-4 grid gap-2">
                  <Label>End date</Label>
                  <Select
                    value={endDay}
                    onValueChange={(v) => setEndDay(v as Day)}
                  >
                    <SelectTrigger className="w-full rounded-2xl">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayNames.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* End time */}
                <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                  <div className="grid gap-2">
                    <Label>End time</Label>
                    <Select
                      value={String(endHour)}
                      onValueChange={(v) => setEndHour(Number(v))}
                    >
                      <SelectTrigger className="w-full rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-64">
                        {hours.map((h) => (
                          <SelectItem key={h} value={String(h)}>
                            {String(h).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pb-8 text-center text-lg">:</div>

                  <div className="grid gap-2">
                    <Select
                      value={String(endMin)}
                      onValueChange={(v) => setEndMin(Number(v))}
                    >
                      <SelectTrigger
                        className={clsx(
                          "w-full rounded-2xl",
                          endHour === 24 && "pointer-events-none opacity-60",
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map((m) => (
                          <SelectItem
                            key={m}
                            value={String(Number(m))}
                            disabled={endHour === 24 && m !== "00"}
                          >
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Error */}
                {!valid && (
                  <p className="mb-4 text-sm text-red-600">
                    End time must be after start time (including day).
                  </p>
                )}

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Button
                    className="rounded-2xl px-6"
                    disabled={!valid}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
