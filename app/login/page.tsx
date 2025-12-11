"use client";

import Navbar from "@/components/navbar/Navbar";
import AuthForm from "@/components/authComponent/AuthForm";
import {useLogin} from "@/hooks/useLogin";
import Link from "next/link";


export default function LoginPage() {
    const {handleLogin} = useLogin();
    return (
        <div>
            <Navbar/>
            <div className="flex items-center justify-center px-4">
                <div className="p-6 sm:p-8 w-full max-w-lg mt-10">
                    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        Welcome Back 👋
                    </h2>

                    <AuthForm submitLabel="Login" onSubmit={handleLogin}/>

                    <p className="text-center text-sm mt-6 text-gray-700">
                        Don’t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            Create one
                        </Link>
                    </p>

                    <p className="text-center text-sm mt-2 text-gray-700">
                        Forgot?
                        <Link
                            href="/forgot-password"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            {" "}Reset Password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
