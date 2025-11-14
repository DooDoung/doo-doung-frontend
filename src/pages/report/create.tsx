import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
  DefaultLayout,
  GlassContainer2,
  GlobalButton,
  GlobalInput,
} from "@/components/globalComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents/Select";

import { AppToast } from "@/lib/app-toast";
import { ca } from "date-fns/locale";

const reportTopicOptions = [
  { value: "COURSE_ISSUE", label: "Course Issue" },
  { value: "PROPHET_ISSUE", label: "Prophet Issue" },
  { value: "WEBSITE_ISSUE", label: "Website Issue" },
  { value: "PAYMENT_ISSUE", label: "Payment Issue" },
  { value: "OTHER", label: "Other" },
];

export default function CreateReportPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [reportTopic, setReportTopic] = useState("");
  const [description, setDescription] = useState("");
  const session = useSession();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  const token = session.data?.accessToken;
  const userId = session.data?.user.id;

  const fetchCreateReport = async () => {
    try {
      if (!token || !userId) return;
      const res = await fetch(`${API_BASE_URL}/report/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accountId: userId,
          topic: topic,
          reportType: reportTopic,
          description: description,
        }),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      console.log("Report created:", data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ topic, reportTopic, description });
    if (!topic || !reportTopic || !description) {
      AppToast.error("Every field must be completed.");
      return;
    }
    fetchCreateReport();
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
      <div className="flex h-screen w-full items-center justify-center">
        <GlassContainer2>
          <div className="flex w-full flex-col items-center p-6 sm:p-8">
            {/* Header */}
            <div className="font-sanctuary mb-8 text-4xl font-light text-white">
              Create New Report
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-[80%] space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Topic Input */}
                <div>
                  <label
                    htmlFor="topic"
                    className="font-chakra mb-2 block text-lg font-medium text-white"
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
                    className="font-chakra mb-2 block text-lg font-medium text-white"
                  >
                    Report Topic
                  </label>
                  <Select
                    value={reportTopic}
                    onValueChange={setReportTopic}
                    required
                  >
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
                  className="font-chakra mb-2 block text-lg font-medium text-white"
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
                <div className="mt-1 text-right text-xs text-white/70">
                  {description.length}/200
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
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
