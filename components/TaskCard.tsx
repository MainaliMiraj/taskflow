'use client';

import { Task, TaskPriority, TaskStatus } from '@/types/task';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string) => void;
}

export default function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  const router = useRouter();

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Todo':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEdit = () => {
    router.push(`/edit/${task.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleStatusChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange(task.id);
  };

  return (
    <div 
      className="task-card hover:scale-[1.02] cursor-pointer"
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 
          className="text-lg font-semibold text-gray-900 pr-4"
          data-testid={`task-title-${task.id}`}
        >
          {task.title}
        </h3>
        <div className="flex space-x-2 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors"
            data-testid={`edit-task-${task.id}`}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
            data-testid={`delete-task-${task.id}`}
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p 
          className="text-gray-600 mb-4 text-sm leading-relaxed"
          data-testid={`task-description-${task.id}`}
        >
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
          data-testid={`task-priority-${task.id}`}
        >
          {task.priority} Priority
        </span>
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
          data-testid={`task-status-${task.id}`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span data-testid={`task-due-date-${task.id}`}>
          Due: {formatDate(task.dueDate)}
        </span>
        <span data-testid={`task-created-date-${task.id}`}>
          Created: {formatDate(task.createdAt)}
        </span>
      </div>

      <button
        onClick={handleStatusChange}
        className="w-full bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 border border-primary-200"
        data-testid={`change-status-${task.id}`}
      >
        Change Status
      </button>
    </div>
  );
}