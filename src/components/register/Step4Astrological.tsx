import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents/Select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppToast } from "@/lib/app-toast";
import { cn } from "@/lib/utils";
import { customerSchema } from "@/lib/validators/auth";
import { RegisterFormData, ZodiacSign } from "@/types/user";

interface Step4Props {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: (e: React.FormEvent) => void;
  prevStep: () => void;
}

const step4Schema = customerSchema.pick({
  birthDate: true,
  birthTime: true,
  zodiacSign: true,
});

type Step4Errors = z.inferFlattenedErrors<typeof step4Schema>["fieldErrors"];

export default function Step4Astrological({
  formData,
  setFormData,
  handleChange,
  nextStep,
  prevStep,
}: Step4Props) {
  const [errors, setErrors] = useState<Step4Errors>({});
  const labelStyle = "block text-sm font-medium text-white mb-1";

  const handleZodiacChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      zodiacSign: value as ZodiacSign,
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const result = step4Schema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      AppToast.error("Every field must be completed.");
      return;
    }

    setErrors({});
    nextStep(e);
  };

  return (
    <div className="font-chakra">
      <style>{`
        .text-error {
          color: #ff8a80;
          text-shadow: 0 0 5px #ff8a80;
        }
      `}</style>
      <div className="space-y-4">
        <div className="text-center text-sm text-white">
          ... The stars in your birth date whisper your story ...
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>Date of Birth</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
                    "shadow-[4px_4px_14px_0px_#00000040] backdrop-blur-md",
                    "bg-neutral-white/50 flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none",
                    !formData.birthDate && "text-muted-foreground",
                  )}
                >
                  <span className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.birthDate ? (
                      format(formData.birthDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.birthDate}
                  onSelect={(date) =>
                    setFormData((prev) => ({ ...prev, birthDate: date }))
                  }
                />
              </PopoverContent>
            </Popover>
            {errors.birthDate && (
              <p className="text-error mt-1 text-sm">{errors.birthDate[0]}</p>
            )}
          </div>
          <div>
            <label className={labelStyle}>Time of Birth</label>
            <GlobalInput
              type="time"
              name="birthTime"
              value={formData.birthTime}
              onChange={handleChange}
              isInvalid={!!errors.birthTime}
              hintText={errors.birthTime?.[0]}
            />
          </div>
        </div>
        <div>
          <label className={labelStyle}>Zodiac Sign</label>
          <Select
            onValueChange={handleZodiacChange}
            value={formData.zodiacSign}
          >
            <SelectTrigger className="w-full" isInvalid={!!errors.zodiacSign}>
              <SelectValue placeholder="Select Zodiac" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ZodiacSign).map((sign) => (
                <SelectItem key={sign} value={sign}>
                  {sign}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.zodiacSign && (
            <p className="text-error mt-2 h-5 text-sm">
              {errors.zodiacSign[0]}
            </p>
          )}
        </div>
        <div className="col-span-2 flex justify-center gap-4 pt-4">
          <GlobalButton
            type="button"
            variant="secondary"
            className="w-40"
            onClick={prevStep}
          >
            Back
          </GlobalButton>
          <GlobalButton
            variant="primary"
            className="w-40"
            type="button"
            onClick={handleNext}
          >
            Confirm
          </GlobalButton>
        </div>
      </div>
    </div>
  );
}
