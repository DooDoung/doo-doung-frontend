import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/Button";
import { GlassContainer } from "@/components/globalComponents/GlassContainer";

export default function AvailableTimePage() {
  const router = useRouter();

  const handlePurchase = () => {
    router.push('/booking/payment/[bookingld]');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen">
        <GlassContainer>
        <div className="-mt-12 flex flex-col items-center gap-2 p-8">
            <h1 className="text-neutral-white text-5xl font-light mb-8 font-sanctuary">Booking</h1>
            
            <div className="bg-neutral-white/90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-4xl">
              <div className="flex items-start gap-8 mb-8">
                {/* Left Side - Course Image */}
                <div className="w-48 h-64 rounded-lg shadow-lg overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center"
                    alt="Course image"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Middle - Course Information */}
                <div className="flex-1 space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-neutral-black font-chakra text-lg">
                      คอร์สดูดวงความรัก 3 คำถาม โดย แม่หมออออม
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-accent-pink font-semibold">Prophet method</span>
                      <br />
                      <span className="text-neutral-black font-chakra">Current method</span>
                    </div>

                    <div>
                      <span className="text-accent-pink font-semibold">Duration (min)</span>
                      <br />
                      <span className="text-neutral-black font-chakra">30</span>
                    </div>

                    <div>
                      <span className="text-accent-pink font-semibold">Description</span>
                      <br />
                      <span className="text-neutral-black font-chakra">Current course description description</span>
                    </div>

                    <div>
                      <span className="text-accent-pink font-semibold">Prices (Baht)</span>
                      <br />
                      <span className="text-neutral-black font-chakra text-xl font-bold">1,750</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Prophet Profile */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-2 border-border overflow-hidden bg-neutral-white">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                      alt="Prophet profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-neutral-black font-chakra mt-2 text-center">แม่หมออออม</p>
                </div>
              </div>

              {/* Available Time Section */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-neutral-black font-semibold text-lg">DATE</span>
                    <div className="bg-neutral-white border border-border rounded-lg px-4 py-2 mt-2">
                      <span className="text-accent-pink font-chakra text-lg">10 October 2025</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-neutral-black font-semibold text-lg">TIME</span>
                    <div className="bg-neutral-white border border-border rounded-lg px-4 py-2 mt-2">
                      <span className="text-accent-pink font-chakra text-lg">00:15-00:45 AM</span>
                    </div>
                  </div>
                </div>

                <GlobalButton variant="primary" className="mt-0" onClick={handlePurchase}>
                  Purchase
                </GlobalButton>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <GlobalButton variant="secondary" className="px-8 py-3 text-lg" onClick={handleBack}>
                Back
              </GlobalButton>
            </div>
          </div>
        </GlassContainer>
      </div>
    </DefaultLayout>
  );
}
