import { Task, TaskFormData, TaskStatus } from "@/types/task";

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; data: TaskFormData } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "CHANGE_STATUS"; payload: string };

export interface TaskState {
  tasks: Task[];
}

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload.data,
                updatedAt: new Date().toISOString(),
              }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "CHANGE_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload) return task;

          const newStatus: TaskStatus =
            task.status === "Todo"
              ? "In Progress"
              : task.status === "In Progress"
              ? "Done"
              : "Todo";

          return {
            ...task,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }),
      };

    default:
      return state;
  }
};
