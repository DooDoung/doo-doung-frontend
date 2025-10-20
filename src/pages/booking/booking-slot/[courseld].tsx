import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import SessionTableBooking from "@/components/session/SessionTableBooking";

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
  const { courseld } = router.query; // dynamic param from filename [courseld].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [availableSlots, setAvailableSlots] = useState<{ day: string; time: string }[]>([]);
  const [bookingSlots, setBookingSlots] = useState<{ id: string; day: string; time: string; variant: string }[]>([]);

  const handleBookingSlot = () => {
    router.push('/booking/confirm-slot/[courseld]');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSelectedChange = (slots: { day: string; time: string }[]) => {
    console.log("Selected slots:", slots);
  };

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
        prophetld: fetched.prophetId,
      };
      setCourseData(transformedData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch course data");
    } finally {
      setLoading(false);
    }
  };

  // helper function transform date -> (MON, TUE, ...)
  const getDayAbbrev = (dateStr: string): string => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const getTimeString = (date: Date): string => {
    const h = String(date.getUTCHours()).padStart(2, "0");
    const m = String(date.getUTCMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  const transformBookingsToSlots = (data: any[]) => {
    const slots: { id: string; day: string; time: string; variant: string }[] = [];

    data.forEach((b) => {
      const start = new Date(b.startDateTime);
      const end = new Date(b.endDateTime);
      const variant = "TAKEN";
      const day = getDayAbbrev(b.startDateTime);

      // create 15-min slots between start and end time
      for (let t = new Date(start); t < end; t.setUTCMinutes(t.getUTCMinutes() + 15)) {
        slots.push({
          id: b.id,
          day,
          time: getTimeString(new Date(t)),
          variant,
        });
      }
    });
    return slots;
  };


  const getAvailableSlots = async () => {
    const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${backendUrl}/prophet/availability/${courseld}`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (!result.data) {
        throw new Error("Prophet data not found");
      }

      const transformedData = result.data.map((slot: any) => ({
        day: getDayAbbrev(slot.date),
        time: slot.startTime,
      }));

      setAvailableSlots(transformedData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch course data");
    } finally {
    }
  };

  const getBookingSlots = async () => {
    const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    try {
      const res = await fetch(`${backendUrl}/booking/${courseData?.prophetld}`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" },
      });   
      const result = await res.json();
      if (!result.data) {
        throw new Error("Booking slots data not found");
      } 
      
      setBookingSlots(transformBookingsToSlots(result.data));
    } catch (err: any) {
      setError(err.message || "Failed to fetch booking slots data");
      return [];
    } finally {
    }
  };
  
  useEffect(() => {
    if (!courseld) return;
    fetchCourse();
    getAvailableSlots();
  }, [courseld, token]);

  useEffect(() => {
    if (!courseData?.prophetld) return;
    getBookingSlots();
  }, [courseData?.prophetld, token]);

  console.log("courseData:", courseData);
  console.log("bookingSlot:", bookingSlots);

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
                currentWeek={0}
                courseld={courseld}
              />
            </div>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
