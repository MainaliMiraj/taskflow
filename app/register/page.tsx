"use client";

import AuthForm from "@/components/authComponent/AuthForm";
import {useRegister} from "@/hooks/useRegister";
import NavBar from "@/components/navbar/Navbar";

export default function RegisterPage() {
    const {handleRegister} = useRegister();

    return (
        <>
            <NavBar/>
            <div className="flex items-center justify-center mt-12 ">
                <div className="p-8 w-1/3">
                    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        Welcome to Taskflow
                    </h2>

                    <AuthForm
                        showNameField={true}
                        submitLabel="Sign Up"
                        onSubmit={handleRegister}/>

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
        </>
    );
}
