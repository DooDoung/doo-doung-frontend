import { useState } from "react";
import { useRouter } from "next/router";

import { DefaultLayout, GlassContainer2, GlobalButton, GlobalInput } from "@/components/globalComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents/Select";

import { AppToast } from "@/lib/app-toast";

const reportTopicOptions = [
  { value: "course", label: "Course Issue" },
  { value: "prophet", label: "Prophet Issue" },
  { value: "website", label: "Website Issue" },
  { value: "payment", label: "Payment Issue" },
  { value: "other", label: "Other" },
];

export default function CreateReportPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [reportTopic, setReportTopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ topic, reportTopic, description });
    if (!topic || !reportTopic || !description) {
      AppToast.error("Every field must be completed.");
      return;
    }
    // Show success toast
    // TODO: Handle form submission
    AppToast.success("Report Submitted!");
    // Navigate back after submission
    router.push("/report");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <DefaultLayout>
      <div className="flex w-full h-screen items-center justify-center">
        <GlassContainer2>
          <div className="flex flex-col items-center p-6 sm:p-8 w-full">
            {/* Header */}
            <div className="font-sanctuary text-4xl font-light text-white mb-8">
              Create New Report
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-[80%] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Topic Input */}
                <div>
                  <label
                    htmlFor="topic"
                    className="font-chakra block text-lg font-medium text-white mb-2"
                  >
                    Topic
                  </label>
                  <GlobalInput
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your brief topic"
                    required
                  />
                </div>

                {/* Report Topic Select */}
                <div>
                  <label
                    htmlFor="reportTopic"
                    className="font-chakra block text-lg font-medium text-white mb-2"
                  >
                    Report Topic
                  </label>
                  <Select value={reportTopic} onValueChange={setReportTopic} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select problem type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTopicOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <label
                  htmlFor="description"
                  className="font-chakra block text-lg font-medium text-white mb-2"
                >
                  Description
                </label>
                <GlobalInput
                  id="description"
                  asTextarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your issue in detail (Max 200 characters)"
                  maxLength={200}
                  fullWidth
                  required
                />
                <div className="text-right text-xs text-white/70 mt-1">
                  {description.length}/200
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <GlobalButton
                  variant="secondary"
                  onClick={handleCancel}
                  size="lg"
                  className="w-30"
                >
                  Cancel
                </GlobalButton>
                <GlobalButton
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-30"
                  onClick={handleSubmit}
                >
                  Submit
                </GlobalButton>
              </div>
            </form>
          </div>
        </GlassContainer2>
      </div>
    </DefaultLayout>
  );
}
