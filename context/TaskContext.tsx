"use client";

import { createContext, useContext, useReducer } from "react";
import { taskReducer, TaskState } from "../reducer/taskReducer";
import { Task, TaskFormData, TaskFilters, TaskSortOptions } from "@/types/task";

interface TaskContextProps {
  tasks: Task[];
  addTask: (data: TaskFormData) => Task;
  updateTask: (id: string, data: TaskFormData) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  changeTaskStatus: (id: string) => void;
  filterTasks: (filters: TaskFilters) => Task[];
  sortTasks: (tasks: Task[], options: TaskSortOptions) => Task[];
}

const TaskContext = createContext<TaskContextProps | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: TaskState = { tasks: [] };
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  const addTask = (data: TaskFormData): Task => {
    const newTask: Task = {
      id: generateId(),
      ...data,
      description: data.description || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
    return newTask;
  };

  const updateTask = (id: string, data: TaskFormData) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, data } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const getTask = (id: string) => {
    return state.tasks.find((task) => task.id === id);
  };

  const changeTaskStatus = (id: string) => {
    dispatch({ type: "CHANGE_STATUS", payload: id });
  };

  const filterTasks = (filters: TaskFilters) => {
    return state.tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;

      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();

        if (
          !task.title.toLowerCase().includes(term) &&
          !task.description?.toLowerCase().includes(term)
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const sortTasks = (tasks: Task[], options: TaskSortOptions) => {
    const sorted = [...tasks];

    sorted.sort((a, b) => {
      let A: number;
      let B: number;

      switch (options.sortBy) {
        case "dueDate":
          A = new Date(a.dueDate).getTime();
          B = new Date(b.dueDate).getTime();
          break;

        case "priority":
          const priorityMap = { High: 3, Medium: 2, Low: 1 };
          A = priorityMap[a.priority];
          B = priorityMap[b.priority];
          break;

        case "createdAt":
          A = new Date(a.createdAt).getTime();
          B = new Date(b.createdAt).getTime();
          break;

        default:
          return 0;
      }

      return options.sortOrder === "asc" ? A - B : B - A;
    });

    return sorted;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        updateTask,
        deleteTask,
        getTask,
        changeTaskStatus,
        filterTasks,
        sortTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};
