import React from 'react';
import { Calculator } from 'lucide-react';
import { Course, standardGradePoints, weightedGradePoints } from '../types';

interface GPADisplayProps {
  courses: Course[];
  isWeighted: boolean;
}

export const GPADisplay: React.FC<GPADisplayProps> = ({ courses, isWeighted }) => {
  // Function to calculate GPA based on the courses and grading scale
  const calculateGPA = () => {
    const gradePoints = isWeighted ? weightedGradePoints : standardGradePoints;

    // Return "0.00" if there are no courses
    if (courses.length === 0) return "0.00";

    let totalPoints = 0;
    let totalCredits = 0;

    // Calculate total points and total credits
    courses.forEach(course => {
      const points = gradePoints[course.grade as keyof typeof gradePoints];
      if (isWeighted) {
        totalPoints += points; // Add points directly for weighted GPA
      } else {
        totalPoints += points * course.credits; // Multiply by credits for standard GPA
      }
      totalCredits += course.credits; // Accumulate total credits
    });

    // Calculate and return the GPA
    return totalCredits > 0 
      ? (totalPoints / totalCredits).toFixed(isWeighted ? 4 : 2)
      : "0.00"; // Return "0.00" if total credits are zero
  };

  // Function to determine the color class based on GPA value
  const getGPAColor = () => {
    const gpa = parseFloat(calculateGPA());
    const maxGPA = isWeighted ? 15 : 4.0;

    if (gpa >= maxGPA * 0.9) return 'text-green-500 dark:text-green-400';
    if (gpa >= maxGPA * 0.8) return 'text-blue-500 dark:text-blue-400';
    if (gpa >= maxGPA * 0.7) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">
          Your GPA ({isWeighted ? '15-Point Scale' : '4.0 Scale'})
        </h2>
      </div>
      <div className={`mt-3 text-4xl font-bold ${getGPAColor()}`}>
        {calculateGPA()}
      </div>
      <p className="mt-2 text-sm text-indigo-100 dark:text-indigo-200">
        {isWeighted 
          ? 'Sum of grade points (A=15, B=12, etc.) divided by total credits'
          : 'Weighted by credit hours (A=4.0, B=3.0, etc.)'}
      </p>
    </div>
  );
};