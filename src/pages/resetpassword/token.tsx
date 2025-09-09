import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

import {
  DefaultLayout,
  GlobalButton,
  GlobalInput,
} from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function ResetPasswordTokenPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      AppToast.error("Password and Confirm Password are required.");
      return;
    }

    setLoading(true);

    try {
      if (password !== confirmPassword) {
        AppToast.error("Password and Confirm Password must match.");
        return;
      } else {
        AppToast.success("Reset password successful");
        router.push("/resetpassword/successful");
        return;
      }
    } catch (err: any) {
      AppToast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout
      includeFooter={false}
      includeHeader={false}
      contentClassName="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-black to-neutral-dark"
    >
      <div className="bg-neutral-black/50 shadow-neutral-white absolute flex min-h-[80vh] w-8/9 flex-col items-center justify-center rounded-4xl shadow-[0_0_20px] backdrop-blur-[10px]">
        <h3 className="font-sanctuary text-neutral-white absolute top-6 left-10 text-5xl">
          Doodoung
        </h3>

        <h2 className="font-sanctuary text-neutral-white mb-4 text-center text-[64px]">
          Enter your new password
        </h2>

        <form onSubmit={handleSubmit} className="w-80">
          <div className="font-chakra text-neutral-white mb-6 text-2xl">
            <div className="mb-4">
              <label className="mb-2 block">New password</label>
              <GlobalInput
                type="text"
                size="lg"
                className="w-full text-xl"
                placeholder="Type your new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="mb-2 block">Confirm new password</label>
              <GlobalInput
                type="password"
                size="lg"
                className="w-full text-xl"
                placeholder="Re-type to confirm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <GlobalButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-fit text-xl"
                loading={loading}
                loadingText="Logging in..."
                onClick={handleSubmit}
              >
                Reset password
              </GlobalButton>
            </div>
          </div>
        </form>

        <div className="absolute right-8 bottom-8">
          <GlobalButton
            type="button"
            variant="secondary"
            size="sm"
            className="w-fit text-lg"
            loading={loading}
            icon={<ArrowLeft className="text-accent-pink" strokeWidth={3} />}
            onClick={() => router.push("/login")}
          >
            Back to login
          </GlobalButton>
        </div>
      </div>
    </DefaultLayout>
  );
}
