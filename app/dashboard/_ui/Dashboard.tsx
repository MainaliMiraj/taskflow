"use client";

import {Suspense, useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import TaskCard from "@/components/TaskCard";

// hooks
import { useGetTasks } from "@/hooks/useGetTasks";
import { useDashboardSearch } from "./useDashboardSearch";
import { useTaskSelection } from "./useTaskSelection";
import { useTaskDragDrop } from "./uesTaskDragDrop";

// constants
import { TASK_COLUMNS } from "./constants";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";
import {useUpdateTasks} from "@/hooks/useUpdateTasks";
import TaskModal from "@/components/TaskModal";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("search") || "";
  const { tasks, loading, fetchTasks } = useGetTasks();
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add" | null>(null);

  // Initial load
  useEffect(() => {
    fetchTasks(initialQuery);
  }, []);

  // Search Logic
  const { searchTerm, setSearchTerm, submitSearch, clearSearch } = useDashboardSearch(initialQuery, fetchTasks);

  // Modal
  const { selectedTask, setSelectedTask } = useTaskSelection(tasks);
  const { handleSubmit, isSubmitting } = useUpdateTasks(fetchTasks);

  // Drag & Drop
  const {
    draggedOverStatus,
    setDraggedOverStatus,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  } = useTaskDragDrop(tasks, fetchTasks, searchTerm);

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
                onClick={() => {
                  setModalMode("add");
                  setSelectedTask(null);
                }}
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

                    {/* Content area */}
                    <div className="flex flex-col gap-4 min-h-[180px]">
                      {loading ? (
                          Array.from({ length: 4 }).map((_, i) => (
                              <TaskCardSkeleton key={i} />
                          ))
                      ) : columnTasks.length === 0 ? (
                          <div className="border-2 border-dashed rounded-lg p-6 bg-white text-gray-500 text-center select-none">
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
                                  onSelect={() => {
                                    setSelectedTask(task);
                                    setModalMode("view");
                                  }}
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
        {modalMode && (
            <TaskModal
                mode={modalMode}
                task={selectedTask}
                onClose={() => {
                  setSelectedTask(null);
                  setModalMode(null);
                }}
                onAdd={async (formData) => {
                  const newTask = await handleSubmit(null, formData, "add");
                  await fetchTasks(searchTerm);
                  setSelectedTask(newTask);
                  setModalMode("edit");
                  return newTask;
                }}
                onEdit={async (taskId, updatedTask) => {
                  await handleSubmit(taskId, updatedTask, "edit");
                  await fetchTasks(searchTerm);
                  setSelectedTask(prev => (prev ? { ...prev, ...updatedTask } : prev));

                }}
                onDelete={async (taskId) => {
                  await handleSubmit(taskId, undefined, "delete");
                  await fetchTasks(searchTerm);
                  setSelectedTask(null);
                  setModalMode(null);
                }}
                onStatusChange={async (taskId, newStatus) => {
                  await handleSubmit(taskId, { status: newStatus }, "edit");
                  await fetchTasks(searchTerm);
                  setSelectedTask(prev => {
                    if (!prev) return null;
                    return { ...prev, status: newStatus };
                  });

                }}
            />
        )}
      </Suspense>
  );
}
