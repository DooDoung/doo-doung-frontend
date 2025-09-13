import { DefaultLayout } from "@/components/globalComponents";
import SessionTableCustomer from "@/components/session/SessionTableCustomer";
import SessionTableProphet from "@/components/session/SessionTableProphet";

export default function ProphetAvailabilityPage() {
  return (
    <DefaultLayout>
      <p>This is Prophet Availability page</p>
      <div className="flex w-full flex-col items-center justify-center">
        <div></div>
        <div className="w-8/10 items-center self-center">
          <p className="my-3 text-xl">This is Prophet Availability </p>
          <SessionTableProphet />

          <p className="my-3 text-xl">
            This is Customer that look tp Availability
          </p>
          <SessionTableCustomer />
        </div>
      </div>
    </DefaultLayout>
  );
}
