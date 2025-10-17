import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents";
import EditUserProfile from "@/components/account/EditAccount/EditUserProfile";
import { useState } from "react";
import SessionsList, { Session } from "@/components/course/SessionsList";
import SessionDetail from "@/components/course/SessionDetail";

const mockSessions: Session[] = [
  {
    id: "s1",
    title: "คอร์ส....",
    prophet: "Prophet A",
    date: "11 October 2025",
    time: "3:00 PM - 4:00 PM",
    price: "500.-",
    image: "/images/course.svg",
    status: "Confirmed",
  },
  {
    id: "s2",
    title: "คอร์ส....",
    prophet: "Prophet B",
    date: "12 October 2025",
    time: "1:00 PM - 2:00 PM",
    price: "400.-",
    image: "/images/course.svg",
    status: "Pending",
  },
  {
    id: "s3",
    title: "คอร์ส....",
    prophet: "Prophet C",
    date: "15 October 2025",
    time: "10:00 AM - 11:00 AM",
    price: "600.-",
    image: "/images/course.svg",
    status: "Cancelled",
  },
];

export default function MySessionPage() {
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all");
  const [selected, setSelected] = useState<Session | null>(null);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center w-full font-chakra">
        <GlassContainer2 className="p-0">
              <EditUserProfile role="CUSTOMER" editing={false} />
              <div className="flex-col flex-1 py-4 px-6">
                <div className="flex justify-end items-center h-20">
                  {selected && (
                    <GlobalButton variant="primary" className="w-28 mr-4" onClick={() => setSelected(null)}>
                      Back
                    </GlobalButton>
                  )}
                </div>
                <div
                  className="bg-neutral-white border-accent-pink border-2 rounded-xl px-4 py-6 h-105"
                  style={{ filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))" }}
                >
                  {!selected ? (
                  <SessionsList sessions={mockSessions} onSelect={setSelected} tab={tab} onChangeTab={setTab} />
                  ) : (
                  <SessionDetail session={selected}/>
                  )}
                </div>
              </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
