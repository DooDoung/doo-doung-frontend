import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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

export default function Step4Astrological({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  prevStep,
}: Step4Props) {
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const handleZodiacChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      zodiacSign: value as ZodiacSign,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
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
                  setFormData((prev) => ({
                    ...prev,
                    birthDate:
                      date instanceof Date && !isNaN(date.getTime())
                        ? date
                        : undefined,
                  }))
                }
              />
            </PopoverContent>
          </Popover>
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
