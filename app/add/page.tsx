// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useTasks } from "@/context/TaskContext";
// import { TaskFormData } from "@/types/task";
// import TaskForm from "@/components/TaskForm";

// export default function AddTaskPage() {
//   const router = useRouter();
//   const { addTask } = useTasks();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (formData: TaskFormData) => {
//     setIsSubmitting(true);

//     try {
//       addTask(formData);
//       router.push("/");
//     } catch (error) {
//       console.error("Error adding task:", error);
//       alert("Failed to add task. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push("/");
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1
//           className="text-3xl font-bold text-gray-900"
//           data-testid="add-task-title"
//         >
//           Add New Task
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Create a new task to manage your workflow
//         </p>
//       </div>

//       {/* Form Container */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         {isSubmitting && (
//           <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
//               <p className="text-blue-800">Creating task...</p>
//             </div>
//           </div>
//         )}

//         <TaskForm
//           onSubmit={handleSubmit}
//           onCancel={handleCancel}
//           submitButtonText="Create Task"
//         />
//       </div>

//       {/* Help Text */}
//       <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Tips:</h3>
//         <ul className="text-sm text-gray-600 space-y-1">
//           <li>• Title is required and should be descriptive</li>
//           <li>• Description is optional but helps provide context</li>
//           <li>• Set appropriate priority to organize your work</li>
//           <li>• Choose a realistic due date to stay on track</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useTasks } from "@/context/TaskContext";
import { TaskFilters, TaskSortOptions } from "@/types/task";
import TaskCard from "@/components/TaskCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import SortControls from "@/components/SortControls";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status]);

  // your original dashboard code below ⬇️
  const { tasks, deleteTask, changeTaskStatus, filterTasks, sortTasks } =
    useTasks();

  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortOptions, setSortOptions] = useState<TaskSortOptions>({
    sortBy: "dueDate",
    sortOrder: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks({ ...filters, searchTerm });
    return sortTasks(filtered, sortOptions);
  }, [tasks, filters, searchTerm, sortOptions, filterTasks, sortTasks]);

  const handleStatusFilterChange = (
    status?: "Todo" | "In Progress" | "Done"
  ) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handlePriorityFilterChange = (priority?: "Low" | "Medium" | "High") => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleStatusChange = (id: string) => {
    changeTaskStatus(id);
  };

  const handleAddTask = () => {
    router.push("/add");
  };

  const hasActiveFilters = filters.status || filters.priority || searchTerm;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className="text-3xl font-bold text-gray-900"
            data-testid="dashboard-title"
          >
            Task Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your tasks efficiently with filters and sorting
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by title or description..."
            />
          </div>
          <div className="sm:w-64">
            <SortControls
              sortOptions={sortOptions}
              onSortChange={setSortOptions}
            />
          </div>
        </div>

        <FilterBar
          statusFilter={filters.status}
          priorityFilter={filters.priority}
          onStatusChange={handleStatusFilterChange}
          onPriorityChange={handlePriorityFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
          {hasActiveFilters && " (filtered)"}
        </p>
      </div>

      {/* Tasks Grid */}
      {filteredAndSortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600 mb-4">
            {hasActiveFilters
              ? "Try adjusting your filters or search terms"
              : "Get started by creating your first task"}
          </p>
          {!hasActiveFilters && (
            <button
              onClick={handleAddTask}
              className="btn-primary"
              data-testid="create-first-task"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
