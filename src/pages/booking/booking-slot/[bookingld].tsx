import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";
import GlassContainer2 from "@/components/globalComponents/GlassContainer2";
import SessionTableBooking from "@/components/session/SessionTableBooking";

export default function BookingSlotPage() {
  const router = useRouter();

  const handleBookingSlot = () => {
    router.push('/booking/confirm-slot/[bookingld]');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSelectedChange = (slots: { day: string; time: string }[]) => {
    console.log("Selected slots:", slots);
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <GlassContainer2>
          <div className="w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 font-sanctuary">
              Select Time Slot
            </h1>
            <div className="w-full max-w-6xl">
              <SessionTableBooking onSelectedChange={handleSelectedChange} />
            </div>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
