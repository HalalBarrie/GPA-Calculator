import { Course } from '../types';
import { GPACalculator } from './GPACalculator';

const calculator = new GPACalculator();

export function calculateGPA(courses: Course[], isWeighted: boolean): string {
  const result = calculator.calculate(courses, isWeighted);
  return result.gpa.toFixed(isWeighted ? 4 : 2);
}

export function calculateProjectedGPA(
  currentGPA: number,
  currentCredits: number,
  newCourses: Course[],
  isWeighted: boolean
): string {
  const result = calculator.calculateProjected(currentGPA, currentCredits, newCourses, isWeighted);
  return result.gpa.toFixed(isWeighted ? 4 : 2);
}

export function getGPADifference(currentGPA: string, projectedGPA: string, isWeighted: boolean): string {
  const diff = parseFloat(projectedGPA) - parseFloat(currentGPA);
  return isWeighted ? diff.toFixed(4) : diff.toFixed(2);
}

export function getGPATrend(oldGPA: number, newGPA: number): 'up' | 'down' | 'same' {
  const difference = newGPA - oldGPA;
  const threshold = 0.001; // Small threshold to account for floating-point precision

  if (Math.abs(difference) < threshold) return 'same';
  return difference > 0 ? 'up' : 'down';
}

export function getGPAColor(gpa: number, isWeighted: boolean): string {
  const maxGPA = isWeighted ? 15 : 4.0;
  const percentage = (gpa / maxGPA) * 100;

  if (percentage >= 93) return 'text-emerald-500 dark:text-emerald-400';
  if (percentage >= 85) return 'text-blue-500 dark:text-blue-400';
  if (percentage >= 77) return 'text-yellow-500 dark:text-yellow-400';
  if (percentage >= 70) return 'text-orange-500 dark:text-orange-400';
  return 'text-red-500 dark:text-red-400';
}