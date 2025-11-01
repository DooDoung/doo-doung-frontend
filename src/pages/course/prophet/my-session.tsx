import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

interface Session {
  id: string;
  customerId: string;
  courseId: string;
  prophetId: string;
  status: "scheduled" | "completed" | "cancelled";
  startDateTime: string;
  endDateTime: string;
  customerName: string;
  customerProfileUrl: string;
  prophetProfileUrl?: string; // custom profile image URL
  courseName: string;
  horoscopeMethodName: string;
  horoscopeSector: string;
  amount: number;
  reviewScore: number;
  reviewDescription: string;
  createdAt: string;
  updatedAt: string;
}

const SessionHistory = ({
  onBack,
  sessions = [],
}: {
  onBack: () => void;
  sessions?: Session[];
}) => {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "completed">("all");

  const filteredSessions = sessions.filter((session) => {
    if (filter === "completed") {
      return session.status === "completed";
    }
    return true;
  });

  const totalIncome =
    filter === "completed"
      ? filteredSessions.reduce((acc, session) => acc + session.amount, 0)
      : 0;

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
        <GlobalButton
          variant={filter === "all" ? "primary" : "secondary"}
          size="sm"
          className="rounded-full"
          onClick={() => setFilter("all")}
        >
          All Sessions
        </GlobalButton>
        <GlobalButton
          variant={filter === "completed" ? "primary" : "secondary"}
          size="sm"
          className="rounded-full bg-white"
          onClick={() => setFilter("completed")}
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
              <th className="p-2 font-semibold whitespace-nowrap">Status</th>
              <th className="p-2 font-semibold whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session.id} className="border-b border-gray-200">
                <td className="p-2 whitespace-nowrap">
                  {session.customerName}
                </td>
                <td className="p-2 whitespace-nowrap">
                  {new Date(session.startDateTime).toLocaleString()}
                </td>
                <td className="p-2 whitespace-nowrap">{session.amount} Baht</td>
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
      {filter === "completed" && (
        <div className="mt-4 text-right">
          <p className="text-lg font-bold text-[#3E3753]">
            Total Income:{" "}
            <span className="text-green-600">{totalIncome} Baht</span>
          </p>
        </div>
      )}
    </div>
  );
};

