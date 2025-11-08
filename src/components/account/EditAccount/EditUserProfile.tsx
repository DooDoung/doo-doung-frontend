import * as React from "react";
import { Camera, Pencil } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";
import { ZodiacSign } from "@/types/user";

interface AccountData {
  id: string;
  username: string;
  profileUrl: string;
  zodiacSign: ZodiacSign;
}

function EditUserProfile({
  role,
  editing,
}: {
  role: string;
  editing: boolean;
}) {
  const { data: session } = useSession();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [accountData, setAccountData] = React.useState<AccountData | null>(
    null,
  );

  const fetchAccountData = React.useCallback(async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (session.accessToken) {
        headers["Authorization"] = `Bearer ${session.accessToken}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${session.user.id}`,
        {
          method: "GET",
          headers,
        },
      );

      if (!res.ok) {
        setError("Failed to fetch account data");
      }

      const responseData = await res.json();
      const data = responseData.data ?? [];
      setAccountData(data);
    } catch (error) {
      const errorMessage = "Failed to load account data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [session, session?.user?.id, session?.accessToken]);

  const handleChangeProfile = () => {
    setOpenDialog(true);
  };

  React.useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  React.useEffect(() => {
    if (error) {
      AppToast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="bg-primary-500/60 flex w-full flex-col items-center justify-center rounded-3xl p-12 text-center sm:w-[30%]">
        <div className="text-white">Loading account data...</div>
      </div>
    );
  }

  if (error || !accountData) {
    return (
      <div className="bg-primary-500/60 flex w-full flex-col items-center justify-center rounded-3xl p-12 text-center sm:w-[30%]">
        <div className="text-neutral-white mb-4">
          {error || "No account data available"}
        </div>
        <GlobalButton variant="secondary" onClick={fetchAccountData}>
          Retry
        </GlobalButton>
      </div>
    );
  }

  return (
    <div className="bg-primary-500/60 flex w-full flex-col items-center justify-start rounded-3xl p-12 text-center sm:w-[30%]">
      <h3 className="font-sanctuary text-neutral-black mb-8 text-5xl">
        {role}
      </h3>

      {/* Profile + zodiac badge */}
      <div className="relative mb-6 h-[150px] w-[150px] rounded-full border-2 bg-white">
        <Image
          alt="Profile"
          src={accountData?.profileUrl || "/user-profile.svg"}
          fill
          className="h-full w-full rounded-full object-cover p-1"
        />

        {role == "customer" && (
          <div className="bg-secondary absolute top-2 right-0 flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
            <Image
              src={`/images/zodiac-sign/${accountData?.zodiacSign}.svg`}
              alt={accountData?.zodiacSign || "zodiac-sign"}
              fill
              className="object-contain p-[6px]"
            />
          </div>
        )}

        {editing && (
          <div
            className="bg-secondary absolute bottom-2 left-0 flex h-9 w-9 items-center justify-center rounded-full"
            onClick={handleChangeProfile}
          >
            <Camera strokeWidth={1} size={26} />
          </div>
        )}

        <EditProfilePictureDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          currentImageUrl={accountData?.profileUrl}
          user={accountData as any}
          onSave={(url) =>
            setAccountData((prev) =>
              prev ? { ...prev, profileUrl: url } : null,
            )
          }
        />
      </div>

      {/* Username */}
      <p className="font-chakra text-neutral-black mb-4 flex items-center self-start text-lg">
        USERNAME
        {editing && <Pencil className="ml-2" size={18} />}
      </p>
      <GlobalInput
        type="text"
        className={`font-chakra mb-4 ${editing ? "" : "cursor-not-allowed"}`}
        fullWidth
        value={accountData?.username || ""}
        onChange={() => {}} // Username is not editable
        readOnly={true}
      />
    </div>
  );
}

export default EditUserProfile;
