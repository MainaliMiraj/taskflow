"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // -------------------------
  // PASSWORD STRENGTH LOGIC
  // -------------------------
  const evaluateStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";
    if (score === 4) return "Strong";
    return "Very Strong";
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setStrength(evaluateStrength(value));
  };

  // -------------------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (!strongPasswordRegex.test(newPassword)) {
      setError(
        "Password must be min 8 chars and include uppercase, lowercase, number & special character."
      );
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    setLoading(false);

    const data = await res.json();

    if (res.ok) {
      alert("Password updated successfully. Please login again.");
      router.push("/login");
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  const handleCancel= () => {
    router.push("/dashboard");
  };

  // Helper for strength colors
  const getStrengthColor = () => {
    switch (strength) {
      case "Weak":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Strong":
        return "text-blue-600";
      case "Very Strong":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg  w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CURRENT PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                required
                className="w-full px-4 py-2 mt-1 border  pr-10"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                className="w-full px-4 py-2 mt-1 border  pr-10"
                onChange={(e) => handleNewPasswordChange(e.target.value)}
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <p className={`text-sm mt-1 font-medium ${getStrengthColor()}`}>
                Strength: {strength}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                className="w-full px-4 py-2 mt-1 border  pr-10"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2  hover:bg-primary-700 transition disabled:bg-gray-300"
          >
            {loading ? "Saving..." : "Change Password"}
          </button>
          <button
            className="w-full border-2 text-black py-2  hover:bg-primary-600  hover:text-white transition disabled:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
