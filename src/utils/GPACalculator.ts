import { Course, CourseDetail, GPAResult, standardGradePoints, weightedGradePoints } from '../types';

export class GPACalculator {
  private validateInput(input: any[], type: string): void {
    if (!Array.isArray(input) || input.length === 0) {
      throw new Error(`${type} must be a non-empty array`);
    }
  }

  private calculatePoints(courses: Course[], isWeighted: boolean): number {
    const gradeScale = isWeighted ? weightedGradePoints : standardGradePoints;
    
    return courses.reduce((total, course) => {
      const points = gradeScale[course.grade];
      if (points === undefined) {
        throw new Error(`Invalid grade: ${course.grade}`);
      }
      return total + (points * course.credits);
    }, 0);
  }

  private sumCreditHours(courses: Course[]): number {
    return courses.reduce((sum, course) => {
      if (course.credits < 0) {
        throw new Error('Credit hours cannot be negative');
      }
      return sum + course.credits;
    }, 0);
  }

  calculate(courses: Course[], isWeighted: boolean): GPAResult {
    try {
      // Input validation
      this.validateInput(courses, 'Courses');

      // Calculate totals
      const totalPoints = this.calculatePoints(courses, isWeighted);
      const totalHours = this.sumCreditHours(courses);

      if (totalHours === 0) {
        throw new Error('Total credit hours cannot be zero');
      }

      // Generate course details
      const details = courses.map(course => ({
        ...course,
        points: (isWeighted ? weightedGradePoints : standardGradePoints)[course.grade]
      }));

      const gpa = totalPoints / totalHours;

      return {
        gpa: Number(gpa.toFixed(isWeighted ? 4 : 2)),
        totalPoints,
        totalCreditHours: totalHours,
        details
      };
    } catch (error) {
      console.error('GPA Calculation Error:', error);
      return {
        gpa: 0,
        totalPoints: 0,
        totalCreditHours: 0,
        details: []
      };
    }
  }

  calculateProjected(
    currentGPA: number,
    currentCredits: number,
    newCourses: Course[],
    isWeighted: boolean
  ): GPAResult {
    try {
      if (currentCredits < 0) {
        throw new Error('Current credits cannot be negative');
      }

      const currentPoints = currentGPA * currentCredits;
      const { totalPoints: newPoints, totalCreditHours: newCredits } = this.calculate(newCourses, isWeighted);
      
      const totalPoints = currentPoints + newPoints;
      const totalCredits = currentCredits + newCredits;

      if (totalCredits === 0) {
        throw new Error('Total credit hours cannot be zero');
      }

      const gpa = totalPoints / totalCredits;

      return {
        gpa: Number(gpa.toFixed(isWeighted ? 4 : 2)),
        totalPoints,
        totalCreditHours: totalCredits,
        details: newCourses.map(course => ({
          ...course,
          points: (isWeighted ? weightedGradePoints : standardGradePoints)[course.grade]
        }))
      };
    } catch (error) {
      console.error('Projected GPA Calculation Error:', error);
      return {
        gpa: 0,
        totalPoints: 0,
        totalCreditHours: 0,
        details: []
      };
    }
  }

  getGradeScale(isWeighted: boolean): Record<string, number> {
    return isWeighted ? weightedGradePoints : standardGradePoints;
  }
}