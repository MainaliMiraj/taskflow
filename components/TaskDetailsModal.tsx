"use client";

import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "@/types/task";

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEdit: (taskId: string) => void;
}

const STATUS_DETAILS: { value: TaskStatus; label: string; helper: string }[] = [
  { value: "pending", label: "To Do", helper: "Plan and prioritize" },
  {
    value: "in-progress",
    label: "In Progress",
    helper: "Currently being worked on",
  },
  {
    value: "completed",
    label: "Completed",
    helper: "Finished and ready to archive",
  },
];

export default function TaskDetailsModal({
  task,
  onClose,
  onDelete,
  onStatusChange,
  onEdit,
}: TaskDetailsModalProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [task.id]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  const descriptionText =
    task.description || "No description provided for this task.";
  const shouldTruncate = descriptionText.length > 200;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-6 top-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mr-6">
          Status:
          <span className=" bg-primary-200 px-3 py-1 text-gray-600">
            {task.status.replace("-", " ")}
          </span>
        </div>
        <button
          className="absolute right-4 top-4 p-1 text-gray-500 transition hover:bg-slate-100 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close task details"
        >
          ✕
        </button>

        <div className="bg-gradient-to-br from-white via-primary-50/60 to-white px-8 pb-6 pt-10 sm:px-10">
          <p className="font-extrabold text-primary-600 text-xl">
            Task Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            {task.title}
          </h2>
          <div
            className={`mt-4 text-gray-600 transition-all bg-gray-100 p-2 ${
              isDescriptionExpanded
                ? "max-h-64 overflow-y-auto pr-2"
                : "max-h-24 overflow-hidden"
            }`}
          >
            {descriptionText}
          </div>
          {shouldTruncate && (
            <button
              className="mt-2 text-sm font-semibold text-primary-600 hover:text-primary-800"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              aria-expanded={isDescriptionExpanded}
            >
              {isDescriptionExpanded ? "See less" : "See more"}
            </button>
          )}
          <div className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Due date
              </p>
              <p className="font-medium text-gray-900">
                {formatDate(task.dueDate)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Created
              </p>
              <p className="font-medium text-gray-900">
                {formatDate(task.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Priority
              </p>
              <p className="font-medium text-gray-900">{task.priority}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white px-8 py-6 sm:px-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Update status
              </p>
              <p className="text-xs text-gray-500">
                Move the task to a new stage
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {STATUS_DETAILS.map(({ value, label, helper }) => {
              const isActive = task.status === value;
              return (
                <button
                  key={value}
                  onClick={() => onStatusChange(task.id, value)}
                  disabled={isActive}
                  className={`flex-1 min-w-[140px] border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-primary-200 bg-primary-50 text-primary-700"
                      : "border-slate-200 bg-white text-gray-700 hover:border-primary-200 hover:bg-primary-50/60"
                  }`}
                >
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="text-xs text-gray-500">{helper}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              className="w-full  border border-slate-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-400 sm:w-auto"
              onClick={() => onEdit(task.id)}
            >
              Edit Task
            </button>
            <button
              className="w-full  border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 sm:w-auto"
              onClick={handleDelete}
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
