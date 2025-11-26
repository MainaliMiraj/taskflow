'use client';

import { TaskPriority, TaskStatus } from '@/types/task';

interface FilterBarProps {
  statusFilter?: TaskStatus;
  priorityFilter?: TaskPriority;
  onStatusChange: (status?: TaskStatus) => void;
  onPriorityChange: (priority?: TaskPriority) => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}: FilterBarProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TaskStatus | '';
    onStatusChange(value || undefined);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TaskPriority | '';
    onPriorityChange(value || undefined);
  };

  const hasActiveFilters = statusFilter || priorityFilter;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={statusFilter || ''}
            onChange={handleStatusChange}
            className="select-field w-full"
            data-testid="status-filter"
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Priority
          </label>
          <select
            id="priority-filter"
            value={priorityFilter || ''}
            onChange={handlePriorityChange}
            className="select-field w-full"
            data-testid="priority-filter"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex space-x-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="btn-secondary"
              data-testid="clear-filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}