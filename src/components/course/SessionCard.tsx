import React from "react";
import Image from "next/image";

import { GlobalButton } from "../globalComponents";

import { Session } from "./SessionsList";

type Props = {
  session: Session;
  onSelect: (s: Session) => void;
};

export default function SessionCard({ session, onSelect }: Props) {
  return (
    <div className="flex items-center justify-between border-2 border-accent-pink overflow-hidden rounded-lg pr-6 text-neutral-black">
      <div className="flex items-center gap-3">
        <div className="h-28 w-32 relative rounded-md overflow-hidden bg-muted">
          {session.image ? (
            <Image src={session.image} alt={session.title} fill className="object-cover" />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
        <div>
          <div className="text-xl">{session.title}</div>
          <div className="text-sm">{session.prophet}</div>
          <div className="text-sm">{session.date}</div>
          <div className="text-sm">{session.time}</div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <GlobalButton variant="secondary" onClick={() => onSelect(session)}>
          View Detail
        </GlobalButton>
      </div>
    </div>
  );
}
