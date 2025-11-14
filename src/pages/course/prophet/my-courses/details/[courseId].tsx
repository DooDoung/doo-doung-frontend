import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRouter as useNextRouter } from "next/router";
import { useSession } from "next-auth/react";

import BookingHistoryCard from "@/components/course/Prophet/BookingHistoryCard";
import TransactionAccountSelectItem from "@/components/course/Prophet/TransactionAccountSelectItem";
import { DefaultLayout } from "@/components/globalComponents";
import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import { GlassContainer2 } from "@/components/globalComponents/GlassContainer2";
import PublicReviewCard from "@/components/public-review/PublicReviewCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppToast } from "@/lib/app-toast";

export default function CourseDetailsPage() {
  const router = useRouter();
  const nextRouter = useNextRouter();
  const { courseId: courseId } = nextRouter.query;
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const token = session?.accessToken;

  const [formData, setFormData] = useState({
    courseName: "",
    horoscopeSector: "",
    durationMin: "",
    description: "",
    price: "",
    courseProfile: "",
    isActive: true,
    courseDescription: "",
  });

  const fetchFormData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/course/${courseId}`);
      setFormData(response.data.data);
    } catch (error) {
      AppToast.error("Error fetching course data");
    }
  };

  const [user, setUser] = useState({
    profileUrl: "",
    username: "",
    txAccounts: [],
  });
  const fetchAccountData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/account/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUser(response.data.data);
      AppToast.success("Account data fetched successfully");
    } catch (error: any) {
      AppToast.error("Error fetching account data");
    }
  };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await axios.get(
        `${backendUrl}/review/course/${courseId}`,
      );
      setReviews(response.data.data.reviews);
      console.log(response.data.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to fetch reviews";
      setReviewsError(errorMessage);
      AppToast.error(errorMessage);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (courseId && session?.accessToken) {
        await fetchFormData();
        await fetchAccountData();
        await fetchReviews();
        setLoading(false);
      }
    };
    init();
  }, [courseId, session?.accessToken, status]);

  const [isOpen, setIsOpen] = useState(formData.isActive);
  const handleToggleOpen = async () => {
    setIsOpen(!isOpen);
    setFormData({ ...formData, isActive: !isOpen });
    const response = await axios.patch(
      `${backendUrl}/prophet/course/${courseId}/toggle-status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    AppToast.success("Course status updated successfully");
  };

  return (
    <DefaultLayout contentClassName="flex flex-col justify-center items-center">
      {loading && <p>Loading data...</p>}
      {!loading && (
        <>
          <div className="mt-5">
            <h3 className="font-sanctuary text-neutral-white text-7xl">
              DooDoung
            </h3>
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
                    src={"/images/course.svg"}
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
                    {formData.isActive ? "OPEN" : "CLOSE"}
                  </p>
                  <Switch
                    className="self-end"
                    size="lg"
                    checked={formData.isActive}
                    onClick={handleToggleOpen}
                  />
                </div>

                <div className="col-span-3">
                  <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                    Horoscope Sector
                  </label>
                  <p className="text-neutral-black">
                    {formData.horoscopeSector}
                  </p>
                </div>

                <div className="col-span-3">
                  <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                    Duration [min]
                  </label>
                  <p className="text-neutral-black">{formData.durationMin}</p>
                </div>

                <div className="col-span-full">
                  <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                    Description
                  </label>
                  <p className="text-neutral-black">
                    {formData.courseDescription}{" "}
                  </p>
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
                      account={user.txAccounts[0]}
                    />
                  </div>
                </div>

                {/* Review History */}
                <div className="col-span-full">
                  <label className="from-accent-pink to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
                    Review history
                  </label>
                  <div className="custom-scrollbar h-[200px] overflow-y-auto">
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <PublicReviewCard key={index} review={review} />
                      ))
                    ) : (
                      <p className="text-neutral-black/60 py-8 text-center">
                        No reviews yet
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full flex justify-end gap-8">
                  <GlobalButton
                    type="button"
                    variant="secondary"
                    className="min-h-12"
                    onClick={() => router.push(`/course/prophet/my-courses`)}
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
        </>
      )}
    </DefaultLayout>
  );
}
