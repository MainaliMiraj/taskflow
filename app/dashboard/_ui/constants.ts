import { TaskStatus } from "@/types/task";

export const TASK_COLUMNS: {
  status: TaskStatus;
  title: string;
  description: string;
}[] = [
  { status: "pending", title: "Pending", description: "New tasks" },
  {
    status: "in-progress",
    title: "In Progress",
    description: "Work in progress",
  },
  { status: "completed", title: "Completed", description: "Finished tasks" },
];
