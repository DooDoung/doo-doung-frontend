import { useState } from "react";
import { z } from "zod";

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

  const inputStyle = "w-full p-2 border border-gray-300 rounded-md";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const buttonStyle =
    "w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm disabled:bg-gray-400";

  const handleNext = () => {
    const result = step2Schema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="username" className={labelStyle}>
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className={labelStyle}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className={labelStyle}>
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword[0]}
          </p>
        )}
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          className={`${buttonStyle} bg-gray-500 hover:bg-gray-600`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={`${buttonStyle} bg-indigo-600 hover:bg-indigo-700`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
