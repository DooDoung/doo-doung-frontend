import { useMemo } from "react";

import type { UserInfo } from "@/utils/userDataUtils";

/**
 * Custom hook for computed values in EditCustomerInfo
 */
export const useComputedValues = (user: any, userInfo: UserInfo) => {
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

  return {
    computedZodiac,
    computedGender
  };
};