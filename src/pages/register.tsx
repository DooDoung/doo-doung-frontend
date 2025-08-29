import React, { useState } from "react";
import toast from "react-hot-toast";

import { DefaultLayout } from "@/components/globalComponents";
import { RegisterFormData, Sex } from "@/types/user";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    isProphet: false,
    transactionAccount: "",
    lineId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //THIS IS A MOCK
      console.log("Submitting registration data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formData.username.toLowerCase() === "error") {
        throw new Error("This username is already taken");
      }
      toast.success("Registration Successful!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occured.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="fond-bold text-center text-3xl text-gray-800">
          Register
        </h2>
        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Account Information
          </h3>
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username:{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            User & Contact Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelStyle}>
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelStyle}>
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className={labelStyle}>
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="gender" className={labelStyle}>
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={inputStyle}
            >
              <option value="" disabled>
                Select Gender
              </option>
              {Object.values(Sex)
                .filter((s) => s !== Sex.Undefined)
                .map((genderValue) => (
                  <option key={genderValue} value={genderValue}>
                    {genderValue.replace("_", " ")}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Prophet Role (Optional)
          </h3>
          <div className="flex items-center gap-2">
            <input
              id="isProphet"
              type="checkbox"
              name="isProphet"
              checked={formData.isProphet}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring"
            />
            <label
              htmlFor="isProphet"
              className="text-sm font-medium text-gray-700"
            >
              I want to register as a prophet
            </label>
          </div>
          {formData.isProphet && (
            <div className="ml-5 space-y-4 border-l-2 border-indigo-200 pl-5">
              <h4 className="text-lg font-semibold text-gray-700">
                Prophet Information
              </h4>
              <div>
                <label htmlFor="transactionAccount" className={labelStyle}>
                  Transaction Account:{" "}
                </label>
                <input
                  type="text"
                  id="transactionAccount"
                  name="transactionAccount"
                  value={formData.transactionAccount}
                  onChange={handleChange}
                  required={formData.isProphet}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="lineId" className={labelStyle}>
                  Line ID:{" "}
                </label>
                <input
                  type="text"
                  id="lineId"
                  name="lineId"
                  value={formData.lineId}
                  onChange={handleChange}
                  required={formData.isProphet}
                  className={inputStyle}
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </DefaultLayout>
  );
}
