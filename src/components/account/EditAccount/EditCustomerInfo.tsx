import * as React from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ZodiacSign } from "@/types/user";

import { Switch } from "../../ui/switch";

const customer = {
  firstName: "John",
  lastName: "Doe",
  gender: "Male",
  dob: "1995-07-20",
  tob: "08:30",
  zodiac: "Cancer",
  email: "john.doe@gmail.com",
  phone: "+1 234 567 8900",
};

function EditCustomerInfo() {
  const [isPublic, setIsPublic] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(customer);
  const router = useRouter();

  const handleChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleSave = async () => {
    try {
      // mock: call API
      console.log("Saving profile:", userInfo, { isPublic });

      // TODO: replace with real API call, e.g.:
      // await fetch("/api/user/update", { method: "POST", body: JSON.stringify(userInfo) });

      toast.success("Profile updated successfully!");
      router.push("/account");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
      <div className="flex flex-col items-center self-end font-light text-white uppercase">
        <p>{isPublic ? "Public" : "Private"}</p>
        <Switch
          className="self-end"
          size="lg"
          checked={isPublic}
          onCheckedChange={(checked) => setIsPublic(checked)}
          disabled
        />
      </div>
      <form
        id="customerInfoForm"
        className="font-chakra mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
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
            // value={customer.firstName}
            value={userInfo.firstName}
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
            // value={customer.lastName}
            value={userInfo.lastName}
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
            value={userInfo.gender.toLowerCase()}
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

        {/* Date of Birth */}
        <div>
          <label className="mb-1 block flex items-center font-extralight text-white uppercase">
            Date of Birth
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="date"
            className="w-full"
            // value={customer.dob}
            value={userInfo.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        {/* Time of Birth */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Time of Birth
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="time"
            className="w-full"
            // value={customer.tob}
            value={userInfo.tob}
            onChange={(e) => handleChange("tob", e.target.value)}
          />
        </div>

        {/* Zodiac Sign */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Zodiac Sign
            <Pencil className="ml-2" size={18} />
          </label>
          <Select
            value={userInfo.zodiac.toLowerCase()}
            onValueChange={(val) => handleChange("zodiac", val)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ZodiacSign).map((sign) => (
                <SelectItem key={sign} value={sign}>
                  {sign.charAt(0).toUpperCase() + sign.slice(1)}
                </SelectItem>
              ))}
              <SelectItem value="undefined">Undefined</SelectItem>
            </SelectContent>
          </Select>
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
            // value={customer.email}
            value={userInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
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
            // value={customer.phone}
            value={userInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
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

export default EditCustomerInfo;
