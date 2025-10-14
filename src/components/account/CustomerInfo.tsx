import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AppToast } from "@/lib/app-toast";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockReservation } from "@/constants/mock-account";
import type { CustomerAccount } from "@/interface/User";

import { Switch } from "../ui/switch";

import ReservationSection from "./Reservation/ReservationSection";
import ReviewSection from "./Review/ReviewSection";

function CustomerInfo({ customer }: { customer: CustomerAccount }) {
  const [isPublic, setIsPublic] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const accountId = session?.user?.id;
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${backendUrl}/review/me`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });
        const result = response.data.data;
        setReview(result.reviews);
        //console.log("Review data:", result.reviews);
      } catch (error: any) {
        AppToast.error(`Error fetching review: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchPublicStatus = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/customer/public-status/${accountId}`,
        );
        setIsPublic(response.data.data.isPublic);
      } catch (error: any) {
        AppToast.error(`Error fetching public status: ${error.message}`);
      }
    };

    fetchReview();
    fetchPublicStatus();
  }, [accountId, isPublic, session?.accessToken]);

  const togglePublicStatus = async () => {
    try {
      const response = await axios.patch(
        `${backendUrl}/customer/toggle-public`,
        {},
        { headers: { Authorization: `Bearer ${session?.accessToken}` } },
      );
      AppToast.success("Public status updated!");
      setIsPublic(!isPublic);
    } catch (error: any) {
      AppToast.error(`Error updating public status: ${error.message}`);
    }
  };

  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
      <div className="flex flex-col items-center self-end font-light text-white uppercase">
        <p>{isPublic ? "Public" : "Private"}</p>
        <Switch
          className="self-end"
          size="lg"
          checked={isPublic}
          onCheckedChange={() => togglePublicStatus()}
        />
      </div>
      <form
        id="customerInfoForm"
        className="font-chakra mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            First Name
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={customer.firstName}
            readOnly
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Last Name
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={customer.lastName}
            readOnly
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Gender
          </label>
          <Select value={customer.gender.toLowerCase()} disabled>
            <SelectTrigger className="w-full cursor-not-allowed bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="lgbtq+">LGBTQ+</SelectItem>
              <SelectItem value="undefined">Undefined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-1 block font-extralight text-white uppercase">
            Date of Birth
          </label>
          <GlobalInput
            type="date"
            className="w-full cursor-not-allowed"
            value={customer.birthDate.split("T")[0]}
            readOnly
          />
        </div>

        {/* Time of Birth */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Time of Birth
          </label>
          <GlobalInput
            type="time"
            className="w-full cursor-not-allowed"
            value={customer.birthTime.split("T")[1].substring(0, 5)}
            readOnly
          />
        </div>

        {/* Zodiac Sign */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Zodiac Sign
          </label>
          <GlobalInput
            type="text"
            className="w-full cursor-not-allowed"
            value={customer.zodiacSign}
            readOnly
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Email
          </label>
          <GlobalInput
            type="email"
            className="w-full cursor-not-allowed"
            value={customer.email}
            readOnly
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-1 block font-light text-white uppercase">
            Phone Number
          </label>
          <GlobalInput
            type="tel"
            className="w-full cursor-not-allowed"
            value={customer.phoneNumber}
            readOnly
          />
        </div>
      </form>

      {/* Reservation Section */}
      <ReservationSection myReservation={mockReservation} />

      {/* User's Course Reviewed Section */}
      <ReviewSection reviews={review} account={customer} />

      {/* Edit Profile Button */}
      <div className="mb-2 flex justify-center">
        <GlobalButton
          variant="primary"
          onClick={() => {
            router.push("/account/edit-account");
          }}
        >
          EDIT PROFILE
        </GlobalButton>
      </div>
    </div>
  );
}

export default CustomerInfo;
