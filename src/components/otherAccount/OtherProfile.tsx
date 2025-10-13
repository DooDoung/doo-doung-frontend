import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import { AccountData } from "@/interface/User";

function OtherProfile({ user }: { user: AccountData }) {
  const router = useRouter();

  return (
    <div className="bg-primary-500/60 flex w-full flex-col items-center justify-start rounded-3xl p-12 text-center sm:w-[30%]">
      <h3 className="font-sanctuary text-neutral-black mb-8 text-5xl">
        {user.role}
      </h3>

      {/* Profile + zodiac badge */}
      <div className="relative h-[150px] w-[150px] flex-shrink-0 rounded-full border-2 bg-white">
        <img
          alt="Profile"
          src={user.profileUrl === "" ? "/user-profile.svg" : user.profileUrl}
          className="h-full w-full rounded-full object-cover p-1"
        />

        {user.role == "CUSTOMER" && (
          <div className="bg-secondary absolute top-2 right-0 flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
            <Image
              src={`/images/zodiac-sign/${user.zodiacSign}.svg`}
              alt={user.zodiacSign}
              fill
              className="object-contain p-[6px]"
            />
          </div>
        )}
      </div>

      <div></div>
      {/* Username */}
      <p className="font-chakra text-neutral-black self-start text-lg uppercase">
        username
      </p>
      <GlobalInput
        type="text"
        className="font-chakra mb-2 cursor-not-allowed"
        fullWidth
        value={user.username}
        readOnly
      />

      <p className="font-chakra text-neutral-black self-start text-lg uppercase">
        gender
      </p>
      <GlobalInput
        type="text"
        className="font-chakra cursor-not-allowed"
        fullWidth
        value={user.gender}
        readOnly
      />

      <GlobalButton
        variant="secondary"
        size="default"
        className="font-chakra mt-10 w-full self-start"
      >
        BACK
      </GlobalButton>
    </div>
  );
}

export default OtherProfile;
