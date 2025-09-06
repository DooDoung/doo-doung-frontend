import { DefaultLayout } from "@/components/globalComponents";
import SessionTableCustomer from "@/components/session/SessionTableCustomer";
import SessionTableProphet from "@/components/session/SessionTableProphet";

export default function ProphetAvailabilityPage() {
  return (
    <DefaultLayout>
      <p>This is Prophet Availability page</p>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-8/10 items-center self-center">
          <SessionTableProphet />
          <SessionTableCustomer />
        </div>
      </div>
    </DefaultLayout>
  );
}
