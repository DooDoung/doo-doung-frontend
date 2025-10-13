import * as React from "react";

import CustomerPublicInfo from "@/components/account/CustomerPublicInfo";
import ProphetPublicInfo from "@/components/account/ProphetPublicInfo";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import OtherProfile from "@/components/otherAccount/OtherProfile";
import { AccountData, CustomerAccount } from "@/interface/User";
import { useState, useEffect } from "react";
import axios from "axios";

function OtherAccountLayout({
  user,
  accountId,
}: {
  user: AccountData;
  accountId: string;
}) {
  const [isPublic, setIsPublic] = useState(false);
  useEffect(() => {
    if (user.role === "CUSTOMER") {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const fetchPublicStatus = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/customer/public-status/${accountId}`,
          );
          setIsPublic(response.data.data.isPublic);
        } catch (error) {
          console.error("Error fetching public status:", error);
        }
      };

      fetchPublicStatus();
    }
  }, [accountId, user.role]);

  return (
    <GlassContainer2 className="p-0">
      {user.role === "CUSTOMER" ? (
        <>
          <OtherProfile user={user} isPublic={isPublic} />
          <CustomerPublicInfo
            accountId={accountId}
            account={user as CustomerAccount}
            isPublic={isPublic}
          />
        </>
      ) : (
        <>
          <OtherProfile user={user} />
          <ProphetPublicInfo />
        </>
      )}
    </GlassContainer2>
  );
}

export default OtherAccountLayout;
