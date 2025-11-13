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

const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must include at least one number.";
  }
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
    return "Password must include at least one special character (e.g. ! @ # $ % ^ & *).";
  }
  return null;
};

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

    // Show "passwords must match" error BEFORE doing other validation
    if (password !== confirmPassword) {
      AppToast.error("Password and Confirm Password must match.");
      return;
    }

    // Then validate password rules
    const validationError = validatePassword(password);
    if (validationError) {
      AppToast.error(validationError);
      return;
    }

    if (!token) {
      AppToast.error("Invalid or missing token");
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
        let backendMessage = "Failed to reset password";
        try {
          const data = await res.json();
          if (data?.message) backendMessage = data.message;
        } catch {}
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
