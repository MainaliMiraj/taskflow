"use client";

import { useRouter } from "next/navigation";
import AuthForm, { AuthFormValues } from "@/components/authComponent/AuthForm";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({
    name,
    email,
    password,
    setLoading,
  }: AuthFormValues) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(`/verify-otp?email=${email}`);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full margin-none ">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="p-8 w-3/4">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Welcome to Taskflow
            </h2>

            <AuthForm
              showNameField={true}
              submitLabel="Sign Up"
              onSubmit={handleRegister}
            />

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
          style={{ backgroundImage: "url('/login-img.webp')" }}
        ></div>
      </div>
    </div>
  );
}
