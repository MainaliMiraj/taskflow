import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between ">
            <div className="flex items-center">
                <div>
                    <Link href={"/"}>
                        <Image src="/icon.png" width={50} height={50} alt="brand-logo"/>
                    </Link>
                </div>
                <Link href={"/"}>
          <span
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </span>
                </Link>
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
    );
}
