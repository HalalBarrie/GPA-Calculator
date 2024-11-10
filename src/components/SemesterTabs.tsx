import React from 'react';
import { Plus } from 'lucide-react';
import { SemesterData } from '../types';

interface SemesterTabsProps {
  semesters: SemesterData[];
  activeSemester: string;
  onSemesterChange: (semesterId: string) => void;
  onAddSemester: () => void;
}

export const SemesterTabs: React.FC<SemesterTabsProps> = ({
  semesters,
  activeSemester,
  onSemesterChange,
  onAddSemester,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      {semesters.map((semester) => (
        <button
          key={semester.id}
          onClick={() => onSemesterChange(semester.id)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeSemester === semester.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-indigo-50'
          }`}
        >
          {semester.name}
          <span className="ml-2 text-sm opacity-75">
            ({semester.gpa})
          </span>
        </button>
      ))}
      <button
        onClick={onAddSemester}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Semester
      </button>
    </div>
  );
};