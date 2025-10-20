import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { CourseCard, TimeSlotWithPurchase } from "@/components/booking";
import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
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

export default function BookingPaymentPage() {
  const router = useRouter();
  const { bookingld } = router.query; // dynamic param from filename [bookingld].tsx
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showQRCode, setShowQRCode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const handlePaymentSuccess = useCallback(() => {
    setShowQRCode(false);
    router.push('/booking/booking-success/[bookingld]');
  }, [router]);

  useEffect(() => {
    if (timeLeft === 295) { 
      setTimeout(() => {
        handlePaymentSuccess();
      }, 100);
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowQRCode(false);
    }
  }, [timeLeft, handlePaymentSuccess]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancel = () => {
    setShowQRCode(false);
    router.back();
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!bookingld) return;
      setLoading(true);
      setError(null);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      try {
        const res = await fetch(`${backendUrl}/course/${bookingld}`, {
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
  }, [bookingld, token]);

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

  const timeSlotData = {
    selectedDate: "10 October 2025",
    selectedTime: "00:15-00:45 AM"
  };

  const handlePurchaseClick = () => {
    setShowQRCode(true);
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <GlassContainer2>
          <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 font-sanctuary">
              Booking
            </h1>

            <div className={`flex h-[50vh] sm:h-[55vh] lg:h-[50vh] w-full flex-col items-center overflow-y-auto px-2 sm:px-4 transition-opacity duration-300 ${showQRCode ? 'opacity-30' : 'opacity-100'}`}>
              <CourseCard {...courseData} />
              
              <div className="w-full max-w-4xl mt-4">
                <TimeSlotWithPurchase 
                  selectedDate={timeSlotData.selectedDate}
                  selectedTime={timeSlotData.selectedTime}
                  onPurchase={handlePurchaseClick}
                />
              </div>
            </div>
          </div>
        </GlassContainer2>

        {showQRCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-primary-500 rounded-3xl items-start p-6 sm:p-8 max-w-sm sm:max-w-md w-full mx-4 shadow-2xl">
              <div className="bg-primary text-neutral-white text-center py-3 sm:py-8 rounded-xl mb-4 sm:mb-10 -mt-8 -mx-6 sm:-mx-8 px-6 sm:px-8">
                <h2 className="text-lg sm:text-xl font-semibold font-chakra">QR CODE FOR PAYMENT</h2>
              </div>

              <div className="rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 flex justify-center">
                <div className="w-50 h-50 sm:w-48 sm:h-48 bg-neutral-white border-2 border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://promptpay.io/0891234567/1750.00"
                    alt="QR Code for Payment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-neutral-black font-mono">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-neutral-black font-chakra mt-2 text-sm sm:text-base">กรุณาสแกน QR Code ภายในเวลาที่กำหนด</p>
              </div>

              {/* Cancel Button */}
              <div className="flex justify-center">
                <GlobalButton variant="secondary" className="w-28" onClick={handleCancel}>
                  Cancel
                </GlobalButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
