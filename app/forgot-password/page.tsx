"use client";

import Link from "next/link";
import {useForgotPassword} from "@/hooks/useForgotPassword";
import {RxArrowLeft} from "react-icons/rx";
import NavBar from "@/components/navbar/Navbar";

export default function ForgotPassword() {

    const {handleSubmit, setEmail, loading, email} = useForgotPassword()

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center bg-gray-100 px-4 mt-12">
                <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Reset Password
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="text-md text-primary-600"
                            >
                                Email:
                            </label>

                            <input
                                autoComplete={"email"}
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 mt-1"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value.trim())}
                            />
                        </div>

                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span
                                        className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/>
                                    Sending...
                                </div>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>

                        <Link
                            href="/login"
                            className="text-primary-600 hover:underline text-md hover:text-primary-800"
                        >
                            <div className="flex flex-row items-center gap-1 cursor-pointer mt-3">
                                <RxArrowLeft className="text-md leading-none mt-1"/>
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    </form>

                </div>
            </div>
        </>

    );
}
