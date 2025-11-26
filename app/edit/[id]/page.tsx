"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import { TaskFormData } from "@/types/task";
import TaskForm from "@/components/TaskForm";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const { tasks, updateTask, getTask } = useTasks();
  const [currentTask, setCurrentTask] = useState<TaskFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskId) {
      const task = getTask(taskId);
      if (task) {
        setCurrentTask({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
        });
      }
      setIsLoading(false);
    }
  }, [taskId, getTask]);

  const handleSubmit = async (formData: TaskFormData) => {
    setIsSubmitting(true);

    try {
      updateTask(taskId, formData);
      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentTask) {
    return (
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Task Not Found
        </h3>
        <p className="text-gray-600 mb-4">
          The task you're looking for doesn't exist or has been deleted.
        </p>
        <button
          onClick={handleCancel}
          className="btn-primary"
          data-testid="back-to-dashboard"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-gray-900"
          data-testid="edit-task-title"
        >
          Edit Task
        </h1>
        <p className="text-gray-600 mt-2">
          Update the details of your existing task
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {isSubmitting && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              <p className="text-blue-800">Updating task...</p>
            </div>
          </div>
        )}

        <TaskForm
          task={tasks.find((t) => t.id === taskId)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Save Changes"
        />
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Editing Tips:
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• You can update any field except the task ID</li>
          <li>• The updated timestamp will be set automatically</li>
          <li>• Use status changes to track progress</li>
          <li>• Adjust priority as requirements change</li>
        </ul>
      </div>
    </div>
  );
}
