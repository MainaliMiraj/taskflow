import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { filterTasks, sortTasks } from "@/utils/taskUtils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------- FETCH TASKS --------------------
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();

        // Normalize _id → id
        const normalizedTasks = data.tasks.map(({ _id, ...rest }: any) => ({
          id: _id,
          ...rest,
        }));

        setTasks(normalizedTasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // -------------------- DELETE TASK --------------------
  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // -------------------- UPDATE TASK STATUS --------------------
  const updateTaskStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updatedTaskFromBackend = await res.json();

    // Normalize _id → id
    const updatedTask = {
      ...updatedTaskFromBackend,
      id: updatedTaskFromBackend._id,
    };

    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

  // -------------------- FILTER + SORT --------------------
  const getFilteredAndSortedTasks = (
    filters: any,
    searchTerm: string,
    sortOptions: any
  ) => {
    const filtered = filterTasks(tasks, filters, searchTerm);
    return sortTasks(filtered, sortOptions.sortBy, sortOptions.sortOrder);
  };

  return {
    tasks,
    loading,
    deleteTask,
    updateTaskStatus,
    getFilteredAndSortedTasks,
    setTasks,
  };
}
