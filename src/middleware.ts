import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Add this flag to disable auth for testing
const DISABLE_AUTH_FOR_TESTING =
  process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

const AllowNoAuthPath = [
  "/login",
  "/globalcomponents",
  "/register",
  "/reset-password",
  "/reset-password/successful",
  "/reset-password/token",
  "/course",
  "/course/[courseld]",
  "/courses",
  "/",
];

const AllowCustomerPath = [
  "/account",
  "/account/[account-id]",
  "/account/edit-account",
  "/course/my-session",
  "/booking/[bookingld]",
  "/booking/booking-slot/[bookingld]",
  "/booking/confirm-slot/[bookingld]",
  "/booking/payment/[bookingld]",
  "/booking/booking-success/[bookingld]",
  "/review",
  "/report",
  "/report/create",
];

const AllowProphetPath = [
  "/account",
  "/account/[account-id]",
  "/account/edit-account",
  "/account/prophet/report",
  "/account/prophet/availability",
  "/account/prophet/transaction-account",
  "/course/prophet",
  "/course/prophet/my-session",
  "/course/prophet/my-session/[id]",
  "/course/prophet/my-courses",
  "/course/prophet/my-courses/create",
  "/course/prophet/my-courses/details/[courseld]",
  "/course/prophet/my-courses/edit/[courseld]",
];

const AllowAdminPath = ["/admin/report"];

import { RoleType } from "./types/role";

export default withAuth(
  function middleware(req) {
    // If auth is disabled for testing, allow all access
    if (DISABLE_AUTH_FOR_TESTING) {
      return NextResponse.next();
    }

    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const role: RoleType | null = (
      typeof token?.role === "string" ? token.role.toLowerCase() : null
    ) as RoleType | null;
    // Check if user has access to the current path
    if (hasAccess(pathname, role)) {
      return NextResponse.next();
    }

    // If user doesn't have access, redirect them to appropriate page
    const redirectUrl = getRedirectUrl(role);
    const url = req.nextUrl.clone();
    url.pathname = redirectUrl;
    return NextResponse.redirect(url);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // If auth is disabled for testing, allow all requests
        if (DISABLE_AUTH_FOR_TESTING) {
          return true;
        }

        const { pathname } = req.nextUrl;

        // Allow access to public paths without authentication
        if (AllowNoAuthPath.some((pattern) => matchPath(pathname, pattern))) {
          return true;
        }

        // For protected paths, require a valid token
        return !!token;
      },
    },
  },
);

// ==================== SUPPORT FUNCTION ====================

function matchPath(pathname: string, pattern: string): boolean {
  if (pathname === pattern) return true;

  // Handle dynamic routes like [id], [courseld], etc.
  const patternParts = pattern.split("/");
  const pathnameParts = pathname.split("/");

  if (patternParts.length !== pathnameParts.length) return false;

  return patternParts.every((part, index) => {
    // Dynamic segment (e.g., [id], [courseld])
    if (part.startsWith("[") && part.endsWith("]")) return true;
    // Static segment must match exactly
    return part === pathnameParts[index];
  });
}

function hasAccess(pathname: string, userRole: RoleType | null): boolean {
  // Allow access to public paths for everyone
  if (AllowNoAuthPath.some((pattern) => matchPath(pathname, pattern))) {
    return true;
  }

  // If no role (not authenticated), deny access to protected paths
  if (!userRole) {
    return false;
  }

  // Check role-specific access
  if (userRole === "admin") {
    return AllowAdminPath.some((pattern) => matchPath(pathname, pattern));
  }

  if (userRole === "customer") {
    return AllowCustomerPath.some((pattern) => matchPath(pathname, pattern));
  }

  if (userRole === "prophet") {
    return AllowProphetPath.some((pattern) => matchPath(pathname, pattern));
  }

  return false;
}

function getRedirectUrl(userRole: RoleType | null): string {
  if (!userRole) return "/login";

  switch (userRole) {
    case "admin":
      return "/admin/report";
    case "prophet":
      return "/course/prophet/my-session";
    case "customer":
      return "/courses";
    default:
      return "/login";
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
