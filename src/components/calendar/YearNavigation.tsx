import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface YearNavigationProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

interface YearOption {
  value: number;
  label: string;
}

export const YearNavigation: React.FC<YearNavigationProps> = ({
  selectedYear,
  onYearChange,
}) => {
  // Generate initial years array centered around the selected year
  const initialYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const range = 2;
    const start = Math.min(currentYear - range, selectedYear - range);
    const end = Math.max(currentYear + range, selectedYear + range);
    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    ).sort((a, b) => b - a);
  }, [selectedYear]);

  const [years, setYears] = useState<number[]>(initialYears);

  // Format year options with academic year display
  const yearOptions = useMemo<YearOption[]>(() => 
    years.map(year => ({
      value: year,
      label: `${year}/${year + 1} Academic Year`
    }))
  , [years]);

  // Handle navigation between years
  const handleYearChange = useCallback((direction: 'prev' | 'next') => {
    const newYear = direction === 'prev' ? selectedYear - 1 : selectedYear + 1;
    
    setYears(prevYears => {
      if (!prevYears.includes(newYear)) {
        const updatedYears = [...prevYears, newYear].sort((a, b) => b - a);
        return updatedYears;
      }
      return prevYears;
    });
    
    onYearChange(newYear);
  }, [selectedYear, onYearChange]);

  // Handle direct year selection from dropdown
  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value, 10);
    onYearChange(year);
  }, [onYearChange]);

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <NavigationButton
        direction="prev"
        onClick={() => handleYearChange('prev')}
      />
      
      <select
        value={selectedYear}
        onChange={handleSelectChange}
        className="px-4 py-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white"
      >
        {yearOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      
      <NavigationButton
        direction="next"
        onClick={() => handleYearChange('next')}
      />
    </div>
  );
};

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const label = direction === 'prev' ? 'Previous Year' : 'Next Year';

  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-gray-600" />
    </button>
  );
};