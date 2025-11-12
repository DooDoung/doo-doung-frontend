import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

import {
  AuthLayout,
  GlassContainer,
  GlobalButton,
  GlobalInput,
} from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  const isEmailInvalid =
    email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? true : false;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      AppToast.error("Email is required.");
      return;
    }

    if (isEmailInvalid) {
      AppToast.error("Invalid email format.");
      return;
    }

    setLoading(true);

    try {
      if (cooldown > 0) {
        AppToast.info("Reset already requested. Please check your email.");
        return;
      }

      const res = await fetch(
        "http://localhost:8000/auth/reset-password/request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      console.log("Response status:", res.status);
      const data = await res.json().catch(() => ({}));
      console.log("Response data:", data);

      if (res.status === 404) {
        AppToast.error("Email not found, please register.");
        return;
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to reset password");
      }

      setCooldown(45);
      AppToast.success("A reset password link has been sent to your email.");
    } catch (err: any) {
      console.error("Reset password error:", err);
      AppToast.error(err.message);
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
              Forgot your password?
            </h2>
            <a className="font-chakra text-neutral-white mb-6 text-lg">
              Enter your email to reset your password.
            </a>

            <form onSubmit={handleSubmit} className="w-80">
              <div className="font-chakra text-neutral-white mb-6 text-2xl">
                <div className="mb-8">
                  <label className="mb-2 block">Email</label>
                  <GlobalInput
                    type="email"
                    size="lg"
                    className="w-full text-xl"
                    placeholder="example@gmail.com"
                    isInvalid={email == "" ? false : isEmailInvalid}
                    isValid={email == "" ? false : !isEmailInvalid}
                    hintText={
                      email == ""
                        ? ""
                        : isEmailInvalid
                          ? "Email should look like name@example.com"
                          : "Email looks valid"
                    }
                    onChange={(e) => setEmail(e.target.value)}
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
                    {cooldown > 0 ? `Wait ${cooldown}s` : "Send email"}
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
