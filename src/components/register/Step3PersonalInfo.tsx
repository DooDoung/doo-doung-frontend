import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { baseSchema } from "@/lib/validators/auth"; // Make sure this path is correct
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

// We create a schema that includes all possible fields for this step
const step3Schema = baseSchema
  .pick({
    firstName: true,
    lastName: true,
    gender: true,
    email: true,
    phoneNumber: true,
  })
  .extend({
    // lineId is only for prophets, so we make it optional here
    lineId: z.string().optional(),
  });

// A type for our validation errors
type Step3Errors = z.inferFlattenedErrors<typeof step3Schema>["fieldErrors"];

export default function Step3PersonalInfo({
  formData,
  handleChange,
  nextStep,
  prevStep,
  handleSubmit,
}: Step3Props) {
  const [errors, setErrors] = useState<Step3Errors>({});

  const inputStyle = "w-full p-2 border border-gray-300 rounded-md";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const buttonStyle =
    "w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm";

  const isProphet = formData.role === "prophet";

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    // For prophets, we also need to validate the lineId
    const schemaToUse = isProphet
      ? step3Schema.extend({
          lineId: z.string().min(3, "LINE ID must be at least 3 characters"),
        })
      : step3Schema;

    const result = schemaToUse.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({}); // Clear errors on success

    if (isProphet) {
      handleSubmit(e as any);
      toast.success("Data saved successfully!");
    } else {
      nextStep();
    }
  };

  return (
    <div className="space-y-4">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelStyle}>
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className={labelStyle}>
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName[0]}</p>
          )}
        </div>
      </div>

      {/* Conditional Fields based on Role */}
      {isProphet ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className={labelStyle}>
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {Object.values(Sex)
                  .filter((s) => s !== Sex.Undefined)
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="lineId" className={labelStyle}>
                LINE ID
              </label>
              <input
                type="text"
                name="lineId"
                value={formData.lineId}
                onChange={handleChange}
                className={inputStyle}
              />
              {errors.lineId && (
                <p className="mt-1 text-sm text-red-500">{errors.lineId[0]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className={labelStyle}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={inputStyle}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber[0]}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className={labelStyle}>
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {Object.values(Sex)
                  .filter((s) => s !== Sex.Undefined)
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber" className={labelStyle}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber[0]}
              </p>
            )}
          </div>
        </>
      )}

      <div className="mt-4 flex justify-between gap-4">
        <button
          onClick={prevStep}
          className={`${buttonStyle} bg-gray-500 hover:bg-gray-600`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`}
        >
          {isProphet ? "Confirm" : "Next"}
        </button>
      </div>
    </div>
  );
}
