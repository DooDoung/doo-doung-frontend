import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import { EditCourseProfileDialog } from "@/components/course/Prophet/EditCourseProfileDialog";
import TransactionAccountSelectItem from "@/components/course/Prophet/TransactionAccountSelectItem";
import { DefaultLayout } from "@/components/globalComponents";
import {
  GlobalButton,
  GlobalInput,
  GlobalTextarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents";
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

export default function EditCoursePage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const courseId = pathname.split("/").pop();
  const { data: session } = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // auto focus course name field
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [formData, setFormData] = useState({
    courseName: "",
    prophetMethod: "",
    horoscopeSector: "",
    duration: "",
    description: "",
    price: "",
    transactionAccount: "" as string | undefined,
    courseProfile: "",
    isOpen: true,
  });

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
          horoscopeSector: courseData.horoscopeSector || "",
          duration: courseData.durationMin?.toString() || "",
          description:
            courseData.description && courseData.description.trim() !== ""
              ? courseData.description
              : loadFromLocalStorage("description"),
          price: courseData.price?.toString() || "",
          transactionAccount: MOCK_ACCOUNTS[0]?.id,
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

  const user = {
    profileUrl:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
    username: "JohnYakDoodoung",
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Save to localStorage for persistence
    if (
      (field === "prophetMethod" || field === "description") &&
      typeof value === "string"
    ) {
      saveToLocalStorage(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      courseName,
      prophetMethod,
      duration,
      description,
      price,
      transactionAccount,
      courseProfile,
      horoscopeSector,
    } = formData;

    if (
      !courseName.trim() ||
      !prophetMethod.trim() ||
      !horoscopeSector.trim() ||
      !duration.trim() ||
      !description.trim() ||
      !price.trim()
    ) {
      AppToast.error("Every field must be completed.");
      return;
    }

    if (transactionAccount === "Undefined" || !transactionAccount) {
      AppToast.error("Transaction account required.");
      return;
    }

    try {
      setIsLoading(true);
      const accessToken = session?.accessToken;
      const config = accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : {};

      const payload = {
        courseName,
        methodName: prophetMethod,
        horoscopeSector,
        durationMin: parseInt(duration),
        description,
        price: parseFloat(price),
        courseProfile,
        isActive: formData.isOpen,
      };

      await axios.patch(`${backendUrl}/course/${courseId}`, payload, config);
      AppToast.success("Course updated successfully!");
      router.push(`/course/prophet/my-courses/details/${courseId}`);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to update course";
      AppToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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

            <div className="h-[150px] w-[150px] flex-shrink-0 rounded-full border-2 bg-white">
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
              <GlobalButton
                variant="secondary"
                className="absolute right-3 bottom-2"
                icon={<Pencil />}
                onClick={() => setOpenDialog(true)}
              >
                Edit course profile
              </GlobalButton>
            </div>
          </div>
        </GlassContainer2>

        {/* right box */}
        <div className="bg-neutral-white shadow-all-around custom-scrollbar flex h-full flex-1 flex-col overflow-y-scroll rounded-3xl px-12 py-7">
          <div className="grid grid-cols-6 content-between gap-1">
            <h3 className="font-sanctuary text-neutral-black col-span-5 self-center text-5xl">
              Edit Course
            </h3>
            <div className="content-center justify-self-center">
              <p className="text-center">
                {formData.isOpen ? "OPEN" : "CLOSE"}
              </p>
              <Switch
                className="self-end"
                size="lg"
                checked={formData.isOpen}
                onCheckedChange={(checked: boolean) =>
                  handleChange("isOpen", checked)
                }
              />
            </div>
          </div>

          <form
            id="customerInfoForm"
            className="font-chakra grid h-full grid-cols-6 content-evenly gap-4"
            onSubmit={handleSubmit}
          >
            <div className="col-span-full">
              <label className="text-neutral-black flex items-center">
                Course Name
                <Pencil className="ml-2" size={18} />
              </label>
              <GlobalInput
                ref={inputRef}
                type="text"
                className="w-full"
                placeholder="Enter your course name"
                onChange={(e) => handleChange("courseName", e.target.value)}
                value={formData.courseName}
              />
            </div>

            <div className="col-span-3">
              <label className="text-neutral-black flex items-center">
                Prophet Method
                <Pencil className="ml-2" size={18} />
              </label>
              <GlobalInput
                type="text"
                className="w-full"
                placeholder="Enter course method"
                onChange={(e) => handleChange("prophetMethod", e.target.value)}
                value={formData.prophetMethod}
              />
            </div>

            <div className="col-span-3">
              <label className="text-neutral-black flex items-center">
                Horoscope Sector
                <Pencil className="ml-2" size={18} />
              </label>
              <Select
                value={formData.horoscopeSector}
                onValueChange={(value) =>
                  handleChange("horoscopeSector", value)
                }
              >
                <SelectTrigger className="min-h-10 w-full">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOVE">Love</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="STUDY">Study</SelectItem>
                  <SelectItem value="MONEY">Money</SelectItem>
                  <SelectItem value="LUCK">Luck</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-3">
              <label className="text-neutral-black flex items-center">
                Duration
                <Pencil className="ml-2" size={18} />
              </label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleChange("duration", value)}
              >
                <SelectTrigger className="min-h-10 w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-full">
              <label className="text-neutral-black flex items-center">
                Description
                <Pencil className="ml-2" size={18} />
              </label>
              <GlobalTextarea
                className="min-h-40 w-full"
                placeholder="Enter your description ..."
                maxLength={800}
                onChange={(e) => handleChange("description", e.target.value)}
                value={formData.description}
              />
            </div>

            <div className="col-span-2">
              <label className="text-neutral-black flex items-center">
                Price
                <Pencil className="ml-2" size={18} />
              </label>
              <GlobalInput
                type="number"
                className="w-[50%] text-center"
                placeholder="1750"
                onChange={(e) => handleChange("price", e.target.value)}
                value={formData.price}
              />
            </div>

            <div className="col-span-4">
              <label className="text-neutral-black flex items-center">
                Transaction Account
              </label>
              <Select
                value={formData.transactionAccount}
                onValueChange={(value) =>
                  handleChange("transactionAccount", value)
                }
              >
                <SelectTrigger className="min-h-10 w-full">
                  <SelectValue placeholder="Select Transaction Account" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ACCOUNTS.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      <TransactionAccountSelectItem account={acc} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full flex justify-end gap-8">
              <GlobalButton
                type="button"
                variant="secondary"
                className="min-h-12"
                onClick={() =>
                  router.push(`/course/prophet/my-courses/details/${courseId}`)
                }
              >
                <p className="m-8">Cancel</p>
              </GlobalButton>

              <GlobalButton
                variant="primary"
                type="submit"
                className="min-h-12"
                disabled={isLoading}
              >
                <p className="m-8">{isLoading ? "Saving..." : "Save"}</p>
              </GlobalButton>
            </div>
          </form>
        </div>
      </div>
      <EditCourseProfileDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        currentImageUrl={formData.courseProfile}
        onSave={(newUrl) => {
          handleChange("courseProfile", newUrl);
        }}
      />
    </DefaultLayout>
  );
}
