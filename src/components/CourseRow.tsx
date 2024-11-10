import React from 'react';
import { MinusCircle } from 'lucide-react';
import { Course, standardGradePoints, weightedGradePoints } from '../types';

interface CourseRowProps {
  course: Course;
  onUpdate: (id: number, field: keyof Course, value: string | number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
  isWeighted: boolean;
}

export const CourseRow: React.FC<CourseRowProps> = ({ 
  course, 
  onUpdate, 
  onRemove,
  canRemove,
  isWeighted
}) => {
  const gradePoints = isWeighted ? weightedGradePoints : standardGradePoints;

  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        placeholder="Course Name"
        value={course.name}
        onChange={(e) => onUpdate(course.id, 'name', e.target.value)}
        className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 
                 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 
                 focus:border-indigo-400 dark:focus:border-indigo-500 
                 placeholder-gray-400 dark:placeholder-gray-500"
      />
      <select
        value={course.credits}
        onChange={(e) => onUpdate(course.id, 'credits', parseInt(e.target.value))}
        className="w-24 p-2 border rounded-lg bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 
                 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 
                 focus:border-indigo-400 dark:focus:border-indigo-500"
      >
        {[1, 2, 3, 4, 5].map(credit => (
          <option key={credit} value={credit}>{credit} cr.</option>
        ))}
      </select>
      <select
        value={course.grade}
        onChange={(e) => onUpdate(course.id, 'grade', e.target.value)}
        className="w-24 p-2 border rounded-lg bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 
                 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 
                 focus:border-indigo-400 dark:focus:border-indigo-500"
      >
        {Object.entries(gradePoints).map(([grade, points]) => (
          <option key={grade} value={grade}>
            {grade} ({points})
          </option>
        ))}
      </select>
      {canRemove && (
        <button
          onClick={() => onRemove(course.id)}
          className="text-red-500 dark:text-red-400 hover:text-red-600 
                   dark:hover:text-red-300 transition-colors"
          aria-label="Remove course"
        >
          <MinusCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};