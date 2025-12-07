"use client";

import { useState } from "react";
import { Task, TaskPriority } from "@/types/task";
import type { DragEvent } from "react";

interface TaskCardProps {
  task: Task;
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>, id: string) => void; 
  onDragEnd?: () => void;
  onSelect?: (task: Task) => void;
}

export default function TaskCard({
  task,
  draggable = false,
  onDragStart,
  onDragEnd,
  onSelect,
}: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
    onDragStart?.(e, task.id); // UPDATED
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  const handleSelect = () => {
    if (isDragging) return;
    onSelect?.(task);
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg"
      data-testid={`task-card-${task.id}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleSelect}
    >
      <div
        className="absolute right-4 top-4 h-16 w-16 bg-primary-200/80 blur-3xl transition-opacity group-hover:opacity-80"
        aria-hidden
      />
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <h3
          data-testid={`task-title-${task.id}`}
          className="text-black text-2xl"
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-2 capitalize"></div>
        Created: {formatDate(task.createdAt)}
      </div>

      <div className="mt-3">
        {task.description && (
          <p
            className="mt-1 text-sm text-gray-600 line-clamp-2"
            data-testid={`task-description-${task.id}`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityColor(
            task.priority
          )}`}
          data-testid={`task-priority-${task.id}`}
        >
          {task.priority} priority
        </span>
        <span data-testid={`task-created-date-${task.id}`}>
          Due: {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
}
