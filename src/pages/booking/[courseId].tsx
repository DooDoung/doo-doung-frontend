import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { BookingActions, CourseCard } from "@/components/booking";
import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
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

export default function BookingPage() {
  const router = useRouter();
  const { courseId } = router.query; // dynamic param from filename [courseId].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      setLoading(true);
      setError(null);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      try {
        const res = await axios.get(`${backendUrl}/course/${courseId}`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            : { "Content-Type": "application/json" },
        });

        const fetched =
          res.data?.data?.courseData ?? res.data?.data ?? res.data;
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
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch course data";
        setError(msg);
        AppToast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, token]);

  const handleCheckAvailableTime = () => {
    if (!courseId) return;

    router.push(`/booking/booking-slot/${courseId}`);
  };

  const handleBack = () => {
    router.back();
  };

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
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
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