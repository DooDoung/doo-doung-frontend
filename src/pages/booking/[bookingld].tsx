import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";

import Image from "next/image";

export default function BookingPage() {
  const router = useRouter();

  const handleCheckAvailableTime = () => {
    router.push('/booking/booking-slot/[bookingld]');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <GlassContainer2>
        <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 font-sanctuary">Booking</h1>

          
          <div className="flex h-[45vh] sm:h-[50vh] lg:h-[45vh] w-full flex-col items-center overflow-y-auto px-2 sm:px-4">
            <div className="bg-neutral-white/90 backdrop-blur-sm rounded-3xl w-full max-w-4xl flex flex-col lg:flex-row items-start">
              {/* Course Image */}
              <div className="w-full sm:w-64 h-48 sm:h-full rounded-lg shadow-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/course.svg"
                  alt="Course image"
                  width={64}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Information */}
              <div className="flex-1 space-y-4 min-w-0 h-full bg-neutral-white/90 p-4 sm:p-6 rounded-2xl">
                <div className="ml-2 sm:ml-4 mt-2 mb-4">
                  <p className="text-neutral-black font-chakra text-lg sm:text-xl lg:text-2xl break-words">
                    คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมอออม
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row pl-2 sm:pl-4 justify-between">
                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="text-accent-pink font-semibold text-sm md:text-base">Prophet method</span>
                      <br />
                      <span className="text-neutral-black font-chakra text-sm md:text-base">Current method</span>
                    </div>

                    <div>
                      <span className="text-accent-pink font-semibold text-sm md:text-base">Duration (min)</span>
                      <br />
                      <span className="text-neutral-black font-chakra text-sm md:text-base">30</span>
                    </div>

                    <div>
                      <span className="text-accent-pink font-semibold text-sm md:text-base">Description</span>
                      <br />
                      <span className="text-neutral-black font-chakra text-sm md:text-base break-words">Current course description description</span>
                    </div>

                    <div>
                      <span className="text-accent-pink font-semibold text-sm md:text-base">Prices (Baht)</span>
                      <br />
                      <span className="text-neutral-black font-chakra text-sm md:text-base">1,750</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center mt-4 lg:mt-0 lg:mr-8 self-center lg:self-start">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center overflow-hidden relative">
                      <Image
                        src="/images/course.svg"
                        alt="Prophet profile"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                      />
                    </div>
                    <p className="text-neutral-black font-chakra mt-2 sm:mt-4 text-center text-sm md:text-base">แม่หมอออม</p>
                  </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full justify-center flex-shrink-0">
            <GlobalButton variant="secondary" className="w-28" onClick={handleBack}>
              Back
            </GlobalButton>
            <GlobalButton variant="primary" onClick={handleCheckAvailableTime}>
              Check Available Time
            </GlobalButton>
          </div>
        </div>
      </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