const Dashboard = ({
  onViewHistory,
  sessions = [],
}: {
  onViewHistory: () => void;
  sessions?: Session[];
}) => {
  const router = useRouter();
  const processingSessions = sessions.filter(
    (session) => session.status === "scheduled",
  );
  const completedSessions = sessions.filter(
    (session) => session.status === "completed",
  );
  const totalIncome = sessions.reduce(
    (acc, session) => acc + session.amount,
    0,
  );
  const recentSessions = sessions
    .filter((session) => session.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(b.startDateTime).getTime() -
        new Date(a.startDateTime).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="flex h-full w-[70%] flex-col p-4">
      <div className="flex justify-end">
        <GlobalButton variant="primary" size="default" onClick={onViewHistory}>
          View All History
        </GlobalButton>
      </div>
      <div className="flex w-full justify-around py-4">
        <div className="flex h-24 w-[28%] flex-col items-center justify-center rounded-lg border-2 border-[#F9B7BB] bg-white text-[#3E3753]">
          <p className="text-sm">All Processing</p>
          <p className="text-sm">Sessions</p>
          <p className="text-xl">{processingSessions.length}</p>
        </div>
        <div className="flex h-24 w-[28%] flex-col items-center justify-center rounded-lg border-2 border-[#F9B7BB] bg-white text-[#3E3753]">
          <p className="text-sm">Completed</p>
          <p className="text-sm">Session</p>
          <p className="text-xl">{completedSessions.length}</p>
        </div>
        <div className="flex h-24 w-[28%] flex-col items-center justify-center rounded-lg border-2 border-[#F9B7BB] bg-white text-[#3E3753]">
          <p className="text-sm">Total Income</p>
          <p className="text-xl text-green-600">{totalIncome} Baht</p>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto rounded-lg border-2 border-[#F9B7BB] bg-white p-4 text-[#3E3753]">
        <h3 className="text-base font-bold">Recent Active Sessions</h3>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100/80">
              <th className="p-1 font-semibold">Username</th>
              <th className="p-1 font-semibold">Date</th>
              <th className="p-1 font-semibold">Price</th>
              <th className="p-1 font-semibold">Status</th>
              <th className="p-1 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentSessions.map((session) => (
              <tr key={session.id} className="border-b border-gray-200">
                <td className="p-1">{session.customerName}</td>
                <td className="p-1">
                  {new Date(session.startDateTime).toLocaleString()}
                </td>
                <td className="p-1">{session.amount} Baht</td>
                <td className="p-1">{session.status.toLowerCase()}</td>
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
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const [user, setUser] = useState<{
    profileUrl: string;
    username: string;
  } | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch user profile data
  useEffect(() => {
    const fetchAccount = async () => {
      if (status === "loading" || !token) {
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/account/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userData = response.data.data;
        setUser({
          profileUrl: userData.profileUrl || "",
          username: userData.username || "",
        });
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };
    fetchAccount();
  }, [token, status]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (session?.user?.id) {
        console.warn("Session object:", session);
        const prophetId = session.user.prophetId ?? session.user.id;
        console.warn("Debug: ProphetId value is", prophetId);

        try {
          setLoading(true);
          const backendUrl =
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
          const response = await fetch(`${backendUrl}/session/prophet`, {
            headers: session.accessToken
              ? { Authorization: `Bearer ${session.accessToken}` }
              : undefined,
          });
          if (!response.ok) {
            throw new Error("Failed to fetch sessions");
          }
          const data = await response.json();
          const rawSessions = Array.isArray(data)
            ? data
            : Array.isArray(data?.sessions)
              ? data.sessions
              : Array.isArray(data?.data)
                ? data.data
                : [];

          const normalized: Session[] = rawSessions.map(
            (s: Record<string, unknown>) => ({
              ...s,
              id: s.sessionId,
              horoscopeMethodName: s.horoscopeMethod,
              createdAt: s.transactionCreatedAt,
            }),
          );

          // Normalize status values from API (case-insensitive + synonyms)
          const mapStatus = (raw: unknown): Session["status"] => {
            const v = String(raw ?? "").toLowerCase();
            if (
              [
                "scheduled",
                "processing",
                "upcoming",
                "pending",
                "open",
                "booked",
              ].includes(v)
            )
              return "scheduled";
            if (
              ["completed", "complete", "done", "finished", "success"].includes(
                v,
              )
            )
              return "completed";
            if (
              ["cancelled", "canceled", "cancel", "failed", "void"].includes(v)
            )
              return "cancelled";
            return "scheduled"; // default to active for unknown statuses
          };

          const normalizedSessions: Session[] = (
            normalized as Array<Partial<Session> & Record<string, unknown>>
          ).map((s) => ({
            ...(s as Session),
            status: mapStatus(s.status as unknown),
          }));

          // Debug: show status distribution
          const statusCounts = normalizedSessions.reduce(
            (acc: Record<string, number>, s) => {
              acc[s.status] = (acc[s.status] || 0) + 1;
              return acc;
            },
            {},
          );
          console.warn("Session status distribution:", statusCounts);

          setSessions(normalizedSessions);
        } catch (error) {
          console.error("Failed to fetch sessions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSessions();
  }, [session]);

  if (loading) {
    return (
      <DefaultLayout includeHeader={false}>
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout includeHeader={false}>
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="font-sanctuary text-5xl font-bold text-white">
          DooDoung
        </h1>
        <GlassContainer2 className="mt-4 flex h-[80vh] w-[calc(80vh*1261/746)] flex-row p-0">
          <div className="flex h-full w-full flex-row pt-0">
            <div className="flex h-full w-[30%] flex-col items-center rounded-l-3xl border-r-0 border-white/50 bg-[#F9B7BB]/60 py-8">
              <h2 className="font-sanctuary text-2xl font-bold text-[#3E3753]">
                PROPHET
              </h2>
              <div className="relative my-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {user?.profileUrl ? (
                  <Image
                    src={user.profileUrl}
                    alt="Profile"
                    fill
                    sizes="128px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <p className="text-[#3E3753]">Loading...</p>
                )}
              </div>
              <p className="text-sm text-[#3E3753]">USERNAME</p>
              <div className="mt-2 w-2/3 rounded-full bg-white/80 px-4 py-2 text-center">
                <p className="font-semibold text-[#3E3753]">
                  {user?.username || "Loading..."}
                </p>
              </div>
            </div>
            {showHistory ? (
              <SessionHistory
                onBack={() => setShowHistory(false)}
                sessions={sessions}
              />
            ) : (
              <Dashboard
                onViewHistory={() => setShowHistory(true)}
                sessions={sessions}
              />
            )}
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
