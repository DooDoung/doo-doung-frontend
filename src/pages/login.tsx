import { useState } from "react";
import { useRouter } from "next/router";

import {
  DefaultLayout,
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
    <DefaultLayout
      includeFooter={false}
      includeHeader={false}
      contentClassName="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-black to-neutral-dark"
    >
      <div className="bg-neutral-black/50 shadow-neutral-white absolute flex min-h-[80vh] w-8/9 flex-col items-center justify-center rounded-4xl shadow-[0_0_20px] backdrop-blur-[10px]">
        <h3 className="font-sanctuary text-neutral-white absolute top-8 left-10 text-5xl">
          Doodoung
        </h3>

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
            <a href="/resetpassword" className="">
              Forgot Password?
            </a>
            <a href="/register" className="">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
