import React from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

interface CalendarHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
  onAddSemester: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  isExpanded,
  onToggle,
  onAddSemester,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Academic Calendar</h2>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onAddSemester}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Semester
        </button>
        <button
          onClick={onToggle}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {isExpanded ? 'Collapse' : 'Expand'} Calendar
        </button>
      </div>
    </div>
  );
};