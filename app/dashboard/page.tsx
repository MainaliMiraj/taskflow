"use client";

import { useEffect, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import TaskDetailsModal from "@/components/TaskDetailsModal";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { Task, TaskStatus } from "@/types/task";

const columns: { status: TaskStatus; title: string; description: string }[] = [
  {
    status: "pending",
    title: "To Do",
    description: "New and upcoming tasks",
  },
  {
    status: "in-progress",
    title: "In Progress",
    description: "Tasks currently being worked on",
  },
  {
    status: "completed",
    title: "Completed",
    description: "Recently finished tasks",
  },
];

const formatStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case "pending":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedOverStatus, setDraggedOverStatus] = useState<TaskStatus | null>(
    null
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const selectedTaskId = selectedTask?.id;

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

  const handleAddTask = () => router.push("/add");

  useEffect(() => {
    if (!selectedTaskId) return;
    const freshTask = tasks.find((task) => task.id === selectedTaskId);
    if (freshTask && freshTask !== selectedTask) {
      setSelectedTask(freshTask);
    }
  }, [tasks, selectedTask, selectedTaskId]);

  const handleCardDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleCardDragEnd = () => {
    setDraggedTaskId(null);
    setDraggedOverStatus(null);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    targetStatus: TaskStatus
  ) => {
    event.preventDefault();
    const transferId = event.dataTransfer.getData("text/plain");
    const taskId = draggedTaskId ?? transferId;
    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== targetStatus) {
      const fromLabel = formatStatusLabel(task.status);
      const toLabel = formatStatusLabel(targetStatus);
      const confirmed = window.confirm(
        `Move "${task.title}" from ${fromLabel} to ${toLabel}?`
      );
      if (confirmed) {
        updateTaskStatus(task.id, targetStatus);
      }
    }

    setDraggedTaskId(null);
    setDraggedOverStatus(null);
  };

  const handleDragEnter = (status: TaskStatus) => {
    if (!draggedTaskId) return;
    setDraggedOverStatus(status);
  };

  const handleDragLeave = (status: TaskStatus) => {
    if (draggedOverStatus === status) {
      setDraggedOverStatus(null);
    }
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => setSelectedTask(null);

  const handleEditTask = (taskId: string) => {
    router.push(`/edit/${taskId}`);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setSelectedTask(null);
  };

  const handleStatusUpdate = async (taskId: string, newStatus: TaskStatus) => {
    await updateTaskStatus(taskId, newStatus);
  };

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.status
            );
            const isDragActive = draggedOverStatus === column.status;

            return (
              <div
                key={column.status}
                className={`flex flex-col rounded-xl border bg-slate-50 p-4 transition-colors ${
                  isDragActive
                    ? "border-primary-400 bg-primary-50"
                    : "border-slate-200"
                }`}
                onDrop={(event) => handleDrop(event, column.status)}
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter(column.status)}
                onDragLeave={() => handleDragLeave(column.status)}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {column.title}
                    </h2>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600">
                      {columnTasks.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{column.description}</p>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
                      Drag a task here
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        draggable
                        onDragStart={handleCardDragStart}
                        onDragEnd={handleCardDragEnd}
                        onSelect={handleTaskSelect}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={handleCloseModal}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusUpdate}
          onEdit={handleEditTask}
        />
      )}
    </div>
  );
}
