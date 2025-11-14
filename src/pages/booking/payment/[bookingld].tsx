import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { CourseCard, TimeSlotWithPurchase } from "@/components/booking";
import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";

export default function BookingPaymentPage() {
  const router = useRouter();
  const [showQRCode, setShowQRCode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const handlePaymentSuccess = useCallback(() => {
    setShowQRCode(false);
    router.push("/booking/booking-success/[bookingld]");
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
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCancel = () => {
    setShowQRCode(false);
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

  const timeSlotData = {
    selectedDate: "10 October 2025",
    selectedTime: "00:15-00:45 AM",
  };

  const handlePurchaseClick = () => {
    setShowQRCode(true);
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <GlassContainer2>
          <div className="flex w-full flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="font-sanctuary mb-6 text-3xl font-light text-white sm:mb-8 sm:text-4xl lg:text-5xl">
              Booking
            </h1>

            <div
              className={`flex h-[50vh] w-full flex-col items-center overflow-y-auto px-2 transition-opacity duration-300 sm:h-[55vh] sm:px-4 lg:h-[50vh] ${showQRCode ? "opacity-30" : "opacity-100"}`}
            >
              <CourseCard {...courseData} />

              <div className="mt-4 w-full max-w-4xl">
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
            <div className="bg-primary-500 mx-4 w-full max-w-sm items-start rounded-3xl p-6 shadow-2xl sm:max-w-md sm:p-8">
              <div className="bg-primary text-neutral-white -mx-6 -mt-8 mb-4 rounded-xl px-6 py-3 text-center sm:-mx-8 sm:mb-10 sm:px-8 sm:py-8">
                <h2 className="font-chakra text-lg font-semibold sm:text-xl">
                  QR CODE FOR PAYMENT
                </h2>
              </div>

              <div className="mb-4 flex justify-center rounded-2xl p-4 sm:mb-6 sm:p-6">
                <div className="bg-neutral-white flex h-50 w-50 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200 sm:h-48 sm:w-48">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://promptpay.io/0891234567/1750.00"
                    alt="QR Code for Payment"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mb-4 text-center sm:mb-6">
                <div className="text-neutral-black font-mono text-2xl font-bold sm:text-3xl">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-neutral-black font-chakra mt-2 text-sm sm:text-base">
                  กรุณาสแกน QR Code ภายในเวลาที่กำหนด
                </p>
              </div>

              {/* Cancel Button */}
              <div className="flex justify-center">
                <GlobalButton
                  variant="secondary"
                  className="w-28"
                  onClick={handleCancel}
                >
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
