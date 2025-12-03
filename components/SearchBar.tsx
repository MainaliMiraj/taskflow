"use client";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  placeholder?: string;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  placeholder = "Search tasks...",
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearchSubmit();
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="input-field w-full rounded-none"
      />

      <button
        onClick={onSearchSubmit}
        className="px-4 py-2 bg-primary-600 text-white  hover:bg-primary-700"
      >
        Search
      </button>
    </div>
  );
}
