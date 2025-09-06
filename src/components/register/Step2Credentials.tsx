import { RegisterFormData } from "@/types/user";

interface Step2Props {
  formData: RegisterFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2Credentials({
  formData,
  handleChange,
  nextStep,
  prevStep,
}: Step2Props) {
  const inputStyle = "w-full p-2 border border-gray-300 rounded-md";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const buttonStyle =
    "w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm disabled:bg-gray-400";

  const passwordsMatch = formData.password === formData.confirmPassword;

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
        {!passwordsMatch && formData.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
        )}
      </div>
      <div className="flex justify-between gap-4">
        <button
          onClick={prevStep}
          className={`${buttonStyle} bg-gray-500 hover:bg-gray-600`}
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className={`${buttonStyle} bg-indigo-600 hover:bg-indigo-700`}
          disabled={
            !passwordsMatch || !formData.password || !formData.confirmPassword
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
