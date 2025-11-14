import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import SessionTableBooking from "@/components/session/SessionTableBooking";
import { useCustomerBookSlot } from "@/hooks/useCustomerBookSlot";

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
  prophetld: string;
}

export default function BookingSlotPage() {
  const router = useRouter();
  const { courseId } = router.query; // dynamic param from filename [courseId].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSelectedChange = (slots: { day: string; time: string }[]) => {
    console.log("Selected slots:", slots);
  };

  const fetchCourse = async () => {
    if (!courseId) return;
    setLoading(true);
    setError(null);

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${backendUrl}/course/${courseId}`, {
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
        prophetld: fetched.prophetId,
      };
      setCourseData(transformedData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch course data");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!courseId) return;
    fetchCourse();
  }, [courseId, token]);
  
  const { currentWeek,
    availableSlots,
    bookingSlots,
    goToPreviousWeek,
    goToNextWeek,
  } = useCustomerBookSlot(courseId as string,  courseData?.prophetld, token);

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

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <GlassContainer2>
          <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 font-sanctuary">
              Select Time Slot
            </h1>
            <div className="w-full max-w-6xl">
              <SessionTableBooking 
                onSelectedChange={handleSelectedChange}
                availableSlots={availableSlots}
                bookingSlots={bookingSlots}
                durationMinutes={parseInt(courseData.duration)} 
                currentWeek={currentWeek}
                courseId={Array.isArray(courseId) ? courseId[0] : courseId}
                goToNextWeek={goToNextWeek}
                goToPreviousWeek={goToPreviousWeek}
              />
            </div>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
