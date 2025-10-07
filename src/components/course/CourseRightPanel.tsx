import ReviewCard from "@/components/account/Review/ReviewCard";

import Meta from "./Meta";
import { CourseItem } from "./types";

interface CourseRightPanelProps {
  activeItem: CourseItem | null;
}

export default function CourseRightPanel({
  activeItem,
}: CourseRightPanelProps) {
  return (
    <section className="relative w-3/5 overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80 md:p-10">
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {activeItem?.title ?? " "}
        </h1>

        {/* Meta grid */}
        <div className="mt-6 grid grid-cols-2 gap-6 text-slate-700">
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
            value={activeItem ? activeItem.priceTHB.toLocaleString() : " "}
          />
        </div>

        {/* Reviews header */}
        <h3 className="mt-10 text-lg font-semibold text-slate-900">Reviews</h3>
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
        <div className="mt-4 h-3/10 space-y-4 overflow-scroll">
          {(activeItem?.reviews ?? []).map((r) => (
            <ReviewCard
              key={r.id}
              profileUrl={activeItem?.prophetProfileUrl ?? ""}
              userName={r.profileName}
              courseName={r.title}
              comment={r.content}
              score={r.rating}
              date={new Date(r.dateISO).toLocaleDateString()}
              time={new Date(r.dateISO).toLocaleTimeString()}
            />
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
  );
}
