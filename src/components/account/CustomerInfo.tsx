import * as React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import ReservationSection from "./Reservation/ReservationSection";
import ReviewSection from "./Review/ReviewSection";
import { mockReservation } from "@/constants/mock-account";
import { mockReview } from "@/constants/mock-account";

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
  return (
    <div className="flex max-h-[70vh] w-[70%] flex-col overflow-scroll border-2 p-4">
      <div className="flex flex-col items-center self-end">
        <p>{isPublic ? "Public" : "Private"}</p>
        <Switch
          className="self-end"
          checked={isPublic}
          onCheckedChange={(checked) => setIsPublic(checked)}
        />
      </div>
      <form
        id="customerInfoForm"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block font-medium">First Name</label>
          <Input
            type="text"
            className="w-full"
            value={customer.firstName}
            readOnly
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block font-medium">Last Name</label>
          <Input
            type="text"
            className="w-full"
            value={customer.lastName}
            readOnly
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block font-medium">Gender</label>
          <select
            value={customer.gender}
            disabled
            className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 px-3 py-2"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>LGBTQ+</option>
            <option>Undefined</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-1 block font-medium">Date of Birth</label>
          <Input type="date" className="w-full" value={customer.dob} readOnly />
        </div>

        {/* Time of Birth */}
        <div>
          <label className="mb-1 block font-medium">Time of Birth</label>
          <Input type="time" className="w-full" value={customer.tob} readOnly />
        </div>

        {/* Zodiac Sign */}
        <div>
          <label className="mb-1 block font-medium">Zodiac Sign</label>
          <Input
            type="text"
            className="w-full"
            value={customer.zodiac}
            readOnly
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block font-medium">Email</label>
          <Input
            type="email"
            className="w-full"
            value={customer.email}
            readOnly
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-1 block font-medium">Phone Number</label>
          <Input
            type="tel"
            className="w-full"
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
      <div className="flex justify-center">
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}

export default CustomerInfo;
