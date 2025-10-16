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
        "bg-[#3E3757]/50 backdrop-blur-md",
        "rounded-3xl",
        "shadow-all-around",
        "relative",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default GlassContainer;
