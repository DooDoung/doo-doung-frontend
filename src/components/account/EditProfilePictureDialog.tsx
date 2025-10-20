"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AccountData } from "@/interface/User";
import { AppToast } from "@/lib/app-toast";

import { GlobalButton, GlobalInput } from "../globalComponents";

interface EditProfilePictureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (url: string) => void;
  currentImageUrl?: string;
  user?: AccountData;
}

export function EditProfilePictureDialog({
  open,
  onOpenChange,
  onSave,
  currentImageUrl = "",
  user,
}: EditProfilePictureDialogProps) {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && user?.profileUrl) {
      setImageUrl(user.profileUrl);
    }
  }, [open, user?.profileUrl]);

  const handleSave = async () => {
    if (!imageUrl.trim()) {
      AppToast.warning("Please enter a valid image URL");
      return;
    }

    if (!session?.user?.id || !session?.accessToken) {
      AppToast.error("Session expired. Please log in again.");
      return;
    }

    if (!user) {
      AppToast.error("User data not available. Please refresh the page.");
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      // Try different endpoint patterns
      const endpoint = `${baseUrl}/account/`;
      
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          profileUrl: imageUrl,
          id: session.user.id,
          role: user?.role || "CUSTOMER",
        }),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log("Success response:", responseData);
        onSave(imageUrl);
        onOpenChange(false);
        AppToast.success("Profile picture updated successfully!");
      } else {
        const errorData = await response.text();
        console.error("Failed to update profile picture:", errorData);
        console.error("Response headers:", response.headers);
        AppToast.error(`Failed to update profile picture. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      AppToast.error("Unable to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="font-chakra text-neutral-white w-[90vw] max-w-md gap-0 rounded-[2rem] border-none bg-transparent p-0 shadow-lg"
      >
        {/* Header Section */}
        <DialogHeader className="bg-primary rounded-t-[2rem] p-4">
          <DialogTitle className="text-center text-xl tracking-wider">
            EDIT PROFILE PICTURE
          </DialogTitle>
        </DialogHeader>

        {/* Content & Footer Section */}
        <div className="bg-primary-500 rounded-b-[2rem] p-6">
          {/* Input Section */}
          <div className="flex flex-col gap-2">
            <label htmlFor="pictureUrl" className="text-neutral-white text-sm">
              New Picture URL
            </label>
            <GlobalInput
              id="pictureUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter picture URL"
            />
          </div>

          {/* Footer Section */}
          <DialogFooter className="mt-6 flex w-full items-center justify-center gap-4">
            <div className="flex w-full items-center justify-center gap-4">
              <GlobalButton
                onClick={() => onOpenChange(false)}
                variant="primary"
              >
                Cancel
              </GlobalButton>
              <GlobalButton 
                onClick={handleSave} 
                variant="secondary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </GlobalButton>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
