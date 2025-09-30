import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

import {
  AuthLayout,
  GlassContainer,
  GlobalButton,
  GlobalInput,
} from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function ResetPasswordTokenPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      AppToast.error("Password and Confirm Password are required.");
      return;
    }
    if (!token) {
      AppToast.error("Invalid or missing token");
      return;
    }
    if (password !== confirmPassword) {
      AppToast.error("Password and Confirm Password must match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/auth/reset-password/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            newPassword: password,
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json(); // Parse the response body
        const backendMessage = data?.message || "Failed to reset password"; // Access the message field
        throw new Error(backendMessage);
      }

      AppToast.success("Reset password successful");
      router.push("/reset-password/successful");
    } catch (err: any) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      AppToast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center">
        <GlassContainer>
          <div className="absolute -mt-26 -ml-10 flex h-full w-full flex-col items-center justify-center">
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
                icon={
                  <ArrowLeft className="text-accent-pink" strokeWidth={3} />
                }
                onClick={() => router.push("/login")}
              >
                Back to login
              </GlobalButton>
            </div>
          </div>
        </GlassContainer>
      </div>
    </AuthLayout>
  );
}
