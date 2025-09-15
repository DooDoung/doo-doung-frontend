import * as React from "react";
import toast from "react-hot-toast";
import { Camera, Pencil } from "lucide-react";
import Image from "next/image";

import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { GlobalInput } from "@/components/globalComponents";
import { ZodiacSign } from "@/types/user";

const user = {
  profileUrl:
    "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
  username: "JohnYakDoodoung",
  zodiacSign: ZodiacSign.Aquarius,
};

function EditUserProfile({
  role,
  editing,
}: {
  role: string;
  editing: boolean;
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [profileUrl, setProfileUrl] = React.useState(user.profileUrl);

  const handleChangeProfile = () => {
    setOpenDialog(true);
    toast.success("Changed!");
  };

  return (
    <div className="bg-primary-500/60 flex w-full flex-col items-center justify-start rounded-3xl p-12 text-center sm:w-[30%]">
      <h3 className="font-sanctuary text-neutral-black mb-8 text-5xl">
        {role}
      </h3>

      {/* Profile + zodiac badge */}
      <div className="relative mb-6 h-[150px] w-[150px] rounded-full border-2 bg-white">
        <img
          alt="Profile"
          src={user.profileUrl === "" ? "/user-profile.svg" : profileUrl}
          className="h-full w-full rounded-full object-cover p-1"
        />

        {role == "customer" && (
          <div className="bg-secondary absolute top-2 right-0 flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
            <Image
              src={`/images/zodiac-sign/${user.zodiacSign}.svg`}
              alt={user.zodiacSign}
              fill
              className="object-contain p-[6px]"
            />
          </div>
        )}

        {editing && (
          <div
            className="bg-secondary absolute bottom-2 left-0 flex h-9 w-9 items-center justify-center rounded-full"
            onClick={handleChangeProfile}
          >
            <Camera strokeWidth={1} size={26} />
          </div>
        )}

        <EditProfilePictureDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          currentImageUrl={profileUrl}
          onSave={(url) => setProfileUrl(url)}
        />
      </div>

      {/* Username */}
      <p className="font-chakra text-neutral-black mb-4 flex items-center self-start text-lg">
        USERNAME
        {editing && <Pencil className="ml-2" size={18} />}
      </p>
      <GlobalInput
        type="text"
        className={`font-chakra mb-4 ${editing ? "" : "cursor-not-allowed"}`}
        fullWidth
        value={user.username}
        readOnly={!editing}
      />
    </div>
  );
}

export default EditUserProfile;
