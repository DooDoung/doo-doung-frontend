import * as React from "react";

import CustomerInfo from "@/components/account/CustomerInfo";
import ProphetInfo from "@/components/account/ProphetInfo";
import UserProfile from "@/components/account/UserProfile";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";

function AccountLayout({ role }: { role: string }) {
  return (
    <GlassContainer2 className="p-0">
      <UserProfile role={role} />
      {role === "customer" ? <CustomerInfo /> : <ProphetInfo />}
    </GlassContainer2>
  );
}

export default AccountLayout;
