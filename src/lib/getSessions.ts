import type { Session as SessionItem } from "@/components/course/SessionsList";

import { AppToast } from "./app-toast";

// Default images per course sector
const mockCourseImages: Record<string, string> = {
  love: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPGA1OrVL7SNCMOzNz4F6fjc-AgNASxraHg&s",
  work: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500",
  study:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  money:
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  luck: "https://images.unsplash.com/photo-1582744709859-2d89c6920cfb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  family: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
};

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
  const prophetName = `${b.prophet?.name} ${b.prophet?.lastname || ""}`;

  return {
      id: String(b.id ?? b.bookingId ?? b._id ?? ""),
      title: b.course.courseName,
      prophet: prophetName,
      date: String(b.createDateAt ?? b.createdAt ?? b.date ?? "").split("T")[0],
      time: (b.startDateTime && b.endDateTime) ? `${String(b.startDateTime ?? "").split("T")[1].slice(0, -8)} - ${String(b.endDateTime ?? "").split("T")[1].slice(0, -8)}` : "",
      price: b.price ? String(b.price) : b.amount ?? "",
      image: b.imageUrl ?? b.image ?? b.thumbnail ?? mockCourseImages[(b.course?.horoscopeSector || b.sector || "").toLowerCase()] ?? "/images/course.svg",
      status: b.status,
      lineId: b.prophet?.lineId || "",
      transactionId: b.payment.id || "",
      paymentDate: String(b.payment.date??"").split("T")[0],
      method: b.course.method.name || "",
      sector: b.course.horoscopeSector || "",
      duration: b.course.durationMin || "",
      amount: b.payment.amount ? String(b.payment.amount) : "",
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

