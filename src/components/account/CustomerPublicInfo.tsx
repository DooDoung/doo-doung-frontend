import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { AccountData } from "@/interface/User";

import ReviewSection from "./Review/ReviewSection";

function CustomerPublicInfo({
  account,
  accountId,
}: {
  account: AccountData;
  accountId: string;
}) {
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

    fetchReview();
  }, [accountId]);

  return (
    <div className="custom-scrollbar h-full w-full p-4 sm:overflow-y-auto">
      {loading && <p>Loading review...</p>}
      {review === null && !loading && <p>No reviews available.</p>}
      {review && <ReviewSection reviews={review} account={account} />}
    </div>
  );
}

export default CustomerPublicInfo;
