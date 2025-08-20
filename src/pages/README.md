# Pages Directory

This directory contains all the page components for the DooDoung platform. Each page uses the `DefaultLayout` component and follows a consistent structure.

## Page Structure

All pages follow this basic pattern:

```tsx
import { DefaultLayout } from "@/components/globalComponents"

export default function PageName() {
  return (
    <DefaultLayout>
      <p>This is {Page Name} page</p>
    </DefaultLayout>
  )
}
```

## Page Categories

### 🔐 Authentication Pages

- **`login.tsx`** - User login page
- **`register.tsx`** - User registration page
- **`resetpassword.tsx`** - Password reset page (supports token query parameter)

### 👤 Account Management

- **`account.tsx`** - Main account page
- **`account/[account-id].tsx`** - Account details for specific user
- **`account/edit-account.tsx`** - Edit account information
- **`account/prophet/report.tsx`** - Prophet report dashboard
- **`account/prophet/availability.tsx`** - Prophet availability management

### 📚 Course Management (Prophet)

- **`course/prophet.tsx`** - Main prophet course dashboard
- **`course/prophet/my-session.tsx`** - Prophet's teaching sessions
- **`course/prophet/my-courses.tsx`** - Prophet's course list
- **`course/prophet/my-courses/create.tsx`** - Create new course
- **`course/prophet/my-courses/details/[courseld].tsx`** - Course details view
- **`course/prophet/my-courses/edit/[courseld].tsx`** - Edit course

### 🎓 Public Courses

- **`courses.tsx`** - Browse all courses
- **`courses/[courseld].tsx`** - Individual course detail page
- **`courses/my-session.tsx`** - Student's enrolled sessions

### 💳 Booking & Payment

- **`booking/[bookingld].tsx`** - Booking details page
- **`booking/payment/[bookingld].tsx`** - Payment processing
- **`booking/booking-success/[bookingld].tsx`** - Booking confirmation

### ⭐ Reviews

- **`review.tsx`** - Reviews listing and management

### 📊 Reports

- **`report.tsx`** - User reports dashboard
- **`report/create.tsx`** - Create new report

### 🔧 Admin

- **`admin/report.tsx`** - Admin reports dashboard

## Dynamic Routes

Pages with dynamic segments use Next.js bracket notation:

- **`[account-id]`** - Account ID parameter
- **`[courseld]`** - Course ID parameter
- **`[bookingld]`** - Booking ID parameter

## File Naming Convention

- Static routes: `page-name.tsx`
- Dynamic routes: `[parameter].tsx`
- Nested routes: `folder/page-name.tsx`
- Hyphens replace slashes in original paths

## Usage

Import pages from the index file:

```tsx
import { LoginPage, CoursesPage, AccountPage } from "@/pages";
```

Or import directly:

```tsx
import LoginPage from "@/pages/login";
```

## Route Mapping

| Original Path                                  | File Path                                          | Component Name            |
| ---------------------------------------------- | -------------------------------------------------- | ------------------------- |
| `/login`                                       | `login.tsx`                                        | `LoginPage`               |
| `/resetpassword`                               | `resetpassword.tsx`                                | `ResetPasswordPage`       |
| `/register`                                    | `register.tsx`                                     | `RegisterPage`            |
| `/account`                                     | `account.tsx`                                      | `AccountPage`             |
| `/account/:account-id`                         | `account/[account-id].tsx`                         | `AccountDetailsPage`      |
| `/account/edit-account`                        | `account/edit-account.tsx`                         | `EditAccountPage`         |
| `/account/prophet/report`                      | `account/prophet/report.tsx`                       | `ProphetReportPage`       |
| `/account/prophet/availability`                | `account/prophet/availability.tsx`                 | `ProphetAvailabilityPage` |
| `/course/prophet`                              | `course/prophet.tsx`                               | `CourseProphetPage`       |
| `/course/prophet/my-session`                   | `course/prophet/my-session.tsx`                    | `CourseMySessionPage`     |
| `/course/prophet/my-courses`                   | `course/prophet/my-courses.tsx`                    | `MyCoursesPage`           |
| `/course/prophet/my-courses/create`            | `course/prophet/my-courses/create.tsx`             | `CreateCoursePage`        |
| `/course/prophet/my-courses/details/:courseld` | `course/prophet/my-courses/details/[courseld].tsx` | `CourseDetailsPage`       |
| `/course/prophet/my-courses/edit/:courseld`    | `course/prophet/my-courses/edit/[courseld].tsx`    | `EditCoursePage`          |
| `/courses`                                     | `courses.tsx`                                      | `CoursesPage`             |
| `/courses/:courseld`                           | `courses/[courseld].tsx`                           | `CourseDetailPage`        |
| `/courses/my-session`                          | `courses/my-session.tsx`                           | `CoursesMySessionPage`    |
| `/booking/:bookingld`                          | `booking/[bookingld].tsx`                          | `BookingPage`             |
| `/booking/payment/:bookingld`                  | `booking/payment/[bookingld].tsx`                  | `BookingPaymentPage`      |
| `/booking/booking-success/:bookingld`          | `booking/booking-success/[bookingld].tsx`          | `BookingSuccessPage`      |
| `/review`                                      | `review.tsx`                                       | `ReviewPage`              |
| `/report`                                      | `report.tsx`                                       | `ReportPage`              |
| `/report/create`                               | `report/create.tsx`                                | `CreateReportPage`        |
| `/admin/report`                                | `admin/report.tsx`                                 | `AdminReportPage`         |

## Next Steps

1. **Add routing** - Configure Next.js routing for these pages
2. **Add content** - Replace placeholder text with actual page content
3. **Add forms** - Create forms for login, register, create pages
4. **Add data fetching** - Implement API calls for dynamic content
5. **Add error handling** - Add error boundaries and 404 pages
