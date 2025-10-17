import React, { useEffect, useState } from "react";
import SessionTabs from "./SessionTabs";
import SessionCard from "./SessionCard";

export type Session = {
  id: string;
  title: string;
  prophet: string;
  date: string;
  time: string;
  price: string;
  image?: string;
  status?: string;
};

type Props = {
  sessions: Session[];
  onSelect: (s: Session) => void;
  tab?: "all" | "upcoming" | "past";
  onChangeTab?: (t: "all" | "upcoming" | "past") => void;
};

export default function SessionsList({ sessions, onSelect, tab, onChangeTab }: Props) {
  const [localTab, setLocalTab] = useState<"all" | "upcoming" | "past">(tab ?? "all");

  useEffect(() => {
    if (tab) setLocalTab(tab);
    console.log("Tab changed to:", tab);
  }, [tab]);

  const activeTab = tab ?? localTab;

  function handleTabChange(t: "all" | "upcoming" | "past") {
    if (onChangeTab) onChangeTab(t);
    else setLocalTab(t);
  }

  return (
    <div className="flex flex-col h-96">
      <SessionTabs active={activeTab} onChange={handleTabChange} />

      <div className="space-y-4 overflow-y-scroll custom-scrollbar pr-2 pb-6 flex-1">
        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
