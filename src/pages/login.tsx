import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import {
  AuthLayout,
  GlassContainer,
  GlobalButton,
  GlobalInput,
} from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      AppToast.error("Both username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        AppToast.error("Invalid username or password");
        return;
      }

      if (result?.ok) {
        AppToast.success("Login successful");
        router.push("/");
      }
    } catch (err: any) {
      AppToast.error(`An error occurred during login ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center">
        <GlassContainer>
          <div className="absolute -mt-26 -ml-10 flex h-full w-full flex-col items-center justify-center">
            <h2 className="font-sanctuary text-neutral-white mb-6 text-[64px]">
              Log in to DooDoung
            </h2>

            <form onSubmit={handleSubmit} className="w-80">
              <div className="font-chakra text-neutral-white mb-6 text-2xl">
                <div className="mb-4">
                  <label className="mb-2 block">Username</label>
                  <GlobalInput
                    type="text"
                    size="lg"
                    className="w-full text-xl"
                    placeholder="DooDoung"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-2 block">Password</label>
                  <GlobalInput
                    type="password"
                    size="lg"
                    className="w-full text-xl"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
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
                    Log in
                  </GlobalButton>
                </div>
              </div>

              <div className="font-chakra text-neutral-white flex justify-between text-base">
                <Link href="/reset-password" className="">
                  Forgot Password?
                </Link>
                <Link href="/register" className="">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </GlassContainer>
      </div>
    </AuthLayout>
  );
}
