"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import Navbar from "@/components/navbar/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Invalid Email or Password");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4">
        <div className="p-6 sm:p-8 w-full max-w-lg mt-10">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <InputField
              label="Email"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              type="email"
              value={email}
            />

            <PasswordField
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              showPasswordCriteria={false}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-2.5 font-medium hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm mt-2">
              <a
                href="/forgot-password"
                className="text-primary-600 hover:underline"
              >
                Forgot password?
              </a>
            </p>
          </form>

          <p className="text-center text-sm mt-6 text-gray-700">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-primary-600 hover:underline font-medium"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
