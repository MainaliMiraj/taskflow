"use client";
import { useEffect, useState, useRef } from "react";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image src="/icon.png" width={50} height={50} alt="TaskFlow Logo" />
            <span className="text-xl font-semibold text-primary-800">
              Task Flow
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow border transition"
              aria-label="Profile menu"
            >
              <span
                onClick={() => setOpen(!open)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white font-semibold hover:scale-105 transition-all"
              >
                {user ? user.name[0].toUpperCase() : "U"}
                {open && (
                  <div className="absolute mt-24 w-48 bg-white shadow-lg border border-gray-200  z-50 rounded-full">
                    <button
                      onClick={() => {
                        setOpen(false);
                        router.push("/dashboard/update-password");
                      }}
                      className="w-full text-left px-4 py-2 rounded-full hover:bg-indigo-600 text-gray-700 hover:text-white"
                    >
                      Update password
                    </button>
                  </div>
                )}
              </span>
              <div className="text-left mr-2">
                <p className="text-sm font-medium text-gray-900">
                  {user
                    ? user.name[0].toUpperCase() + user.name.slice(1)
                    : "Loading..."}
                </p>
                <p className="text-xs text-gray-500">
                  {user ? user.email : "..."}
                </p>
              </div>
              <div onClick={handleLogout}>
                <TbLogout className="ml-4 h-6 w-6 hover:text-primary-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
