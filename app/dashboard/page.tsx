"use client";

import { useEffect, useState, type DragEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import TaskCard from "@/components/TaskCard";
import SearchBar from "@/components/SearchBar";
import { useTasks } from "@/hooks/useTasks";

import { Task, TaskStatus } from "@/types/task";

const columns: { status: TaskStatus; title: string; description: string }[] = [
  { status: "pending", title: "To Do", description: "New tasks" },
  {
    status: "in-progress",
    title: "In Progress",
    description: "Work in progress",
  },
  { status: "completed", title: "Completed", description: "Finished tasks" },
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
  const searchParams = useSearchParams();

  // Read URL search once on page load
  const initialQuery = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(() => initialQuery);

  // Get tasks + manual fetch
  const { tasks, loading, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks(initialQuery);
  }, []);

  // Search handler
  const handleSearchSubmit = () => {
    router.push(`/dashboard?search=${encodeURIComponent(searchTerm)}`);
    fetchTasks(searchTerm); // fetch only when user submits
  };

  // UI task states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedOverStatus, setDraggedOverStatus] = useState<TaskStatus | null>(
    null
  );

  const selectedTaskId = selectedTask?.id;

  // Sync selected task if tasks list updates
  useEffect(() => {
    if (!selectedTaskId) return;
    const fresh = tasks.find((t) => t.id === selectedTaskId);
    if (fresh) setSelectedTask(fresh);
  }, [tasks, selectedTaskId]);

  // Drag & Drop Handlers
  const handleCardDragStart = (taskId: string) => setDraggedTaskId(taskId);
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
    if (!task) return;

    if (task.status !== targetStatus) {
      const confirmed = window.confirm(
        `Move "${task.title}" from ${formatStatusLabel(
          task.status
        )} to ${formatStatusLabel(targetStatus)}?`
      );

      if (confirmed) {
        // Optional updateTaskStatus here if you have the API
        console.log("Update status here");
      }
    }

    setDraggedTaskId(null);
    setDraggedOverStatus(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <p>Loading tasks...</p>
      </div>
    );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tasks efficiently.</p>
          </div>

          <button
            onClick={() => router.push("/add")}
            className="btn-primary rounded-none"
          >
            + Add Task
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearchSubmit}
          placeholder="Search tasks..."
        />

        {/* Task Count */}
        <p className="text-sm text-gray-600">Showing {tasks.length} tasks</p>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter((t) => t.status === column.status);

            const isDragActive = draggedOverStatus === column.status;

            return (
              <div
                key={column.status}
                className={`flex flex-col rounded-xl border bg-slate-50 p-4 transition-colors ${
                  isDragActive
                    ? "border-primary-400 bg-primary-50"
                    : "border-slate-200"
                }`}
                onDrop={(e) => handleDrop(e, column.status)}
                onDragOver={handleDragOver}
                onDragEnter={() => setDraggedOverStatus(column.status)}
                onDragLeave={() => setDraggedOverStatus(null)}
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
                        onDragStart={() => handleCardDragStart(task.id)}
                        onDragEnd={handleCardDragEnd}
                        onSelect={() => {}}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}
