"use client";
import { FaTasks } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-30 mb-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <FaTasks className="text-primary-600 text-xl" />
          <span className="text-xl font-semibold text-primary-800">
            Task Flow
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow border transition"
              aria-label="Profile menu"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-700">
                MM
              </span>
              <div className="text-left mr-2">
                <p className="text-sm font-medium text-gray-900">
                  Miraj Mainali
                </p>
                <p className="text-xs text-gray-500">mm@gmail.com</p>
              </div>
              <div onClick={handleLogout}>
                <TbLogout className="ml-4 h-6 w-6 hover:text-primary-600" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
