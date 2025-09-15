import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { useState, useEffect } from "react";
import AccountLayout from "@/components/account/AccountLayout";

const userRole = "customer";
// const userRole = "prophet";

export default function EditAccountPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState("www.example.url");

  const handleSavePicture = (newUrl: string) => {};

  return (
    <DefaultLayout contentClassName="flex justify-center items-center">
      <AccountLayout role={userRole} editing={true} />
    </DefaultLayout>
  );
}
