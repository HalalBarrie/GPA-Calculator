import React, { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Course, SemesterData, standardGradePoints, weightedGradePoints } from '../types';

interface CumulativeGPAProps {
  semesters: SemesterData[];
  isWeighted: boolean;
}

export const CumulativeGPA: React.FC<CumulativeGPAProps> = ({ semesters, isWeighted }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>(
    semesters.map(s => s.id)
  );

  const toggleSemester = (semesterId: string) => {
    setSelectedSemesters(prev => 
      prev.includes(semesterId)
        ? prev.filter(id => id !== semesterId)
        : [...prev, semesterId]
    );
  };

  const calculateCumulativeGPA = (semesterIds: string[]) => {
    const gradePoints = isWeighted ? weightedGradePoints : standardGradePoints;
    let totalPoints = 0;
    let totalCredits = 0;

    semesters
      .filter(sem => semesterIds.includes(sem.id))
      .forEach(semester => {
        semester.courses.forEach(course => {
          const points = gradePoints[course.grade as keyof typeof gradePoints];
          if (isWeighted) {
            totalPoints += points;
          } else {
            totalPoints += points * course.credits;
          }
          totalCredits += course.credits;
        });
      });

    if (totalCredits === 0) return isWeighted ? "0.0000" : "0.00";
    const gpa = totalPoints / (isWeighted ? totalCredits : totalCredits);
    return isWeighted ? gpa.toFixed(4) : gpa.toFixed(2);
  };

  const getTotalCredits = (semesterIds: string[]) => {
    return semesters
      .filter(sem => semesterIds.includes(sem.id))
      .reduce((total, semester) => 
        total + semester.courses.reduce((sum, course) => sum + course.credits, 0)
      , 0);
  };

  const getGPAColor = () => {
    const gpa = parseFloat(calculateCumulativeGPA(selectedSemesters));
    const maxGPA = isWeighted ? 15 : 4.0;
    
    if (gpa >= maxGPA * 0.9) return 'text-emerald-500';
    if (gpa >= maxGPA * 0.8) return 'text-blue-500';
    if (gpa >= maxGPA * 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border-2 border-indigo-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Cumulative GPA
          </h2>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span className="text-sm">Hide Details</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span className="text-sm">Show Details</span>
            </>
          )}
        </button>
      </div>

      <div className={`text-4xl font-bold ${getGPAColor()}`}>
        {calculateCumulativeGPA(selectedSemesters)}
      </div>
      
      <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
        <span>{getTotalCredits(selectedSemesters)} Total Credits</span>
        <span>•</span>
        <span>{selectedSemesters.length} Semester{selectedSemesters.length !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{isWeighted ? '15-Point Scale' : '4.0 Scale'}</span>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Included Semesters:
          </div>
          {semesters.map(semester => (
            <label
              key={semester.id}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSemesters.includes(semester.id)}
                onChange={() => toggleSemester(semester.id)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">
                  {semester.name}
                </div>
                <div className="text-xs text-gray-500">
                  GPA: {semester.gpa} • {semester.courses.length} Courses
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};