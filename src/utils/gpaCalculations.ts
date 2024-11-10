import { Course, SemesterData } from '../types';
import {
  calculateGPA,
  calculateProjectedGPA,
  getGPADifference,
  getGPAColor,
  getGPATrend
} from './gradeCalculator';

export {
  calculateGPA,
  calculateProjectedGPA,
  getGPADifference,
  getGPAColor,
  getGPATrend
};

export function calculateSemesterGPA(semester: SemesterData, isWeighted: boolean): string {
  return calculateGPA(semester.courses, isWeighted);
}

export function calculateCumulativeGPA(semesters: SemesterData[], isWeighted: boolean): string {
  const allCourses = semesters.reduce<Course[]>((acc, semester) => [
    ...acc,
    ...semester.courses
  ], []);
  
  return calculateGPA(allCourses, isWeighted);
}

export function analyzeSemesterPerformance(semester: SemesterData, isWeighted: boolean) {
  const gpa = parseFloat(calculateSemesterGPA(semester, isWeighted));
  const totalCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0);
  const courseCount = semester.courses.length;
  
  return {
    gpa,
    totalCredits,
    courseCount,
    color: getGPAColor(gpa, isWeighted)
  };
}

export function calculateAcademicProgress(semesters: SemesterData[], isWeighted: boolean) {
  return semesters.map((semester, index) => {
    const currentGPA = parseFloat(calculateSemesterGPA(semester, isWeighted));
    const previousGPA = index > 0 
      ? parseFloat(calculateSemesterGPA(semesters[index - 1], isWeighted))
      : currentGPA;
    
    return {
      semester: semester.name,
      gpa: currentGPA,
      trend: getGPATrend(previousGPA, currentGPA),
      analysis: analyzeSemesterPerformance(semester, isWeighted)
    };
  });
}