import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/router";

import {
  AuthLayout,
  GlassContainer,
  GlobalButton,
} from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function ResetPasswordSuccessfulPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      router.push("/login");
    } catch (err: any) {
      AppToast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center">
        <GlassContainer>
          <div className="absolute -mt-26 -ml-10 flex h-full w-full flex-col items-center justify-center">
            <div className="text-neutral-white mb-2 h-48 w-48">
              <CircleCheck className="h-full w-full" strokeWidth={0.5} />
            </div>
            <h2 className="font-sanctuary text-neutral-white mb-4 text-center text-[64px]">
              Successfully reset password
            </h2>
            <a className="font-chakra text-neutral-white mb-10 text-lg">
              Your password has been changed successfully
            </a>

            <div className="font-chakra text-neutral-white flex justify-center">
              <GlobalButton
                type="button"
                variant="primary"
                size="lg"
                className="w-fit text-xl"
                loading={loading}
                loadingText="Logging in..."
                onClick={handleSubmit}
              >
                Go to login
              </GlobalButton>
            </div>
          </div>
        </GlassContainer>
      </div>
    </AuthLayout>
  );
}
