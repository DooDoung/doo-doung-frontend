import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Pencil } from "lucide-react";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "../../ui/switch";
import { ZodiacSign } from "@/types/user";
import { AppToast } from "@/lib/app-toast";

// Types
interface UserInfo {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  tob: string;
  zodiac: string;
  email: string;
  phone: string;
}

interface EditCustomerInfoProps {
  user?: any;
  onUserUpdate?: (updatedUser: any) => void;
}

function EditCustomerInfo({ user, onUserUpdate }: EditCustomerInfoProps) {
  const { data: session } = useSession();
  const router = useRouter();

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

  // Utility functions
  const mapGenderFromAPI = (apiGender: string): string => {
    switch (apiGender) {
      case "MALE": return "Male";
      case "FEMALE": return "Female";
      case "LGBTQ_PLUS": return "LGBTQ+";
      default: return "Undefined";
    }
  };

  const mapGenderToAPI = (uiGender: string): string => {
    switch (uiGender) {
      case "Male": return "MALE";
      case "Female": return "FEMALE";
      case "LGBTQ+": return "LGBTQ_PLUS";
      case "Undefined": return "UNDEFINED";
      default: return "UNDEFINED";
    }
  };

  const formatTimeFromAPI = (apiTime: string): string => {
    if (!apiTime) return "";
    return new Date(apiTime).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const processUserData = (userData: any): UserInfo => {
    return {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      gender: mapGenderFromAPI(userData.gender),
      dob: userData.birthDate ? userData.birthDate.split('T')[0] : "",
      tob: formatTimeFromAPI(userData.birthTime),
      zodiac: userData.zodiacSign ? userData.zodiacSign.toLowerCase() : "",
      email: userData.email || "",
      phone: userData.phoneNumber || "",
    };
  };

  // Update userInfo when user prop changes (only if user hasn't made changes)
  useEffect(() => {
    if (user && user.zodiacSign && !hasUserMadeChanges) {
      const processedData = processUserData(user);
      setUserInfo(processedData);
      setIsPublic(user.isPublic || false);
      
      console.log("User data processed and set:", processedData);
    }
  }, [user, user?.zodiacSign, user?.gender, hasUserMadeChanges]);

  // Computed values for Select components
  const computedZodiac = useMemo(() => {
    if (userInfo.zodiac) {
      return userInfo.zodiac.toLowerCase();
    }
    return user?.zodiacSign?.toLowerCase() || "";
  }, [user?.zodiacSign, userInfo.zodiac]);

  const computedGender = useMemo(() => {
    if (userInfo.gender) {
      return userInfo.gender.toLowerCase();
    }
    if (user?.gender) {
      return user.gender === "MALE" ? "male" : 
             user.gender === "FEMALE" ? "female" : 
             user.gender === "LGBTQ_PLUS" ? "lgbtq+" : 
             "undefined";
    }
    return "";
  }, [user?.gender, userInfo.gender]);

  // Validation functions
  const validateSession = (): boolean => {
    if (!session?.user?.id) {
      AppToast.error("Session expired. Please log in again.");
      return false;
    }
    return true;
  };

  const validateUserRole = (): boolean => {
    if (!user?.role) {
      AppToast.error("User role is missing");
      return false;
    }
    return true;
  };

  const validateRequiredFields = (): boolean => {
    const requiredFields = {
      'First Name': userInfo.firstName,
      'Last Name': userInfo.lastName,
      'Email': userInfo.email,
      'Phone Number': userInfo.phone,
      'Gender': userInfo.gender,
      'Date of Birth': userInfo.dob,
      'Time of Birth': userInfo.tob,
      'Zodiac Sign': userInfo.zodiac
    };

    for (const [fieldName, value] of Object.entries(requiredFields)) {
      if (!value || value.toString().trim() === '' || value === 'undefined') {
        AppToast.error(`${fieldName} is required`);
        return false;
      }
    }
    return true;
  };

  // Event handlers
  const handleChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    setHasUserMadeChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Validation
      if (!validateSession() || !validateUserRole() || !validateRequiredFields()) {
        return;
      }

      // Prepare API data
      const birthDate = new Date(`${userInfo.dob}T00:00:00.000Z`).toISOString();
      const birthTime = `${userInfo.tob}:00`;
      
      const requestData = {
        id: user?.id,
        role: user?.role,
        firstName: userInfo.firstName.trim(),
        lastName: userInfo.lastName.trim(),
        email: userInfo.email.trim(),
        phoneNumber: userInfo.phone.trim(),
        zodiacSign: userInfo.zodiac.toUpperCase(),
        gender: mapGenderToAPI(userInfo.gender),
        birthDate,
        birthTime
      };

      // API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

  
      if (!response.ok) {
        let errorDetail = "Unknown error";
        try {
          const errorJson = await response.json();
          console.error("Error response JSON:", errorJson);
          errorDetail = errorJson.message || errorJson.error || JSON.stringify(errorJson);
        } catch {
          const errorText = await response.text();
          console.error("Error response text:", errorText);
          errorDetail = errorText;
        }
        AppToast.error(`Failed to update profile: ${errorDetail}`);
        return;
      }
      
      const responseData = await response.json();
      console.log("Success response:", responseData);

      // Handle success
      if (onUserUpdate && responseData.data) {
        onUserUpdate(responseData.data);
      }
      
      setHasUserMadeChanges(false);

      // Handle success
      if (onUserUpdate && responseData.data) {
        onUserUpdate(responseData.data);
      }
      
      setHasUserMadeChanges(false);

      AppToast.success("Profile updated successfully!");
      router.push("/account");
    } catch (err) {
      console.error("Save failed:", err);
      AppToast.error("Failed to update profile");
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
            // value={customer.firstName}
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
            // value={customer.lastName}
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
            onValueChange={(val) => handleChange("zodiac", val.charAt(0).toUpperCase() + val.slice(1))}
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
          <GlobalButton 
            variant="secondary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "SAVING..." : "SAVE PROFILE"}
          </GlobalButton>
        </div>
      </form>
    </div>
  );
}

export default EditCustomerInfo;
