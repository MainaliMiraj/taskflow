"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useTasks } from "@/context/TaskContext";
import { TaskFilters, TaskSortOptions } from "@/types/task";
import TaskCard from "@/components/TaskCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import SortControls from "@/components/SortControls";

export default function Dashboard() {
  const router = useRouter();

  const { tasks, deleteTask, changeTaskStatus, filterTasks, sortTasks } =
    useTasks();

  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortOptions, setSortOptions] = useState<TaskSortOptions>({
    sortBy: "dueDate",
    sortOrder: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks({ ...filters, searchTerm });
    return sortTasks(filtered, sortOptions);
  }, [tasks, filters, searchTerm, sortOptions, filterTasks, sortTasks]);

  const handleStatusFilterChange = (
    status?: "Todo" | "In Progress" | "Done"
  ) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handlePriorityFilterChange = (priority?: "Low" | "Medium" | "High") => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleStatusChange = (id: string) => {
    changeTaskStatus(id);
  };

  const handleAddTask = () => {
    router.push("/add");
  };

  const hasActiveFilters = filters.status || filters.priority || searchTerm;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className="text-3xl font-bold text-gray-900"
            data-testid="dashboard-title"
          >
            Task Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your tasks efficiently with filters and sorting
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by title or description..."
            />
          </div>
          <div className="sm:w-64">
            <SortControls
              sortOptions={sortOptions}
              onSortChange={setSortOptions}
            />
          </div>
        </div>

        <FilterBar
          statusFilter={filters.status}
          priorityFilter={filters.priority}
          onStatusChange={handleStatusFilterChange}
          onPriorityChange={handlePriorityFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
          {hasActiveFilters && " (filtered)"}
        </p>
      </div>

      {/* Tasks Grid */}
      {filteredAndSortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600 mb-4">
            {hasActiveFilters
              ? "Try adjusting your filters or search terms"
              : "Get started by creating your first task"}
          </p>
          {!hasActiveFilters && (
            <button
              onClick={handleAddTask}
              className="btn-primary"
              data-testid="create-first-task"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
