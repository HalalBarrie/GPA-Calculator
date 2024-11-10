import React from 'react';
import { SemesterData } from '../../types';

interface SemesterListProps {
  semesters: SemesterData[];
  activeSemesterId: string;
  onSemesterSelect: (semesterId: string) => void;
}

export const SemesterList: React.FC<SemesterListProps> = ({
  semesters,
  activeSemesterId,
  onSemesterSelect,
}) => {
  return (
    <div className="p-4 space-y-2">
      {semesters.map((semester) => (
        <button
          key={semester.id}
          onClick={() => onSemesterSelect(semester.id)}
          className={`w-full p-4 rounded-lg transition-all ${
            activeSemesterId === semester.id
              ? 'bg-indigo-50 border-2 border-indigo-200'
              : 'hover:bg-gray-50 border-2 border-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-left font-medium text-gray-800">
                {semester.name.split(' - ')[0] || 'Unknown Semester'}
              </h3>
              <p className="text-sm text-gray-500">
                {semester.courses.length} Courses • GPA: {semester.gpa}
              </p>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              semester.name.includes('First') ? 'bg-green-400' : 'bg-blue-400'
            }`} />
          </div>
        </button>
      ))}
    </div>
  );
};