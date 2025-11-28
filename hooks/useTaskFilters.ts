import { useState } from "react";
import { TaskFilters, TaskSortOptions } from "@/types/task";

export function useTaskFilters() {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortOptions, setSortOptions] = useState<TaskSortOptions>({
    sortBy: "dueDate",
    sortOrder: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------- FILTER HANDLERS --------------------
  const handleStatusChange = (
    status?: "pending" | "in-progress" | "completed"
  ) => setFilters((prev) => ({ ...prev, status }));

  const handlePriorityChange = (priority?: "Low" | "Medium" | "High") =>
    setFilters((prev) => ({ ...prev, priority }));

  const handleClear = () => {
    setFilters({});
    setSearchTerm("");
  };

  return {
    filters,
    sortOptions,
    searchTerm,
    setSortOptions,
    setSearchTerm,
    handleStatusChange,
    handlePriorityChange,
    handleClear,
  };
}
