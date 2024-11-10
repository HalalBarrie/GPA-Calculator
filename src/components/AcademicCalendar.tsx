import React, { useState, useCallback } from 'react';
import { SemesterData } from '../types';
import { CalendarHeader } from './calendar/CalendarHeader';
import { YearNavigation } from './calendar/YearNavigation';
import { SemesterList } from './calendar/SemesterList';
import { groupSemestersByYear } from '../utils/calendar';

interface AcademicCalendarProps {
  semesters: SemesterData[];
  onSemesterSelect: (semesterId: string) => void;
  activeSemesterId: string;
  onAddSemester: () => void;
}

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({
  semesters,
  onSemesterSelect,
  activeSemesterId,
  onAddSemester,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isExpanded, setIsExpanded] = useState(false);

  const semestersByYear = groupSemestersByYear(semesters);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    const firstSemesterOfYear = semesters.find(sem => {
      const yearParts = sem.name.split(' - ')[1]?.split('/');
      return yearParts && parseInt(yearParts[0]) === year;
    });
    if (firstSemesterOfYear) {
      onSemesterSelect(firstSemesterOfYear.id);
    }
  }, [semesters, onSemesterSelect]);

  return (
    <div className="mb-8">
      <CalendarHeader
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        onAddSemester={onAddSemester}
      />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <YearNavigation
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />

        {isExpanded && semestersByYear[selectedYear] && (
          <SemesterList
            semesters={semestersByYear[selectedYear]}
            activeSemesterId={activeSemesterId}
            onSemesterSelect={onSemesterSelect}
          />
        )}
      </div>
    </div>
  );
};