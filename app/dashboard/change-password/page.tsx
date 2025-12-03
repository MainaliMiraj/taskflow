"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/ui/PasswordField";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
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

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4 mt-10">
      <div className="bg-white p-8 shadow-lg w-full max-w-md ">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordField
            label="Current Password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
            showPasswordCriteria={false}
          />
          <PasswordField
            label="New Password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            showPasswordCriteria={true}
          />

          <PasswordField
            label="Confirm New Password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            showPasswordCriteria={false}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2  hover:bg-primary-700 transition disabled:bg-gray-300"
          >
            {loading ? "Saving..." : "Change Password"}
          </button>

          <button
            type="button"
            className="w-full border-2 text-black py-2  hover:border-primary-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
