"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import TaskCard from "@/components/TaskCard";
import TaskDetailsModal from "@/components/TaskDetailsModal";

// hooks
import { useTasks } from "@/hooks/useTasks";
import { useDashboardSearch } from "./useDashboardSearch";
import { useTaskSelection } from "./useTaskSelection";
import { useTaskDragDrop } from "./uesTaskDragDrop";

// constants
import { TASK_COLUMNS } from "./constants";
export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("search") || "";
  const { tasks, loading, fetchTasks } = useTasks();

  // Initial load
  useEffect(() => {
    fetchTasks(initialQuery);
  }, []);

  // Search Logic
  const { searchTerm, setSearchTerm, submitSearch, clearSearch } =
    useDashboardSearch(initialQuery, fetchTasks);

  // Modal
  const { selectedTask, setSelectedTask } = useTaskSelection(tasks);

  // Drag & Drop
  const {
    draggedOverStatus,
    setDraggedOverStatus,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  } = useTaskDragDrop(tasks, fetchTasks, searchTerm);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <p>Loading tasks...</p>
      </div>
    );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-gray-600 text-sm">
              Manage your tasks efficiently
            </p>
          </div>
          <button
            onClick={() => router.push("/add")}
            className="btn-primary rounded-none"
          >
            + Add Task
          </button>
        </div>

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={submitSearch}
          onClear={clearSearch}
          placeholder="Search tasks..."
        />

        {/* Counter */}
        <p className="text-sm text-gray-600">Showing {tasks.length} tasks</p>

        {/* Task Columns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TASK_COLUMNS.map((column) => {
            const columnTasks = tasks.filter((t) => t.status === column.status);
            const isActive = draggedOverStatus === column.status;

            return (
              <div
                key={column.status}
                className={`flex flex-col rounded-xl border p-4 transition-colors ${
                  isActive
                    ? "border-primary-400 bg-primary-50"
                    : "border-slate-200 bg-slate-50"
                }`}
                onDrop={(e) => onDrop(e, column.status)}
                onDragOver={onDragOver}
                onDragEnter={() => setDraggedOverStatus(column.status)}
                onDragLeave={() => {
                  if (draggedOverStatus === column.status)
                    setDraggedOverStatus(null);
                }}
              >
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {column.title}
                    </h2>
                    <span className="text-sm bg-white px-3 py-1 rounded-full border">
                      {columnTasks.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{column.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                  {columnTasks.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-6 bg-white text-gray-500 text-center">
                      Drag a task here
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        draggable
                        onDragStart={(e) => onDragStart(e, task.id)}
                        onDragEnd={onDragEnd}
                        onSelect={() => setSelectedTask(task)}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={() => setSelectedTask(null)}
          onStatusChange={() => fetchTasks(searchTerm)}
          onEdit={(taskId) => router.push(`/edit/${taskId}`)}
        />
      )}
    </Suspense>
  );
}
