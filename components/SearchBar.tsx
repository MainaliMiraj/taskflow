"use client";

import { RxCross2 } from "react-icons/rx";
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onClear?: () => void; // optional clear handler
  placeholder?: string;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onClear,
  placeholder = "Search tasks...",
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearchSubmit();
  };

  return (
    <div className="relative flex items-center w-full gap-1">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="input-field w-full rounded-none pr-10" 
      />

      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
        >
          <RxCross2 className="w-5 h-5 mr-2"  />
        </button>
      )}

      <button
        onClick={onSearchSubmit}
        className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700"
      >
        Search
      </button>
    </div>
  );
}
