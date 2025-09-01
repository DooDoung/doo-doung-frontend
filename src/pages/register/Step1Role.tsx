interface Step1RoleProps {
  handleRoleSelect: (role: "prophet" | "customer") => void;
}

export default function Step1Role({ handleRoleSelect }: Step1RoleProps) {
  const buttonStyle =
    "w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700";
  return (
    <div className="space-y-4">
      <h3 className="text-center text-xl font-semibold text-gray-700">
        I wish to...
      </h3>
      <button
        onClick={() => handleRoleSelect("prophet")}
        className={buttonStyle}
      >
        Read the Path
      </button>
      <button
        onClick={() => handleRoleSelect("customer")}
        className={buttonStyle}
      >
        Find my Path
      </button>
    </div>
  );
}
