import { DefaultLayout, GlobalInput } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents/GlassContainer2";
import { Search, Funnel } from "lucide-react";

export default function CoursesPage() {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center w-full">
                <GlassContainer2>
                    <div className="w-full">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="relative flex-1 max-w-2xl font-chakra">
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" 
                                    size={20} 
                                />
                                <GlobalInput 
                                    placeholder="Search course or prophet" 
                                    className="w-full pl-10 pr-4 py-3 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent placeholder:text-secondary" 
                                />
                            </div>
                            <button className="flex items-center justify-center bg-secondary/50 backdrop-blur-sm border border-white/20 shadow-lg p-3 rounded-lg cursor-pointer">
                                <Funnel className="text-secondary" size={20} />
                            </button>
                        </div>
                    </div>
                </GlassContainer2> 
            </div>
        </DefaultLayout>
    );
}