import AccountLayout from "@/components/account/AccountLayout";
import { DefaultLayout } from "@/components/globalComponents";

const userRole = "customer";
// const userRole = "prophet";

export default function AccountPage() {
  return (
    <DefaultLayout contentClassName="flex justify-center items-center">
      <AccountLayout role={userRole} />
    </DefaultLayout>
  );
}
