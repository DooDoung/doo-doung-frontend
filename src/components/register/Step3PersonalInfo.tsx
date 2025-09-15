import { useState } from "react";
import { z } from "zod";

import { GlobalInput } from "@/components/globalComponents";
import Button from "@/components/globalComponents/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents/Select";
import { AppToast } from "@/lib/app-toast";
import { baseSchema } from "@/lib/validators/auth";
import { RegisterFormData, Sex } from "@/types/user";

interface Step3Props {
  formData: RegisterFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const step3Schema = baseSchema
  .pick({
    firstName: true,
    lastName: true,
    gender: true,
    email: true,
    phoneNumber: true,
  })
  .extend({
    lineId: z.string().optional(),
  });

type Step3Errors = z.inferFlattenedErrors<typeof step3Schema>["fieldErrors"];

export default function Step3PersonalInfo({
  formData,
  handleChange,
  nextStep,
  prevStep,
  handleSubmit,
}: Step3Props) {
  const [errors, setErrors] = useState<Step3Errors>({});

  const labelStyle = "block text-sm font-medium text-white mb-1";

  const isProphet = formData.role === "PROPHET";

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    const schemaToUse = isProphet
      ? step3Schema.extend({
          lineId: z.string().min(3, "LINE ID must be at least 3 characters"),
        })
      : step3Schema;

    const result = schemaToUse.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      AppToast.error("Every field must be completed.");
      return;
    }

    setErrors({});

    if (isProphet) {
      handleSubmit(e as React.MouseEvent<HTMLButtonElement>);
      //AppToast.success("Data saved successfully!");
    } else {
      nextStep();
    }
  };

  const handleGenderChange = (value: string) => {
    handleChange({
      target: { name: "gender", value },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="space-y-0">
      <style>{`
        .text-error {
          color: #ff8a80;
          text-shadow: 0 0 5px #ff8a80;
        }
      `}</style>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelStyle}>
            First Name
          </label>
          <GlobalInput
            type="text"
            name="firstName"
            placeholder="Chuttiro"
            value={formData.firstName}
            onChange={handleChange}
            isInvalid={!!errors.firstName}
            hintText={errors.firstName?.[0]}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelStyle}>
            Last Name
          </label>
          <GlobalInput
            type="text"
            name="lastName"
            placeholder="ChobDooDoung"
            value={formData.lastName}
            onChange={handleChange}
            isInvalid={!!errors.lastName}
            hintText={errors.lastName?.[0]}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="gender" className={labelStyle}>
            Gender
          </label>
          <Select onValueChange={handleGenderChange} value={formData.gender}>
            <SelectTrigger className="w-full" isInvalid={!!errors.gender}>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Sex.Male}>Male</SelectItem>
              <SelectItem value={Sex.Female}>Female</SelectItem>
              <SelectItem value={Sex.LGBTQ_Plus}>Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-error mt-2 h-5 text-sm">{errors.gender[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <GlobalInput
            type="email"
            name="email"
            placeholder="emailexample@gmail.com"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            hintText={errors.email?.[0]}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="phoneNumber" className={labelStyle}>
            Phone Number
          </label>
          <GlobalInput
            type="text"
            name="phoneNumber"
            placeholder="0123456789"
            value={formData.phoneNumber}
            onChange={handleChange}
            isInvalid={!!errors.phoneNumber}
            hintText={errors.phoneNumber?.[0]}
          />
        </div>
        {isProphet && (
          <div>
            <label htmlFor="lineId" className={labelStyle}>
              LINE ID
            </label>
            <GlobalInput
              type="text"
              name="lineId"
              placeholder="DooDoung"
              value={formData.lineId}
              onChange={handleChange}
              isInvalid={!!errors.lineId}
              hintText={errors.lineId?.[0]}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={prevStep} className="w-40" variant="secondary">
          Back
        </Button>
        <Button onClick={handleNext} className="w-40" variant="primary">
          {isProphet ? "Confirm" : "Next"}
        </Button>
      </div>
    </div>
  );
}
