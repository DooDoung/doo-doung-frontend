import * as React from "react";
import { useRouter } from "next/navigation";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockReservation } from "@/constants/mock-account";
import { mockReview } from "@/constants/mock-account";

import { Switch } from "../ui/switch";

import ReservationSection from "./Reservation/ReservationSection";
import ReviewSection from "./Review/ReviewSection";

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

function CustomerInfo() {
  const [isPublic, setIsPublic] = React.useState(false);
  const router = useRouter();
  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
      <div className="flex flex-col items-center self-end font-light text-white uppercase">
        <p>{isPublic ? "Public" : "Private"}</p>
        <Switch
          className="self-end"
          size="lg"
          checked={isPublic}
          onCheckedChange={(checked) => setIsPublic(checked)}
        />
      </div>
      <form
        id="customerInfoForm"
        className="font-chakra mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            First Name
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={customer.firstName}
            readOnly
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Last Name
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={customer.lastName}
            readOnly
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Gender
          </label>
          <Select value={customer.gender.toLowerCase()} disabled>
            <SelectTrigger className="w-full cursor-not-allowed bg-white">
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
          <label className="mb-1 block font-extralight text-white uppercase">
            Date of Birth
          </label>
          <GlobalInput
            type="date"
            className="w-full cursor-not-allowed"
            value={customer.dob}
            readOnly
          />
        </div>

        {/* Time of Birth */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Time of Birth
          </label>
          <GlobalInput
            type="time"
            className="w-full cursor-not-allowed"
            value={customer.tob}
            readOnly
          />
        </div>

        {/* Zodiac Sign */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Zodiac Sign
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={customer.zodiac}
            readOnly
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Email
          </label>
          <GlobalInput
            type="email"
            className="w-full cursor-not-allowed"
            value={customer.email}
            readOnly
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Phone Number
          </label>
          <GlobalInput
            type="tel"
            className="w-full cursor-not-allowed"
            value={customer.phone}
            readOnly
          />
        </div>
      </form>

      {/* Reservation Section */}
      <ReservationSection myReservation={mockReservation} />

      {/* User's Course Reviewed Section */}
      <ReviewSection myReview={mockReview} />

      {/* Edit Profile Button */}
      <div className="mb-2 flex justify-center">
        <GlobalButton
          variant="primary"
          onClick={() => {
            router.push("/account/edit-account");
          }}
        >
          EDIT PROFILE
        </GlobalButton>
      </div>
    </div>
  );
}

export default CustomerInfo;
