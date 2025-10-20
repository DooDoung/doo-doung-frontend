import { AppToast } from "@/lib/app-toast";

import type { UserInfo } from "./userDataUtils";

/**
 * Validates if user session is active
 */
export const validateSession = (session: any): boolean => {
  if (!session?.user?.id) {
    AppToast.error("Session expired. Please log in again.");
    return false;
  }
  return true;
};

/**
 * Validates if user has a valid role
 */
export const validateUserRole = (user: any): boolean => {
  if (!user?.role) {
    AppToast.error("User role is missing");
    return false;
  }
  return true;
};

/**
 * Validates if all required fields are filled
 */
export const validateRequiredFields = (userInfo: UserInfo): boolean => {
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