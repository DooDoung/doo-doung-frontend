import { useState } from "react";
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

const mockCoursesName = [
  {
    id: "1",
    courseName: "course1",
  },
  {
    id: "2",
    courseName: "course2",
  },
  {
    id: "3",
    courseName: "course3",
  },
  {
    id: "4",
    courseName: "course4",
  },
];

const mockReivew = [
  {
    customerProfileURL:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640",
    customerName: "brnnbm",
    star: 5,
    describtion:
      "แม่นมาก แม่นมากค่ะ! อาจารย์อธิบายเข้าใจง่ายมาก เอาไปปรับใช้ได้จริงค่ะ แนะนำเลย",
  },
  {
    customerProfileURL:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a62?q=80&w=640",
    customerName: "brnnbm",
    star: 4,
    describtion: "ค่อนข้างตรงเลยค่ะ แต่แอบรอนานนิดนึง โดยรวมถือว่าดีค่ะ",
  },
  {
    customerProfileURL:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=640",
    customerName: "brnnbm",
    star: 2,
    describtion:
      "พูดเร็วมาก ฟังไม่ค่อยทันเลยค่ะ แล้วก็ไม่ค่อยตรงกับเราเท่าไหร่",
  },
  {
    customerProfileURL:
      "https://images.unsplash.com/photo-1545996124-0501ebae84d0?q=80&w=640",
    customerName: "brnnbm",
    star: 5,
    describtion:
      "แม่นมาก แม่นมากค่ะ! อาจารย์อธิบายเข้าใจง่ายมาก เอาไปปรับใช้ได้จริงค่ะ แนะนำเลย",
  },
  {
    customerProfileURL:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640",
    customerName: "brnnbm",
    star: 4,
    describtion: "ค่อนข้างตรงเลยค่ะ แต่แอบรอนานนิดนึง โดยรวมถือว่าดีค่ะ",
  },
  {
    customerProfileURL:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640",
    customerName: "brnnbm",
    star: 2,
    describtion:
      "พูดเร็วมาก ฟังไม่ค่อยทันเลยค่ะ แล้วก็ไม่ค่อยตรงกับเราเท่าไหร่",
  },
];

export default function ReviewPage() {
  const router = useRouter();

  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [activeFilter, setActiveFiler] = useState<string>("All");
  const filters = ["All", "5", "4", "3", "2", "1"];
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    rating: "0",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    if (formData.rating.trim() == "0" || formData.description.trim() == "") {
      AppToast.error("Every field must be completed.");
    } else {
      AppToast.success("Review Submitted.");
      setIsReviewed(true);
      setIsPopupOpen(false);
    }
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
                {mockCoursesName.map((item, index) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.courseName}
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
                            filter == activeFilter ? "primary" : "secondary"
                          }
                          icon={filter == "All" ? undefined : <StarIcon />}
                          onClick={() => setActiveFiler(filter)}
                        >
                          {filter}
                        </GlobalButton>
                      ))}
                    </div>
                    <div className="from-accent-pink to-accent-violet text-neutral-black ml-10 flex rounded-md bg-gradient-to-r">
                      <div className="rounded-md-minus bg-neutral-white m-0.5 content-center items-center justify-center px-3 text-center">
                        {isReviewed ? "reviewed" : "Not reviewed"}
                      </div>
                    </div>
                  </div>
                  <div className="custom-scrollbar mx-7 my-4 max-h-100 overflow-scroll pr-5">
                    {mockReivew.map((review, index) => (
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
              {selectedCourse ? (
                <GlobalButton
                  variant="primary"
                  disabled={isReviewed}
                  onClick={() => setIsPopupOpen(true)}
                >
                  Write Review
                </GlobalButton>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {isPopupOpen && selectedCourse && (
            <form
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              id="customerInfoForm"
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
