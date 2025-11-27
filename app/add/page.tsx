"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskFormData } from "@/types/task";
import TaskForm from "@/components/TaskForm";

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
      console.log("error adding the task", error);
      alert(
        error.message ||
          "There was an error creating the task. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-primary-700"
          data-testid="add-task-title"
        >
          Add New Task
        </h1>
        <p className="text-primary-800 mt-2">
          Create a new task to manage your workflow
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {isSubmitting && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              <p className="text-blue-800">Creating task...</p>
            </div>
          </div>
        )}

        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Create Task"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-primary-700 mb-2">
          Quick Tips:
        </h3>
        <ul className="text-sm text-primary-900 space-y-1">
          <li>• Title is required and should be descriptive</li>
          <li>• Description is requited provide context</li>
          <li>• Set appropriate priority to organize your work</li>
          <li>• Choose a realistic due date to stay on track</li>
        </ul>
      </div>
    </div>
  );
}
