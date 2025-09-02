import { useState } from "react";
import { toast } from "react-hot-toast/headless";

import { DefaultLayout } from "@/components/globalComponents";
import { RegisterFormData, Sex, ZodiacSign } from "@/types/user";

import Step1Role from "./register/Step1Role";
import Step2Credentials from "./register/Step2Credentials";
import Step3PersonalInfo from "./register/Step3PersonalInfo";
import Step4Astrological from "./register/Step4Astrological";
import StepPrivacyPolicy from "./register/StepPrivacyPolicy";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    role: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    birthDate: undefined,
    birthTime: "",
    zodiacSign: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: "prophet" | "customer") => {
    setFormData((prev) => ({ ...prev, role }));
    nextStep();
  };
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Submitting Data!");
    // Submit the form data to the server
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Role handleRoleSelect={handleRoleSelect} />;
      case 2:
        return <StepPrivacyPolicy nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return (
          <Step2Credentials
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step3PersonalInfo
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      case 5:
        if (formData.role === "customer") {
          return (
            <Step4Astrological
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              prevStep={prevStep}
            />
          );
        }
        setStep(4);
        return null;
      default:
        return <div>Form complete</div>;
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Create New Account
        </h2>
        {renderStep()}
      </div>
    </DefaultLayout>
  );
}
