import * as React from "react";

import OtherProfile from "@/components/otherAccount/OtherProfile";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import { AccountData } from "@/interface/User";

function OtherAccountLayout({ user }: { user: AccountData }) {
  return (
    <GlassContainer2 className="p-0">
      <OtherProfile user={user} />
    </GlassContainer2>
  );
}

export default OtherAccountLayout;
