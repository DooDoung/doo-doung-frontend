import { toast } from "react-hot-toast";

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

export default function Step3PersonalInfo({
  formData,
  handleChange,
  nextStep,
  prevStep,
  handleSubmit,
}: Step3Props) {
  const inputStyle = "w-full p-2 border border-gray-300 rounded-md";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const buttonStyle =
    "w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm";

  const isProphet = formData.role === "prophet";

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isProphet) {
      handleSubmit(e as any);
      toast.success("Data saved successfully!");
    } else {
      nextStep();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid-cosl-2 grid gap-4">
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
        </div>
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
        </div>
        {isProphet && (
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
          </div>
        )}

        <div className="flex justify-between gap-4">
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
    </div>
  );
}
