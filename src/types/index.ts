export interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
  semester?: string;
}

export interface CourseDetail extends Course {
  points: number;
}

export interface GPAResult {
  gpa: number;
  totalPoints: number;
  totalCreditHours: number;
  details: CourseDetail[];
}

export interface SavedCalculation {
  id: string;
  timestamp: number;
  courses: Course[];
  gpa: string;
  isWeighted: boolean;
  semester?: string;
}

export interface SemesterData {
  id: string;
  name: string;
  courses: Course[];
  gpa: string;
}

export interface GradeScale {
  letter: string;
  points: number;
  minPercentage?: number;
}

export interface GPAAnalysis {
  gpa: number;
  totalCredits: number;
  courseCount: number;
  color: string;
}

export interface AcademicProgress {
  semester: string;
  gpa: number;
  trend: 'up' | 'down' | 'same';
  analysis: GPAAnalysis;
}

export const standardGradePoints: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export const weightedGradePoints: Record<string, number> = {
  'A+': 15, 'A': 15, 'A-': 14,
  'B+': 13, 'B': 12, 'B-': 11,
  'C+': 10, 'C': 9,  'C-': 8,
  'D+': 7,  'D': 6,  'D-': 5,
  'F': 0
};