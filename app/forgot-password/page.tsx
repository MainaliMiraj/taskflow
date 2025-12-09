"use client";

import Link from "next/link";
import {useForgotPassword} from "@/hooks/useForgotPassword";

export default function ForgotPassword() {

const { handleSubmit, setEmail, loading } = useForgotPassword()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mt-1"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:underline text-center"
            >
              Back to Login
            </Link>
          </form>
      </div>
    </div>
  );
}
