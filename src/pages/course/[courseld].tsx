"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Review = {
  id: string;
  profileName: string;
  profileBadge: string;
  rating: number; // 1–5
  title: string;
  content: string;
  dateISO: string;
};

type CourseItem = {
  id: string;
  title: string;
  prophetName: string;
  prophetMethod: string;
  durationMin: number;
  description: string;
  priceTHB: number;
  prophetProfileUrl: string; // mock Prophet Profile URL
  courseProfileUrl: string; // mock Course Profile URL
  reviews: Review[];
};
import { DefaultLayout } from "@/components/globalComponents";

export default function ProphetCoursePage() {
  const [items, setItems] = useState<CourseItem[] | null>(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Fetch mock data from API
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch mock courses");
        const data: CourseItem[] = await res.json();
        setItems(data.slice(0, 5)); // ensure 4–5 items
      } catch (e: any) {
        setError(e.message ?? "Unknown error");
      }
    })();
  }, []);

  const activeItem = useMemo(
    () =>
      items && items.length ? items[Math.min(active, items.length - 1)] : null,
    [items, active],
  );

  if (error) {
    return (
      <DefaultLayout>
        <main className="min-h-screen bg-gradient-to-b from-rose-100 via-white to-violet-50 p-6 md:p-10">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </main>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-white to-violet-100 p-4 md:p-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-[320px,1fr]">
          {/* LEFT PANEL */}
          <aside className="rounded-3xl bg-[#2b2342]/90 text-white shadow-xl ring-1 ring-white/10">
            {/* Header circle */}
            <div className="relative flex items-center justify-center p-8 pb-4">
              <div className="size-40 overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-md">
                {activeItem && (
                  <Image
                    src={activeItem.prophetProfileUrl}
                    alt="Prophet Profile"
                    width={320}
                    height={320}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="px-8">
              <h2 className="mb-2 text-lg font-semibold tracking-wide">
                PROPHET
              </h2>
              <div className="mb-5">
                <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur">
                  {activeItem?.prophetName ?? "Loading..."}
                </div>
              </div>

              <div className="mb-3 rounded-2xl bg-white/90 p-4 text-[#2b2342]">
                <div className="mb-3 aspect-[1.3/1] w-full overflow-hidden rounded-xl bg-slate-100">
                  {activeItem && (
                    <Image
                      src={activeItem.courseProfileUrl}
                      alt="Course Profile"
                      width={600}
                      height={460}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <p className="text-center text-xl font-semibold">
                  Course Profile
                </p>
              </div>

              {/* Quick switcher to show we fetched 4–5 items */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-2 text-sm text-white/80">Other Courses</p>
                <div className="flex flex-wrap gap-2">
                  {(items ?? new Array(4).fill(null)).map((it, idx) => (
                    <button
                      key={it?.id ?? idx}
                      onClick={() => setActive(idx)}
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        idx === active
                          ? "bg-white text-[#2b2342]"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                      disabled={!it}
                      title={it?.title ?? "Loading…"}
                    >
                      {it ? it.prophetName : "…"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-6" />
            </div>
          </aside>

          {/* RIGHT PANEL */}
          <section className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80 md:p-10">
            <div className="mx-auto max-w-3xl">
              {/* Title */}
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {activeItem?.title ?? " "}
              </h1>

              {/* Meta grid */}
              <div className="mt-6 grid grid-cols-2 gap-6 text-slate-700 md:grid-cols-4">
                <Meta
                  label="Prophet method"
                  value={activeItem?.prophetMethod ?? " "}
                />
                <Meta
                  label="Duration (min)"
                  value={activeItem?.durationMin?.toString() ?? " "}
                />
                <Meta
                  label="Description"
                  value={activeItem?.description ?? " "}
                  colSpan={2}
                />
                <Meta
                  label="Prices"
                  sub="(Baht)"
                  value={
                    activeItem ? activeItem.priceTHB.toLocaleString() : " "
                  }
                />
              </div>

              {/* Reviews header */}
              <h3 className="mt-10 text-lg font-semibold text-slate-900">
                Reviews
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  {activeItem ? `${activeItem.reviews.length} reviews` : " "}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300 bg-fuchsia-50 px-4 py-2 text-sm font-medium text-fuchsia-700 hover:bg-fuchsia-100"
                >
                  <span className="i">✏️</span> Write a Review
                </button>
              </div>

              {/* Reviews list */}
              <div className="mt-4 space-y-4">
                {(activeItem?.reviews ?? new Array<Review>(0)).map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>

              {/* Bottom actions */}
              <div className="mt-10 flex items-center justify-end gap-4">
                <button className="rounded-full bg-pink-100 px-6 py-3 text-sm font-semibold text-pink-700 hover:bg-pink-200">
                  Back
                </button>
                <button className="rounded-full bg-gradient-to-r from-pink-400 to-violet-500 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105">
                  Book
                </button>
              </div>
            </div>

            {/* soft blur accents */}
            <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-fuchsia-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-indigo-200/30 blur-3xl" />
          </section>
        </div>
      </main>
    </DefaultLayout>
  );
}

/* ---------- small components ---------- */

function Meta({
  label,
  value,
  sub,
  colSpan = 1,
}: {
  label: string;
  value: string;
  sub?: string;
  colSpan?: 1 | 2 | 3 | 4;
}) {
  return (
    <div className={`col-span-${colSpan}`}>
      <div className="text-sm font-medium text-fuchsia-600">
        {label} {sub && <span className="text-slate-400">{sub}</span>}
      </div>
      <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900">
        {value}
      </div>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div aria-label={`${value} stars`} className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-amber-500">
          {i < value ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
          {review.profileBadge}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-slate-900">
            {review.profileName}
          </div>
          <div className="text-sm text-slate-600">{review.title}</div>
        </div>
        <div className="ml-auto">
          <Stars value={review.rating} />
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-rose-50 p-3 text-sm leading-relaxed text-rose-900">
        {review.content}
      </div>

      <div className="mt-2 text-xs text-slate-500">
        {new Date(review.dateISO).toLocaleString()}
      </div>
    </article>
  );
}
