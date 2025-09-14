import * as React from "react";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

import { GlobalButton, GlobalInput } from "../../components/globalComponents";

function UserProfile({ role }: { role: string }) {
  return (
    // <div className="flex w-[30%] flex-col items-center justify-start border-2 p-4 text-center">
    <div className="bg-primary-500/60 flex w-[30%] flex-col items-center justify-start rounded-4xl p-12 text-center">
      {/* <p className="mt-4 mb-4">{role}</p> */}
      <h3 className="font-sanctuary text-neutral-black mb-8 text-5xl">
        {role}
      </h3>
      <div className="relative mb-6 h-[150px] w-[150px] rounded-full border-2 bg-white">
        <CircleUserRound className="text-neutral-gray absolute h-full w-full stroke-1" />

        <div className="bg-secondary absolute top-2 right-0 flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
          <Image
            src={"/images/zodiac-sign/aries.svg"}
            alt={"aries"}
            fill
            className="object-contain p-1"
          />
        </div>
      </div>

      <p className="font-chakra text-neutral-black mb-4 self-start text-lg">
        USERNAME
      </p>
      <GlobalInput
        size="sm"
        className="font-chakra placeholder:text-neutral-black mb-4"
        fullWidth
        placeholder="JohnYakDoodoung"
        readOnly
      />
      {/* <Input className="mb-4" placeholder="JohnYakDoodoung" readOnly /> */}

      <GlobalButton
        variant="primary"
        size="default"
        className="font-chakra mb-4"
        // onClick={handleSubmit}
      >
        LOG OUT
      </GlobalButton>

      <a
        href="../../reset-password"
        className="font-chakra text-neutral-black hover:underline"
      >
        {" "}
        reset password
      </a>
    </div>
  );
}

export default UserProfile;
