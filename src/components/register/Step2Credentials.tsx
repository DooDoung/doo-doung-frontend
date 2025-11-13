import { useState } from "react";
import { z } from "zod";

import { GlobalInput } from "@/components/globalComponents";
import Button from "@/components/globalComponents/Button";
import { AppToast } from "@/lib/app-toast";
import { baseSchema } from "@/lib/validators/auth";
import { RegisterFormData } from "@/types/user";

interface Step2Props {
  formData: RegisterFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const step2Schema = baseSchema
  .pick({
    username: true,
    password: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Step2Errors = z.inferFlattenedErrors<typeof step2Schema>["fieldErrors"];

export default function Step2Credentials({
  formData,
  handleChange,
  nextStep,
  prevStep,
}: Step2Props) {
  const [errors, setErrors] = useState<Step2Errors>({});

  const labelStyle = "block text-sm font-medium text-white mb-1";

  const handleNext = () => {
    const result = step2Schema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      AppToast.error("Every field must be completed.");
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <div className="space-y-0">
      <style>{`
        .text-error {
          color: #ff8a80;
          text-shadow: 0 0 5px #ff8a80;
        }
      `}</style>
      <div className="pb-4">
        <label htmlFor="username" className={labelStyle}>
          Username
        </label>
        <GlobalInput
          type="text"
          name="username"
          placeholder="DooDoung"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!errors.username}
          hasHintText={true}
          hintText={errors.username?.[0]}
        />
      </div>
      <div className="pb-4">
        <label htmlFor="password" className={labelStyle}>
          Password
        </label>
        <GlobalInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          hasHintText={true}
          hintText={errors.password?.[0]}
        />
      </div>
      <div className="pb-4">
        <label htmlFor="confirmPassword" className={labelStyle}>
          Confirm Password
        </label>
        <GlobalInput
          type="password"
          name="confirmPassword"
          placeholder="Re-type your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword}
          hasHintText={true}
          hintText={errors.confirmPassword?.[0]}
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          variant="secondary"
          className="w-40"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          className="w-40"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
