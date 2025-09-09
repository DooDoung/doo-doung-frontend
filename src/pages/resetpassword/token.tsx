import { useState } from "react";
import { useRouter } from "next/router";

import { DefaultLayout, GlobalButton, GlobalInput } from "@/components/globalComponents";
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
            router.push("/successful");
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
      <div className="absolute flex flex-col min-h-[80vh] w-8/9 items-center justify-center bg-neutral-black/50 backdrop-blur-[10px] rounded-4xl shadow-[0_0_20px] shadow-neutral-white">
        <h3 className="absolute top-6 left-10 font-sanctuary text-xl lg:text-3xl xl:text-5xl text-neutral-white">Doodoung</h3>

        <h2 className="mb-4 font-sanctuary text-neutral-white text-[42px] lg:text-5xl xl:text-[64px] text-center">Enter your new password</h2>

        <form onSubmit={handleSubmit} className="w-80">
          <div className="mb-6 font-chakra text-base lg:text-xl xl:text-2xl text-neutral-white">
            <div className="mb-4">
              <label className="block mb-2">New password</label>
              <GlobalInput
                type="text"
                className="w-full text-sm lg:text-base xl:text-xl"
                placeholder="Type your new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="block mb-2">Confirm new password</label>
              <GlobalInput
                type="password"
                className="w-full text-sm lg:text-base xl:text-xl"
                placeholder="Re-type to confirm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <GlobalButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-fit text-l lg:text-xl xl:text-2xl"
                loading={loading}
                loadingText="Logging in..."
                onClick={handleSubmit}
              >Reset password</GlobalButton></div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
