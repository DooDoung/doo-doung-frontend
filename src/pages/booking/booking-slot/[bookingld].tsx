import { useRouter } from "next/router";
import { DefaultLayout } from "@/components/globalComponents";
import { GlassContainer } from "@/components/globalComponents/GlassContainer";
import GlobalButton from "@/components/globalComponents/Button";

export default function BookingSlotPage() {
const router = useRouter();

  const handleBookingSlot = () => {
    router.push('/booking/confirm-slot/[bookingld]');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center min-h-screen">
      <GlassContainer>
        <p>This is Booking slot page</p>
      <div className="flex gap-6 mt-8">
        <GlobalButton variant="secondary" className="mt-0" onClick={handleBack}>
          Back
        </GlobalButton>
        <GlobalButton variant="primary" className="mt-0" onClick={handleBookingSlot}>
          Confirm Booking
        </GlobalButton>
      </div>
      </GlassContainer>
      </div>
    </DefaultLayout>
  );

  
}
