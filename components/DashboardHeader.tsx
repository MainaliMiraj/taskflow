"use client";

import { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaTasks } from "react-icons/fa";

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-30 mb-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <FaTasks className="text-indigo-600 text-xl" />
          <span className="text-xl font-semibold text-indigo-800">
            Task Flow
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 shadow border hover:bg-gray-200 transition"
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
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul>
                  <li>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Settings
                    </button>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Help
                    </button>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 border-t">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
