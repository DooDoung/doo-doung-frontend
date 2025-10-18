import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import {
  DefaultLayout,
  GlassContainer,
  GlobalButton,
} from "@/components/globalComponents";

const SessionHistory = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const mockHistory = [
    {
      id: 1,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
    {
      id: 2,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
    {
      id: 3,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
    {
      id: 4,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
    {
      id: 5,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
    {
      id: 6,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
    {
      id: 7,
      username: "ItsGuitar_1",
      date: "7 October 2025 - 10.00 AM",
      price: "100 Baht",
    },
  ];

  return (
    <div className="relative h-full w-[70%] p-8">
      <GlobalButton
        variant="primary"
        className="absolute top-4 right-4"
        size="default"
        onClick={onBack}
      >
        Back
      </GlobalButton>
      <h2 className="text-center text-2xl font-bold text-[#3E3753]">
        Session History
      </h2>
      <div className="mt-4 flex justify-center space-x-4">
        <GlobalButton variant="primary" size="sm" className="rounded-full">
          All Sessions
        </GlobalButton>
        <GlobalButton
          variant="secondary"
          size="sm"
          className="rounded-full bg-white"
        >
          Completed Sessions
        </GlobalButton>
      </div>
      <div className="mt-4 h-[calc(100%-100px)] overflow-y-auto rounded-lg border-2 border-[#F9B7BB] bg-white p-4 text-[#3E3753]">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100/80">
              <th className="p-2 font-semibold whitespace-nowrap">Username</th>
              <th className="p-2 font-semibold whitespace-nowrap">Date</th>
              <th className="p-2 font-semibold whitespace-nowrap">Price</th>
              <th className="p-2 font-semibold whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((session) => (
              <tr key={session.id} className="border-b border-gray-200">
                <td className="p-2 whitespace-nowrap">{session.username}</td>
                <td className="p-2 whitespace-nowrap">{session.date}</td>
                <td className="p-2 whitespace-nowrap">{session.price}</td>
                <td className="p-2 whitespace-nowrap">
                  <GlobalButton
                    variant="secondary"
                    size="xs"
                    className="rounded-full"
                    onClick={() =>
                      router.push(`/course/prophet/my-session/${session.id}`)
                    }
                  >
                    View Detail
                  </GlobalButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = ({ onViewHistory }: { onViewHistory: () => void }) => {
  const router = useRouter();
  return (
    <div className="relative h-full w-[70%]">
      <GlobalButton
        variant="primary"
        className="absolute top-4 right-4"
        size="default"
        onClick={onViewHistory}
      >
        View All History
      </GlobalButton>
      <div className="absolute top-[27%] flex w-full -translate-y-1/2 justify-around px-8">
        <div className="flex h-24 w-[28%] flex-col items-center justify-center rounded-lg border-2 border-[#F9B7BB] bg-white text-[#3E3753]">
          <p className="text-sm">All Processing</p>
          <p className="text-sm">Sessions</p>
          <p className="text-xl">12</p>
        </div>
        <div className="flex h-24 w-[28%] flex-col items-center justify-center rounded-lg border-2 border-[#F9B7BB] bg-white text-[#3E3753]">
          <p className="text-sm">Completed</p>
          <p className="text-sm">Session</p>
          <p className="text-xl">8</p>
        </div>
        <div className="flex h-24 w-[28%] flex-col items-center justify-center rounded-lg border-2 border-[#F9B7BB] bg-white text-[#3E3753]">
          <p className="text-sm">Total Income</p>
          <p className="text-xl text-green-600">2800 Baht</p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 h-auto w-[90%] -translate-x-1/2 transform rounded-lg border-2 border-[#F9B7BB] bg-white p-4 text-[#3E3753]">
        <h3 className="text-base font-bold">Recent Active Sessions</h3>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100/80">
              <th className="p-1 font-semibold">Username</th>
              <th className="p-1 font-semibold">Date</th>
              <th className="p-1 font-semibold">Price</th>
              <th className="p-1 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                username: "ItsGuitar_1",
                date: "8 October 2025 - 02:00 PM",
                price: "100 Baht",
              },
              {
                id: 2,
                username: "ItsGuitar_67",
                date: "7 October 2025 - 10.30 AM",
                price: "420 Baht",
              },
              {
                id: 3,
                username: "ItsGuitar_sleep",
                date: "7 October 2025 - 10.00 AM",
                price: "300 Baht",
              },
              {
                id: 4,
                username: "ItsGuitar_sleep",
                date: "7 October 2025 - 08.00 AM",
                price: "300 Baht",
              },
              {
                id: 5,
                username: "ItsGuitar_sleep",
                date: "6 October 2025 - 11.00 PM",
                price: "300 Baht",
              },
            ].map((session) => (
              <tr key={session.id} className="border-b border-gray-200">
                <td className="p-1">{session.username}</td>
                <td className="p-1">{session.date}</td>
                <td className="p-1">{session.price}</td>
                <td className="p-1">
                  <GlobalButton
                    variant="secondary"
                    size="xs"
                    className="rounded-full"
                    onClick={() =>
                      router.push(`/course/prophet/my-session/${session.id}`)
                    }
                  >
                    View Detail
                  </GlobalButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function MySessionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current
        .querySelectorAll<HTMLElement>("*")
        .forEach((el: HTMLElement) => {
          if (!el.classList.contains("font-sanctuary")) {
            el.classList.add("font-chakra");
          }
        });
    }
  }, []);

  return (
    <DefaultLayout includeHeader={false}>
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="font-sanctuary text-5xl font-bold text-white">
          DooDoung
        </h1>
        <GlassContainer className="mt-4 flex h-[80vh] w-[calc(80vh*1261/746)] flex-row">
          <div className="flex h-full w-[30%] flex-col items-center rounded-l-3xl bg-[#F9B7BB]/60 py-8">
            <h2 className="font-sanctuary text-2xl font-bold text-[#3E3753]">
              PROPHET
            </h2>
            <div className="my-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
              <p className="text-[#3E3753]">Profile</p>
            </div>
            <p className="text-sm text-[#3E3753]">USERNAME</p>
            <div className="mt-2 w-2/3 rounded-full bg-white/80 px-4 py-2 text-center">
              <p className="font-semibold text-[#3E3753]">ItsGuitar</p>
            </div>
          </div>
          {showHistory ? (
            <SessionHistory onBack={() => setShowHistory(false)} />
          ) : (
            <Dashboard onViewHistory={() => setShowHistory(true)} />
          )}
        </GlassContainer>
      </div>
    </DefaultLayout>
  );
}
