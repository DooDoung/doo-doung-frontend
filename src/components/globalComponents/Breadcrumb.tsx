import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
 * History-based breadcrumb navigation that tracks actual user navigation paths.
 * Maintains a stack of visited pages for more intuitive navigation.
 */
export function Breadcrumb({ className }: BreadcrumbProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const query = router.query;

  // State สำหรับเก็บ navigation history stack
  const [historyStack, setHistoryStack] = useState<BreadcrumbItem[]>([
    { label: "Home", href: "/", isHome: true },
  ]);

  // State สำหรับ track การ navigation
  const [lastPathname, setLastPathname] = useState<string>("/");
  const [isDirectNavigation, setIsDirectNavigation] = useState<boolean>(false);
  const [navigationSource, setNavigationSource] = useState<string>("unknown");

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

  // Define logical flows for different sections
  const defineFlowBreadcrumbs = (
    pathname: string,
    query: any,
  ): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);

    // Home page
    if (pathname === "/") {
      return [{ label: "Home", href: "/", isHome: true }];
    }

    // ======= BOOKING FLOW =======
    if (pathname.startsWith("/booking")) {
      if (pathname === "/booking/[bookingId]" && query.bookingId) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Booking Details", href: `/booking/${query.bookingId}` },
        ];
      }
      if (pathname === "/booking/booking-slot/[bookingId]" && query.bookingId) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Booking Details", href: `/booking/${query.bookingId}` },
          {
            label: "Select Time Slot",
            href: `/booking/booking-slot/${query.bookingId}`,
          },
        ];
      }
      if (pathname === "/booking/confirm-slot/[bookingId]" && query.bookingId) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Booking Details", href: `/booking/${query.bookingId}` },
          {
            label: "Select Time Slot",
            href: `/booking/booking-slot/${query.bookingId}`,
          },
          {
            label: "Confirm Time Slot",
            href: `/booking/confirm-slot/${query.bookingId}`,
          },
        ];
      }
      if (pathname === "/booking/payment/[bookingId]" && query.bookingId) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Booking Details", href: `/booking/${query.bookingId}` },
          { label: "Payment", href: `/booking/payment/${query.bookingId}` },
        ];
      }
      if (
        pathname === "/booking/booking-success/[bookingId]" &&
        query.bookingId
      ) {
        return [
          { label: "Home", href: "/", isHome: true },
          {
            label: "Booking Success",
            href: `/booking/booking-success/${query.bookingId}`,
          },
        ];
      }
    }

    // ======= COURSE FLOW =======
    if (pathname.startsWith("/course")) {
      if (pathname === "/courses") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "All Courses", href: "/courses" },
        ];
      }
      if (pathname === "/course/[courseId]" && query.courseId) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "All Courses", href: "/courses" },
          { label: "Course Details", href: `/course/${query.courseId}` },
        ];
      }

      // Prophet course management flow
      if (pathname === "/course/prophet") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Prophet Courses", href: "/course/prophet" },
        ];
      }
      if (pathname === "/course/prophet/my-courses") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Prophet Courses", href: "/course/prophet" },
          { label: "My Courses", href: "/course/prophet/my-courses" },
        ];
      }
      if (pathname === "/course/prophet/my-courses/create") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Prophet Courses", href: "/course/prophet" },
          { label: "My Courses", href: "/course/prophet/my-courses" },
          { label: "Create Course", href: "/course/prophet/my-courses/create" },
        ];
      }
      if (
        pathname === "/course/prophet/my-courses/edit/[courseId]" &&
        query.courseId
      ) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Prophet Courses", href: "/course/prophet" },
          { label: "My Courses", href: "/course/prophet/my-courses" },
          {
            label: "Edit Course",
            href: `/course/prophet/my-courses/edit/${query.courseId}`,
          },
        ];
      }
      if (
        pathname === "/course/prophet/my-courses/details/[courseId]" &&
        query.courseId
      ) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Prophet Courses", href: "/course/prophet" },
          { label: "My Courses", href: "/course/prophet/my-courses" },
          {
            label: "Course Details",
            href: `/course/prophet/my-courses/details/${query.courseId}`,
          },
        ];
      }
      if (pathname === "/course/prophet/my-session") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Prophet Courses", href: "/course/prophet" },
          { label: "My Sessions", href: "/course/prophet/my-session" },
        ];
      }
    }

    // ======= REPORT FLOW =======
    if (pathname.startsWith("/report")) {
      if (pathname === "/report") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Reports", href: "/report" },
        ];
      }
      if (pathname === "/report/create") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Reports", href: "/report" },
          { label: "Create Report", href: "/report/create" },
        ];
      }
    }

    // ======= ACCOUNT FLOW =======
    if (pathname.startsWith("/account")) {
      if (pathname === "/account") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "My Account", href: "/account" },
        ];
      }
      if (pathname === "/account/[account-id]" && query["account-id"]) {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "Profile", href: `/account/${query["account-id"]}` },
        ];
      }
      if (pathname === "/account/edit-account") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "My Account", href: "/account" },
          { label: "Edit Account", href: "/account/edit-account" },
        ];
      }

      // Prophet account flows
      if (pathname === "/account/prophet/availability") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "My Account", href: "/account" },
          { label: "Availability", href: "/account/prophet/availability" },
        ];
      }
      if (pathname === "/account/prophet/transaction-account") {
        return [
          { label: "Home", href: "/", isHome: true },
          { label: "My Account", href: "/account" },
          {
            label: "Bank Account",
            href: "/account/prophet/transaction-account",
          },
        ];
      }
    }

    // ======= REVIEW FLOW =======
    if (pathname === "/review") {
      return [
        { label: "Home", href: "/", isHome: true },
        { label: "Reviews", href: "/review" },
      ];
    }

    // ======= FALLBACK =======
    // For unknown routes, just show current page
    const lastSegment = segments[segments.length - 1];
    const label = pathLabels[lastSegment] || lastSegment || "Current Page";

    return [
      { label: "Home", href: "/", isHome: true },
      { label, href: pathname },
    ];
  };

  // Function สำหรับสร้าง breadcrumb item จาก current route
  const createBreadcrumbFromRoute = (
    pathname: string,
    query: any,
  ): BreadcrumbItem => {
    const flowBreadcrumbs = defineFlowBreadcrumbs(pathname, query);
    return flowBreadcrumbs[flowBreadcrumbs.length - 1]; // Return the last item as current page
  };

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const href = link.getAttribute("href");
        if (href) {
          const isContentLink =
            link.hasAttribute("data-content-navigation") ||
            link.closest("[data-content-area]") ||
            link.closest("main") ||
            link.closest('[role="main"]');

          const isNavLink =
            link.closest("nav") ||
            link.closest("header") ||
            link.closest("[data-navigation]") ||
            link.closest('[role="navigation"]');

          if (isNavLink) {
            setNavigationSource("navigation");
            setIsDirectNavigation(true);
          } else if (isContentLink) {
            setNavigationSource("content");
            setIsDirectNavigation(false);
          } else {
            setNavigationSource("unknown");
            setIsDirectNavigation(true);
          }
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (navigationSource === "navigation" || navigationSource === "unknown") {
        setIsDirectNavigation(true);
      }

      // Reset navigation source
      setTimeout(() => setNavigationSource("unknown"), 100);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events, navigationSource]);

  useEffect(() => {
    // Don't track auth pages
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/reset-password" ||
      pathname.startsWith("/auth/")
    ) {
      if (pathname === "/" && lastPathname !== "/") {
        setHistoryStack([{ label: "Home", href: "/", isHome: true }]);
      }
      setLastPathname(pathname);
      return;
    }

    const currentPage = createBreadcrumbFromRoute(pathname, query);

    // ใช้ defineFlowBreadcrumbs แทนการ track history แบบเก่า
    const flowBreadcrumbs = defineFlowBreadcrumbs(pathname, query);

    setHistoryStack(flowBreadcrumbs);
    setLastPathname(pathname);
  }, [pathname, query]);

  const breadcrumbs = historyStack;

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
    <div
      className={`fixed top-0 z-40 select-none ${className}`}
      data-content-area="true"
    >
      <div className="flex w-screen justify-center">
        <div className="px-6 py-3">
          <nav className="text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                const isFirst = idx === 0;

                return (
                  <li key={idx} className={`flex items-center`}>
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className={linkStyle}
                        data-content-navigation="true"
                      >
                        {isFirst && (
                          <Home className="mr-1.5 h-4 w-4 text-white" />
                        )}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <div className={`${isLast ? currentStyle : linkStyle}`}>
                        {isFirst && (
                          <Home className="mr-1.5 h-4 w-4 text-white" />
                        )}
                        <span className="flex items-center">{item.label}</span>
                      </div>
                    )}

                    {!isLast && (
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
