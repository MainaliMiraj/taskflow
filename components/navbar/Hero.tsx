import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { ReactTyped } from "react-typed";

const TYPED_STRINGS = [
  "Effortlessly.",
  "With ease.",
  "Like a pro.",
  "In seconds.",
];

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-20 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <FaCheckCircle />
          <span>Helps with your daily Tasks Management.</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Manage Your Tasks
          <br />
          <span className="bg-gradient-to-r from-primary-700 to-primary-400 bg-clip-text text-transparent">
            <ReactTyped
              strings={TYPED_STRINGS}
              typeSpeed={80}
              backSpeed={60}
              backDelay={1200}
              loop
            />
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-600 leading-relaxed">
          A simple and smart task manager to help you stay organised, productive
          and focused. Manage your tasks anywhere, anytime.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group px-8 py-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
          >
            Get Started Free
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/login"
            className="px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-200 transition-all duration-300 hover:border-blue-600 hover:text-blue-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
