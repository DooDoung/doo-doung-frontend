import * as React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import CustomerInfo from "./CustomerInfo";
import ProphetInfo from "./ProphetInfo";
import UserProfile from "./UserProfile";

function AccountLayout({ role }: { role: string }) {
  return (
    // <div className="mt-[10%] flex h-[73%] w-[87%] justify-start">
    <div className="bg-neutral-black/50 shadow-neutral-white mt-[10%] flex h-[73%] w-[87%] justify-start rounded-4xl shadow-[0_0_20px] backdrop-blur-[10px]">
      <UserProfile role={role} />
      {role === "customer" ? <CustomerInfo /> : <ProphetInfo />}
    </div>
  );
}

export default AccountLayout;
