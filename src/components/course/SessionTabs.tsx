import React from "react";

import { GlobalButton } from "@/components/globalComponents";

type Props = {
  active: "all" | "upcoming" | "past";
  onChange: (t: "all" | "upcoming" | "past") => void;
};

// SessionTabs preserves the exact markup and classes used in the previous
// SessionsList header so styles remain unchanged.
export default function SessionTabs({ active, onChange }: Props) {
  
  return (
    <div className="flex-col items-center justify-between mb-4 px-4 pt-4 pb-2">
      <h3 className="text-2xl text-neutral-black ml-2">My Sessions</h3>
      <div className="flex gap-4 mt-3">
        <GlobalButton variant="secondary" className="w-42" onClick={() => onChange("all")} isActive={active === "all"}>
          All Sessions
        </GlobalButton>
        <GlobalButton variant="secondary" onClick={() => onChange("upcoming")} className="w-42" isActive={active === "upcoming"}>
          Upcoming Sessions
        </GlobalButton>
        <GlobalButton variant="secondary" onClick={() => onChange("past")} className="w-42" isActive={active === "past"}>
          Past Sessions
        </GlobalButton>
      </div>
    </div>
  );
}
