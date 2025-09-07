import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlobalButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  /**
   * The variant of the button
   */
  variant: "primary" | "secondary" | "ghost";
  /**
   * The size of the button
   */
  size?: "sm" | "default" | "lg" | "icon";
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
      bg-gradient-to-r from-accent-pink to-accent-violet 
      text-neutral-white
      shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]
      rounded-lg

      hover:bg-gradient-to-r hover:from-accent-pink/40 hover:to-accent-violet/40
      hover:text-neutral-black
      hover:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]

      active:bg-gradient-to-r active:from-accent-pink active:to-accent-violet 
      active:text-neutral-white
      active:shadow-[inset_5px_5px_15px_0px_#00000040,inset_-4px_-4px_4px_0px_#FFFFFF]

      disabled:text-neutral-black disabled:bg-[#D1D1D6] disabled:shadow-[inset_4px_4px_20px_0px_rgba(0,0,0,0.25)]
    `,
    secondary: `
      bg-clip-text text-transparent bg-gradient-to-r from-accent-pink to-accent-violet
    `,
    ghost: `
      bg-primary
    `,
  };

  const customText: Record<string, string> = {
    default: `
      text-nuetral-white
    `,
  };

  const mappedVariant = variant === "primary" ? "default" : variant;
  return (
    <Button
      size={size}
      disabled={disabled || loading}
      className={cn(
        fullWidth && "w-full",
        customVariants[mappedVariant],
        className,
        "cursor-pointer",
      )}
      {...props}
    >
      {/* 
      may need this for gradient text
      <div className={customText[variant]}>
      </div> 
      */}
      {loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </Button>
  );
}

export default GlobalButton;
