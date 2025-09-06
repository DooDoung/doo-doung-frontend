import { useState } from "react";
import { toast } from "react-hot-toast";

interface Step1RoleProps {
  handleRoleSelect: (role: "prophet" | "customer") => void;
}

export default function Step1Role({ handleRoleSelect }: Step1RoleProps) {
  const [selectedRole, setSelectedRole] = useState<
    "prophet" | "customer" | null
  >(null);

  const buttonBase =
    "py-3 px-4 font-semibold rounded-md shadow-sm flex-1 border transition-colors duration-150";
  const selectedStyle = "bg-indigo-600 text-white border-indigo-700";
  const unselectedStyle =
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";

  const handleSelect = (role: "prophet" | "customer") => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      handleRoleSelect(selectedRole);
    } else {
      toast.error("Select your role to proceed.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-center text-xl font-semibold text-gray-700">
        I wish to...
      </h3>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleSelect("prophet")}
          className={`${buttonBase} ${selectedRole === "prophet" ? selectedStyle : unselectedStyle}`}
        >
          Read the Path
        </button>
        <button
          type="button"
          onClick={() => handleSelect("customer")}
          className={`${buttonBase} ${selectedRole === "customer" ? selectedStyle : unselectedStyle}`}
        >
          Find my Path
        </button>
      </div>
      <button
        type="button"
        onClick={handleNext}
        className={`mt-4 w-full rounded-md px-4 py-3 font-semibold shadow-sm transition-colors duration-150 ${selectedRole ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-300 text-gray-500"}`}
      >
        Next
      </button>
    </div>
  );
}
