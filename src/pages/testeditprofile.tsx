import { useState } from "react";

import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { DefaultLayout, GlobalButton } from "@/components/globalComponents";

export default function TestEditProfilePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSavePicture = (newUrl: string) => {
    console.log("New image URL to save:", newUrl);
    // TODO: ใส่ logic การเรียก API เพื่ออัปเดต URL รูปภาพที่นี่
  };
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
        currentImageUrl="https://example.com/current-image.jpg"
      />
    </DefaultLayout>
  );
}
