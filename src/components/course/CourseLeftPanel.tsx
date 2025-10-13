import Image from "next/image";

import { GlobalInput } from "../globalComponents";

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
    <aside className="bg-neutral-black/60 flex w-2/5 flex-col items-center justify-start space-y-2 rounded-4xl p-12 text-center">
      <div className="relative mb-6 h-[150px] w-[150px] flex-shrink-0 rounded-full border-2 bg-white">
        {activeItem && (
          <Image
            src={activeItem.prophetProfileUrl}
            alt="Prophet Profile"
            width={500}
            height={500}
            className="h-full w-full rounded-full object-cover p-1"
          />
        )}
      </div>

      <div className="flex w-8/10 flex-col items-start">
        <p className="font-chakra mb-4 text-start text-xl text-white">
          PROPHET
        </p>
        <GlobalInput
          type="text"
          size="lg"
          className="mb-3 w-[150%] cursor-not-allowed"
          value={activeItem?.prophetName ?? "Loading..."}
          readOnly
        />
      </div>

      <div className="w-full rounded-2xl bg-white/90 p-4">
        <div className="mb-3 flex aspect-[1.3/1] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100">
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
      </div>
    </aside>
  );
}
