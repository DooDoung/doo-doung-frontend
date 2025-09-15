import * as React from "react";

import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import OtherProfile from "@/components/otherAccount/OtherProfile";
import { AccountData } from "@/interface/User";
import CustomerPublicInfo from "@/components/account/CustomerPublicInfo";
import ProphetPublicInfo from "@/components/account/ProphetPublicInfo";

function OtherAccountLayout({ user }: { user: AccountData }) {
  return (
    <GlassContainer2 className="p-0">
      <OtherProfile user={user} />
      {user.role === "CUSTOMER" ? (
        <CustomerPublicInfo />
      ) : (
        <ProphetPublicInfo />
      )}
    </GlassContainer2>
  );
}

export default OtherAccountLayout;
