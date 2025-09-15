import * as React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";

import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import { ZodiacSign } from "@/types/user";

const user = {
  profileUrl:
    "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
  username: "JohnYakDoodoung",
  zodiacSign: ZodiacSign.Aquarius,
};

function UserProfile({ role }: { role: string }) {
  const router = useRouter();

  const handleClicked = () => {
    // For now, just log to console
    toast.success("Logged out successfully!");
    router.push("/login");
    console.log("User logged out");
    // TODO: add real logout logic here (e.g., clear token, redirect)
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
          src={user.profileUrl === "" ? "/user-profile.svg" : user.profileUrl}
          className="h-full w-full rounded-full object-cover p-1"
        />

        <div className="bg-secondary absolute top-2 right-0 flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
          <Image
            src={`/images/zodiac-sign/${user.zodiacSign}.svg`}
            alt={user.zodiacSign}
            fill
            className="object-contain p-[6px]"
          />
        </div>
      </div>

      {/* Username */}
      <p className="font-chakra text-neutral-black mb-4 self-start text-lg">
        USERNAME
      </p>
      <GlobalInput
        type="text"
        className="font-chakra mb-4 cursor-not-allowed"
        fullWidth
        value={user.username}
        readOnly
      />

      {/* Logout */}
      <GlobalButton
        variant="primary"
        size="default"
        className="font-chakra mb-4"
        onClick={handleClicked}
      >
        LOG OUT
      </GlobalButton>

      {/* Reset password*/}
      <a
        href="/reset-password/token"
        className="font-chakra text-neutral-black hover:underline"
      >
        {" "}
        reset password
      </a>
    </div>
  );
}

export default UserProfile;
