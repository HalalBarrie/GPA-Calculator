export const getYearFromSemester = (semesterName: string): number | null => {
  try {
    const parts = semesterName.split(' - ');
    if (parts.length !== 2) return null;
    
    const yearParts = parts[1].split('/');
    if (yearParts.length !== 2) return null;
    
    const year = parseInt(yearParts[0]);
    return isNaN(year) ? null : year;
  } catch (error) {
    console.error('Error parsing semester year:', error);
    return null;
  }
};

export const groupSemestersByYear = (semesters: any[]) => {
  return semesters.reduce((acc, semester) => {
    const year = getYearFromSemester(semester.name);
    if (year !== null) {
      if (!acc[year]) acc[year] = [];
      acc[year].push(semester);
    }
    return acc;
  }, {} as Record<string, any[]>);
};

export const getUniqueYears = (semesters: any[]): number[] => {
  const years = Array.from(
    new Set(
      semesters
        .map(sem => getYearFromSemester(sem.name))
        .filter((year): year is number => year !== null)
    )
  ).sort((a, b) => b - a);

  if (years.length === 0) {
    years.push(new Date().getFullYear());
  }

  return years;
};