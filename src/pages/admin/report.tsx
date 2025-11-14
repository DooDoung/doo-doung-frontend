import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { signOut } from "next-auth/react";

export default function AdminReportPage() {
  return (
    <DefaultLayout>
      <GlobalButton
        variant="primary"
        size="default"
        className="font-chakra mb-4"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        LOG OUT
      </GlobalButton>
      <p>This is Admin Report page</p>
    </DefaultLayout>
  );
}
