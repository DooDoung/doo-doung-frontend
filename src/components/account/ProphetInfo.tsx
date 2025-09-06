import * as React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProphetCard from "./ProphetCard";
import { prophetFeat } from "@/constants/mock-account";

const prophet = {
  firstName: "John",
  lastName: "Doe",
  gender: "Male",
  phone: "+1 234 567 8900",
  email: "john.doe@gmail.com",
  line: "@johndoe",
};

function ProphetInfo() {
  return (
    <div className="flex max-h-[70vh] w-[70%] flex-col overflow-scroll border-2 p-4">
      <form
        id="prophetInfoForm"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block font-medium">First Name</label>
          <Input
            type="text"
            className="w-full"
            value={prophet.firstName}
            readOnly
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block font-medium">Last Name</label>
          <Input
            type="text"
            className="w-full"
            value={prophet.lastName}
            readOnly
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block font-medium">Gender</label>
          <select
            value={prophet.gender}
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

        {/* Phone Number */}
        <div>
          <label className="mb-1 block font-medium">Phone Number</label>
          <Input type="tel" className="w-full" value={prophet.phone} readOnly />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block font-medium">Email</label>
          <Input
            type="email"
            className="w-full"
            value={prophet.email}
            readOnly
          />
        </div>

        {/* Line ID */}
        <div>
          <label className="mb-1 block font-medium">Line ID</label>
          <Input type="text" className="w-full" value={prophet.line} readOnly />
        </div>
      </form>

      {/* Prophet Features */}
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-2">
        {prophetFeat.map((feat, index) => (
          <ProphetCard key={index} featName={feat} />
        ))}
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center">
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}

export default ProphetInfo;
