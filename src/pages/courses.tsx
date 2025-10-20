import { useEffect, useState } from "react";
import { Funnel, Search } from "lucide-react";

import CourseCard from "@/components/account/Course/CourseCard";
import FilterPopup, { FilterState } from "@/components/courses/FilterPopup";
import { DefaultLayout, GlobalInput } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents/GlassContainer2";
import { useFetchCourses } from "@/hooks/useFetchCourses";
import { CourseFilterParams } from "@/types/course";

// Shared styles
const glassEffect =
  "bg-secondary/50 backdrop-blur-sm border border-white/20 shadow-lg";
const iconStyle = "text-secondary";

// Components
const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="font-chakra relative max-w-2xl flex-1">
    <Search
      className={`absolute top-1/2 left-3 -translate-y-1/2 transform ${iconStyle}`}
      size={20}
    />
    <GlobalInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search course or prophet"
      className={`w-full rounded-full py-3 pr-4 pl-10 ${glassEffect} placeholder:text-secondary focus:border-transparent focus:ring-2 focus:ring-blue-400/50 focus:outline-none`}
    />
  </div>
);

const FilterButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center ${glassEffect} hover:bg-secondary/60 cursor-pointer rounded-lg p-3 transition-colors`}
  >
    <Funnel className={iconStyle} size={20} />
  </button>
);

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-40 animate-pulse rounded-3xl bg-gray-200" />
    ))}
  </div>
);

// Error Display
const ErrorDisplay = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <p className="font-medium text-red-500">{message}</p>
    <button
      onClick={onRetry}
      className="bg-secondary hover:bg-secondary/80 rounded-lg px-6 py-2 text-white transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default function CoursesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterParams, setFilterParams] = useState<CourseFilterParams>({
    limit: 20,
    offset: 0,
  });

  const { courses, loading, error, refetch } = useFetchCourses(filterParams);

  // Filter courses by search query (client-side filtering on course/prophet names)
  const filteredCourses = courses.filter((course) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      course.courseName.toLowerCase().includes(searchLower) ||
      course.prophetName.toLowerCase().includes(searchLower)
    );
  });

  const handleFilterApply = (filters: FilterState) => {
    const newParams: CourseFilterParams = {
      limit: 20,
      offset: 0,
      sort_by: filters.sortBy,
    };

    if (filters.priceRange[0] > 10 || filters.priceRange[1] < 3000) {
      newParams.price_min = filters.priceRange[0];
      newParams.price_max = filters.priceRange[1];
    }

    if (filters.horoscopeSector) {
      newParams.horoscope_sector = filters.horoscopeSector.toUpperCase();
    }

    setFilterParams(newParams);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterParams({
      limit: 20,
      offset: 0,
    });
  };

  return (
    <DefaultLayout>
      <div className="font-chakra flex w-full flex-col items-center justify-center">
        <GlassContainer2 className="overflow-hidden">
          <div className="w-full">
            {/* Search and Filter */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <FilterButton onClick={() => setIsFilterOpen(true)} />
            </div>

            {/* Course Cards */}
            <div className="custom-scrollbar max-h-[70vh] space-y-4 overflow-y-auto p-2 pb-20">
              {loading ? (
                <LoadingSkeleton />
              ) : error ? (
                <ErrorDisplay
                  message={error}
                  onRetry={() => refetch(filterParams)}
                />
              ) : filteredCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <p className="text-gray-500">No courses found</p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-secondary hover:bg-secondary/80 rounded-lg px-6 py-2 text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    imageUrl={course.imageUrl}
                    score={course.score}
                    courseName={course.courseName}
                    prophetName={course.prophetName}
                    description={course.description}
                    price={course.price}
                    date={course.date}
                    time={course.time}
                  />
                ))
              )}
            </div>
          </div>
        </GlassContainer2>
      </div>

      {/* Filter Popup */}
      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
      />
    </DefaultLayout>
  );
}
