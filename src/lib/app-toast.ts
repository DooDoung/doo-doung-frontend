import React from "react";
import { toast } from "react-hot-toast";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

// --- Base Styles ---
const baseToastStyle =
  "bg-white text-neutral-black font-chakra border drop-shadow-sm px-4 py-3 rounded-lg flex items-center space-x-3";

/**
 * Custom toast functions for the application, providing consistent styling.
 */
export const AppToast = {
  success: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-success drop-shadow-success`,
      icon: React.createElement(
        "div",
        { className: "bg-success p-2 rounded-full" },
        React.createElement(CheckCircle2, {
          className: "h-6 w-6 text-neutral-white",
        }),
      ),
    });
  },
  error: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-error drop-shadow-error`,
      icon: React.createElement(
        "div",
        { className: "bg-error p-2 rounded-full" },
        React.createElement(AlertCircle, {
          className: "h-6 w-6 text-neutral-white",
        }),
      ),
    });
  },
  warning: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-warning drop-shadow-warning`,
      icon: React.createElement(
        "div",
        { className: "bg-warning p-2 rounded-full" },
        React.createElement(AlertTriangle, {
          className: "h-6 w-6 text-neutral-white",
        }),
      ),
    });
  },
  info: (message: string) => {
    toast(message, {
      className: `${baseToastStyle} border-accent-violet drop-shadow-accent-violet`,
      icon: React.createElement(
        "div",
        { className: "bg-accent-violet p-2 rounded-full" },
        React.createElement(Info, { className: "h-6 w-6 text-neutral-white" }),
      ),
    });
  },
};
