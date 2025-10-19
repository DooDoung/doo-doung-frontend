import { DefaultLayout } from "@/components/globalComponents";
import SessionTableBooking from "@/components/session/SessionTableBooking";

export default function BookingPage() {
  return (
    <DefaultLayout contentClassName="flex flex-col justify-center items-center">
      <h1 className="font-sanctuary text-neutral-white text-center text-8xl mb-6 mt-6">
        DooDoung
      </h1>
      <div className="flex w-full flex-col items-center justify-center">
        <div></div>
        <div className="w-8/10 items-center self-center">
          <SessionTableBooking />
        </div>
      </div>
    </DefaultLayout>
  );
}
