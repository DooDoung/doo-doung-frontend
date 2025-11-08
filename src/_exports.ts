// lib/pages/index.ts or src/page-components/index.ts
// Move this file OUTSIDE the pages directory to avoid Next.js routing conflicts

// Authentication Pages
export { default as LoginPage } from "@/pages/login";
export { default as RegisterPage } from "@/pages/register";
export { default as ResetPasswordPage } from "@/pages/reset-password";

// Account Pages
export { default as AccountPage } from "@/pages/account";
export { default as AccountDetailsPage } from "@/pages/account/[account-id]";
export { default as EditAccountPage } from "@/pages/account/edit-account";
export { default as ProphetAvailabilityPage } from "@/pages/account/prophet/availability";
export { default as ProphetReportPage } from "@/pages/account/prophet/report";

// Course Pages
export { default as CourseProphetPage } from "@/pages/course/prophet";
export { default as MyCoursesPage } from "@/pages/course/prophet/my-courses";
export { default as CreateCoursePage } from "@/pages/course/prophet/my-courses/create";
export { default as CourseDetailsPage } from "@/pages/course/prophet/my-courses/details/[courseId]";
export { default as EditCoursePage } from "@/pages/course/prophet/my-courses/edit/[courseld]";
export { default as CourseMySessionPage } from "@/pages/course/prophet/my-session";

// Courses (Public) Pages
export { default as CoursesPage } from "@/pages/course";
export { default as CourseDetailPage } from "@/pages/course/[courseld]";
export { default as CoursesMySessionPage } from "@/pages/course/my-session";

// Booking Pages
export { default as BookingSuccessPage } from "@/pages/booking/booking-success/[bookingld]";
export { default as BookingPage } from "@/pages/booking/[bookingld]";
export { default as BookingPaymentPage } from "@/pages/booking/payment/[bookingld]";

// Review Pages
export { default as ReviewPage } from "@/pages/review";

// Report Pages
export { default as ReportPage } from "@/pages/report";
export { default as CreateReportPage } from "@/pages/report/create";

// Admin Pages
export { default as AdminReportPage } from "@/pages/admin/report";