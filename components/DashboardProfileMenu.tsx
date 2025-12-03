"use client";

import { useState, useRef, useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function DashboardProfileMenu({ user }: { user: any }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow border transition">
        <span
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-700"
        >
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </span>

        <div className="text-left mr-2">
          <p className="text-sm font-medium text-gray-900">
            {user?.name || "Loading..."}
          </p>
          <p className="text-xs text-gray-500">{user?.email || "..."}</p>
        </div>

        {/* Logout button */}
        <TbLogout
          onClick={handleLogout}
          className="ml-4 h-6 w-6 hover:text-primary-600 cursor-pointer"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/dashboard/change-password");
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}
