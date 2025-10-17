import { ReactNode, use } from "react";
import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { useSession } from "next-auth/react";

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
    role?: "customer" | "prophet";
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
  const { data: session } = useSession();
  // Normalize session role to the HeaderProps union ("customer" | "prophet") or undefined
  const role = (() => {
    const r = session?.user?.role;
    if (typeof r !== "string") return undefined;
    const lower = r.toLowerCase();
    if (lower === "prophet") return "prophet";
    if (lower === "customer") return "customer";
    return undefined;
  })() as "customer" | "prophet" | undefined;
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-white bg-[url('/images/background/BG_cloud.webp')] bg-cover bg-center",
        className,
      )}
    >
      <Toaster position="top-right" />
      {/* Header */}
      {includeHeader && <Header {...headerProps} role={role} />}

      {/* Main Content */}
      <main className={cn("mt-3 mb-12 flex-1", contentClassName)}>
        {children}
      </main>

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
      className={cn(
        "items-center justify-center bg-[url('/images/background/BG_fullmoon.webp')] bg-cover bg-center",
        className,
      )}
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
