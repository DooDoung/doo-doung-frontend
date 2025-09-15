import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

function UserProfile({ role }: { role: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-start border-2 p-4 text-center sm:w-[30%]">
      <p className="mt-4 mb-4">{role}</p>
      <div className="h-[100px] w-[100px] rounded-full border-2 bg-white">
        <div className="relative top-0 left-18 h-[20px] w-[20px] rounded-full bg-black"></div>
      </div>
      <p className="self-start">USERNAME</p>
      <Input className="mb-4" placeholder="JohnYakDoodoung" readOnly />
      <Button
        className="mb-4 w-full"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        LOG OUT
      </Button>
      <a href="/reset-password" className="hover:underline">
        {" "}
        reset password
      </a>
    </div>
  );
}

export default UserProfile;
