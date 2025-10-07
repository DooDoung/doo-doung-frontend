import * as React from "react";

import CustomerInfo from "@/components/account/CustomerInfo";
import ProphetInfo from "@/components/account/ProphetInfo";
import UserProfile from "@/components/account/UserProfile";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import { AccountData, CustomerAccount, ProphetAccount } from "@/interface/User";

import EditCustomerInfo from "./EditAccount/EditCustomerInfo";
import EditProphetInfo from "./EditAccount/EditProphetInfo";
import EditUserProfile from "./EditAccount/EditUserProfile";

function AccountLayout({
  user,
  editing,
}: {
  user: AccountData;
  editing: boolean;
}) {
  return (
    <GlassContainer2 className="p-0">
      {editing ? (
        <EditUserProfile role={user.role} editing={editing} />
      ) : (
        <UserProfile user={user} />
      )}
      {editing ? (
        user.role === "CUSTOMER" ? (
          <EditCustomerInfo />
        ) : (
          <EditProphetInfo />
        )
      ) : user.role === "CUSTOMER" ? (
        <CustomerInfo customer={user as CustomerAccount} />
      ) : (
        <ProphetInfo prophet={user as ProphetAccount} />
      )}
    </GlassContainer2>
  );
}

export default AccountLayout;
