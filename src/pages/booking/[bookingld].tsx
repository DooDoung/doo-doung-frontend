import { useRouter } from "next/router";

import { BookingActions, CourseCard } from "@/components/booking";
import { DefaultLayout, Breadcrumb } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";

export default function BookingPage() {
  const router = useRouter();
  const { bookingld } = router.query;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Booking", href: "/booking" },
    { label: String(bookingld) },
  ];

  const handleCheckAvailableTime = () => {
    router.push("/booking/booking-slot/[bookingld]");
  };

  const handleBack = () => {
    router.back();
  };

  const courseData = {
    courseImageSrc: "/images/course.svg",
    courseImageAlt: "Course image",
    title: "คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมอออม",
    method: "Current method",
    duration: "30",
    description: "Current course description description",
    price: "1,750",
    prophetName: "แม่หมอออม",
    prophetImageSrc: "/images/course.svg",
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <GlassContainer2>
          <div className="flex w-full flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="font-sanctuary mb-6 text-3xl font-light text-white sm:mb-8 sm:text-4xl lg:text-5xl">
              Booking
            </h1>

            <div className="flex h-[45vh] w-full flex-col items-center overflow-y-auto px-2 sm:h-[50vh] sm:px-4 lg:h-[45vh]">
              <CourseCard {...courseData} />
            </div>

            <div className="mt-6 sm:mt-8">
              <BookingActions
                onBack={handleBack}
                onCheckAvailableTime={handleCheckAvailableTime}
              />
            </div>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
