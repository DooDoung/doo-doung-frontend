import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ConfirmBookingActions,CourseCard, TimeSlotWithPurchase } from "@/components/booking";
import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";

interface CourseData {
  courseImageSrc: string;
  courseImageAlt: string;
  title: string;
  method: string;
  duration: string;
  description: string;
  price: string;
  prophetName: string;
  prophetImageSrc: string;
}

export default function ConfirmSlotPage() {
  const router = useRouter();
  const { courseld } = router.query; // dynamic param from filename [bookingld].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = () => {
    router.push('/booking/payment/[bookingld]');
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseld) return;
      setLoading(true);
      setError(null);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      try {
        const res = await fetch(`${backendUrl}/course/${courseld}`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            : { "Content-Type": "application/json" },
        });

        const resualt = await res.json();
        const fetched =
          resualt?.data?.courseData ?? resualt?.data?.data ?? resualt.data;
        if (!fetched) {
          throw new Error("Course data not found");
        }
        const transformedData: CourseData = {
          courseImageSrc: "/images/course.svg", // Add default image or get from backend
          courseImageAlt: fetched.courseName,
          title: fetched.courseName,
          method: fetched.horoscopeMethodId, // You might want to map this to actual method names
          duration: fetched.durationMin,
          description: `${fetched.courseName} course by ${fetched.prophetName}. Duration: ${fetched.durationMin} minutes.`, // Add if you have description in backend
          price: fetched.price, // Format price as needed
          prophetName: fetched.name,
          prophetImageSrc: "/images/course.svg", // Add default image or get from backend
        };
        setCourseData(transformedData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseld, token]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !courseData) {
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <p className="text-white">Error: {error ?? "Course not found"}</p>
      </DefaultLayout>
    );
  }

  // from previous page or fetch from backend
  const timeSlotData = {
    selectedDate: "10 October 2025",
    selectedTime: "00:15-00:45 AM"
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <GlassContainer2>
          <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 font-sanctuary">
              Booking
            </h1>

            <div className="flex h-[50vh] sm:h-[55vh] lg:h-[50vh] w-full flex-col items-center overflow-y-auto px-2 sm:px-4">
              <CourseCard {...courseData} />
              
              <div className="w-full max-w-4xl mt-4">
                <TimeSlotWithPurchase 
                  selectedDate={timeSlotData.selectedDate}
                  selectedTime={timeSlotData.selectedTime}
                  onPurchase={handlePurchase}
                />
              </div>
            </div>

            <ConfirmBookingActions 
              onBack={handleBack} 
            />
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
