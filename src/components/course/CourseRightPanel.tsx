import { useRouter } from "next/router";

import { GlobalButton } from "@/components/globalComponents";
import PublicReviewCard from "@/components/public-review/PublicReviewCard";

import Meta from "./Meta";
import { CourseItem } from "./types";

interface CourseRightPanelProps {
  activeItem: CourseItem | null;
  reviews: Review[];
}

export default function CourseRightPanel({
  activeItem,
  reviews,
}: CourseRightPanelProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/course");
  };

  const handleBook = () => {
    if (activeItem) {
      router.push(`/booking/${activeItem?.id ?? " "}`);
    }
  };

  const handleWriteReview = () => {
    if (activeItem) {
      router.push(`/review`);
    }
  };

  return (
    <section className="relative flex w-3/5 flex-col overflow-hidden rounded-4xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80 md:p-10">
      <div className="max-w-3xl flex-1">
        {/* Title */}
        <h1 className="font-chakra text-neutral-black text-2xl font-semibold tracking-tight md:text-3xl">
          {activeItem?.courseName ?? " "}
        </h1>

        {/* Meta grid */}
        <div className="text-neutral-black mt-6 grid grid-cols-2 gap-6">
          <Meta
            label="Horoscope Sector"
            value={activeItem?.horoscopeSector ?? " "}
          />
          <Meta
            label="Duration (min)"
            value={activeItem?.durationMin.toString() ?? "15"}
          />
          <Meta
            label="Description"
            value={"course by" + activeItem?.name + activeItem?.lastname}
            colSpan={2}
          />
          <Meta
            label="Prices"
            sub="(Baht)"
            value={activeItem ? activeItem.price.toLocaleString() : " "}
          />
        </div>

        <div className="mt-3 flex items-start justify-between">
          <div className="font-chakra text-accent-pink text-xl font-medium">
            Reviews
          </div>
          <GlobalButton
            variant="secondary"
            size="sm"
            onClick={handleWriteReview}
            className="font-chakra"
          >
            ✏️ Write a Review
          </GlobalButton>
        </div>

        {/* Reviews list - scrollable section */}
        <div
          className="custom-scrollbar mt-4 flex-1 space-y-4 overflow-y-auto pb-4"
          style={{ maxHeight: "40vh" }}
        >
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <PublicReviewCard key={index} review={review} />
            ))
          ) : (
            <p className="text-neutral-black/60 py-8 text-center">
              No reviews yet
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-4 pt-4">
        <GlobalButton
          variant="secondary"
          size="default"
          onClick={handleBack}
          className="font-chakra"
        >
          Back
        </GlobalButton>
        <GlobalButton
          variant="primary"
          size="default"
          onClick={handleBook}
          className="font-chakra"
        >
          Book
        </GlobalButton>
      </div>

      <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-fuchsia-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-indigo-200/30 blur-3xl" />
    </section>
  );
}
