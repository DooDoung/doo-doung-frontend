import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useComputedValues } from "@/hooks/useComputedValues";
import { AppToast } from "@/lib/app-toast";
import { ZodiacSign } from "@/types/user";
import { updateUserAccount } from "@/utils/apiUtils";
// Utils
import {
  prepareAPIData,
  processUserData,
  type UserInfo,
} from "@/utils/userDataUtils";
import {
  validateRequiredFields,
  validateSession,
  validateUserRole,
} from "@/utils/validationUtils";

import { Switch } from "../../ui/switch";

interface EditCustomerInfoProps {
  user?: any;
  onUserUpdate?: (updatedUser: any) => void;
}

function EditCustomerInfo({ user, onUserUpdate }: EditCustomerInfoProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // States
  const [isPublic, setIsPublic] = useState(false);
  const [hasUserMadeChanges, setHasUserMadeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    tob: "",
    zodiac: "",
    email: "",
    phone: "",
  });

  // Update userInfo when user prop changes (only if user hasn't made changes)
  useEffect(() => {
    if (user && user.zodiacSign && !hasUserMadeChanges) {
      const processedData = processUserData(user);
      setUserInfo(processedData);
      setIsPublic(user.isPublic || false);

      // TODO
    }
  }, [user, user?.zodiacSign, user?.gender, hasUserMadeChanges]);

  // Fetch public status when component mounts
  useEffect(() => {
    const fetchPublicStatus = async () => {
      if (!session?.user?.id || !session?.accessToken) return;

      try {
        const res = await fetch(
          `${backendUrl}/customer/public-status/${session.user.id}`,
          {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          },
        );
        if (!res.ok) AppToast.error("Failed to fetch public status");
        const response = await res.json();
        setIsPublic(response.data.isPublic);
      } catch (error: any) {
        console.error("Error fetching public status:", error);
      }
    };

    fetchPublicStatus();
  }, [session?.user?.id, session?.accessToken, backendUrl]);

  // Computed values for Select components
  const { computedZodiac, computedGender } = useComputedValues(user, userInfo);

  // Event handlers
  const handleChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    setHasUserMadeChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Validation
      if (
        !validateSession(session) ||
        !validateUserRole(user) ||
        !validateRequiredFields(userInfo)
      ) {
        return;
      }

      // Prepare API data
      const requestData = prepareAPIData(userInfo, user);

      // API call
      const result = await updateUserAccount(
        requestData,
        session?.accessToken || "",
      );

      if (!result.success) {
        return;
      }

      // Handle success
      if (onUserUpdate && result.data) {
        onUserUpdate(userInfo);
        console.log("User updated:", result.data);
      }

      setHasUserMadeChanges(false);
      router.push("/account");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state when user prop is not available
  if (!user) {
    return (
      <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
        <div className="flex items-center justify-center p-8">
          <p className="text-white">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
      <div className="flex flex-col items-center self-end font-light text-white uppercase">
        <p>{isPublic ? "Public" : "Private"}</p>
        <Switch
          className="self-end"
          size="lg"
          checked={isPublic}
          onCheckedChange={(checked) => setIsPublic(checked)}
          disabled
        />
      </div>
      <form
        id="customerInfoForm"
        className="font-chakra mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            First Name
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={userInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Last Name
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={userInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Gender
            <Pencil className="ml-2" size={18} />
          </label>
          <Select
            value={computedGender}
            onValueChange={(val) =>
              handleChange("gender", val.charAt(0).toUpperCase() + val.slice(1))
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="lgbtq+">LGBTQ+</SelectItem>
              <SelectItem value="undefined">Undefined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-1 block flex items-center font-extralight text-white uppercase">
            Date of Birth
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="date"
            className="w-full"
            // value={customer.dob}
            value={userInfo.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        {/* Time of Birth */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Time of Birth
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="time"
            className="w-full"
            // value={customer.tob}
            value={userInfo.tob}
            onChange={(e) => handleChange("tob", e.target.value)}
          />
        </div>

        {/* Zodiac Sign */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Zodiac Sign
            <Pencil className="ml-2" size={18} />
          </label>
          <Select
            value={computedZodiac}
            onValueChange={(val) =>
              handleChange("zodiac", val.charAt(0).toUpperCase() + val.slice(1))
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ZodiacSign).map((sign) => (
                <SelectItem key={sign} value={sign}>
                  {sign.charAt(0).toUpperCase() + sign.slice(1)}
                </SelectItem>
              ))}
              <SelectItem value="undefined">Undefined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Email
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="email"
            className="w-full"
            // value={customer.email}
            value={userInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Phone Number
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="tel"
            className="w-full"
            // value={customer.phone}
            value={userInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Save Profile Button */}
        <div className="mb-2 flex justify-center md:col-span-2">
          <GlobalButton variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? "SAVING..." : "SAVE PROFILE"}
          </GlobalButton>
        </div>
      </form>
    </div>
  );
}

export default EditCustomerInfo;
