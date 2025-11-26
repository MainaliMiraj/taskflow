"use client";

import { useState } from "react";

export default function ResetPasswordPage({ params }: any) {
  const { token } = params;
  const [password, setPassword] = useState("");
  const [changed, setChanged] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setChanged(true);
    } else {
      alert("Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create New Password 🔑
        </h2>

        {changed ? (
          <p className="text-center text-green-600">
            Password changed successfully. You can now log in.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 mt-1"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
