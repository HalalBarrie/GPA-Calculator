import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { SemesterData } from '../types';

interface GPATrendsProps {
  semesters: SemesterData[];
  isWeighted: boolean;
}

export const GPATrends: React.FC<GPATrendsProps> = ({ semesters, isWeighted }) => {
  // Sort semesters chronologically
  const sortedSemesters = [...semesters].sort((a, b) => {
    const [semA, yearA] = a.name.split(' - ');
    const [semB, yearB] = b.name.split(' - ');
    
    if (yearA !== yearB) {
      return yearA.localeCompare(yearB);
    }
    return semA.includes('First') ? -1 : 1;
  });

  const data = sortedSemesters.map(semester => ({
    name: semester.name,
    semesterGPA: parseFloat(semester.gpa),
    cumulativeGPA: calculateCumulativeGPA(
      sortedSemesters.slice(0, sortedSemesters.indexOf(semester) + 1),
      isWeighted
    )
  }));

  const maxGPA = isWeighted ? 15 : 4.0;

  function calculateCumulativeGPA(semesters: SemesterData[], isWeighted: boolean): number {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        const points = isWeighted 
          ? course.credits * (course.grade === 'A' ? 15 : course.grade === 'B' ? 12 : course.grade === 'C' ? 9 : course.grade === 'D' ? 6 : 0)
          : course.credits * (course.grade === 'A' ? 4.0 : course.grade === 'B' ? 3.0 : course.grade === 'C' ? 2.0 : course.grade === 'D' ? 1.0 : 0);
        totalPoints += points;
        totalCredits += course.credits;
      });
    });

    return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(isWeighted ? 4 : 2));
  }

  if (data.length === 0) {
    return (
      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">GPA Trends</h2>
        </div>
        <p className="text-gray-600 text-center py-8">
          No semester data available yet. Save your calculations to see GPA trends.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">GPA Trends</h2>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, maxGPA]}
              ticks={isWeighted ? [0, 3, 6, 9, 12, 15] : [0, 1, 2, 3, 4]}
            />
            <Tooltip 
              formatter={(value: number) => [
                isWeighted ? value.toFixed(4) : value.toFixed(2),
                'GPA'
              ]}
            />
            <Legend />
            <Line 
              name="Semester GPA"
              type="monotone" 
              dataKey="semesterGPA" 
              stroke="#4f46e5" 
              strokeWidth={2}
              dot={{ fill: '#4f46e5', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line 
              name="Cumulative GPA"
              type="monotone" 
              dataKey="cumulativeGPA" 
              stroke="#059669" 
              strokeWidth={2}
              dot={{ fill: '#059669', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        Showing progression across {data.length} semester{data.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};