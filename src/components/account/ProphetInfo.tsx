import * as React from "react";
import { useRouter } from "next/navigation";

import ProphetCard from "@/components/account/ProphetCard";
import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { prophetFeat } from "@/constants/constant-ex";
import type { ProphetAccount } from "@/interface/User";

function ProphetInfo({ prophet }: { prophet: ProphetAccount }) {
  const router = useRouter();
  
  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
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
            value={prophet.phoneNumber}
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
            transaction={prophet.txAccounts[0]}
          />
        ))}
      </div>

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

export default ProphetInfo;
