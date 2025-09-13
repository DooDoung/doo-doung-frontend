import * as React from "react";

import ProphetCard from "@/components/account/ProphetCard";
import { prophetFeat } from "@/constants/constant-ex";
import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

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

function ProphetInfo() {
  return (
    <div className="flex max-h-[70vh] w-[70%] flex-col overflow-y-auto p-4">
      <form
        id="prophetInfoForm"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            First Name
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={prophet.firstName}
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
            value={prophet.lastName}
            readOnly
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Gender
          </label>
          <Select value={prophet.gender.toLowerCase()} disabled>
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

        {/* Phone Number */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Phone Number
          </label>
          <GlobalInput
            type="tel"
            className="w-full cursor-not-allowed"
            value={prophet.phone}
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
            value={prophet.email}
            readOnly
          />
        </div>

        {/* Line ID */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Line ID
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={prophet.line}
            readOnly
          />
        </div>
      </form>

      {/* Prophet Features */}
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-2">
        {prophetFeat.map((feat, index) => (
          <ProphetCard
            key={index}
            feat={feat}
            transaction={prophet.transaction}
          />
        ))}
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center">
        <GlobalButton variant="primary" className="font-light">
          EDIT PROFILE
        </GlobalButton>
      </div>
    </div>
  );
}

export default ProphetInfo;
