import type { Session as SessionItem } from "@/components/course/SessionsList";
import { AppToast } from "./app-toast";

// --- Helper Functions ---

/**
 * Determines 'past' status based on keywords only (e.g., 'Cancelled', 'Completed').
 */
function isPastStatus(status?: string): boolean {
  if (!status) return false;
  return status === "Cancelled" || status === "Completed";
}

/**
 * Applies the filtering logic based on the selected tab.
 */
function filterSessionsByTab(sessions: SessionItem[], tab: "all" | "upcoming" | "past"): SessionItem[] {
  if (tab === "upcoming") {
    return sessions.filter((s: SessionItem) => !isPastStatus(s.status));
  }
  if (tab === "past") {
    return sessions.filter((s: SessionItem) => isPastStatus(s.status));
  }
  return sessions; // for "all"
}

/**
 * Maps raw data from the API to our consistent SessionItem format.
 */
function mapRawBookingToSession(b: any): SessionItem {
  // FIX: Safely access the 'name' property if prophet/instructor is an object.
  const prophetName = b.prophet?.name ?? b.instructor?.name ?? b.prophetName ?? b.prophet ?? b.instructor ?? "";

return {
    id: String(b.id ?? b.bookingId ?? b._id ?? ""),
    title: b.course.courseName,
    prophet: prophetName,
    date: String(b.createDateAt ?? b.createdAt ?? b.date ?? "").split("T")[0],
    time: (b.startDateTime && b.endDateTime) ? `${String(b.startDateTime ?? "").split("T")[1].slice(0, -8)} - ${String(b.endDateTime ?? "").split("T")[1].slice(0, -8)}` : "",
    price: b.price ? String(b.price) : b.amount ?? "",
    image: b.imageUrl ?? b.image ?? b.thumbnail ?? "/images/course.svg",
    status: b.status,
};
}

export async function getSessions(
  tab: "all" | "upcoming" | "past" = "all",
  accountId?: string,
  authToken?: string,
): Promise<SessionItem[]> {
  // If there's no accountId, there's no data to fetch. Return empty.
  if (!accountId) {
    return [];
  }

  try {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const headers: HeadersInit = { 
      "Accept": "application/json",
      "Content-Type": "application/json" 
    };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;

    const res = await fetch(`${base}/booking/${accountId}`, { method: "GET", headers });

    console.log(`${base}/booking/${accountId}`);

    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const raw = await res.json();
        console.log("Raw session data fetched:", raw);
        const data = Array.isArray(raw) ? raw : raw.data ?? raw.bookings ?? [];
        if (Array.isArray(data)) {
          // Map the data and filter it in one go.
          const allSessions = data.map(mapRawBookingToSession);
          return filterSessionsByTab(allSessions, tab);
        }
      } else {
        AppToast.error("Unexpected response format from server.");
    }
    } else {
      AppToast.error("Failed to fetch sessions from server.");
    }
  } catch (e) {
    AppToast.error("Failed to fetch sessions from server.");
  }

  // If any step above fails, default to an empty array.
  return [];
}

