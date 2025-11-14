import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { BackToHomeActions,CourseCard, TimeSlotConfirmed } from "@/components/booking";
import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import { toDisplaySlot } from "@/hooks/useCustomerBookSlot";
import { AppToast } from "@/lib/app-toast";

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

interface BookedData {
  courseId: string;
  prophetId: string;
  startDateTime: string;
  endDateTime: string;
  status: string;
}

export default function BookingSuccessPage() {
  const router = useRouter();
  const { bookingId } = router.query; // dynamic param from filename [bookingId].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [bookedData, setBookedData] = useState<BookedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const handleBackToHome = () => {
    router.push('/');
  };

  useEffect(() => {
      const fetchBooking = async () => {
        if (!bookingId) return;
        setLoading(true);
        setError(null);

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  
        try {
          const res = await fetch(`${backendUrl}/booking/detail/${bookingId}`, {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                }
              : { "Content-Type": "application/json" },
          });

          const resualt = await res.json();
          const fetched = resualt?.data;
          if (!fetched) {
            throw new Error("Booking data not found");
          }
          const transformedData: BookedData = {
            courseId: fetched.course?.id ?? "",
            prophetId: fetched.prophet?.id ?? "",
            startDateTime: fetched.startDateTime,
            endDateTime: fetched.endDateTime,
            status: fetched.status,
          };
  
          setBookedData(transformedData);
        }
        catch (err: any) {
          setError(err.message || "Failed to fetch booking data");
        } finally {
          setLoading(false);
        }
      };
      fetchBooking();
    }, [bookingId, token]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!bookedData?.courseId) return;
      setLoading(true);
      setError(null);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      try {
        const res = await fetch(`${backendUrl}/course/${bookedData?.courseId}`, {
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
        AppToast.success("Confirmed Booking!");
      } catch (err: any) {
        setError(err.message || "Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [bookedData?.courseId, token]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

    if (error) {
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <p className="text-white">Error: {error}</p>
      </DefaultLayout>
    );
  }

  if (!courseData) {
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <p className="text-white">Course not found</p>
      </DefaultLayout>
    );
  }

  if (!bookedData) {
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <p className="text-white">Failed to load booked sessions</p>
      </DefaultLayout>
    );
  }

  const timeSlotData = toDisplaySlot({
    start_datetime: bookedData?.startDateTime, 
    end_datetime: bookedData?.endDateTime}
  );
  
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
                <TimeSlotConfirmed 
                  selectedDate={timeSlotData.selectedDate}
                  selectedTime={timeSlotData.selectedTime}
                />
              </div>
            </div>

            <BackToHomeActions onBackToHome={handleBackToHome} />
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
