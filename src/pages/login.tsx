import { useState } from "react";
import { useRouter } from "next/router";

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

  const mockLogin = async (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "admin") {
          resolve("admin");
        } else if (username === "notadmin" && password === "1234") {
          resolve("valid");
        } else {
          reject("Wrong username or password");
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      AppToast.error("Both username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const result = await mockLogin(username, password);
      if (result === "admin") {
        AppToast.success("Welcome, Admin");
        router.push("/admin/report");
      } else {
        AppToast.success("Login successful");
        router.push("/course");
      }
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
                    hasHintText={true}
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
                    hasHintText={true}
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
                <a href="/reset-password" className="">
                  Forgot Password?
                </a>
                <a href="/register" className="">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </GlassContainer>
      </div>
    </AuthLayout>
  );
}
