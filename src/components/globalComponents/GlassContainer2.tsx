import React from "react";

import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Glass Container Component
 *
 * A glass-morphism container with DooDoung branding
 * Features a semi-transparent background with blur effect and white outer shadow
 */
export function GlassContainer2({ children, className }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "h-[80vh] w-[90vw]",
        "bg-[#3E3757]/50 backdrop-blur-md",
        "rounded-3xl",
        "shadow-all-around",
        "p-10",
        "mt-[1%] flex flex-col justify-start overflow-y-auto sm:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default GlassContainer2;
