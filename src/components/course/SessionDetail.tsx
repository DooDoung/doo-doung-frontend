import React from "react";
import Image from "next/image";

import { Session } from "./SessionsList";

type Props = {
  session: Session;
};

export default function SessionDetail({ session }: Props) {
  return (
    <div>
      <div className="text-xl text-neutral-black ml-2">Booking Details</div>
        <div className="flex gap-4 bg-[#F5F5F5] rounded-md mt-1">
          <div className="m-4 w-40 relative rounded-md overflow-hidden bg-muted">
            {session.image && <Image src={session.image} alt={session.title} fill className="object-cover" />}
          </div>
          <div className="flex-1 m-4 ml-0 text-neutral-black">
            <div className="text-xl font-bold">{session.title}</div>
            <div className="text-md">{session.prophet}</div>
            <div className="mt-1 text-sm">{session.date}</div>
            <div className="text-sm">{session.time}</div>
            <div className="text-sm flex">
              <div>Booking ID:&nbsp;</div>
              <div>{session.id}</div>
            </div>
            <div className="text-sm flex">
              <div>Line ID:&nbsp;</div>
              <div>{session.lineId}</div>
            </div>
            <div className="text-sm flex font-bold">
              <div>Status:&nbsp;</div>
              <div className="text-success">{session.status}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-md p-4 bg-[#F5F5F5] h-34 font-chakra text-neutral-black">
            <div className="text-xl font-bold">Payment Info</div>
            <div>
              <div className="flex text-sm">
                <div>Amount Paid:&nbsp;</div>
                <div>{session.amount ? `${session.amount} ฿` : "-"}</div>
              </div>
              <div className="flex text-sm">
                <div>Transaction ID:&nbsp;</div>
                <div>{session.transactionId ?? "-"}</div>
              </div>
              <div className="flex text-sm">
                <div>Date:&nbsp;</div>
                <div>{session.paymentDate ?? "-"}</div>
              </div>
            </div>
          </div>
          <div className="rounded-md p-4 bg-[#F5F5F5] h-34">
            <div className="text-xl font-bold">Course Type</div>
            <div>
              <div className="flex text-sm">
                <div>Method:&nbsp;</div>
                <div>{session.method ?? "-"}</div>
              </div>
              <div className="flex text-sm">
                <div>Sector:&nbsp;</div>
                <div>{session.sector ?? "-"}</div>
              </div>
              <div className="flex text-sm">
                <div>Duration:&nbsp;</div>
                <div>{session.duration ? `${session.duration}` : "-"}</div>
                <div>&nbsp;Minutes</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
