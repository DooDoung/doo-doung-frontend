import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents";
import EditUserProfile from "@/components/account/EditAccount/EditUserProfile";
import { useEffect, useMemo, useState } from "react";
import SessionsList, { Session } from "@/components/course/SessionsList";
import SessionDetail from "@/components/course/SessionDetail";
import { useSession } from "next-auth/react";
import { getSessions } from "@/lib/getSessions";
import { AppToast } from "@/lib/app-toast";

export default function MySessionPage() {
  const { data: session } = useSession();
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
      .catch((e) => {
        AppToast.error("Failed to load sessions.");
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

    if (tab === "upcoming") return allSessions.filter((s) => !isPastStatus(s.status));
    return allSessions.filter((s) => isPastStatus(s.status));
  }, [allSessions, tab]);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center w-full font-chakra">
        <GlassContainer2 className="p-0">
              <EditUserProfile role={session?.user?.role||"CUSTOMER"} editing={false} />
              {loading ? (
                <div className="flex-1 flex items-center justify-center text-neutral-white h-105">
                  Loading...
                </div>
              ) : (
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
                  <SessionsList sessions={displayedSessions} onSelect={setSelected} tab={tab} onChangeTab={setTab} />
                  ) : (
                  <SessionDetail session={selected}/>
                  )}
                </div>
              </div>
              )}
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
