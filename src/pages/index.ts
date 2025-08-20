// Authentication Pages
export { default as LoginPage } from "./login";
export { default as RegisterPage } from "./register";
export { default as ResetPasswordPage } from "./resetpassword";

// Account Pages
export { default as AccountPage } from "./account";
export { default as AccountDetailsPage } from "./account/[account-id]";
export { default as EditAccountPage } from "./account/edit-account";
export { default as ProphetReportPage } from "./account/prophet/report";
export { default as ProphetAvailabilityPage } from "./account/prophet/availability";

// Course Pages
export { default as CourseProphetPage } from "./course/prophet";
export { default as CourseMySessionPage } from "./course/prophet/my-session";
export { default as MyCoursesPage } from "./course/prophet/my-courses";
export { default as CreateCoursePage } from "./course/prophet/my-courses/create";
export { default as CourseDetailsPage } from "./course/prophet/my-courses/details/[courseld]";
export { default as EditCoursePage } from "./course/prophet/my-courses/edit/[courseld]";

// Courses (Public) Pages
export { default as CoursesPage } from "./courses";
export { default as CourseDetailPage } from "./courses/[courseld]";
export { default as CoursesMySessionPage } from "./courses/my-session";

// Booking Pages
export { default as BookingPage } from "./booking/[bookingld]";
export { default as BookingPaymentPage } from "./booking/payment/[bookingld]";
export { default as BookingSuccessPage } from "./booking/booking-success/[bookingld]";

// Review Pages
export { default as ReviewPage } from "./review";

// Report Pages
export { default as ReportPage } from "./report";
export { default as CreateReportPage } from "./report/create";

// Admin Pages
export { default as AdminReportPage } from "./admin/report";
