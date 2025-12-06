export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}
