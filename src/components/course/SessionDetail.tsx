import Image from "next/image";
import React from "react";
import { Session } from "./SessionsList";

type Props = {
  session: Session;
};

export default function SessionDetail({ session }: Props) {
  return (
    <div>
      <div className="text-xl text-neutral-black ml-2">Booking Details</div>
        <div className="flex gap-4 bg-[#F5F5F5] rounded-md mt-1">
          <div className="m-4 w-36 relative rounded-md overflow-hidden bg-muted">
            {session.image && <Image src={session.image} alt={session.title} fill className="object-cover" />}
          </div>
          <div className="flex-1 m-4 ml-0 text-neutral-black">
            <div className="text-xl">{session.title}</div>
            <div className="text-sm">{session.prophet}</div>
            <div className="mt-2 text-sm">{session.date}</div>
            <div className="text-sm">{session.time}</div>
            <div className="mt-2 text-sm">Booking Id: xxxxxx</div>
            <div className="text-sm">Status: {session.status}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-md p-4 bg-[#F5F5F5] h-38">
            <div>Payment Info</div>
          </div>
          <div className="rounded-md p-4 bg-[#F5F5F5] h-38">
            <div>Course Type</div>
          </div>
        </div>
    </div>
  );
}
