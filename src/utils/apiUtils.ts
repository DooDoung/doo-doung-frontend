import { AppToast } from "@/lib/app-toast";

/**
 * Updates user account information via API
 */
export const updateUserAccount = async (
  requestData: any,
  accessToken: string
): Promise<{ success: boolean; data?: any }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
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
      return { success: false };
    }
    
    const responseData = await response.json();
    console.log("Success response:", responseData);
    
    AppToast.success("Profile updated successfully!");
    return { success: true, data: responseData.data };
    
  } catch (error) {
    console.error("API call failed:", error);
    AppToast.error("Failed to update profile");
    return { success: false };
  }
};