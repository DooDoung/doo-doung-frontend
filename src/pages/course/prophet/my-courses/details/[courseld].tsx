import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import BookingHistoryCard from "@/components/course/Prophet/BookingHistoryCard";
import TransactionAccountSelectItem from "@/components/course/Prophet/TransactionAccountSelectItem";
import { DefaultLayout } from "@/components/globalComponents";
import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents/GlassContainer2";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MOCK_ACCOUNTS } from "@/constants/transaction";
import { AppToast } from "@/lib/app-toast";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Helper functions for localStorage
const getLocalStorageKey = (field: string) => `course_${field}`;

const loadFromLocalStorage = (field: string): string => {
  try {
    return localStorage.getItem(getLocalStorageKey(field)) || "";
  } catch {
    return "";
  }
};

const saveToLocalStorage = (field: string, value: string) => {
  try {
    localStorage.setItem(getLocalStorageKey(field), value);
  } catch {
    // Silently fail if localStorage is not available
  }
};

export default function CourseDetailsPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const courseId = pathname.split("/").pop();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    courseName: "",
    prophetMethod: "",
    duration: "",
    description: "",
    price: "",
    TransactionAccount: MOCK_ACCOUNTS[0],
    courseProfile: "",
    isOpen: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = {
    profileUrl:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
    username: "JohnYakDoodoung",
  };

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const accessToken = session?.accessToken;

        if (!accessToken) {
          setError("Unauthorized: No access token found");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
          `${backendUrl}/course/${courseId}`,
          config,
        );

        const courseData = response.data.data || response.data;
        setFormData({
          courseName: courseData.courseName || "",
          prophetMethod:
            courseData.methodName && courseData.methodName.trim() !== ""
              ? courseData.methodName
              : loadFromLocalStorage("prophetMethod"),
          duration: courseData.durationMin?.toString() || "",
          description:
            courseData.description && courseData.description.trim() !== ""
              ? courseData.description
              : loadFromLocalStorage("description"),
          price: courseData.price?.toString() || "",
          TransactionAccount: MOCK_ACCOUNTS[0],
          courseProfile: courseData.courseProfile || "",
          isOpen: courseData.isActive || true,
        });
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch course details";
        setError(errorMessage);
        AppToast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && session) {
      fetchCourseDetails();
    }
  }, [courseId, session]);

  const mockbookingHistoryData: {
    customerProfileUrl: string;
    customerName: string;
    status: "COMPLETED" | "SCHEDULED" | "FAILED";
    bookingDate: string;
    bookingTime: string;
    score: number;
    review: string;
  }[] = [
    {
      customerProfileUrl:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
      customerName: "Prem",
      status: "COMPLETED",
      bookingDate: "12/3/2003",
      bookingTime: "13:00-13:30",
      score: 4,
      review:
        "ดีๆ ครับ ดีๆ เอา ดีๆ ดู ดีๆ พิมพ์อะไรดี คนจริงไม่ใช้ ลอเรม คนจริงพิมพ์เอา เป็นไงล่ะ",
    },
    {
      customerProfileUrl:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
      customerName: "Bam",
      status: "SCHEDULED",
      bookingDate: "14/3/2003",
      bookingTime: "10:00-10:30",
      score: 5,
      review:
        "ดีๆ ครับ ดีๆ เอา ดีๆ ดู ดีๆ พิมพ์อะไรดี คนจริงไม่ใช้ ลอเรม คนจริงพิมพ์เอา เป็นไงล่ะ💖",
    },
    {
      customerProfileUrl:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
      customerName: "Earth",
      status: "FAILED",
      bookingDate: "15/3/2003",
      bookingTime: "11:00-11:30",
      score: 0,
      review: "ยกเลิกนัดเพราะติดงานครับ",
    },
  ];

  return (
    <DefaultLayout contentClassName="flex flex-col justify-center items-center">
      <div className="mt-5">
        <h3 className="font-sanctuary text-neutral-white text-7xl">DooDoung</h3>
      </div>
      <div className="my-10 flex h-[80vh] w-[90vw]">
        {/* left box */}
        <GlassContainer2 className="m-0 w-[32%]">
          <div className="flex h-full w-full flex-col items-center justify-between gap-3 text-center">
            <h3 className="font-sanctuary text-neutral-white text-5xl">
              PROPHET
            </h3>

            <div className="bg-neutral-white h-[150px] w-[150px] flex-shrink-0 rounded-full border-2">
              <Image
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
                width={150}
                height={150}
                src={user.profileUrl}
                unoptimized={true}
              />
            </div>

            <div className="w-full">
              <Label className="font-chakra text-neutral-white text-md self-start">
                USERNAME
              </Label>
              <GlobalInput
                type="text"
                className="font-chakra ursor-not-allowed"
                fullWidth
                readOnly
                disabled
                value={user.username}
              />
            </div>

            <div className="bg-secondary relative h-[300px] w-full rounded-lg border-2">
              <Image
                alt="Course Profile"
                src={formData.courseProfile}
                unoptimized={true}
                className="rounded-lg object-cover"
                fill
              />
            </div>
          </div>
        </GlassContainer2>

        {/* right box */}
        <div className="font-chakra bg-neutral-white shadow-all-around custom-scrollbar flex h-full flex-1 flex-col overflow-y-scroll rounded-3xl px-12 py-7">
          <div className="grid h-full grid-cols-6 content-between gap-1">
            <h3 className="text-neutral-black col-span-5 self-center text-3xl">
              {formData.courseName}
            </h3>
            <div className="content-center justify-self-center">
              <p className="text-center">
                {formData.isOpen ? "OPEN" : "CLOSE"}
              </p>
              <Switch
                className="self-end"
                size="lg"
                checked={formData.isOpen}
              />
            </div>

            <div className="col-span-3">
              <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                Prophet Method
              </label>
              <p className="text-neutral-black">{formData.prophetMethod}</p>
            </div>

            <div className="col-span-3">
              <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                Duration [min]
              </label>
              <p className="text-neutral-black">{formData.duration}</p>
            </div>

            <div className="col-span-full">
              <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                Description
              </label>
              <p className="text-neutral-black">{formData.description}</p>
            </div>

            <div className="col-span-2">
              <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                Price
              </label>
              <p className="text-neutral-black">{formData.price}</p>
            </div>

            <div className="col-span-4">
              <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                Transaction Account
              </label>
              <div className="text-neutral-black pr-[150px]">
                <TransactionAccountSelectItem
                  account={formData.TransactionAccount}
                />
              </div>
            </div>

            {/* Booking History */}
            <div className="col-span-full">
              <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                Booking history
              </label>
              <div className="custom-scrollbar h-[200px] overflow-y-auto">
                {/* booking history card */}
                <div className="flex flex-col gap-4 pt-3">
                  {mockbookingHistoryData.map((item, index) => (
                    <BookingHistoryCard
                      key={index}
                      customerProfileUrl={item.customerProfileUrl}
                      customerName={item.customerName}
                      status={item.status}
                      bookingDate={item.bookingDate}
                      bookingTime={item.bookingTime}
                      score={item.score}
                      review={item.review}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-full flex justify-end gap-8">
              <GlobalButton
                type="button"
                variant="secondary"
                className="min-h-12"
                onClick={() => router.push(`/course/prophet/my-course`)}
              >
                <p className="m-8">Back</p>
              </GlobalButton>

              <GlobalButton
                variant="primary"
                type="button"
                className="min-h-12"
                onClick={() =>
                  router.push(`/course/prophet/my-courses/edit/${courseId}`)
                }
              >
                <p className="m-8">Edit</p>
              </GlobalButton>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
