import { useEffect,useState } from "react";

import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { DefaultLayout, GlobalButton } from "@/components/globalComponents";

const userRole = "customer";
// const userRole = "prophet";

export default function EditAccountPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState("www.example.url");

  const handleSavePicture = (newUrl: string) => {};

  return (
    <DefaultLayout>
      <GlobalButton
        variant="primary"
        size="lg"
        onClick={() => setIsDialogOpen(true)}
      >
        Edit Profile
      </GlobalButton>

      <EditProfilePictureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSavePicture}
        currentImageUrl={currentProfile}
      />
    </DefaultLayout>
  );
}
