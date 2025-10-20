import { DefaultLayout, Breadcrumb } from "@/components/globalComponents";
import { useRouter } from "next/router";

export default function BookingPage() {
  const router = useRouter();
  const { bookingld } = router.query;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Booking", href: "/booking" },
    { label: String(bookingld) },
  ];
  return (
    <DefaultLayout contentClassName="flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <p>This is Booking page</p>
      </div>
    </DefaultLayout>
  );
}
