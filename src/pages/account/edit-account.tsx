import { useEffect,useState } from "react";

import AccountLayout from "@/components/account/AccountLayout";
import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { DefaultLayout, GlobalButton } from "@/components/globalComponents";

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
