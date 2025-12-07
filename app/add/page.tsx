"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskFormData } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import toast from "react-hot-toast";

export default function AddTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: TaskFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "There was an error creating the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen px-4 py-10 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden  border border-slate-100 shadow-xl backdrop-blur">
          <div className="bg-gradient-to-br from-white/80 via-primary-50/50 to-white/70 px-8 pb-6 pt-10 sm:px-12 backdrop-blur-sm">
            <p className="text-sm font-medium text-primary-600">
              Task Overview
            </p>
            <h1
              className="mt-2 text-3xl font-semibold text-gray-900"
              data-testid="add-task-title"
            >
              Create New Task
            </h1>
            <p className="mt-3 text-gray-600">
              Capture the essentials so your team knows what to prioritize.
            </p>
          </div>

          <div className="border-t border-slate-100 bg-white/80 px-6 py-8 sm:px-10 backdrop-blur-sm">
            {isSubmitting && (
              <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="flex items-center">
                  <div className="mr-3 h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  <p className="text-sm font-medium text-blue-800">
                    Creating task...
                  </p>
                </div>
              </div>
            )}

            <TaskForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText="Create Task"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
