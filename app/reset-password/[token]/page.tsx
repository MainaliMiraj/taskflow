"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [changed, setChanged] = useState(false);
  const [showing, setShowing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setChanged(true);
    } else {
      toast.error("Something went wrong. Please try again after some time.");
    }
  };
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create New Password
        </h2>

        {changed ? (
          <>
            <div className="text-center text-green-600">
              Password changed successfully.
              <button
                onClick={handleLogin}
                className="underline hover:text-primary-600 cursor-pointer"
              >
                Click here to login
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Enter your new Password:
              </label>

              <div className="relative">
                <input
                  type={showing ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 mt-1 pr-10"
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowing(!showing)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showing ? "hide" : "show"}
                </button>
              </div>
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
