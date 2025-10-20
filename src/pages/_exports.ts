// Authentication Pages
export { default as LoginPage } from "./login";
export { default as RegisterPage } from "./register";
export { default as ResetPasswordPage } from "./reset-password";

// Account Pages
export { default as AccountPage } from "./account";
export { default as AccountDetailsPage } from "./account/[account-id]";
export { default as EditAccountPage } from "./account/edit-account";
export { default as ProphetAvailabilityPage } from "./account/prophet/availability";
export { default as ProphetReportPage } from "./account/prophet/report";

// Course Pages
export { default as CourseProphetPage } from "./course/prophet";
export { default as MyCoursesPage } from "./course/prophet/my-courses";
export { default as CreateCoursePage } from "./course/prophet/my-courses/create";
export { default as CourseDetailsPage } from "./course/prophet/my-courses/details/[courseId]";
export { default as EditCoursePage } from "./course/prophet/my-courses/edit/[courseld]";
export { default as CourseMySessionPage } from "./course/prophet/my-session";

// Courses (Public) Pages
export { default as CoursesPage } from "./course";
export { default as CourseDetailPage } from "./course/[courseld]";
export { default as CoursesMySessionPage } from "./course/my-session";

// Booking Pages
export { default as BookingSuccessPage } from "./booking/booking-success/[bookingld]";
export { default as BookingPage } from "./booking/main/[bookingld]";
export { default as BookingPaymentPage } from "./booking/payment/[bookingld]";

// Review Pages
export { default as ReviewPage } from "./review";

// Report Pages
export { default as ReportPage } from "./report";
export { default as CreateReportPage } from "./report/create";

// Admin Pages
export { default as AdminReportPage } from "./admin/report";
