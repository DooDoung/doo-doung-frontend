import { useState } from "react";
import { useRouter } from "next/router";

import { AuthLayout, GlassContainer } from "@/components/globalComponents";
import Step1Role from "@/components/register/Step1Role";
import Step2Credentials from "@/components/register/Step2Credentials";
import Step3PersonalInfo from "@/components/register/Step3PersonalInfo";
import Step4Astrological from "@/components/register/Step4Astrological";
import StepPrivacyPolicy from "@/components/register/StepPrivacyPolicy";
import { AppToast } from "@/lib/app-toast";
import { RegisterFormData, ZodiacSign } from "@/types/user";

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
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: "PROPHET" | "CUSTOMER") => {
    setFormData((prev) => ({ ...prev, role }));
    setStep(5); // Go to Privacy Policy step
  };
  const nextStep = () => {
    if (step === 3) {
      if (formData.role === "CUSTOMER") {
        setStep(4);
      }
    } else if (step === 4 && formData.role === "CUSTOMER") {
      setStep(6);
    } else {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const handlePrivacyPolicyNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Go to credentials
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { confirmPassword, firstName, lastName, gender, birthDate, ...rest } =
      formData;

    const body = {
      ...rest,
      role: formData.role.toUpperCase(),
      name: firstName,
      lastname: lastName,
      gender: formData.gender.toUpperCase(),
      zodiacSign: (formData.zodiacSign || "").toUpperCase(),
      birthDate: birthDate ? new Date(birthDate) : undefined,
      // profileUrl is required by the DTO but not in the form, sending an empty string.
      profileUrl: "",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/register`,
        {
          method: "POST", // Changed from PATCH to POST for creation
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        const errorMessage =
          result.error && typeof result.error === "string"
            ? result.error
            : "Registration failed";
        throw new Error(errorMessage);
      }

      AppToast.success("Registration successful!");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        AppToast.error(
          error.message || "An error occurred during registration.",
        );
      } else {
        AppToast.error("An error occurred during registration.");
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Role handleRoleSelect={handleRoleSelect} />;
      case 2:
        return (
          <Step2Credentials
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={() => setStep(5)} // Go back to privacy policy
          />
        );
      case 3:
        return (
          <Step3PersonalInfo
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      case 4:
        return (
          <Step4Astrological
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            nextStep={handleSubmit}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <StepPrivacyPolicy
            onPrev={() => setStep(1)}
            onNext={handlePrivacyPolicyNext}
          />
        );
      case 6:
        return (
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white"
          >
            Register
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <GlassContainer className="flex h-[80vh] w-[calc(80vh*45/32)] flex-col items-center justify-center">
        {step !== 5 && (
          <h1 className="font-sanctuary mt-2 w-full text-center text-3xl text-white">
            Create New Account
          </h1>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-4"
        >
          {renderStep()}
        </form>
      </GlassContainer>
    </AuthLayout>
  );
}
