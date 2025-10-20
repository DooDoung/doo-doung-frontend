import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import { CourseCard, BookingActions } from "@/components/booking";

export default function BookingPage() {
  const router = useRouter();

  const handleCheckAvailableTime = () => {
    router.push('/booking/booking-slot/[bookingld]');
  };

  const handleBack = () => {
    router.back();
  };

  // Mock data 
  const courseData = {
    courseImageSrc: "/images/course.svg",
    courseImageAlt: "Course image",
    title: "คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมอออม",
    method: "Current method",
    duration: "30",
    description: "Current course description description",
    price: "1,750",
    prophetName: "แม่หมอออม",
    prophetImageSrc: "/images/course.svg"
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <GlassContainer2>
          <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 font-sanctuary">
              Booking
            </h1>

            <div className="flex h-[45vh] sm:h-[50vh] lg:h-[45vh] w-full flex-col items-center overflow-y-auto px-2 sm:px-4">
              <CourseCard {...courseData} />
            </div>

            <BookingActions 
              onBack={handleBack} 
              onCheckAvailableTime={handleCheckAvailableTime} 
            />
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
