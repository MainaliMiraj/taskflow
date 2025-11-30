"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password strength checker
  const checkStrength = (password: string) => {
    if (password.length < 8) return "Too Weak";

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (strongRegex.test(password)) return "Strong";
    if (mediumRegex.test(password)) return "Good";
    return "Weak";
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      setError(
        "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long."
      );
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-300 mt-1 outline-none transition"
              placeholder="Enter your username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-300 mt-1 outline-none transition"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password + Toggle */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-300 mt-1 outline-none transition"
                placeholder="Create a password"
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setPasswordStrength(checkStrength(val));
                }}
              />

              <div
                className="absolute right-3 top-5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Strength Meter */}
            {password && (
              <p
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Good"
                    ? "text-blue-600"
                    : passwordStrength === "Weak"
                    ? "text-orange-500"
                    : "text-red-600"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
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
  );
}
