import React from 'react';
import { Layers, Calendar } from 'lucide-react';

interface SemesterSelectProps {
  currentSemester: string;
  onSemesterChange: (semester: string) => void;
  disabled?: boolean;
}

export const SemesterSelect: React.FC<SemesterSelectProps> = ({
  currentSemester,
  onSemesterChange,
  disabled = false
}) => {
  const [semester, year] = currentSemester.split(' - ');
  const currentYear = new Date().getFullYear();

  const handleSemesterChange = (newSemester: string) => {
    onSemesterChange(`${newSemester} - ${year}`);
  };

  const handleYearChange = (newYear: string) => {
    onSemesterChange(`${semester} - ${newYear}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 min-w-[200px]">
        <Layers className="w-5 h-5 text-indigo-600" />
        <select
          value={semester}
          onChange={(e) => handleSemesterChange(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 disabled:bg-gray-50 disabled:text-gray-500"
        >
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
        </select>
      </div>

      <div className="flex items-center gap-3 min-w-[200px]">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <select
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 disabled:bg-gray-50 disabled:text-gray-500"
        >
          {Array.from({ length: 5 }, (_, i) => currentYear + i - 2).map((year) => (
            <option key={year} value={`${year}/${year + 1}`}>
              {year}/{year + 1} Academic Year
            </option>
          ))}
        </select>
      </div>
      
      {disabled && (
        <p className="text-sm text-gray-500 italic">
          Complete current calculation before changing semester
        </p>
      )}
    </div>
  );
};