"use client";

import { useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { TaskStatus } from "@/types/task";

export default function Dashboard() {
  const router = useRouter();

  const {
    tasks,
    loading,
    deleteTask,
    updateTaskStatus,
    getFilteredAndSortedTasks,
  } = useTasks();

  const {
    filters,
    sortOptions,
    searchTerm,
    setSortOptions,
    setSearchTerm,
    handleStatusChange,
    handlePriorityChange,
    handleClear,
  } = useTaskFilters();

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  const filteredTasks = getFilteredAndSortedTasks(
    filters,
    debouncedSearchTerm,
    sortOptions
  );

  const hasActiveFilters = filters.status || filters.priority || searchTerm;
  const statusCycle: TaskStatus[] = ["pending", "in-progress", "completed"];

  const handleAddTask = () => router.push("/add");

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <p>Loading tasks...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <div>
          <button
            onClick={handleAddTask}
            className="btn-primary rounded-none"
            data-testid="add-task-button"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Search + Sort + Filter */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by title or description..."
            />
          </div>
        </div>

        <FilterBar
          statusFilter={filters.status}
          priorityFilter={filters.priority}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onClearFilters={handleClear}
        />
      </div>

      {/* Task count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
          {hasActiveFilters && " (filtered)"}
        </p>
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
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
              className="btn-primary rounded-none"
              data-testid="create-first-task"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const nextStatus =
              statusCycle[
                (statusCycle.indexOf(task.status) + 1) % statusCycle.length
              ];

            return (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => deleteTask(task.id)}
                onStatusChange={() => updateTaskStatus(task.id, nextStatus)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
