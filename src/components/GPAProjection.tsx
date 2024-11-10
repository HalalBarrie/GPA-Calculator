import React, { useState } from 'react';
import { Calculator, PlusCircle, MinusCircle } from 'lucide-react';
import { Course, standardGradePoints, weightedGradePoints } from '../types';
import { calculateProjectedGPA, getGPADifference, getGPAColor } from '../utils/gpaCalculations';

interface GPAProjectionProps {
  currentGPA: string;
  totalCredits: number;
  isWeighted: boolean;
}

interface ProjectedCourse {
  id: number;
  credits: number;
  grade: string;
}

export const GPAProjection: React.FC<GPAProjectionProps> = ({ 
  currentGPA, 
  totalCredits, 
  isWeighted 
}) => {
  const [projectedCourses, setProjectedCourses] = useState<ProjectedCourse[]>([
    { id: 1, credits: 3, grade: 'A' }
  ]);

  const addCourse = () => {
    setProjectedCourses(prev => [
      ...prev,
      { 
        id: Math.max(0, ...prev.map(c => c.id)) + 1,
        credits: 3,
        grade: 'A'
      }
    ]);
  };

  const removeCourse = (id: number) => {
    if (projectedCourses.length > 1) {
      setProjectedCourses(prev => prev.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof ProjectedCourse, value: string | number) => {
    setProjectedCourses(prev => 
      prev.map(course => course.id === id ? { ...course, [field]: value } : course)
    );
  };

  const projectedGPA = calculateProjectedGPA(
    currentGPA,
    totalCredits,
    projectedCourses as Course[],
    isWeighted
  );

  const gpaDiff = parseFloat(getGPADifference(currentGPA, projectedGPA, isWeighted));
  const totalProjectedCredits = projectedCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">GPA Projection</h2>
      </div>

      <div className="space-y-4 mb-6">
        {projectedCourses.map((course) => (
          <div key={course.id} className="flex gap-4 items-center">
            <select
              value={course.credits}
              onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value))}
              className="w-24 p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-200 
                       dark:focus:ring-indigo-400 focus:border-indigo-400 dark:focus:border-indigo-500"
            >
              {[1, 2, 3, 4, 5].map(credit => (
                <option key={credit} value={credit}>{credit} cr.</option>
              ))}
            </select>
            <select
              value={course.grade}
              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
              className="w-24 p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-200 
                       dark:focus:ring-indigo-400 focus:border-indigo-400 dark:focus:border-indigo-500"
            >
              {Object.entries(isWeighted ? weightedGradePoints : standardGradePoints)
                .map(([grade, points]) => (
                  <option key={grade} value={grade}>
                    {grade} ({points})
                  </option>
                ))}
            </select>
            {projectedCourses.length > 1 && (
              <button
                onClick={() => removeCourse(course.id)}
                className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                aria-label="Remove course"
              >
                <MinusCircle className="w-6 h-6" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addCourse}
        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 
                 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mb-6"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add Course</span>
      </button>

      <div className="bg-indigo-50 dark:bg-gray-700/50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{currentGPA}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{totalCredits} Credits</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Projected</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{projectedGPA}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +{totalProjectedCredits} Credits
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">GPA Change</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-lg font-semibold ${getGPAColor(gpaDiff)} dark:opacity-90`}>
              {gpaDiff > 0 ? '+' : ''}{gpaDiff.toFixed(isWeighted ? 4 : 2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ({totalCredits + totalProjectedCredits} Total Credits)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};