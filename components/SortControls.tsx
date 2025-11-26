'use client';

import { TaskSortOptions } from '@/types/task';

interface SortControlsProps {
  sortOptions: TaskSortOptions;
  onSortChange: (options: TaskSortOptions) => void;
}

export default function SortControls({ sortOptions, onSortChange }: SortControlsProps) {
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange({
      ...sortOptions,
      sortBy: e.target.value as TaskSortOptions['sortBy'],
    });
  };

  const handleSortOrderChange = () => {
    onSortChange({
      ...sortOptions,
      sortOrder: sortOptions.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
          Sort by
        </label>
        <select
          id="sort-by"
          value={sortOptions.sortBy}
          onChange={handleSortByChange}
          className="select-field"
          data-testid="sort-by-select"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created Date</option>
        </select>
      </div>

      <div className="pt-6">
        <button
          onClick={handleSortOrderChange}
          className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100"
          data-testid="sort-order-button"
        >
          {sortOptions.sortOrder === 'asc' ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 13l-5 5m0 0l-5-5m5 5V6"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}