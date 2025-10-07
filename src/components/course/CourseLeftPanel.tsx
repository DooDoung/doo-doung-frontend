import Image from "next/image";
import { CourseItem } from "./types";

interface CourseLeftPanelProps {
  activeItem: CourseItem | null;
  items: CourseItem[] | null;
  active: number;
  setActive: (index: number) => void;
}

export default function CourseLeftPanel({
  activeItem,
  items,
  active,
  setActive,
}: CourseLeftPanelProps) {
  return (
    <aside className="w-2/5 rounded-3xl bg-[#2b2342]/90 text-white shadow-xl ring-1 ring-white/10">
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
        <h2 className="mb-2 text-lg font-semibold tracking-wide">PROPHET</h2>
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
          <p className="text-center text-xl font-semibold">Course Profile</p>
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
  );
}
