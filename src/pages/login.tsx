import { useState } from "react";
import { useRouter } from "next/router";

import { DefaultLayout } from "@/components/globalComponents";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
          reject("invalid");
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await mockLogin(username, password);
      if (result === "admin") {
        router.push("/admin/report");
      } else {
        router.push("/course");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-background flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-card text-card-foreground w-80 rounded-2xl p-8 shadow-md"
        >
          <h1 className="mb-6 text-center text-2xl font-semibold">Login</h1>

          <div className="mb-4">
            <label className="text-foreground mb-1 block text-sm">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-border text-foreground focus:ring-primary-250 w-full rounded-lg border p-2 focus:ring focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-foreground mb-1 block text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border text-foreground focus:ring-primary-250 w-full rounded-lg border p-2 focus:ring focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-error mb-4 text-center text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary-500 w-full rounded-lg py-2 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 flex justify-between text-sm">
            <a
              href="/resetpassword"
              className="text-accent-pink hover:underline"
            >
              Forgot Password?
            </a>
            <a href="/register" className="text-accent-violet hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
