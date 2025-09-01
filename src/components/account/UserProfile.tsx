import * as React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

function UserProfile({ role }: { role: string }) {
  return (
    <div className="flex w-[30%] flex-col items-center justify-start border-2 p-4 text-center">
      <p className="mt-4 mb-4">{role}</p>
      <div className="h-[100px] w-[100px] rounded-full border-2 bg-white">
        <div className="relative top-0 left-18 h-[20px] w-[20px] rounded-full bg-black"></div>
      </div>
      <p className="self-start">USERNAME</p>
      <Input className="mb-4" placeholder="JohnYakDoodoung" readOnly />
      <Button className="mb-4 w-full">LOG OUT</Button>
      <a href="" className="hover:underline">
        {" "}
        reset password
      </a>
    </div>
  );
}

export default UserProfile;
