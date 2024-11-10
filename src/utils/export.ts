import { Course, SemesterData, standardGradePoints, weightedGradePoints } from '../types';

const calculateGPA = (courses: Course[], isWeighted: boolean): string => {
  if (courses.length === 0) return isWeighted ? "0.0000" : "0.00";
  
  const gradePoints = isWeighted ? weightedGradePoints : standardGradePoints;
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    const points = gradePoints[course.grade as keyof typeof gradePoints];
    if (isWeighted) {
      totalPoints += points;
      totalCredits += course.credits;
    } else {
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    }
  });

  const gpa = totalPoints / totalCredits;
  return isWeighted ? gpa.toFixed(4) : gpa.toFixed(2);
};

const calculateCumulativeGPA = (semesters: SemesterData[], isWeighted: boolean): string => {
  const gradePoints = isWeighted ? weightedGradePoints : standardGradePoints;
  let totalPoints = 0;
  let totalCredits = 0;

  semesters.forEach(semester => {
    semester.courses.forEach(course => {
      const points = gradePoints[course.grade as keyof typeof gradePoints];
      if (isWeighted) {
        totalPoints += points;
        totalCredits += course.credits;
      } else {
        totalPoints += points * course.credits;
        totalCredits += course.credits;
      }
    });
  });

  if (totalCredits === 0) return isWeighted ? "0.0000" : "0.00";
  const gpa = totalPoints / totalCredits;
  return isWeighted ? gpa.toFixed(4) : gpa.toFixed(2);
};

export const exportToCSV = (courses: Course[], isWeighted: boolean, semester: string) => {
  const headers = ['Course Name', 'Credits', 'Grade'];
  const rows = courses.map(course => [
    course.name || 'Untitled Course',
    course.credits,
    course.grade
  ]);
  
  const gpa = calculateGPA(courses, isWeighted);
  
  const csvContent = [
    `Semester: ${semester}`,
    `GPA: ${gpa} (${isWeighted ? '15-Point Scale' : '4.0 Scale'})`,
    '',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `gpa-calculation-${semester}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const printReport = (semesters: SemesterData[], isWeighted: boolean) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to print the report');
    return;
  }

  const cumulativeGPA = calculateCumulativeGPA(semesters, isWeighted);
  const totalCredits = semesters.reduce((total, semester) => 
    total + semester.courses.reduce((sum, course) => sum + course.credits, 0)
  , 0);

  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Academic Report - GPA Calculator</title>
        <style>
          @media print {
            @page { margin: 2cm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            color: #1f2937;
          }
          .header { 
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
          }
          .cumulative-gpa {
            background-color: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .gpa-value {
            font-size: 36px;
            font-weight: bold;
            color: #4f46e5;
            margin: 10px 0;
          }
          .semester {
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          .semester-header {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            font-size: 14px;
          }
          th, td { 
            padding: 12px; 
            border: 1px solid #e5e7eb; 
            text-align: left; 
          }
          th { 
            background-color: #f9fafb;
            font-weight: 600;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
          .meta {
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Academic Performance Report</h1>
          <p class="meta">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="cumulative-gpa">
          <h2>Cumulative GPA</h2>
          <div class="gpa-value">${cumulativeGPA}</div>
          <p class="meta">
            ${totalCredits} Total Credits • 
            ${semesters.length} Semester${semesters.length !== 1 ? 's' : ''} • 
            ${isWeighted ? '15-Point Scale' : '4.0 Scale'}
          </p>
        </div>

        ${semesters.map(semester => `
          <div class="semester">
            <div class="semester-header">
              <h3>${semester.name}</h3>
              <p class="meta">GPA: ${calculateGPA(semester.courses, isWeighted)} • ${semester.courses.length} Courses</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                ${semester.courses.map(course => `
                  <tr>
                    <td>${course.name || 'Untitled Course'}</td>
                    <td>${course.credits}</td>
                    <td>${course.grade}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}

        <div class="footer">
          <p>Generated by GPA Calculator • ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();

  // Wait for all content to load before printing
  printWindow.onload = () => {
    try {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    } catch (error) {
      console.error('Print error:', error);
      alert('There was an error printing. Please try again.');
    }
  };
};