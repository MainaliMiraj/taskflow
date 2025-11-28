"use client";
import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-30 ">
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
                {user ? user.name[0].toUpperCase() : "U"}
              </span>
              <div className="text-left mr-2">
                <p className="text-sm font-medium text-gray-900">
                  {user ? user.name : "Loading..."}
                </p>
                <p className="text-xs text-gray-500">
                  {user ? user.email : "..."}
                </p>
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
