import * as React from "react";

import CustomerPublicInfo from "@/components/account/CustomerPublicInfo";
import ProphetPublicInfo from "@/components/account/ProphetPublicInfo";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import OtherProfile from "@/components/otherAccount/OtherProfile";
import { AccountData } from "@/interface/User";

function OtherAccountLayout({
  user,
  accountId,
}: {
  user: AccountData;
  accountId: string;
}) {
  return (
    <GlassContainer2 className="p-0">
      <OtherProfile user={user} />
      {user.role === "CUSTOMER" ? (
        <CustomerPublicInfo accountId={accountId} account={user} />
      ) : (
        <ProphetPublicInfo />
      )}
    </GlassContainer2>
  );
}

export default OtherAccountLayout;
