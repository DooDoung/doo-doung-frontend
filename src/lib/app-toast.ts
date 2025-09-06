import React from "react";
import { toast } from "react-hot-toast";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

// สไตล์กลางสำหรับไอคอน
const iconStyle = "h-6 w-6";

// สไตล์กลางสำหรับตัว Toast (ยกเว้นสีขอบ)
const baseToastStyle = "bg-white text-neutral-900";

/**
 * Custom toast functions for the application, providing consistent styling.
 */
export const AppToast = {
  success: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-2 border-green-500`,
      icon: React.createElement(CheckCircle2, { className: `${iconStyle} text-green-500` }),
    });
  },
  error: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-2 border-red-500`,
      icon: React.createElement(AlertCircle, { className: `${iconStyle} text-red-500` }),
    });
  },
  warning: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-2 border-yellow-500`,
      icon: React.createElement(AlertTriangle, { className: `${iconStyle} text-yellow-500` }),
    });
  },
  info: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-2 border-blue-500`,
      icon: React.createElement(Info, { className: `${iconStyle} text-blue-500` }),
    });
  },
};

