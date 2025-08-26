import { NextRequest, NextResponse } from "next/server";

const AllowNoAuthPath = [
  "/login",
  "/register",
  "/resetpassword",
  "/course",
  "/course/[courseld]",
  "/",
];

const AllowCustomerPath = [
  "/account",
  "/account/[account-id]",
  "/account/edit-account",
  "/course/my-session",
  "/booking/[bookingld]",
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
  "/course/prophet",
  "/course/prophet/my-session",
  "/course/prophet/my-courses",
  "/course/prophet/my-courses/create",
  "/course/prophet/my-courses/details/[courseld]",
  "/course/prophet/my-courses/edit/[courseld]",
];

const AllowAdminPath = ["/admin/report"];

import { RoleType } from "./types/role";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // FOR DEV : you can change the role here
  const role: RoleType = "customer";

  // FOR DEV : if you don't want to check role, remove comment of this line
  // return NextResponse.next();

  // Skip middleware for static files, API routes, Files with extensions, and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (hasAccess(pathname, role)) {
    return NextResponse.next();
  }

  const redirectUrl = getRedirectUrl(role);
  const url = request.nextUrl.clone();
  url.pathname = redirectUrl;
  return NextResponse.redirect(url);
}

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

function hasAccess(pathname: string, userRole: RoleType): boolean {
  if (AllowNoAuthPath.some((pattern) => matchPath(pathname, pattern))) {
    return true;
  }

  if (!userRole) {
    return false;
  }

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

function getRedirectUrl(userRole: RoleType): string {
  if (!userRole) return "/login";

  switch (userRole) {
    case "admin":
      return "/admin/report";
    case "prophet":
      return "/course/prophet";
    case "customer":
      return "/course";
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
