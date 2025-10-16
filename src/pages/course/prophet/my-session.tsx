import { useEffect, useRef } from "react";

import {
  DefaultLayout,
  GlassContainer,
  GlobalButton,
} from "@/components/globalComponents";

export default function MySessionPage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
          <GlobalButton
            variant="primary"
            className="absolute top-4 right-4"
            size="default"
          >
            View All History
          </GlobalButton>
          <div className="flex h-full w-[30%] flex-col items-center rounded-l-3xl bg-[#F9B7BB]/60 py-8">
            <h2 className="font-sanctuary text-2xl font-bold text-[#3E3753]">
              PROPHET
            </h2>
            <div className="my-6 h-32 w-32 rounded-full bg-gray-200"></div>
            <p className="text-sm text-[#3E3753]">USERNAME</p>
            <div className="mt-2 w-2/3 rounded-full bg-white/80 px-4 py-2 text-center">
              <p className="font-semibold text-[#3E3753]">ItsGuitar</p>
            </div>
          </div>
          <div className="relative h-full w-[70%]">
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
                    <th className="p-1 font-semibold whitespace-nowrap">
                      Username
                    </th>
                    <th className="p-1 font-semibold whitespace-nowrap">
                      Date
                    </th>
                    <th className="p-1 font-semibold whitespace-nowrap">
                      Price
                    </th>
                    <th className="p-1 font-semibold whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      username: "ItsGuitar_1",
                      date: "8 October 2025 - 02:00 PM",
                      price: "100 Baht",
                    },
                    {
                      username: "ItsGuitar_67",
                      date: "7 October 2025 - 10.30 AM",
                      price: "420 Baht",
                    },
                    {
                      username: "ItsGuitar_sleep",
                      date: "7 October 2025 - 10.00 AM",
                      price: "300 Baht",
                    },
                    {
                      username: "ItsGuitar_sleep",
                      date: "7 October 2025 - 08.00 AM",
                      price: "300 Baht",
                    },
                    {
                      username: "ItsGuitar_sleep",
                      date: "6 October 2025 - 11.00 PM",
                      price: "300 Baht",
                    },
                  ].map((session, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-1 whitespace-nowrap">
                        {session.username}
                      </td>
                      <td className="p-1 whitespace-nowrap">{session.date}</td>
                      <td className="p-1 whitespace-nowrap">{session.price}</td>
                      <td className="p-1 whitespace-nowrap">
                        <GlobalButton
                          variant="secondary"
                          size="xs"
                          className="rounded-full"
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
        </GlassContainer>
      </div>
    </DefaultLayout>
  );
}
