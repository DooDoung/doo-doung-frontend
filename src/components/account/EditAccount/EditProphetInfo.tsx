import * as React from "react";
import { de } from "date-fns/locale";
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
import { prophetFeat } from "@/constants/constant-ex";
import { AccountData, ProphetAccount } from "@/interface/User";
import { AppToast } from "@/lib/app-toast";
import type { TransactionAccount } from "@/types/transaction";
import { updateUserAccount } from "@/utils/apiUtils";
import { getBankImageUrl } from "@/utils/getBankImageUrl";
import { validateSession, validateUserRole } from "@/utils/validationUtils";

import ProphetCard from "../ProphetCard";

interface ProphetUserInfo {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  line: string;
  txAccounts: TransactionAccount[];
}

// Validation function for Prophet required fields
const validateProphetRequiredFields = (userInfo: ProphetUserInfo): boolean => {
  const requiredFields = {
    Email: userInfo.email,
    "Phone Number": userInfo.phone,
    Gender: userInfo.gender,
    "Line ID": userInfo.line,
  };

  for (const [fieldName, value] of Object.entries(requiredFields)) {
    if (!value || value.toString().trim() === "" || value === "undefined") {
      AppToast.error(`${fieldName} is required`);
      return false;
    }
  }
  return true;
};

interface EditProphetInfoProps {
  user?: ProphetAccount;
  onUserUpdate?: (updatedUser: AccountData) => void;
}

// Utils for Prophet data processing
const mapGenderFromAPI = (apiGender: string): string => {
  switch (apiGender) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    case "LGBTQ_PLUS":
      return "LGBTQ+";
    default:
      return "Undefined";
  }
};

const mapGenderToAPI = (uiGender: string): string => {
  switch (uiGender) {
    case "Male":
      return "MALE";
    case "Female":
      return "FEMALE";
    case "LGBTQ+":
      return "LGBTQ_PLUS";
    case "Undefined":
      return "UNDEFINED";
    default:
      return "UNDEFINED";
  }
};

const processProphetData = (userData: any): ProphetUserInfo => {
  return {
    firstName: userData.firstName || "",
    lastName: userData.lastName || userData.lastname || "",
    gender: mapGenderFromAPI(userData.gender),
    email: userData.email || "",
    phone: userData.phoneNumber || userData.phone || "",
    line: userData.line || userData.lineId || "",
    txAccounts: userData.txAccounts || [],
  };
};

const prepareProphetAPIData = (
  userInfo: ProphetUserInfo,
  user: ProphetAccount,
) => {
  const userData = user as any; // Type assertion to access id field

  const requestData = {
    username: userData.username, // Use username as identifier for Prophet API
    role: user.role,
    firstName: userInfo.firstName.trim(),
    lastName: userInfo.lastName.trim(),
    email: userInfo.email.trim(),
    phoneNumber: userInfo.phone.trim(),
    gender: mapGenderToAPI(userInfo.gender),
    lineId: userInfo.line.trim(),
  };
  return requestData;
};

function EditProphetInfo({ user, onUserUpdate }: EditProphetInfoProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [hasUserMadeChanges, setHasUserMadeChanges] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<ProphetUserInfo>({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    line: "",
    txAccounts: [] as TransactionAccount[],
  });

  const [defaultTransactionAccount, setDefaultTransactionAccount] =
    React.useState<TransactionAccount | null>(null);

  React.useEffect(() => {
    const fetchTxAccount = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tx-account`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken || ""}`,
            },
          },
        );
        const transactionData = await response.json();
        const txAccounts = transactionData.data || [];
        setUserInfo((prev) => ({ ...prev, txAccounts }));
        for (const account of txAccounts) {
          if (account.isDefault) {
            setDefaultTransactionAccount(account);
            break;
          }
        }
      } catch (error) {
        AppToast.error("Failed to fetch transaction accounts");
      }
    };
    fetchTxAccount();
  }, [session, user]);

  // Process user data when user prop changes
  React.useEffect(() => {
    if (user && !hasUserMadeChanges) {
      const processedData = processProphetData(user);
      setUserInfo(processedData);
    }
  }, [user, hasUserMadeChanges]);

  const genderForDisplay = hasUserMadeChanges
    ? userInfo.gender
    : user
      ? mapGenderFromAPI(user.gender)
      : "";

  const genderForSelect = genderForDisplay.toLowerCase();

  const handleGenderSelect = (value: string) => {
    const genderMap: { [key: string]: string } = {
      male: "Male",
      female: "Female",
      "lgbtq+": "LGBTQ+",
      undefined: "Undefined",
    };
    handleChange("gender", genderMap[value] || "");
  };

  const handleChange = (field: keyof ProphetUserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    setHasUserMadeChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Validation
      if (!validateSession(session) || !user) {
        return;
      }

      // Check if user has role property
      if (!user.role) {
        AppToast.error("User role information is missing");
        return;
      }

      // Validate required fields
      if (!validateProphetRequiredFields(userInfo)) {
        return;
      }

      // Prepare API data
      const requestData = prepareProphetAPIData(userInfo, user);

      // API call using the same updateUserAccount as Customer
      const result = await updateUserAccount(
        requestData,
        session?.accessToken || "",
      );

      if (!result.success) {
        return;
      }

      // Handle success - transform data to ProphetAccount format
      if (onUserUpdate && user) {
        onUserUpdate(userInfo as unknown as ProphetAccount);
      }

      setHasUserMadeChanges(false);
      router.push("/account");
    } catch (err) {
      AppToast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const prophetFeatures = prophetFeat;

  prophetFeatures[0].imageUrl = getBankImageUrl(
    defaultTransactionAccount
      ? String(defaultTransactionAccount.bank)
      : userInfo.txAccounts[0]
        ? String(userInfo.txAccounts[0].bank)
        : "",
  );

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
        {/* Gender */}
        <div>
          <label className="mb-1 block flex items-center font-light text-white uppercase">
            Gender
            <Pencil className="ml-2" size={18} />
          </label>
          <Select value={genderForSelect} onValueChange={handleGenderSelect}>
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
            value={userInfo.phone}
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
            value={userInfo.email}
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
            value={userInfo.line}
            onChange={(e) => handleChange("line", e.target.value)}
          />
        </div>

        {/* Prophet Features */}
        <div className="my-4 grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-2">
          {prophetFeatures.map((feat, index) => (
            <ProphetCard
              key={index}
              feat={feat}
              transaction={{
                ...userInfo.txAccounts[0],
                bank: String(userInfo.txAccounts[0]?.bank),
              }}
            />
          ))}
        </div>

        {/* Save Profile Button */}
        <div className="mb-2 flex justify-center md:col-span-2">
          <GlobalButton variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? "SAVING..." : "SAVE PROFILE"}
          </GlobalButton>
        </div>
      </form>
    </div>
  );
}

export default EditProphetInfo;
