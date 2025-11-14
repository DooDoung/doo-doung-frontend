import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  DefaultLayout,
  GlassContainer2,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
  GlobalButton,
  GlobalTextarea,
} from "@/components/globalComponents";
import SmallReviewCard from "@/components/account/Review/SmallReviewCard";
import { AppToast } from "@/lib/app-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ReviewPage() {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.accessToken;
  const userId = session.data?.user.id;

  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filters = ["All", "5", "4", "3", "2", "1"];
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [completedBookings, setCompletedBookings] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    rating: "0",
    description: "",
  });

  const BackendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Fetch completed bookings with course details
  const fetchBookingDetails = async () => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(`${BackendUrl}/booking/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const completed = res.data.data.filter(
        (booking: any) => booking.status === "COMPLETED",
      );

      const details: any[] = [];
      for (let booking of completed) {
        const detailRes = await axios.get(
          `${BackendUrl}/booking/detail/${booking.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const detailData = Array.isArray(detailRes.data.data)
          ? detailRes.data.data[0]
          : detailRes.data.data;

        if (detailData.course) details.push(detailData);
      }

      setCompletedBookings(details);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Fetch user reviews
  const fetchReviews = async () => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(`${BackendUrl}/review/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch account info
  const fetchAccount = async () => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(`${BackendUrl}/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(res.data.data.username || "Anonymous");
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
    fetchReviews();
    fetchAccount();
  }, [token, userId]);

  // Compute course options (reviewed/unreviewed)
  const getCourseOptions = () => {
    const reviewedCourseIds = new Set(
      reviews
        .map((r) => r.courseId)
        .filter((id) => id !== undefined)
        .map((id) => id.toString()),
    );

    const courseMap = new Map<
      string,
      { courseName: string; reviewed: boolean }
    >();

    // Add completed bookings
    completedBookings.forEach((booking) => {
      const c = booking.course;
      if (!c || !c.id) return;
      const courseIdStr = c.id.toString();
      if (!courseMap.has(courseIdStr)) {
        courseMap.set(courseIdStr, {
          courseName: c.courseName,
          reviewed: reviewedCourseIds.has(courseIdStr),
        });
      }
    });

    // Add any reviewed courses not in completed bookings
    reviews.forEach((r) => {
      if (!r.courseId) return;
      const courseIdStr = r.courseId.toString();
      if (!courseMap.has(courseIdStr)) {
        courseMap.set(courseIdStr, {
          courseName: r.courseName,
          reviewed: true,
        });
      }
    });

    return [...courseMap.values()];
  };

  // Update filtered reviews whenever selected course or filter changes
  useEffect(() => {
    if (!selectedCourse) {
      setFilteredReviews([]);
      setIsReviewed(false);
      return;
    }

    const courseReviews = reviews.filter(
      (r) => r.courseName === selectedCourse,
    );

    setFilteredReviews(
      courseReviews
        .filter((r) =>
          activeFilter === "All" ? true : r.score?.toString() === activeFilter,
        )
        .map((r) => ({
          id: r.id,
          courseId: r.courseId,
          courseName: r.courseName,
          customerName: userName,
          star: r.score || 0,
          describtion: r.describtion || "",
          customerProfileURL:
            r.customerProfileURL ||
            "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640",
        })),
    );

    setIsReviewed(courseReviews.length > 0);
  }, [selectedCourse, activeFilter, reviews, userName]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.rating === "0" || formData.description.trim() === "") {
      AppToast.error("Every field must be completed.");
      return;
    }
    AppToast.success("Review Submitted.");
    setIsReviewed(true);
    setIsPopupOpen(false);
  };

  return (
    <DefaultLayout>
      <div className="font-chakra flex w-full flex-col items-center justify-center">
        <div className="mt-5">
          <h3 className="font-sanctuary text-neutral-white text-7xl">Review</h3>
        </div>

        <GlassContainer2>
          <div className="flex w-full flex-col">
            <Select onValueChange={(value) => setSelectedCourse(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {getCourseOptions().map((item, idx) => (
                  <SelectItem key={idx} value={item.courseName}>
                    {item.courseName}{" "}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="my-5 flex-auto">
              {selectedCourse ? (
                <div className="flex h-full flex-col">
                  <div className="flex flex-row justify-between px-8">
                    <div className="text-neutral-white items-center text-xl">
                      Filter by
                    </div>
                    <div className="flex flex-row gap-6">
                      {filters.map((filter, index) => (
                        <GlobalButton
                          key={index}
                          variant={
                            filter === activeFilter ? "primary" : "secondary"
                          }
                          icon={filter === "All" ? undefined : <StarIcon />}
                          onClick={() => setActiveFilter(filter)}
                        >
                          {filter}
                        </GlobalButton>
                      ))}
                    </div>
                    <div className="from-accent-pink to-accent-violet text-neutral-black ml-10 flex rounded-md bg-gradient-to-r">
                      <div className="rounded-md-minus bg-neutral-white m-0.5 content-center items-center justify-center px-3 text-center">
                        {isReviewed ? "Reviewed" : "Not reviewed"}
                      </div>
                    </div>
                  </div>

                  <div className="custom-scrollbar mx-7 my-4 max-h-100 overflow-scroll pr-5">
                    {filteredReviews.map((review, index) => (
                      <SmallReviewCard key={index} review={review} />
                    ))}
                  </div>

                  <div className="text-neutral-white text-center">
                    {isReviewed
                      ? "You have already reviewed this course."
                      : "Share your review to help the community choose the best courses."}
                  </div>
                </div>
              ) : (
                <div className="text-neutral-white h-full content-center text-center">
                  Please select a course to view reviews.
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center gap-4">
              <GlobalButton
                variant="secondary"
                onClick={() => router.push("/")}
              >
                Back
              </GlobalButton>
              {selectedCourse && (
                <GlobalButton
                  variant="primary"
                  disabled={isReviewed}
                  onClick={() => setIsPopupOpen(true)}
                >
                  Write Review
                </GlobalButton>
              )}
            </div>
          </div>

          {isPopupOpen && selectedCourse && (
            <form
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mx-30 w-full rounded-3xl bg-white p-8 shadow-lg">
                <p className="mb-4 text-center text-lg font-semibold">
                  {selectedCourse}
                </p>

                <div className="mb-4 flex flex-row items-center gap-2">
                  <div className="text-neutral-black mr-3 text-center font-semibold">
                    Rating
                  </div>
                  <div className="flex gap-2">
                    {["1", "2", "3", "4", "5"].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-all ${
                          star <= formData.rating
                            ? "text-primary-1000"
                            : "text-primary-500"
                        }`}
                        onClick={() => handleChange("rating", star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-2">
                  <span className="text-neutral-black font-semibold">
                    Comment
                  </span>
                  <GlobalTextarea
                    placeholder="Share your experience with this course (Max 200 characters)"
                    maxLength={200}
                    className="h-28 w-full resize-none rounded-xl border outline-none"
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="mt-6 flex justify-center gap-6">
                  <GlobalButton
                    onClick={() => setIsPopupOpen(false)}
                    variant="secondary"
                  >
                    Cancel
                  </GlobalButton>
                  <GlobalButton variant="primary" type="submit">
                    Submit
                  </GlobalButton>
                </div>
              </div>
            </form>
          )}
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
