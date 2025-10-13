import { Filter, Search } from "lucide-react";

import { DefaultLayout } from "@/components/globalComponents";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <DefaultLayout>
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <h1
          className={cn(
            "font-sanctuary text-9xl font-bold text-white [text-shadow:_10px_0_0_rgb(0_0_0_/_0.5)]",
          )}
        >
          DooDoung
        </h1>
        <div className="flex w-1/3 items-center rounded-full bg-white/50 px-4 py-2 shadow-lg backdrop-blur-sm">
          <Search className="mr-3 text-black" />
          <input
            type="text"
            className="w-full bg-transparent text-black placeholder-gray-300 focus:outline-none"
          />
          <Filter className="ml-3 text-black" />
        </div>
      </div>
    </DefaultLayout>
  );
}
