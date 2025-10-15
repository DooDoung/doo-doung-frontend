import { useRouter } from "next/router";
import { DefaultLayout } from "@/components/globalComponents";
import { GlassContainer } from "@/components/globalComponents/GlassContainer";
import GlobalButton from "@/components/globalComponents/Button";

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
      <div className="flex justify-center items-center min-h-screen">
      <GlassContainer>
        <div className="-mt-12 flex flex-col items-center gap-2 p-8">
            <h1 className="text-white text-5xl font-light mb-8 font-sanctuary">Booking</h1>

          
          <div className="flex h-[45vh] w-full flex-col items-center gap-4 overflow-y-auto px-4">
            <div className="bg-neutral-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 w-full max-w-4xl flex flex-col lg:flex-row items-start gap-4 md:gap-8">
              {/* Course Image */}
              <div className="w-full lg:w-48 h-64 rounded-lg shadow-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center"
                  alt="Course image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Information */}
              <div className="flex-1 space-y-4 min-w-0">
                <div className="text-center mb-6">
                  <p className="text-neutral-black font-chakra text-base md:text-lg break-words">
                    คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมออออม
                  </p>
                </div>

                <div className="space-y-3 ml-4 md:ml-8">
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
              </div>

              {/* Prophet Profile */}
              <div className="flex flex-col items-center flex-shrink-0 w-full lg:w-auto mt-8 lg:mt-16">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-border overflow-hidden bg-neutral-white">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                    alt="Prophet profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-neutral-black font-chakra mt-2 text-center text-sm md:text-base">แม่หมออออม</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full justify-center flex-shrink-0">
            <GlobalButton variant="secondary" className="w-full sm:w-auto text-base md:text-lg" onClick={handleBack}>
              Back
            </GlobalButton>
            <GlobalButton variant="primary" className="w-full sm:w-auto text-base md:text-lg" onClick={handleCheckAvailableTime}>
              Check Available Time
            </GlobalButton>
          </div>
        </div>
      </GlassContainer>
      </div>
    </DefaultLayout>
  );
}
