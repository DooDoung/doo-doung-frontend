import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";

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
  courseName: string;
  horoscopeMethodName: string;
  amount: number;
  reviewScore: number;
  reviewDescription: string;
  createdAt: string;
  updatedAt: string;
  transactionId?: string; // Added for mock
  payoutStatus?: string; // Added for mock, might not be in API
  payoutAccountName?: string; // Added for mock
  payoutBank?: string; // Added for mock
  payoutAccountNumber?: string; // Added for mock
}

const SessionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [sessionDetails, setSessionDetails] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (session?.user?.id && id) {
        const sessionId = Array.isArray(id) ? id[0] : id;
        const prophetId = session.user.prophetId ?? session.user.id;
        console.warn("Debug: Navigated to session detail id:", sessionId);
        try {
          setLoading(true);
          const response = await fetch(
            `${backendUrl}/session/prophet/${prophetId}`,
            {
              headers: session.accessToken
                ? { Authorization: `Bearer ${session.accessToken}` }
                : undefined,
            },
          );
          if (!response.ok) {
            throw new Error("Failed to fetch session list for prophet");
          }
          const data = await response.json();
          const list: Session[] = Array.isArray(data)
            ? data
            : Array.isArray(data?.sessions)
              ? data.sessions
              : Array.isArray(data?.data)
                ? data.data
                : [];
          const foundSession = list.find((s) => s.id === sessionId);
          if (foundSession) {
            // Mocking payout info as it's not in the API response
            setSessionDetails({
              ...foundSession,
              payoutStatus: "COMPLETED",
              payoutAccountName: "สิวิกรมณ์ โนคำ",
              payoutBank: "Kasikorn Thai Bank",
              payoutAccountNumber: "***-*-*****-*",
              transactionId: "xxx-xxxx-xxx", // Mocking transactionId
            });
          } else {
            setSessionDetails(null);
          }
        } catch (error) {
          console.error("Failed to fetch session details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSessionDetails();
  }, [session, id, backendUrl]);

  if (loading) {
    return (
      <DefaultLayout includeHeader={false}>
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      </DefaultLayout>
    );
  }

  if (!sessionDetails) {
    return (
      <DefaultLayout includeHeader={false}>
        <div className="flex h-screen items-center justify-center">
          Session not found.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout includeHeader={false}>
      <div className="font-chakra flex flex-col items-center justify-center">
        <h1 className="font-sanctuary text-5xl font-bold text-white">
          DooDoung
        </h1>
        <GlassContainer2 className="mt-4 flex h-[80vh] w-[calc(80vh*1261/746)] flex-row p-0">
          <div className="bg-primary-500/60 flex h-full w-[30%] flex-col items-center rounded-l-3xl border-r-0 border-white/50 py-8">
            <h2 className="font-sanctuary text-neutral-black text-2xl font-bold">
              PROPHET
            </h2>
            <div className="my-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
              <p className="text-neutral-black">Profile</p>
            </div>
            <p className="text-neutral-black text-sm">USERNAME</p>
            <div className="mt-2 w-2/3 rounded-full bg-white/80 px-4 py-2 text-center">
              <p className="text-neutral-black font-semibold">
                {session?.user?.name}
              </p>
            </div>
          </div>
          <div className="relative w-[70%] p-8 pt-16">
            <GlobalButton
              variant="primary"
              className="absolute top-4 right-4"
              size="default"
              onClick={() => router.back()}
            >
              Back
            </GlobalButton>
            <div className="text-neutral-black mt-12 grid h-[calc(100%-100px)] grid-cols-2 grid-rows-2 gap-4 text-xs">
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Session Information</h3>
                <p>Prophet's Name: {sessionDetails.prophetId}</p>
                <p>Method: {sessionDetails.horoscopeMethodName}</p>
                <p>Sector: {sessionDetails.courseName}</p>
                <p>
                  Time:{" "}
                  {new Date(sessionDetails.startDateTime).toLocaleString()} -{" "}
                  {new Date(sessionDetails.endDateTime).toLocaleTimeString()}
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Customer's Information</h3>
                <p>Name: {sessionDetails.customerName}</p>
                <p>Username: {sessionDetails.customerName}</p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Transaction Information</h3>
                <p>Transaction ID: {sessionDetails.transactionId}</p>
                <p>Amount: {sessionDetails.amount} Baht</p>
                <p>Payout Status: {sessionDetails.payoutStatus}</p>
                <p>
                  Created: {new Date(sessionDetails.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Payout Information</h3>
                <p>Account Name: {sessionDetails.payoutAccountName}</p>
                <p>Bank: {sessionDetails.payoutBank}</p>
                <p>Account Number: {sessionDetails.payoutAccountNumber}</p>
              </div>
            </div>
            <GlobalButton
              variant="primary"
              className="absolute right-4 bottom-4"
              size="default"
              onClick={() => router.push("/course/prophet/my-session")}
            >
              Mark as Completed
            </GlobalButton>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
};

export default SessionDetailPage;
