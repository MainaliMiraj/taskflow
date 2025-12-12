"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyOtpContent() {
    const router = useRouter();
    const email = useSearchParams().get("email");

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!email) router.replace("/register");
    }, [email, router]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleVerify = async () => {

        if (otp.includes("")) {
            return setError("Please enter the full 6-digit code.");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, otp: otp.join("")}),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Verification failed.");
                setError(data.message || "Verification failed.");
                setLoading(false)
                return;
            }

            toast.success("Verification complete. Please login.");
            router.push("/login");
        } catch (err) {
            setError("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center px-4  mt-12">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>
                <p className="text-gray-600 text-sm mb-6">
                    Enter the 6-digit code sent to <strong>{email}</strong>
                </p>

                <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            id={`otp-${idx}`}
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, idx)}
                            className="w-12 h-12 border border-gray-300 text-center text-xl rounded-md
              focus:ring-2 focus:ring-indigo-500"
                        />
                    ))}
                </div>

                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-2 hover:bg-primary-700 transition disabled:bg-gray-300"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="text-sm mt-4 text-gray-600">
                    Didn’t receive the code?{" "}
                    <span className="text-indigo-600 cursor-pointer hover:underline">
            Resend OTP
          </span>
                </p>
            </div>
        </div>
    );
}
