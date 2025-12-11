import { useState, DragEvent } from "react";
import { Task, TaskStatus } from "@/types/task";

export const useTaskDragDrop = (
  tasks: Task[],
  fetchTasks: (query: string) => void,
  searchTerm: string
) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedOverStatus, setDraggedOverStatus] = useState<TaskStatus | null>(
    null
  );

  const onDragStart = (event: DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    event.dataTransfer.setData("text/plain", taskId);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = () => {
    setDraggedTaskId(null);
    setDraggedOverStatus(null);
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = async (
    event: DragEvent<HTMLDivElement>,
    targetStatus: TaskStatus
  ) => {
    event.preventDefault();

    const transferId = event.dataTransfer.getData("text/plain");
    const taskId = draggedTaskId ?? transferId;
    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === targetStatus) return;

    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: targetStatus }),
    });

    fetchTasks(searchTerm);
    setDraggedTaskId(null);
    setDraggedOverStatus(null);
  };

  return {
    draggedTaskId,
    draggedOverStatus,
    setDraggedOverStatus,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  };
};
