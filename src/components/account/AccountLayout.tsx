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
  onUserUpdate,
}: {
  user: AccountData | undefined;
  editing: boolean;
  onUserUpdate?: (updatedUser: AccountData) => void;
}) {
  // Guard clause to handle undefined user
  if (!user) {
    return (
      <GlassContainer2 className="p-0">
        <div className="flex items-center justify-center p-8 w-full">
          <p className="text-neutral-white font-chakra">Loading user data...</p>
        </div>
      </GlassContainer2>
    );
  }

  return (
    <GlassContainer2 className="p-0">
      {editing ? (
        <EditUserProfile role={user.role} editing={editing} />
      ) : (
        <UserProfile user={user} />
      )}
      {editing ? (
        user.role === "CUSTOMER" ? (
          <EditCustomerInfo user={user} onUserUpdate={onUserUpdate} />
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
