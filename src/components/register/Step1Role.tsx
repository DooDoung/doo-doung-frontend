import { useState } from "react";

import { GlobalButton } from "@/components/globalComponents/Button";
import { AppToast } from "@/lib/app-toast";

import { RoleSelector } from "./RoleSelector";

interface Step1RoleProps {
  handleRoleSelect: (role: "prophet" | "customer") => void;
}

export default function Step1Role({ handleRoleSelect }: Step1RoleProps) {
  const [selectedRole, setSelectedRole] = useState<
    "prophet" | "customer" | null
  >(null);

  const handleSelect = (role: "prophet" | "customer") => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      handleRoleSelect(selectedRole);
    } else {
      AppToast.error("Select your role to proceed.");
    }
  };

  return (
    <div className="font-chakra flex flex-col space-y-6">
      <h3 className="font-chakra text- text-neutral-white text-center text-xl">
        I wish to...
      </h3>
      <div className="mb-5 flex justify-center gap-24">
        <RoleSelector
          onClick={() => handleSelect("prophet")}
          selected={selectedRole === "prophet"}
          imageSrc="/images/register/read_the_path.webp"
          text="Read the Path"
        />
        <RoleSelector
          onClick={() => handleSelect("customer")}
          selected={selectedRole === "customer"}
          imageSrc="/images/register/find_my_path.webp"
          text="Find my Path"
        />
      </div>
      <div className="mb-2 flex justify-center pb-3">
        <GlobalButton
          type="button"
          onClick={handleNext}
          variant="primary"
          className="w-40"
        >
          Next
        </GlobalButton>
      </div>
    </div>
  );
}
