import { useState } from "react";
import { AppToast } from "@/lib/app-toast";
import { useRouter } from "next/router";
import { DefaultLayout, GlobalButton, GlobalInput } from "@/components/globalComponents";

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
      <div className="absolute flex flex-col min-h-[80vh] w-8/9 items-center justify-center bg-neutral-black/50 backdrop-blur-[10px] rounded-4xl shadow-[0_0_20px] shadow-neutral-white">
        <h3 className="absolute top-8 left-10 font-sanctuary text-xl lg:text-3xl xl:text-5xl text-neutral-white">Doodoung</h3>

        <h2 className="mb-6 font-sanctuary text-neutral-white text-[42px] lg:text-5xl xl:text-[64px]">Log in to DooDoung</h2>

        <form onSubmit={handleSubmit} className="w-80">
          <div className="mb-6 font-chakra text-base lg:text-xl xl:text-2xl text-neutral-white">
            <div className="mb-4">
              <label className="block mb-2">Username</label>
              <GlobalInput
                type="text"
                className="w-full text-sm lg:text-base xl:text-xl"
                placeholder="DooDoung"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="block mb-2">Password</label>
              <GlobalInput
                type="password"
                className="w-full text-sm lg:text-base xl:text-xl"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
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
              >Log in</GlobalButton></div>
          </div>

          <div className="flex justify-between font-chakra text-sm lg:text-base text-neutral-white">
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
