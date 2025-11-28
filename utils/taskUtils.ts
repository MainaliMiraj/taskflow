import { Task } from "@/types/task";

// -------------------- FILTER TASKS --------------------
export function filterTasks(
  tasks: Task[],
  filters: { status?: string; priority?: string },
  searchTerm: string
) {
  let result = [...tasks];

  if (filters.status) {
    result = result.filter((t) => t.status === filters.status);
  }

  if (filters.priority) {
    result = result.filter((t) => t.priority === filters.priority);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term)
    );
  }

  return result;
}

// -------------------- SORT TASKS --------------------
export function sortTasks(
  tasks: Task[],
  sortBy: keyof Task,
  sortOrder: "asc" | "desc"
) {
  const result = [...tasks];

  result.sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    // Special handling for priority sorting (High > Medium > Low)
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
      bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return result;
}
