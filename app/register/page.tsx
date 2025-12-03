"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/ui/PasswordField";

import InputField from "@/components/ui/InputField";
export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    if (res.ok) {
      router.push(`/verify-otp?email=${email}`);
    } else {
      setError("User already exists or registration failed.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full margin-none ">
        <div className="flex items-center justify-center  bg-gray-100 ">
          <div className="p-8 w-3/4">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Welcome to Taskflow
            </h2>

            {error && (
              <p className="text-red-600 text-center mb-4 text-sm">{error}</p>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <InputField
                label="Username"
                id="username"
                required
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputField
                label="Email"
                id="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordField
                label="Password"
                id="password"
                required
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordCriteria={true}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-2.5  font-medium hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary-600 hover:underline font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <div
          className="hidden md:block h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url('/login-img.webp')",
          }}
        ></div>
      </div>
    </div>
  );
}
