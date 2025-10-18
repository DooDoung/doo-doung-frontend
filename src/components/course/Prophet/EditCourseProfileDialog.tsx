"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppToast } from "@/lib/app-toast";

import { GlobalButton, GlobalInput } from "@/components/globalComponents";

interface EditCourseProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (url: string) => void;
  currentImageUrl?: string;
}

export function EditCourseProfileDialog({
  open,
  onOpenChange,
  onSave,
  currentImageUrl = "",
}: EditCourseProfileDialogProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);

  useEffect(() => {
    if (open) {
      //fetchProfile
    }
  }, [open, currentImageUrl]);

  const handleSave = async () => {
    // save profile
    onOpenChange(false);
    AppToast.success("Profile picture updated successfully!");
    onSave(imageUrl);
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
              <GlobalButton onClick={handleSave} variant="secondary">
                Save
              </GlobalButton>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
