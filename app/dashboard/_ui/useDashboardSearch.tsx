"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useDashboardSearch = (
  initialSearch: string,
  fetchTasks: (query: string) => void
) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const submitSearch = () => {
    if (!searchTerm.trim()) return;

    router.push(`/dashboard?search=${encodeURIComponent(searchTerm)}`);
    fetchTasks(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    fetchTasks("");
    router.push(`/dashboard`);
  };

  return {
    searchTerm,
    setSearchTerm,
    submitSearch,
    clearSearch,
  };
};
