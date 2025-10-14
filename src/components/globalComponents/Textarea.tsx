import * as React from "react";

import { Textarea } from "@/components/ui/textarea"; // from shadcn/ui
import { cn } from "@/lib/utils";

interface GlobalTextareaProps
  extends Omit<React.ComponentPropsWithoutRef<"textarea">, "size"> {
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
  isInvalid?: boolean;
  isValid?: boolean;
  hintText?: string;
  hasHintText?: boolean;
  showCounter?: boolean;
}

/**
 * Global Textarea Component
 *
 * Reusable textarea component styled similarly to GlobalInput.
 */
export const GlobalTextarea = React.forwardRef<
  HTMLTextAreaElement,
  GlobalTextareaProps
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
      maxLength = 200,
      showCounter = true,
      ...props
    },
    ref,
  ) => {
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    const sizeClasses = {
      sm: "text-sm p-2",
      default: "p-3",
      lg: "text-lg p-4",
    };

    const baseClasses = `
      flex rounded-md bg-neutral-white/50 text-neutral-black
      shadow-[4px_4px_14px_0_rgba(0,0,0,0.25),inset_4px_4px_10px_0_rgba(255,255,255,1)]
      backdrop-blur-[10px]
      placeholder:text-[rgba(209, 209, 214, 1)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:ring-0 resize-none
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
      sizeClasses[size],
      fullWidth && "w-full",
      {
        [stateClasses.invalid]: isInvalid,
        [stateClasses.valid]: isValid,
        [stateClasses.default]: !isInvalid && !isValid,
      },
      className,
    );

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        <Textarea
          ref={ref}
          className={combinedClasses}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {showCounter && (
          <span className="text-neutral-gray absolute right-3 bottom-2 text-xs select-none">
            {charCount}/{maxLength}
          </span>
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

GlobalTextarea.displayName = "GlobalTextarea";

export default GlobalTextarea;
