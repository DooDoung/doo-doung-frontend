import { useState } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customerSchema } from "@/lib/validators/auth";
import { RegisterFormData, ZodiacSign } from "@/types/user";

interface Step4Props {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
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
  handleSubmit,
  prevStep,
}: Step4Props) {
  const [errors, setErrors] = useState<Step4Errors>({});
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  const handleZodiacChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      zodiacSign: value as ZodiacSign,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = step4Schema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    handleSubmit(e);
    toast.success("Data saved successfully!");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center text-sm text-gray-500">
        ... The stars in your birth date whisper your story ...
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Date of Birth</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`w-full rounded border px-3 py-2 text-left font-normal ${!formData.birthDate ? "text-muted-foreground" : ""}`}
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
            <p className="mt-1 text-sm text-red-500">{errors.birthDate[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="birthTime" className={labelStyle}>
            Time
          </label>
          <Input
            id="birthTime"
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
          />
          {errors.birthTime && (
            <p className="mt-1 text-sm text-red-500">{errors.birthTime[0]}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="zodiacSign" className={labelStyle}>
          Zodiac Sign
        </label>
        <Select value={formData.zodiacSign} onValueChange={handleZodiacChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select your Zodiac Sign" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ZodiacSign).map((sign) => (
              <SelectItem key={sign} value={sign} className="capitalize">
                {sign}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.zodiacSign && (
          <p className="mt-1 text-sm text-red-500">{errors.zodiacSign[0]}</p>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="w-full rounded border bg-white px-3 py-2 hover:bg-gray-100"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full rounded border bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}
