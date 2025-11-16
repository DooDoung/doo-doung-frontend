/**
 * Utility functions for user data transformation and processing
 */

export interface UserInfo {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  tob: string;
  zodiac: string;
  email: string;
  phone: string;
}

/**
 * Maps gender from API format to UI format
 */
export const mapGenderFromAPI = (apiGender: string): string => {
  switch (apiGender) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    case "LGBTQ_PLUS":
      return "LGBTQ+";
    default:
      return "Undefined";
  }
};

/**
 * Maps gender from UI format to API format
 */
export const mapGenderToAPI = (uiGender: string): string => {
  switch (uiGender) {
    case "Male":
      return "MALE";
    case "Female":
      return "FEMALE";
    case "LGBTQ+":
      return "LGBTQ_PLUS";
    case "Undefined":
      return "UNDEFINED";
    default:
      return "UNDEFINED";
  }
};

/**
 * Formats time from API format to HH:mm format
 * Uses same logic as CustomerInfo.tsx for consistency
 */
export const formatTimeFromAPI = (apiTime: string): string => {
  if (!apiTime) return "";
  // Use same format as CustomerInfo: split by "T" and take first 5 chars (HH:mm)
  if (apiTime.includes("T")) {
    return apiTime.split("T")[1].substring(0, 5);
  }
  return apiTime;
};

/**
 * Processes raw user data from API into UserInfo format
 */
export const processUserData = (userData: any): UserInfo => {
  return {
    firstName: userData.name || "",
    lastName: userData.lastname || "",
    gender: mapGenderFromAPI(userData.gender),
    dob: userData.birthDate ? userData.birthDate.split("T")[0] : "",
    tob: formatTimeFromAPI(userData.birthTime),
    zodiac: userData.zodiacSign ? userData.zodiacSign.toLowerCase() : "",
    email: userData.email || "",
    phone: userData.phoneNumber || "",
  };
};

/**
 * Prepares UserInfo data for API submission
 */
export const prepareAPIData = (userInfo: UserInfo, user: any) => {
  const birthDate = new Date(`${userInfo.dob}T00:00:00.000Z`).toISOString();
  const birthTime = `${userInfo.tob}:00`;

  return {
    id: user?.id,
    role: user?.role,
    firstName: userInfo.firstName.trim(),
    lastName: userInfo.lastName.trim(),
    email: userInfo.email.trim(),
    phoneNumber: userInfo.phone.trim(),
    zodiacSign: userInfo.zodiac.toUpperCase(),
    gender: mapGenderToAPI(userInfo.gender),
    birthDate,
    birthTime,
  };
};
