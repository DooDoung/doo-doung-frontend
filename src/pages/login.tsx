import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";

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
      toast.error("Both username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const result = await mockLogin(username, password);
      if (result === "admin") {
        toast.success("Welcome, Admin");
        router.push("/admin/report");
      } else {
        toast.success("Login successful");
        router.push("/course");
      }
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit} className="w-80">
          <h1 className="text-center text-2xl font-semibold">Login</h1>

          <div className="mb-4">
            <label className="block text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between text-sm">
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
