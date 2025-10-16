import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// todo: Ghost button, Secondary disable

interface GlobalButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  /**
   * The variant of the button
   */
  variant: "primary" | "secondary" | "ghost";
  /**
   * The size of the button
   */
  size?: "sm" | "default" | "lg" | "icon" | "xs";
  /**
   * Whether the button is loading
   */
  loading?: boolean;
  /**
   * Loading text to display when loading
   */
  loadingText?: string;
  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
}

/**
 * Global Button Component
 *
 * A reusable button component built on top of shadcn/ui Button
 * with default and secondary variants, loading states, and icons
 */
export function GlobalButton({
  variant = "primary",
  size = "default",
  loading = false,
  loadingText = "Loading...",
  icon,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}: GlobalButtonProps) {
  const customVariants: Record<string, string> = {
    default: `
    enabled:bg-gradient-to-r enabled:from-accent-pink enabled:to-accent-violet 
    text-neutral-white
    shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]
    
    hover:bg-gradient-to-r hover:from-accent-pink/40 hover:to-accent-violet/40
    hover:text-neutral-black
    hover:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]
    
    active:bg-gradient-to-r active:from-accent-pink active:to-accent-violet 
    active:text-neutral-white
    active:shadow-[inset_5px_5px_15px_0px_#00000040,inset_-4px_-4px_4px_0px_#FFFFFF]
    
    disabled:bg-[#d1d1d6]
    disabled:text-neutral-black
    disabled:shadow-[inset_4px_4px_20px_0px_rgba(0,0,0,0.25)]
    `,
    secondary: `
    enabled:bg-gradient-to-r enabled:from-accent-pink enabled:to-accent-violet 
    shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]
    flex p-[1.5px] item-center justify-center
    hover:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]
    active:bg-[rgba(253,236,242,1)]
    disabled:bg-[rgba(209, 209, 214, 1)]
    disabled:shadow-[inset_4px_4px_20px_0px_rgba(0,0,0,0.25)]
    `,
    ghost: `
    bg-primary
    `,
  };

  const containerStyle: Record<string, string> = {
    default: `
    `,
    secondary: `
      h-full w-full bg-neutral-white
      group-hover:bg-gradient-to-r group-hover:from-accent-pink/40 group-hover:to-accent-violet/40
      active:bg-[rgba(253,236,242,1)]
      active:!bg-none
      active:shadow-[5px_5px_15px_0_rgba(220,124,160,1)_inset,-4px_-4px_4px_0_rgba(179,137,236,1)_inset]
      disabled:bg-[rgba(209, 209, 214, 1)]
      disabled:shadow-[inset_4px_4px_20px_0px_rgba(0,0,0,0.25)]
    `,
    ghost: `
    `,
  };
  const childrenStyle: Record<string, string> = {
    default: ``,
    secondary: `
    rounded-md mr-3 ml-3 relative 
    bg-gradient-to-r from-accent-pink to-accent-violet 
    bg-clip-text text-transparent
    group-hover:text-neutral-black
    group-active:bg-gradient-to-r group-active:from-accent-pink group-active:to-accent-violet 
    group-active:bg-clip-text group-active:text-transparent
    disabled:text-neutral-black
  `,
    ghost: ``,
  };

  const sizeClasses: Record<string, string> = {
    sm: "h-10 text-sm", // Increased from h-9 px-3
    default: "h-11 text-base", // Increased from h-10 px-4
    lg: "h-12 text-lg", // Increased from h-11 px-8
    icon: "h-11 w-14", // Increased from h-10 w-10
  };

  const mappedVariant = variant === "primary" ? "default" : variant;
  return (
    <Button
      size={size}
      disabled={disabled || loading}
      className={cn(
        "group cursor-pointer",
        fullWidth && "w-full",
        customVariants[mappedVariant],
        className,
        sizeClasses[size as keyof typeof sizeClasses],
      )}
      {...props}
    >
      <div
        className={cn(
          containerStyle[mappedVariant],
          "rounded-md-minus flex items-center justify-center",
        )}
      >
        {loading ? (
          <>
            <span
              className={cn(
                childrenStyle[mappedVariant],
                "flex items-center justify-center",
              )}
            >
              <div className="text-neutral-black mr-2 h-4 w-4 animate-spin rounded-lg border-b-2 border-current" />
              {loadingText}
            </span>
          </>
        ) : (
          <>
            <span
              className={cn(
                childrenStyle[mappedVariant],
                "flex items-center justify-center",
              )}
            >
              {icon && <span className="mr-2">{icon}</span>}
              {children}
            </span>
          </>
        )}
      </div>
    </Button>
  );
}

export default GlobalButton;
