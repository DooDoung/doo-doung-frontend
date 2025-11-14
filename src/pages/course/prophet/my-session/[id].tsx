import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
} from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

interface Session {
  sessionId: string;
  courseId: string;
  prophetUsername: string;
  prophetName: string;
  prophetProfileUrl: string;
  status: "scheduled" | "completed" | "cancelled";
  startDateTime: string;
  endDateTime: string;
  customerName: string;
  customerUsername: string;
  customerProfileUrl: string;
  courseName: string;
  horoscopeMethod: string;
  horoscopeSector: string;
  amount: number;
  reviewScore: number;
  reviewDescription: string;
  transactionCreatedAt: string;
  updatedAt: string;
  transactionId?: string; // Added for mock
  payoutStatus?: string; // Added for mock, might not be in API
  txAccountName?: string; // Added for mock
  txBank?: string; // Added for mock
  txAccountNumber?: string; // Added for mock
}

const SessionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [sessionDetails, setSessionDetails] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const accessToken = session?.accessToken;
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const completeSessionHandler = async () => {
    const dateNow = Date.now();
    const sessionEndTime = new Date(sessionDetails?.endDateTime || "").getTime();
    if (dateNow < sessionEndTime) {
      AppToast.error("Cannot complete session before it ends.");
      return;
    } else {
      console.log("Completing session...");
      
      try {
        console.log(accessToken);
        const response = await fetch(`${backendUrl}/booking/${id}/complete`, {
          method: "POST",
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Failed to complete session: ${data.message}`);
        }
        AppToast.success("Session completed successfully");
        window.location.reload();
      } catch (error) {
        AppToast.error(
          `${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  };

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (session?.user?.id && id) {
        const sessionId = Array.isArray(id) ? id[0] : id;
        console.warn("Debug: Navigated to session detail id:", sessionId);
        try {
          setLoading(true);
          const response = await fetch(`${backendUrl}/session/prophet/${id}`, {
            headers: session.accessToken
              ? { Authorization: `Bearer ${session.accessToken}` }
              : undefined,
          });
          if (!response.ok) {
            throw new Error("Failed to fetch session list for prophet");
          }
          const data = await response.json();

          setSessionDetails({
            ...data.data,
            transactionId: "xxx-xxxx-xxx", // Mocking transactionId
          });
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
                {sessionDetails.prophetUsername}
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
                <p>Course name: {sessionDetails.courseName}</p>
                <p>Prophet's Name: {sessionDetails.prophetName}</p>
                <p>Method: {sessionDetails.horoscopeMethod}</p>
                <p>Sector: {sessionDetails.horoscopeSector}</p>
                <p>
                  Time:{" "}
                  {new Date(sessionDetails.startDateTime).toLocaleString()} -{" "}
                  {new Date(sessionDetails.endDateTime).toLocaleString()}
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
                  Created:{" "}
                  {new Date(
                    sessionDetails.transactionCreatedAt,
                  ).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Payout Information</h3>
                <p>Account Name: {sessionDetails.txAccountName}</p>
                <p>Bank: {sessionDetails.txBank}</p>
                <p>Account Number: {sessionDetails.txAccountNumber}</p>
              </div>
            </div>
            <GlobalButton
              variant="primary"
              className="absolute right-4 bottom-4"
              size="default"
              onClick={completeSessionHandler}
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
