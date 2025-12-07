"use client";

import Navbar from "@/components/navbar/Navbar";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
    setLoading,
  }: AuthFormValues) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Invalid Email or Password");
        setLoading(false);
        return;
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4">
        <div className="p-6 sm:p-8 w-full max-w-lg mt-10">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Welcome Back 👋
          </h2>

          <AuthForm submitLabel="Login" onSubmit={handleLogin} />

          <p className="text-center text-sm mt-6 text-gray-700">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-primary-600 hover:underline font-medium"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
