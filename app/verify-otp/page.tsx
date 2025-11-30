"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Join OTP and submit
  const handleVerify = async () => {
    setError("");

    if (otp.some((d) => d === "")) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    const finalOtp = otp.join("");
    setLoading(true);

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp: finalOtp }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      alert("Account verified successfully!");
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.message || "Verification failed.");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center px-4 h-screen bg-gray-50">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>

          {/* OTP INPUT BOXES */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 border border-gray-300 text-center text-xl rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2  hover:bg-primary-700 transition disabled:bg-gray-300"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* RESEND OTP placeholder */}
          <p className="text-sm mt-4 text-gray-600">
            Didn’t receive the code?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
