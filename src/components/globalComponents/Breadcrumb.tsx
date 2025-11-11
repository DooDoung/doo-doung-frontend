import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isHome?: boolean;
}

interface BreadcrumbProps {
  className?: string;
}

/**
 * Breadcrumb Component
 *
 * Automatically generates breadcrumb navigation based on the current route.
 * Shows a hierarchical path like: Home / All Courses / Course Details
 */
export function Breadcrumb({ className }: BreadcrumbProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const query = router.query;

  // Generate breadcrumb items based on the current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/", isHome: true },
    ];

    // Map paths to English labels
    const pathLabels: Record<string, string> = {
      courses: "All Courses",
      course: "Course Details",
      booking: "Booking",
      account: "Account",
      profile: "Profile",
      edit: "Edit",
      "edit-account": "Edit Account",
      review: "Reviews",
      report: "Reports",
      admin: "Admin",
      login: "Login",
      register: "Register",
      "reset-password": "Reset Password",
      create: "Create",
      "edit-profile": "Edit Profile",
      sessions: "Sessions",
      "my-session": "My Sessions",
      "my-courses": "My Courses",
      availability: "Availability",
      prophet: "Prophet",
      confirm: "Confirm Booking",
      payment: "Payment",
      "booking-success": "Booking Success",
      "booking-slot": "Select Time",
      "confirm-slot": "Confirm Time",
      "transaction-account": "Bank Account",
      details: "Details",
    };

    // Build breadcrumbs for each path segment
    let currentPath = "";
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;

      // Skip dynamic route segments like [id] or [account-id]
      if (segment.startsWith("[") && segment.endsWith("]")) {
        continue;
      }

      const label = pathLabels[segment] || segment;

      // Handle special cases for dynamic routes
      if (segment === "account" && query["account-id"]) {
        // For account pages with ID, show the account label
        breadcrumbs.push({
          label: "Account",
          href: `/account/${query["account-id"]}`,
        });
      } else if (segment === "course" && query.courseld) {
        // For course detail pages
        breadcrumbs.push({
          label: "Course Details",
          href: `/course/${query.courseld}`,
        });
      } else if (segment === "booking" && query.bookingld) {
        // For booking pages
        breadcrumbs.push({
          label: "Booking",
          // Current page, no href
        });
      } else if (segment === "course" && pathSegments.includes("prophet")) {
        // Handle prophet course pages
        if (
          segment === "course" &&
          pathSegments[pathSegments.indexOf(segment) + 1] === "prophet"
        ) {
          breadcrumbs.push({
            label: "Prophet Courses",
            href: "/course/prophet",
          });
        }
      } else {
        breadcrumbs.push({
          label,
          href: currentPath,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page or auth pages
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/auth/")
  ) {
    return null;
  }

  // Don't show breadcrumbs if we only have the home breadcrumb
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // --- 🎨 STYLE DEFINITIONS ---
  
  const itemBaseStyle =
    "flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors";
  
  const linkStyle = `${itemBaseStyle} bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm`;
  
  const currentStyle = `${itemBaseStyle} bg-white/40 text-white font-semibold`;
  // --- END STYLE DEFINITIONS ---

  return (
    // Sticky positioning wrapper
    <div className={`fixed top-0 z-40 select-none ${className}`}>
      <div className="w-screen flex justify-center">
          <div className="px-6 py-3">
            <nav className="text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              const isFirst = idx === 0;

              return (
                <li key={idx} className={`flex items-center`}>
                  {item.href && !isLast ? (
                    <Link href={item.href} className={linkStyle}>
                      {isFirst && <Home className="mr-1.5 h-4 w-4 text-white" />}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div
                      className={`${
                        isLast
                          ? currentStyle 
                          : linkStyle 
                      }`}
                    >
                      {isFirst && <Home className="mr-1.5 h-4 w-4 text-white" />}
                      <span className="flex items-center">
                        {item.label}
                      </span>
                    </div>
                  )}

                  {!isLast && (
                    // เปลี่ยนสีตัวคั่นให้เข้ากับ glass theme
                    <span className="mx-2 text-white/60" aria-hidden>
                      <ChevronRight size={16} />
                    </span>
                  )}
                </li>
              );
            })}
              </ol>
            </nav>
          </div>
        </div>
      </div>
  );
}