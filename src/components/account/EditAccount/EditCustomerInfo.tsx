import * as React from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ZodiacSign } from "@/types/user";

import { Switch } from "../../ui/switch";
import { useSession } from "next-auth/react";
import { AppToast } from "@/lib/app-toast";


function EditCustomerInfo({ user, onUserUpdate }: { user?: any; onUserUpdate?: (updatedUser: any) => void }) {
  const { data: session } = useSession();
  const [isPublic, setIsPublic] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    tob: "",
    zodiac: "",
    email: "",
    phone: "",
  });
  const [hasUserMadeChanges, setHasUserMadeChanges] = React.useState(false);
  const router = useRouter();

  // Update userInfo when user prop changes (only if user hasn't made changes)
  React.useEffect(() => {
    console.log("useEffect triggered, user:", user, "hasUserMadeChanges:", hasUserMadeChanges);
    
    if (user && user.zodiacSign && !hasUserMadeChanges) {
      const processedData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender === "MALE" ? "Male" : user.gender === "FEMALE" ? "Female" : user.gender === "LGBTQ_PLUS" ? "LGBTQ+" : "Undefined",
        dob: user.birthDate ? user.birthDate.split('T')[0] : "",
        tob: user.birthTime ? new Date(user.birthTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : "",
        zodiac: user.zodiacSign.toLowerCase(),
        email: user.email || "",
        phone: user.phoneNumber || "",
      };
      
      console.log("Setting userInfo with processed data:", processedData);
      
      setUserInfo(processedData);
      setIsPublic(user.isPublic || false);
    }
  }, [user, user?.zodiacSign, user?.gender, hasUserMadeChanges]);

  // Computed zodiac value - prioritize userInfo.zodiac if user has made changes
  const computedZodiac = React.useMemo(() => {
    let result = "";
    
    // If userInfo.zodiac exists and is not empty, use it (user has made changes)
    if (userInfo.zodiac && userInfo.zodiac !== "") {
      result = userInfo.zodiac.toLowerCase();
    }
    // Otherwise, use the initial value from user prop
    else if (user?.zodiacSign) {
      result = user.zodiacSign.toLowerCase();
    }
    
    console.log("Computed zodiac:", { userZodiac: user?.zodiacSign, userInfoZodiac: userInfo.zodiac, result, hasUserMadeChanges });
    return result;
  }, [user?.zodiacSign, userInfo.zodiac, hasUserMadeChanges]);

  // Computed gender value - prioritize userInfo.gender if user has made changes
  const computedGender = React.useMemo(() => {
    let result = "";
    
    // If userInfo.gender exists and is not empty, use it (user has made changes)
    if (userInfo.gender && userInfo.gender !== "") {
      result = userInfo.gender.toLowerCase();
    } 
    // Otherwise, use the initial value from user prop
    else if (user?.gender) {
      result = user.gender === "MALE" ? "male" : 
               user.gender === "FEMALE" ? "female" : 
               user.gender === "LGBTQ_PLUS" ? "lgbtq+" : 
               "undefined";
    }
    
    console.log("Computed gender:", { userGender: user?.gender, userInfoGender: userInfo.gender, result, hasUserMadeChanges });
    return result;
  }, [user?.gender, userInfo.gender, hasUserMadeChanges]);

  const handleChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
    setHasUserMadeChanges(true); // บันทึกว่า user ได้แก้ไขข้อมูลแล้ว
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!session?.user?.id) {
        AppToast.error("Session expired. Please log in again.");
        return;
      }

      if (!userInfo.email || !userInfo.firstName || !userInfo.lastName) {
        AppToast.error("Please fill in all required fields (email, first name, last name)");
        return;
      }

      // Fix gender mapping using userInfo.gender (current form values)
      let genderValue = userInfo.gender; 
      if (genderValue === "Male") {
        genderValue = "MALE";
      } else if (genderValue === "Female") {
        genderValue = "FEMALE";
      } else if (genderValue === "LGBTQ+") {
        genderValue = "LGBTQ_PLUS";
      } else if (genderValue === "Undefined") {
        genderValue = "UNDEFINED";
      } else {
        genderValue = "UNDEFINED";
      }

      if (!user?.role) {
        AppToast.error("User role is missing");
        return;
      }

      // Validate zodiac sign
      if (!userInfo.zodiac || userInfo.zodiac.trim() === '' || userInfo.zodiac === 'undefined') {
        AppToast.error("Please select a zodiac sign");
        return;
      }

      // Validate all form fields are filled
      const requiredFields = {
        'First Name': userInfo.firstName,
        'Last Name': userInfo.lastName,
        'Email': userInfo.email,
        'Phone Number': userInfo.phone,
        'Gender': userInfo.gender,
        'Date of Birth': userInfo.dob,
        'Time of Birth': userInfo.tob
      };

      for (const [fieldName, value] of Object.entries(requiredFields)) {
        if (!value || value.toString().trim() === '') {
          AppToast.error(`${fieldName} is required`);
          return;
        }
      }

      // Convert date and time to required formats
      const birthDate = new Date(`${userInfo.dob}T00:00:00.000Z`).toISOString(); // ISO format
      const birthTime = `${userInfo.tob}:00`; // HH:mm:ss format
      
      console.log("Date conversion:", {
        originalDob: userInfo.dob,
        originalTob: userInfo.tob,
        birthDate: birthDate,
        birthTime: birthTime
      });

      const requestData = {
        id: user?.id,
        role: user?.role, 
        firstName: userInfo.firstName.trim(),
        lastName: userInfo.lastName.trim(),
        email: userInfo.email.trim(),
        phoneNumber: userInfo.phone.trim(),
        zodiacSign: userInfo.zodiac.toUpperCase(),
        gender: genderValue,
        birthDate: birthDate,
        birthTime: birthTime
      };

      console.log("User data from props:", user);
      console.log("User role:", user?.role);
      console.log("Request data:", requestData);

      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const endpoint = `${baseUrl}/account`;

      const response = await fetch(endpoint, {
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

      // Update user prop with new data from userInfo
      const updatedUser = {
        ...user,
        firstName: userInfo.firstName.trim(),
        lastName: userInfo.lastName.trim(),
        username: userInfo.firstName.trim() || user?.username, // Keep original username if firstName is empty
        email: userInfo.email.trim(),
        phoneNumber: userInfo.phone.trim(),
        zodiacSign: userInfo.zodiac.toUpperCase(),
        gender: genderValue,
        birthDate: birthDate,
        birthTime: birthTime
      };

      // Call onUserUpdate callback if provided
      if (onUserUpdate && responseData.data) {
        onUserUpdate(responseData.data);
      }

      console.log("Updated user data:", updatedUser);

      // Reset the changes flag so future updates from user prop work
      setHasUserMadeChanges(false);

      AppToast.success("Profile updated successfully!");
      router.push("/account");
    } catch (err) {
      AppToast.error("Failed to update profile");
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
          <GlobalButton variant="secondary" type="submit">
            SAVE PROFILE
          </GlobalButton>
        </div>
      </form>
    </div>
  );
}

export default EditCustomerInfo;
