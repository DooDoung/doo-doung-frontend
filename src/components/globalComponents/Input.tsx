import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GlobalInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  /**
   * The size of the input
   */
  size?: "sm" | "default" | "lg";
  /**
   * Whether the input should take full width
   */
  fullWidth?: boolean;
  /**
   * Whether the input is in an invalid state
   */
  isInvalid?: boolean;
  /**
   * Whether the input is in a valid state
   */
  isValid?: boolean;
  /**
   * Text to display as a hint or error message
   */
  hintText?: string;
  hasHintText?: boolean;
  /**
   * Render as textarea instead of input
   */
  asTextarea?: boolean;
  /**
   * Number of rows for textarea
   */
  rows?: number;
}

/**
 * Global Input Component
 *
 * A reusable input component built on top of shadcn/ui Input
 * with custom styling for default, typing, valid, and invalid states.
 */
export const GlobalInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  GlobalInputProps
>(
  (
    {
      size = "default",
      fullWidth = false,
      isInvalid = false,
      isValid = false,
      hintText,
      className,
      hasHintText = false,
      asTextarea = false,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "h-8 px-2 text-sm",
      default: "h-10 px-3",
      lg: "h-12 px-4 text-lg",
    };

    const baseClasses = `
      flex rounded-md bg-neutral-white/50 text-neutral-black
      shadow-[4px_4px_14px_0_rgba(0,0,0,0.25),inset_4px_4px_10px_0_rgba(255,255,255,1)]
      backdrop-blur-[10px] 
      placeholder:text-[rgba(209, 209, 214, 1)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:ring-0
    `;
    
    const textareaClasses = `
      min-h-[80px] px-3 py-2 resize-none
    `;
    
    const stateClasses = {
      default: `
        hover:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]
        focus-visible:shadow-[4px_4px_14px_0px_var(--accent-pink)]
      `,
      invalid: `
        shadow-[4px_4px_14px_0px_var(--error)]
        hover:shadow-[2px_2px_4px_0px_var(--error)]
      `,
      valid: `
        shadow-[4px_4px_14px_0px_var(--success)]
        hover:shadow-[2px_2px_4px_0px_var(--success)]
      `,
    };

    const combinedClasses = cn(
      baseClasses,
      asTextarea ? textareaClasses : sizeClasses[size],
      fullWidth && "w-full",
      {
        [stateClasses.invalid]: isInvalid,
        [stateClasses.valid]: isValid,
        [stateClasses.default]: !isInvalid && !isValid,
      },
      className,
    );

    return (
      <div className={cn(fullWidth && "w-full")}>
        {asTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={combinedClasses}
            {...(props as React.ComponentPropsWithoutRef<"textarea">)}
          />
        ) : (
          <Input ref={ref as React.Ref<HTMLInputElement>} className={combinedClasses} {...props} />
        )}
        {hasHintText && (
          <p
            className={cn("mt-2 h-5 text-sm", {
              "text-error": isInvalid,
              "text-success": isValid,
            })}
          >
            {hintText}
          </p>
        )}
      </div>
    );
  },
);

GlobalInput.displayName = "GlobalInput";

export default GlobalInput;
