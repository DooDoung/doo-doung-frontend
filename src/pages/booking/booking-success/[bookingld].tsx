import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultLayout } from "@/components/globalComponents";
import { GlassContainer } from "@/components/globalComponents/GlassContainer";
import GlobalButton from "@/components/globalComponents/Button";
import { AppToast } from "@/lib/app-toast";

export default function BookingSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Show success toast when page loads
    AppToast.success("Confirmed Booking!");
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <DefaultLayout contentClassName="flex items-start justify-center pt-5">
      <GlassContainer>
        <div className="-mt-12 flex flex-col items-center gap-2 p-8">
          <h1 className="text-white text-5xl font-light mb-8 font-sanctuary">Booking</h1>

          
          <div className="flex h-[45vh] w-full flex-col items-center gap-4 overflow-y-auto px-4">
            <div className="bg-neutral-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 w-full max-w-4xl flex flex-col lg:flex-row items-start gap-4 md:gap-8">
              {/* Course Image */}
              <div className="w-full lg:w-48 h-48 md:h-64 rounded-lg shadow-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center"
                  alt="Course image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Information */}
              <div className="flex-1 space-y-3 md:space-y-4 min-w-0">
                <div className="text-center mb-4 md:mb-6">
                  <p className="text-neutral-black font-chakra text-sm md:text-base lg:text-lg break-words">
                    คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมออออม
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3 ml-2 md:ml-4 lg:ml-8">
                  <div>
                    <span className="text-accent-pink font-semibold text-xs md:text-sm lg:text-base">Prophet method</span>
                    <br />
                    <span className="text-neutral-black font-chakra text-xs md:text-sm lg:text-base">Current method</span>
                  </div>

                  <div>
                    <span className="text-accent-pink font-semibold text-xs md:text-sm lg:text-base">Duration (min)</span>
                    <br />
                    <span className="text-neutral-black font-chakra text-xs md:text-sm lg:text-base">30</span>
                  </div>

                  <div>
                    <span className="text-accent-pink font-semibold text-xs md:text-sm lg:text-base">Description</span>
                    <br />
                    <span className="text-neutral-black font-chakra text-xs md:text-sm lg:text-base break-words">Current course description description</span>
                  </div>

                  <div>
                    <span className="text-accent-pink font-semibold text-xs md:text-sm lg:text-base">Prices (Baht)</span>
                    <br />
                    <span className="text-neutral-black font-chakra text-sm md:text-lg lg:text-xl font-bold">1,750</span>
                  </div>

                  <div>
                    <span className="text-accent-pink font-semibold text-xs md:text-sm lg:text-base">Prophet Line ID</span>
                    <br />
                    <span className="text-neutral-black font-chakra text-xs md:text-sm lg:text-base">aom12356</span>
                  </div>
                </div>
                
                {/* Date, Time and Status Section */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-neutral-black font-semibold text-sm md:text-base">DATE</span>
                      <div className="bg-neutral-white border border-border rounded-lg px-3 py-2 mt-2">
                        <span className="text-accent-pink font-chakra text-sm md:text-base">10 October 2025</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-neutral-black font-semibold text-sm md:text-base">TIME</span>
                      <div className="bg-neutral-white border border-border rounded-lg px-3 py-2 mt-2">
                        <span className="text-accent-pink font-chakra text-sm md:text-base">00:15-00:45 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmed Status */}
                  <div className="bg-green-100 border border-green-300 rounded-lg px-4 py-2">
                    <span className="text-green-700 font-semibold text-sm md:text-base">Confirmed !</span>
                  </div>
                </div>
              </div>

              {/* Prophet Profile */}
              <div className="flex flex-col items-center flex-shrink-0 w-full lg:w-auto mt-4 md:mt-8 lg:mt-16">
                <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-border overflow-hidden bg-neutral-white">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                    alt="Prophet profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-neutral-black font-chakra mt-2 text-center text-xs md:text-sm lg:text-base">แม่หมออออม</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 w-full justify-center px-2 md:px-4 max-w-md md:max-w-2xl flex-shrink-0">
            <GlobalButton variant="secondary" className="w-full sm:w-auto text-sm md:text-base lg:text-lg px-4 md:px-6 py-2 md:py-3" onClick={handleBackToHome}>
              Back To Home
            </GlobalButton>
          </div>
        </div>
      </GlassContainer>
    </DefaultLayout>
  );
}
