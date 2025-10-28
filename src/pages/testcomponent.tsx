import ProphetPublicInfo from "@/components/account/ProphetPublicInfo";
import { DefaultLayout } from "@/components/globalComponents/DefaultLayout";

export default function TestComponentPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 md:flex-row">
        <ProphetPublicInfo />
      </div>
    </DefaultLayout>
  );
}
