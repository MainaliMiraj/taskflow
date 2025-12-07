"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { TaskFormData, Task } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import toast from "react-hot-toast";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("params:", params);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      try {
        const res = await fetch(`/api/tasks/${taskId}`);
        if (!res.ok) throw new Error("Task not found");

        const data = await res.json();
        setCurrentTask(data.task);
      } catch (err) {
        console.error(err);
        setCurrentTask(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (formData: TaskFormData) => {
    const confirmed = confirm(`Confirm task update`);
    if (!confirmed) return;

    if (!taskId) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const data = await res.json();
      setCurrentTask(data.task);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirmed = confirm(
      `Are you sure you want to cancel? All changes will be lost.`
    );
    if (!confirmed) return;
    router.push("/dashboard");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div className="overflow-hidden rounded border border-slate-100 bg-white shadow-xl">
        <div className="bg-gradient-to-br from-white via-primary-50/60 to-white px-8 pb-6 pt-10 sm:px-12">
          <p className="text-sm font-medium text-primary-600">Task Overview</p>
          <h1
            className="mt-2 text-3xl font-semibold text-gray-900"
            data-testid="edit-task-title"
          >
            Edit Task
          </h1>
          <p className="mt-3 text-gray-600">
            Keep your task details up to date to stay aligned with your plan.
          </p>
        </div>

        <div className="border-t border-slate-100 bg-white px-6 py-8 sm:px-10">
          {isSubmitting && (
            <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
              <div className="flex items-center">
                <div className="mr-3 h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p className="text-sm font-medium text-blue-800">
                  Updating task...
                </p>
              </div>
            </div>
          )}

          <TaskForm
            task={currentTask!}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
