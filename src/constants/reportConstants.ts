export interface Report {
  customer: string;
  admin?: string | null;
  reportType: string;
  topic: string;
  description: string;
  reportStatus: string;
  profileUrl?: string | null;
  createdAt: string;
}

export const WARNING_THRESHOLD: number = 5;

export const mockReports: Report[] = [
  {
    customer: "customer65",
    admin: null,
    reportType: "PROPHET_ISSUE",
    topic: "Payment Problem",
    description: "Technical issues during the session.",
    reportStatus: "PENDING",
    profileUrl: "https://example.com/profile/736c8077b8414dcf.jpg",
    createdAt: "2025-09-09T13:47:14.432Z",
  },
  {
    customer: "customer65",
    admin: null,
    reportType: "PROPHET_ISSUE",
    topic: "Payment Problem",
    description: "Technical issues during the session.",
    reportStatus: "PENDING",
    profileUrl: "https://example.com/profile/736c8077b8414dcf.jpg",
    createdAt: "2025-09-09T13:47:14.432Z",
  },
  {
    customer: "customer65",
    admin: null,
    reportType: "PROPHET_ISSUE",
    topic: "Payment Problem",
    description: "Technical issues during the session.",
    reportStatus: "PENDING",
    profileUrl: "https://example.com/profile/736c8077b8414dcf.jpg",
    createdAt: "2025-09-09T13:47:14.432Z",
  },
  {
    customer: "customer65",
    admin: null,
    reportType: "PROPHET_ISSUE",
    topic: "Payment Problem",
    description: "Technical issues during the session.",
    reportStatus: "PENDING",
    profileUrl: "https://example.com/profile/736c8077b8414dcf.jpg",
    createdAt: "2025-09-09T13:47:14.432Z",
  },
  {
    customer: "customer65",
    admin: null,
    reportType: "PROPHET_ISSUE",
    topic: "Payment Problem",
    description: "Technical issues during the session.",
    reportStatus: "PENDING",
    profileUrl: "https://example.com/profile/736c8077b8414dcf.jpg",
    createdAt: "2025-09-09T13:47:14.432Z",
  },
  {
    customer: "customer65",
    admin: null,
    reportType: "PROPHET_ISSUE",
    topic: "Payment Problem",
    description: "Technical issues during the session.",
    reportStatus: "PENDING",
    profileUrl: "https://example.com/profile/736c8077b8414dcf.jpg",
    createdAt: "2025-09-09T13:47:14.432Z",
  },
];
