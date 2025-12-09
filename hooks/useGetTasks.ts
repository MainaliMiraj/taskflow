"use client";

import { useState } from "react";

export function useGetTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (search: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/tasks?search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      console.log({
        tasks1: data.tasks,
      })
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    fetchTasks,
  };
}
