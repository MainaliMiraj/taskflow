"use client";

import {useEffect, useState} from "react";
import type {Task, TaskPriority, TaskStatus} from "@/types/task";

interface TaskModalProps {
    task?: Task |null;
    mode: "view" | "edit" | "add";
    onClose: () => void;
    onDelete?: (taskId: string) => void;
    onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
    onAdd?: (formData: Partial<Task>) => Promise<Task>; // returns new task
    onEdit?: (taskId: string, updatedTask: Partial<Task>) => void;
}


export default function TaskModal({
                                      task,
                                      mode,
                                      onClose,
                                      onDelete,
                                      onAdd,
                                      onEdit,
                                  }: TaskModalProps) {
    const isAddMode = mode === "add";
    const [editMode, setEditMode] = useState(mode !== "view");

    const [formValues, setFormValues] = useState({
        title: task?.title || "",
        description: task?.description || "",
        dueDate: task?.dueDate || "",
        priority: (task?.priority as TaskPriority) || "Medium",
        status: (task?.status as TaskStatus) || "pending",
    });

    useEffect(() => {
        if (!task) return;
        setFormValues({
            title: task.title,
            description: task.description || "",
            dueDate: task.dueDate ? task.dueDate.slice(0, 16) : "",
            priority: task.priority,
            status: task.status,
        });
    }, [task]);


    const handleSave = async () => {
        if (isAddMode && onAdd) {
            const newTask = await onAdd(formValues);
            setEditMode(true);
            setFormValues({
                title: newTask.title,
                description: newTask.description || "",
                dueDate: newTask.dueDate,
                priority: newTask.priority,
                status: newTask.status,
            });
            setEditMode(false);
            return;
        }

        if (task && onEdit) {
            onEdit(task.id, formValues);
        }
        setEditMode(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    className="absolute right-4 top-4 p-1 text-gray-500 hover:bg-slate-100"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-white via-primary-50 to-white px-8 py-8">
                    <p className="font-extrabold text-primary-600 text-xl">
                        {isAddMode ? "Create Task" : "Task Overview"}
                    </p>

                    {/* Title */}
                    {editMode || isAddMode ? (
                        <input
                            className="mt-2 text-2xl font-semibold border p-2 w-full rounded"
                            value={formValues.title}
                            onChange={(e) =>
                                setFormValues((p) => ({...p, title: e.target.value}))
                            }
                            placeholder="Enter task title"
                        />
                    ) : (
                        <h2 className="mt-2 text-2xl font-semibold">{task?.title}</h2>
                    )}

                    {/* Description */}
                    <div className="mt-4 bg-gray-100 p-2">
                        {editMode || isAddMode ? (
                            <textarea
                                rows={4}
                                className="w-full border p-2 rounded"
                                placeholder="Write task details..."
                                value={formValues.description}
                                onChange={(e) =>
                                    setFormValues((p) => ({...p, description: e.target.value}))
                                }
                            />
                        ) : (
                            <p className="text-gray-600">
                                {task?.description || "No description provided."}
                            </p>
                        )}
                    </div>

                    {/* Fields */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs uppercase text-gray-400">Due Date</p>
                            <input
                                type="datetime-local"
                                disabled={!editMode && !isAddMode}
                                className="border p-2 rounded w-full"
                                value={formValues.dueDate}
                                onChange={(e) =>
                                    setFormValues((p) => ({...p, dueDate: e.target.value}))
                                }
                            />
                        </div>

                        <div>
                            <p className="text-xs uppercase text-gray-400">Priority</p>
                            <select
                                disabled={!editMode && !isAddMode}
                                className="border p-2 rounded w-full"
                                value={formValues.priority}
                                onChange={(e) =>
                                    setFormValues((p) => ({...p, priority: e.target.value as TaskPriority}))
                                }
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t bg-white px-8 py-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                        {isAddMode ? (
                            <>
                                <button
                                    className="border px-4 py-2"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-primary-600 text-white px-4 py-2"
                                    onClick={handleSave}
                                >
                                    Create Task
                                </button>
                            </>
                        ) : editMode ? (
                            <>
                                <button className="border px-4 py-2" onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                                <button className="bg-primary-600 text-white px-4 py-2" onClick={handleSave}>
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="border px-4 py-2" onClick={() => setEditMode(true)}>
                                    Edit Task
                                </button>
                                <button
                                    className="border bg-red-50 text-red-700 px-4 py-2"
                                    onClick={() => onDelete?.(task!.id)}
                                >
                                    Delete Task
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
