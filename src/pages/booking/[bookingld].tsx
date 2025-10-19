import { DefaultLayout } from "@/components/globalComponents";
import SessionTableBooking from "@/components/session/SessionTableBooking";

export default function BookingPage() {
  return (
    <DefaultLayout>
      <div className="flex w-full flex-col items-center justify-center">
        <div></div>
        <div className="w-8/10 items-center self-center">
          <SessionTableBooking />
        </div>
      </div>
    </DefaultLayout>
  );
}
