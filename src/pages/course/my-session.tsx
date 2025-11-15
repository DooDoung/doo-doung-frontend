import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import EditUserProfile from "@/components/account/EditAccount/EditUserProfile";
import SessionDetail from "@/components/course/SessionDetail";
import SessionsList, { Session } from "@/components/course/SessionsList";
import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";
import { getSessions } from "@/lib/getSessions";

export default function MySessionPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all");
  const [selected, setSelected] = useState<Session | null>(null);

  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const accountId = session?.user?.id;
    const authToken = session?.accessToken;
    getSessions("all", accountId, authToken)
      .then((res) => {
        if (!mounted) return;
        setAllSessions(res);
      })
      .catch((e: any) => {
        AppToast.error(`Failed to load sessions. ${e.message}`);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [session]);

  // derive displayed sessions by filtering the cached allSessions
  const displayedSessions = useMemo(() => {
    if (tab === "all") return allSessions;
    function isPastStatus(status?: string) {
      if (!status) return false;
      return /(cancelled|cancel|completed|done|past)/i.test(status);
    }

    if (tab === "upcoming")
      return allSessions.filter((s) => !isPastStatus(s.status));
    return allSessions.filter((s) => isPastStatus(s.status));
  }, [allSessions, tab]);

  return (
    <DefaultLayout>
      <div className="font-chakra flex w-full flex-col items-center justify-center">
        <GlassContainer2 className="p-0">
          <EditUserProfile
            role={session?.user?.role || "CUSTOMER"}
            editing={false}
          />
          {loading ? (
            <div className="text-neutral-white flex h-105 flex-1 items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="flex-1 flex-col px-6 py-4">
              <div className="flex h-20 items-center justify-end">
                {selected ? (
                  <GlobalButton
                    variant="primary"
                    className="mr-4 w-28"
                    onClick={() => setSelected(null)}
                  >
                    Back
                  </GlobalButton>
                ) : (
                  <GlobalButton
                    variant="primary"
                    className="mr-4 w-28"
                    onClick={() => router.push("/account")}
                  >
                    Back
                  </GlobalButton>
                )}
              </div>
              <div
                className="bg-neutral-white border-accent-pink h-105 rounded-xl border-2 px-4 py-6"
                style={{ filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))" }}
              >
                {!selected ? (
                  <SessionsList
                    sessions={displayedSessions}
                    onSelect={setSelected}
                    tab={tab}
                    onChangeTab={setTab}
                  />
                ) : (
                  <SessionDetail session={selected} />
                )}
              </div>
            </div>
          )}
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
