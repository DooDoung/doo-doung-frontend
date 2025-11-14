import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ConfirmBookingActions,CourseCard, TimeSlotWithPurchase } from "@/components/booking";
import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import { toDisplaySlot } from "@/hooks/useCustomerBookSlot";

interface CourseData {
  prophetId: string;
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
  const { courseId } = router.query; // dynamic param from filename [bookingld].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSlots, setSelectedSlots] = useState<{start_datetime: string; end_datetime: string}>();



  const handlePurchase = async () => {
    if (!selectedSlots || !courseData) return;
    try {
      const actualCourseId = Array.isArray(courseId) ? courseId[0] : courseId;
      const payload = {
        courseId: actualCourseId,
        accountId: session?.user?.id,
        prophetId: courseData.prophetId,
        startDateTime: selectedSlots.start_datetime,
        endDateTime: selectedSlots.end_datetime,
      };

      const result = await createBooking(token, payload);
      
      const bookingId = result?.booking?.id || result?.data?.booking?.id;

      if (!bookingId) {
        throw new Error("Booking ID not found in response");
      }

      router.push(`/booking/payment/${bookingId}`);
    } catch (err: any) {
      console.error(err);
      alert("❌ Failed to create booking: " + err.message);
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchCourse = async () => {
      // Wait for router to be ready
      if (!router.isReady) {
        return;
      }
      
      const actualCourseId = Array.isArray(courseId) ? courseId[0] : courseId;
      
      if (!actualCourseId) {
        setError("Course ID is required. Please select a course first.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      try {
        const res = await fetch(`${backendUrl}/course/${actualCourseId}`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            : { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to fetch course data`);
        }

        const resualt = await res.json();
        
        const fetched =
          resualt?.data?.courseData ?? resualt?.data ?? resualt;
        
        if (!fetched) {
          throw new Error("Course data not found in response");
        }
        
        if (!fetched.id) {
          throw new Error("Invalid course data: missing course ID");
        }
        const transformedData: CourseData = {
          prophetId: fetched.prophetId,
          courseImageSrc: "/images/course.svg", // Add default image or get from backend
          courseImageAlt: fetched.courseName,
          title: fetched.courseName,
          method: fetched.horoscopeMethodId, // You might want to map this to actual method names
          duration: fetched.durationMin,
          description: `${fetched.courseName} course by ${fetched.name} ${fetched.lastname || ''}. Duration: ${fetched.durationMin} minutes.`,
          price: fetched.price,
          prophetName: `${fetched.name} ${fetched.lastname || ''}`.trim(),
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
  }, [courseId, token, router.isReady]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedSlots");
    if (stored) {
      setSelectedSlots(JSON.parse(stored));
    }
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !courseData || !selectedSlots) {
    const actualCourseId = Array.isArray(courseId) ? courseId[0] : courseId;
    const errorMessage = error || (!courseData ? "Course not found" : "No time slot selected");
    const showReturnButton = actualCourseId && !selectedSlots;
    
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <div className="text-center space-y-4">
          <p className="text-white text-lg">Error: {errorMessage}</p>
          {showReturnButton && (
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Please select a time slot first</p>
              <button
                onClick={() => router.push(`/booking/booking-slot/${actualCourseId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Select Time Slot
              </button>
            </div>
          )}
          {!actualCourseId && (
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Please start by selecting a course</p>
              <button
                onClick={() => router.push('/courses')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </DefaultLayout>
    );
  }

  // from previous page or fetch from backend
  const timeSlotData = toDisplaySlot(selectedSlots);

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

async function createBooking(token: string, payload: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Booking failed (${res.status}): ${msg}`);
  }

  return await res.json();
}
