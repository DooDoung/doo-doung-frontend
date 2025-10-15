import { Funnel, Search } from "lucide-react";
import { useState } from "react";

import CourseCard from "@/components/account/Course/CourseCard";
import FilterPopup, { FilterState } from "@/components/courses/FilterPopup";
import { DefaultLayout, GlobalInput } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents/GlassContainer2";
import { mockCourse } from "@/constants/mock-account";

// Shared styles
const glassEffect = "bg-secondary/50 backdrop-blur-sm border border-white/20 shadow-lg";
const iconStyle = "text-secondary";

// Components
const SearchBar = () => (
    <div className="relative flex-1 max-w-2xl font-chakra">
        <Search 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconStyle}`}
            size={20} 
        />
        <GlobalInput 
            placeholder="Search course or prophet" 
            className={`w-full pl-10 pr-4 py-3 rounded-full ${glassEffect} focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent placeholder:text-secondary`}
        />
    </div>
);

const FilterButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`flex items-center justify-center ${glassEffect} p-3 rounded-lg cursor-pointer hover:bg-secondary/60 transition-colors`}
    >
        <Funnel className={iconStyle} size={20} />
    </button>
);



// Using existing CourseCard component

export default function CoursesPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterApply = (filters: FilterState) => {
        console.log("Applied filters:", filters);
        // TODO: Implement filter logic here
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center w-full font-chakra">
                <GlassContainer2 className="overflow-hidden">
                    <div className="w-full">
                        {/* Search and Filter */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <SearchBar />
                            <FilterButton onClick={() => setIsFilterOpen(true)} />
                        </div>

                        {/* Course Cards */}
                        <div className="space-y-4 overflow-y-auto max-h-[70vh] p-2 pb-20 custom-scrollbar">
                            {mockCourse.map((course, index) => (
                                <CourseCard 
                                    key={course.id}
                                    imageUrl={course.imageUrl}
                                    score={course.score}
                                    courseName={course.courseName}
                                    prophetName={course.prophetName}
                                    description={course.description}
                                    price={course.price}
                                    date={course.date}
                                    time={course.time}
                                />
                            ))}
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