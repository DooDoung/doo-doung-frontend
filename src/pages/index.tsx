import { Filter, Search } from "lucide-react";
import Link from "next/link";

import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

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
        { session === null && 
        <Link href="/login">
          <GlobalButton variant="primary">LOGIN</GlobalButton>
        </Link>}
      </div>
    </DefaultLayout>
  );
}
