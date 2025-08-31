import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserProfile from "./UserProfile";
import CustomerInfo from "./CustomerInfo";
import ProphetInfo from "./ProphetInfo";

function AccountLayout({role}: {role: string}) {
  return (
    <div className="mt-[10%] flex h-[73%] w-[87%] justify-start">
      <UserProfile role={role} />
      {role === "customer" ? <CustomerInfo /> : <ProphetInfo />}
    </div>
  );
}

export default AccountLayout;
