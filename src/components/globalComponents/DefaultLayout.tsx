import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface DefaultLayoutProps {
  children: ReactNode;
  className?: string;
  /**
   * Whether to include the header
   */
  includeHeader?: boolean;
  /**
   * Whether to include the footer
   */
  includeFooter?: boolean;
  /**
   * Custom header props
   */
  headerProps?: {
    className?: string;
  };
  /**
   * Custom footer props
   */
  footerProps?: {
    className?: string;
  };
  /**
   * Main content container styling
   */
  contentClassName?: string;
}

/**
 * Default Layout Component
 *
 * A flexible layout wrapper that provides:
 * - Header with navigation
 * - Main content area (children)
 * - Footer with links and information
 * - Responsive design
 * - Customizable styling
 *
 * Usage:
 * <DefaultLayout>
 *   <YourPageContent />
 * </DefaultLayout>
 */
export function DefaultLayout({
  children,
  className,
  includeHeader = true,
  includeFooter = true,
  headerProps,
  footerProps,
  contentClassName,
}: DefaultLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-white", className)}>
      {/* Header */}
      {includeHeader && <Header {...headerProps} />}

      {/* Main Content */}
      <main className={cn("flex-1", contentClassName)}>{children}</main>

      {/* Footer */}
      {includeFooter && <Footer {...footerProps} />}
    </div>
  );
}

/**
 * Layout variant for pages that need full-width content
 */
export function FullWidthLayout({
  children,
  className,
  ...props
}: DefaultLayoutProps) {
  return (
    <DefaultLayout className={className} contentClassName="w-full" {...props}>
      {children}
    </DefaultLayout>
  );
}

/**
 * Layout variant for pages that need container-constrained content
 */
export function ContainerLayout({
  children,
  className,
  ...props
}: DefaultLayoutProps) {
  return (
    <DefaultLayout
      className={className}
      contentClassName="container mx-auto px-4 py-8 max-w-screen-2xl"
      {...props}
    >
      {children}
    </DefaultLayout>
  );
}

/**
 * Layout variant for authentication pages (no header/footer)
 */
export function AuthLayout({
  children,
  className,
  ...props
}: DefaultLayoutProps) {
  return (
    <DefaultLayout
      className={cn("items-center justify-center", className)}
      includeHeader={false}
      includeFooter={false}
      contentClassName="flex justify-center items-center min-h-screen"
      {...props}
    >
      {children}
    </DefaultLayout>
  );
}

export default DefaultLayout;
