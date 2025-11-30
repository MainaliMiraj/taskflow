"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaTasks, FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <header className="absolute top-0 left-0 right-0 z-10">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <FaTasks className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <div>
            <Link
              href="/login"
              className="text-black  font-medium transition border-2 hover:border-indigo-700  px-8 py-3 hover:text-indigo-700"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className=" font-medium ml-8 bg-indigo-600 py-3 px-8 text-white hover:bg-indigo-700 "
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FaCheckCircle />
            <span>Helps with your daily Tasks Management.</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your Tasks
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A simple and smart task manager to help you stay organised,
            productive and focused. Manage your tasks anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4  font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Get Started Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="bg-white text-gray-900 px-8 py-4 font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
