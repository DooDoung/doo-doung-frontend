import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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
}

/**
 * Global Input Component
 *
 * A reusable input component built on top of shadcn/ui Input
 * with custom styling for default, typing, valid, and invalid states.
 */
export const GlobalInput = React.forwardRef<HTMLInputElement, GlobalInputProps>(
  (
    {
      size = "default",
      fullWidth = false,
      isInvalid = false,
      isValid = false,
      hintText,
      className,
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
      flex rounded-lg bg-white text-neutral-black
      file:border-0 file:bg-transparent file:text-sm file:font-medium
      placeholder:text-gray-400
      disabled:cursor-not-allowed disabled:opacity-50
      shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]
      border-2 border-transparent
      transition-all duration-200 ease-in-out
    `;

    const stateClasses = {
      default: `
        hover:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]
        focus-visible:outline-none 
        focus-visible:shadow-[0_0_8px_4px_rgba(236,72,153,0.5),_0_0_8px_4px_rgba(139,92,246,0.5)]
      `,
      invalid: `
        !border-red-500 !shadow-[0_0_8px_4px_rgba(239,68,68,0.5)]
        focus-visible:!ring-red-500
      `,
      valid: `
        !border-green-500 !shadow-[0_0_8px_4px_rgba(34,197,94,0.5)]
      `,
    };

    const combinedClasses = cn(
      baseClasses,
      sizeClasses[size],
      fullWidth && "w-full",
      // Apply conditional state classes
      {
        [stateClasses.invalid]: isInvalid,
        [stateClasses.valid]: isValid,
        [stateClasses.default]: !isInvalid && !isValid,
      },
      className,
    );

    return (
      <div className={cn(fullWidth && "w-full")}>
        <Input ref={ref} className={combinedClasses} {...props} />
        {hintText && (
          <p
            className={cn("mt-2 text-sm", {
              "text-red-500": isInvalid,
              "text-green-500": isValid,
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
