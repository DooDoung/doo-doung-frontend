import { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { AppToast } from "@/lib/app-toast";

export default function CreateCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    courseName: "",
    prophetMethod: "",
    duration: "",
    description: "",
    price: "",
    transactionAccount: "test account",
  });

  const user = {
    profileUrl:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
    username: "JohnYakDoodoung",
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      courseName,
      prophetMethod,
      duration,
      description,
      price,
      transactionAccount,
    } = formData;

    if (
      !courseName.trim() ||
      !prophetMethod.trim() ||
      !duration.trim() ||
      !description.trim() ||
      !price.trim()
    ) {
      AppToast.error("Every field must be completed.");
      return;
    }

    if (transactionAccount === "Undefined" || !transactionAccount.trim()) {
      AppToast.error("Transaction account required.");
      return;
    }

    AppToast.success("Course created!");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <DefaultLayout contentClassName="flex justify-center items-center">
      <div className="my-10 flex h-[80vh] w-[90vw]">
        {/* left box */}
        <GlassContainer2 className="m-0 w-[32%]">
          <div className="flex h-full w-full flex-col items-center justify-between text-center">
            <h3 className="font-sanctuary text-neutral-white text-5xl">
              PROPHET
            </h3>

            <div className="h-[150px] w-[150px] flex-shrink-0 rounded-full border-2 bg-white">
              <img
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
                src={user.profileUrl}
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
              <img alt="Course Profile" />
              <GlobalButton
                variant="secondary"
                className="absolute right-3 bottom-2"
                icon={<Pencil />}
              >
                Edit course profile
              </GlobalButton>
            </div>
          </div>
        </GlassContainer2>

        {/* right box */}
        <div className="bg-neutral-white shadow-all-around flex h-full flex-1 flex-col rounded-3xl p-12">
          <h3 className="font-sanctuary text-neutral-black mb-4 text-5xl">
            Create Course
          </h3>

          <form
            id="customerInfoForm"
            className="font-chakra grid h-full grid-cols-6 content-between gap-4"
            onSubmit={handleSubmit}
          >
            <div className="col-span-full">
              <label className="text-neutral-black mb-1 flex items-center">
                Course Name
                <Pencil className="ml-2" size={18} />
              </label>
              <GlobalInput
                type="text"
                className="w-full"
                placeholder="Enter your course name"
                onChange={(e) => handleChange("courseName", e.target.value)}
                value={formData.courseName}
              />
            </div>

            <div className="col-span-3">
              <label className="text-neutral-black mb-1 flex items-center">
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
              <label className="text-neutral-black mb-1 flex items-center">
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
              <label className="text-neutral-black mb-1 flex items-center">
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
              <label className="text-neutral-black mb-1 flex items-center">
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
              <label className="text-neutral-black mb-1 flex items-center">
                Transaction Account
              </label>
              <GlobalInput
                type="text"
                placeholder="Undefined"
                readOnly
                disabled
                value={formData.transactionAccount}
              />
            </div>
            <div className="col-span-3">
              <GlobalButton
                type="button"
                variant="secondary"
                className="min-h-12"
                onClick={handleCancel}
              >
                <p className="m-8">Cancle</p>
              </GlobalButton>
            </div>
            <div className="col-span-3 justify-self-end">
              <GlobalButton
                variant="primary"
                type="submit"
                className="min-h-12"
              >
                <p className="m-8">Create</p>
              </GlobalButton>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
