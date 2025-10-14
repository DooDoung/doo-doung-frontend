import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import AccountLayout from "@/components/account/AccountLayout";
import { EditProfilePictureDialog } from "@/components/account/EditProfilePictureDialog";
import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { AccountData } from "@/interface/User";
import { AppToast } from "@/lib/app-toast";

export default function EditAccountPage() {
  const { data: session, status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState("www.example.url");
  const [user, setUser] = useState<AccountData | undefined>();

  const handleSavePicture = (newUrl: string) => {};

  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken) {
      return; // Don't fetch if no session data
    }

    const fetchUserData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${session?.user.id}`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          // Extract user data from the nested structure
          const userData = responseData.data || responseData;
          setUser(userData);
          AppToast.success('Account data loaded successfully');
        } else {
          AppToast.error(`Failed to load account data. Status: ${response.status}`);
        }
      } catch (error) {
        AppToast.error('Unable to connect to server. Please check your connection and try again.');
      }
    };

    fetchUserData();
  }, [session, status]);

  if (status === "loading") {
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <div>Loading...</div>
      </DefaultLayout>
    );
  }

  if (!session) {
    return (
      <DefaultLayout contentClassName="flex justify-center items-center">
        <div>Please log in to access this page</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout contentClassName="flex justify-center items-center w-full">
      <AccountLayout user={user} editing={true} />
    </DefaultLayout>
  );
}
