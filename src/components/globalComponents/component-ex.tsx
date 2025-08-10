import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlobalButtonProps extends React.ComponentProps<typeof Button> {
  /**
   * The variant of the button
   */
  variant:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
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
  variant = "default",
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
  // Map our default/secondary variants to shadcn variants
  const shadcnVariant = variant;

  return (
    <Button
      variant={shadcnVariant}
      size={size}
      disabled={disabled || loading}
      className={cn(fullWidth && "w-full", className)}
      {...props}
    >
      {loading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
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

// Example usage components for demonstration
export function ButtonExamples() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="mb-4 text-2xl font-bold">Global Button Examples</h2>

      {/* default Buttons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">default Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <GlobalButton variant="default" size="sm">
            Small default
          </GlobalButton>
          <GlobalButton variant="default">Default default</GlobalButton>
          <GlobalButton variant="default" size="lg">
            Large default
          </GlobalButton>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Secondary Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <GlobalButton variant="secondary" size="sm">
            Small Secondary
          </GlobalButton>
          <GlobalButton variant="secondary">Default Secondary</GlobalButton>
          <GlobalButton variant="secondary" size="lg">
            Large Secondary
          </GlobalButton>
        </div>
      </div>

      {/* Loading States */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Loading States</h3>
        <div className="flex flex-wrap gap-2">
          <GlobalButton variant="default" loading>
            default Loading
          </GlobalButton>
          <GlobalButton variant="secondary" loading loadingText="Processing...">
            Secondary Loading
          </GlobalButton>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <GlobalButton variant="default" icon={<span>📄</span>}>
            Save Document
          </GlobalButton>
          <GlobalButton variant="secondary" icon={<span>🔄</span>}>
            Refresh
          </GlobalButton>
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Full Width</h3>
        <GlobalButton variant="default" fullWidth>
          Full Width default Button
        </GlobalButton>
        <GlobalButton variant="secondary" fullWidth>
          Full Width Secondary Button
        </GlobalButton>
      </div>

      {/* Other Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Other Variants</h3>
        <div className="flex flex-wrap gap-2">
          <GlobalButton variant="outline">Outline</GlobalButton>
          <GlobalButton variant="ghost">Ghost</GlobalButton>
          <GlobalButton variant="destructive">Destructive</GlobalButton>
          <GlobalButton variant="link">Link</GlobalButton>
        </div>
      </div>

      {/* Disabled States */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled States</h3>
        <div className="flex flex-wrap gap-2">
          <GlobalButton variant="default" disabled>
            Disabled default
          </GlobalButton>
          <GlobalButton variant="secondary" disabled>
            Disabled Secondary
          </GlobalButton>
        </div>
      </div>
    </div>
  );
}

export default GlobalButton;
