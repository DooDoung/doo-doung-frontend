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
export function GlassContainer({ children, className }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "h-[80vh] w-[90vw]",
        "bg-[#3E3757]/50 backdrop-blur-md",
        "rounded-3xl",
        "shadow-all-around",
        "p-10",
        "relative",
        className,
      )}
    >
      <div className="absolute top-6 left-10">
        <h1 className="font-['Orbitron'] text-4xl font-bold text-white">
          DooDoung
        </h1>
      </div>

      {/* Main Content */}
      <div className="pt-16">{children}</div>
    </div>
  );
}

export default GlassContainer;
