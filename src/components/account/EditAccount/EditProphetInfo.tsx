import * as React from "react";
import { useRouter } from "next/navigation";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppToast } from "@/lib/app-toast";
import { Pencil } from "lucide-react";
import ProphetCard from "../ProphetCard";

const prophet = {
  firstName: "John",
  lastName: "Doe",
  gender: "Male",
  phone: "+1 234 567 8900",
  email: "john.doe@gmail.com",
  line: "@johndoe",
  transaction: {
    accountNumber: "123-456-7890",
    accountName: "John Doe",
    imageUrl: "/images/transaction-bank/SCB.webp",
    bankName: "SCB",
  },
};

function EditProphetInfo() {
  const [prophetInfo, setProphetInfo] = React.useState(prophet);
  const router = useRouter();

  const handleChange = (field: keyof typeof prophet, value: string) => {
    setProphetInfo({ ...prophet, [field]: value });
  };

  const handleSave = async () => {
    try {
      // mock: call API
      console.log("Saving prophet profile:", prophet);

      // TODO: replace with real API call
      // await fetch("/api/prophet/update", { method: "POST", body: JSON.stringify(prophet) });

      AppToast.success("Prophet profile updated successfully!");
      router.push("/account"); // go back after save
    } catch (err) {
      AppToast.error("Failed to update profile");
    }
  };
  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
      <form
        id="prophetInfoForm"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            First Name
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={prophetInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Last Name
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={prophetInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Gender
            <Pencil className="ml-2" size={18} />
          </label>
          <Select
            value={prophet.gender.toLowerCase()}
            onValueChange={(val) =>
              handleChange("gender", val.charAt(0).toUpperCase() + val.slice(1))
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="lgbtq+">LGBTQ+</SelectItem>
              <SelectItem value="undefined">Undefined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Phone Number
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="tel"
            className="w-full"
            value={prophetInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Email
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="email"
            className="w-full"
            value={prophetInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Line ID */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Line ID
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={prophetInfo.line}
            onChange={(e) => handleChange("line", e.target.value)}
          />
        </div>

        {/* Prophet Features */}
        <div className="relative mb-4 md:col-span-2">
          <Pencil
            className="text-neutral-white absolute top-1 left-44 ml-2"
            size={18}
          />
          <ProphetCard
            feat={{
              name: "Transaction Account",
              imageUrl: "",
              goTo: "/account/prophet/transaction-account",
            }}
            transaction={prophetInfo.transaction}
          />
        </div>

        {/* Save Profile Button */}
        <div className="mb-2 flex justify-center md:col-span-2">
          <GlobalButton variant="secondary" type="submit">
            SAVE PROFILE
          </GlobalButton>
        </div>
      </form>
    </div>
  );
}

export default EditProphetInfo;
