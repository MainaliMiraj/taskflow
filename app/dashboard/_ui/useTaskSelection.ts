import { useEffect, useState } from "react";
import { Task } from "@/types/task";

export const useTaskSelection = (tasks: Task[]) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!selectedTask) return;

    const updatedTask = tasks.find((t) => t.id === selectedTask.id);
    if (updatedTask) {
      setSelectedTask(updatedTask);
    }
  }, [tasks, selectedTask]);

  return {
    selectedTask,
    setSelectedTask,
  };
};
