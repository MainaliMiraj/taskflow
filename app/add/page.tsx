"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import { TaskFormData } from "@/types/task";
import TaskForm from "@/components/TaskForm";

export default function AddTaskPage() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: TaskFormData) => {
    setIsSubmitting(true);

    try {
      addTask(formData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-gray-900"
          data-testid="add-task-title"
        >
          Add New Task
        </h1>
        <p className="text-gray-600 mt-2">
          Create a new task to manage your workflow
        </p>
      </div>

      {/* Form Container */}
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

      {/* Help Text */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Tips:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Title is required and should be descriptive</li>
          <li>• Description is optional but helps provide context</li>
          <li>• Set appropriate priority to organize your work</li>
          <li>• Choose a realistic due date to stay on track</li>
        </ul>
      </div>
    </div>
  );
}

