import * as React from "react";

import CustomerInfo from "@/components/account/CustomerInfo";
import ProphetInfo from "@/components/account/ProphetInfo";
import UserProfile from "@/components/account/UserProfile";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import EditCustomerInfo from "./EditAccount/EditCustomerInfo";
import EditUserProfile from "./EditAccount/EditUserProfile";
import EditProphetInfo from "./EditAccount/EditProphetInfo";

function AccountLayout({ role, editing }: { role: string; editing: boolean }) {
  return (
    <GlassContainer2 className="p-0">
      {editing ? (
        <EditUserProfile role={role} editing={editing} />
      ) : (
        <UserProfile role={role} />
      )}
      {editing ? (
        role === "customer" ? (
          <EditCustomerInfo />
        ) : (
          <EditProphetInfo />
        )
      ) : role === "customer" ? (
        <CustomerInfo />
      ) : (
        <ProphetInfo />
      )}
    </GlassContainer2>
  );
}

export default AccountLayout;
