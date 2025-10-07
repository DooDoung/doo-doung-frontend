import * as React from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  GlobalButton,
  GlobalInput,
  SelectContent,
  SelectItem,
} from "@/components/globalComponents";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppToast } from "@/lib/app-toast";

import type { TransactionAccount } from "@/types/transaction";

import ProphetCard from "../ProphetCard";
import { set } from "zod";

interface ProphetInfo {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  line: string;
  transaction: TransactionAccount[];
}

// const prophet: ProphetInfo = {
//   id: "1",
//   firstName: "John",
//   lastName: "Doe",
//   gender: "Male",
//   phone: "+1 234 567 8900",
//   email: "john.doe@gmail.com",
//   line: "@johndoe",
//   transaction: {
//     accountNumber: "123-456-7890",
//     accountName: "John Doe",
//     imageUrl: "/images/transaction-bank/SCB.webp",
//     bankName: "SCB",
//   },
// };

function EditProphetInfo() {
  const router = useRouter();
  const {data: session} = useSession();

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [prophetInfo, setProphetInfo] = React.useState<ProphetInfo | null>(null);

  const fetchProphetData = React.useCallback(async () => {
    if (!session?.user?.id) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (session.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
      // Fetch basic account data
      const accountRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${session.user.id}`, {
        method: "GET",
        headers
      });

      if (!accountRes.ok) {
        setError(`Failed to fetch account data: ${accountRes.status}`);
      }

      const accountData = await accountRes.json();
      const txRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tx-account`, {
        method: "GET",
        headers
      });

      if (txRes.ok) {
        const txResponseData = await txRes.json();
        const rawTxData = txResponseData?.data || [];
        const rawTxDataWithoutProphetId = rawTxData.map(({ prophetID, ...rest }: any) => rest);

        const mergedData: ProphetInfo = {
        id: accountData.id || session.user.id,
        firstName: accountData.firstName || "",
        lastName: accountData.lastName || "",
        gender: accountData.gender || "Undefined",
        phone: accountData.phone || "",
        email: accountData.email || "",
        line: accountData.line || accountData.lineId || "",
        transaction: rawTxDataWithoutProphetId as TransactionAccount[],
      };

      setProphetInfo(mergedData);
      } else {
        setError("Transaction account not found");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load prophet data";
      setError(errorMessage);
      AppToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, session?.accessToken]);

  const handleChange = (field: keyof ProphetInfo, value: string) => {
    setProphetInfo((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = async () => {
    try {
      // mock: call API
      console.log("Saving prophet profile:", prophetInfo);

      // TODO: replace with real API call
      // await fetch("/api/prophet/update", { method: "POST", body: JSON.stringify(prophetInfo) });

      AppToast.success("Prophet profile updated successfully!");
      router.push("/account"); // go back after save
    } catch (err) {
      AppToast.error("Failed to update profile");
    }
  };

  React.useEffect(() => {
    console.log("🎯 Component mounted");
    fetchProphetData();
  }, [fetchProphetData]);

  React.useEffect(() => {
      if (error) {
        AppToast.error(error);
      }
    }, [error]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="custom-scrollbar flex h-full w-full flex-col p-4 sm:w-[70%] sm:overflow-y-auto">
      <form
        id="prophetInfoForm"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* First Name */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            First Name
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={prophetInfo?.firstName ?? ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Last Name
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={prophetInfo?.lastName ?? ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Gender
            <Pencil className="ml-2" size={18} />
          </label>
          <Select
            value={prophetInfo?.gender?.toLowerCase() ?? ""}
            onValueChange={(val) =>
              handleChange("gender", val.charAt(0).toUpperCase() + val.slice(1))
            }
          >
            <SelectTrigger className="w-full bg-white">
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

        {/* Phone Number */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Phone Number
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="tel"
            className="w-full"
            value={prophetInfo?.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Email
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="email"
            className="w-full"
            value={prophetInfo?.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Line ID */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Line ID
            <Pencil className="ml-2" size={18} />
          </label>
          <GlobalInput
            type="text"
            className="w-full"
            value={prophetInfo?.line ?? ""}
            onChange={(e) => handleChange("line", e.target.value)}
          />
        </div>

        {/* Prophet Features */}
        <div className="relative mb-4 md:col-span-2">
          <Pencil
            className="text-neutral-white absolute top-1 left-44 ml-2"
            size={18}
          />
          {/* <ProphetCard
            feat={{
              name: "Transaction Account",
              imageUrl: "",
              goTo: "/account/prophet/transaction-account",
            }}
            transaction={prophetInfo?.transaction}
          /> */}
        </div>

        {/* Save Profile Button */}
        <div className="mb-2 flex justify-center md:col-span-2">
          <GlobalButton variant="secondary" type="submit">
            SAVE PROFILE
          </GlobalButton>
        </div>
      </form>
    </div>
  );
}

export default EditProphetInfo;
