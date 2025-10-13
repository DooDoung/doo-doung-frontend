import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Lock } from "lucide-react";

import { CustomerAccount } from "@/interface/User";

import ReviewSection from "./Review/ReviewSection";

function CustomerPublicInfo({
  account,
  accountId,
}: {
  account: CustomerAccount;
  accountId: string;
}) {
  const [isPublic, setIsPublic] = useState(false);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/review/account/${accountId}`,
        );
        const result = response.data.data;
        setReview(result.reviews);
        console.log("Review data:", result.reviews);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPublicStatus = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/customer/public-status/${accountId}`,
        );
        console.log("Public status data:", response.data);
        setIsPublic(response.data.data.isPublic);
      } catch (error) {
        console.error("Error fetching public status:", error);
      }
    };

    fetchReview();
    fetchPublicStatus();
  }, [accountId, isPublic]);

  if (!isPublic) {
    return (
      <div className="custom-scrollbar flex h-full w-full items-center justify-center p-4 sm:overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <Lock className="h-12 w-12 text-white opacity-70" />
          <p className="font-chakra text-2xl text-white">
            This account is private.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
      {loading && <p>Loading review...</p>}
      {review === null && !loading && <p>No reviews available.</p>}
      {review && <ReviewSection reviews={review} account={account} />}
    </div>
  );
}

export default CustomerPublicInfo;
