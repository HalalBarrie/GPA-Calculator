import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlusCircle, GraduationCap } from 'lucide-react';
import { Course, SavedCalculation, SemesterData } from './types';
import { InfoPanel } from './components/InfoPanel';
import { CourseRow } from './components/CourseRow';
import { GPADisplay } from './components/GPADisplay';
import { GradeSystemToggle } from './components/GradeSystemToggle';
import { HistoryPanel } from './components/HistoryPanel';
import { ActionButtons } from './components/ActionButtons';
import { GPATrends } from './components/GPATrends';
import { GPAProjection } from './components/GPAProjection';
import { CumulativeGPA } from './components/CumulativeGPA';
import { AcademicCalendar } from './components/AcademicCalendar';
import { MenuButton } from './components/MenuButton';
import { ThemeToggle } from './components/ThemeToggle';
import { About } from './pages/About';
import { Support } from './pages/Support';
import { FAQ } from './pages/FAQ';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportToCSV, printReport } from './utils/export';

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: 'A' }
  ]);
  const [history, setHistory] = useLocalStorage<SavedCalculation[]>('gpa-history', []);
  const [semesters, setSemesters] = useLocalStorage<SemesterData[]>('semesters', []);
  const [activeSemesterId, setActiveSemesterId] = useState<string>('current');
  const [currentSemester, setCurrentSemester] = useState('First Semester - 2024/2025');

  useEffect(() => {
    if (semesters.length === 0) {
      const initialSemester: SemesterData = {
        id: 'current',
        name: currentSemester,
        courses: [...courses],
        gpa: calculateGPA()
      };
      setSemesters([initialSemester]);
    }
  }, []);

  const calculateGPA = () => {
    if (courses.length === 0) return isWeighted ? "0.0000" : "0.00";
    
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const points = isWeighted ? 15 : 4.0;
      if (isWeighted) {
        totalPoints += points;
      } else {
        totalPoints += points * course.credits;
      }
      totalCredits += course.credits;
    });

    const gpa = totalPoints / (isWeighted ? totalCredits : totalCredits);
    return isWeighted ? gpa.toFixed(4) : gpa.toFixed(2);
  };

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: Math.max(0, ...courses.map(c => c.id)) + 1,
        name: '',
        credits: 3,
        grade: 'A'
      }
    ]);
  };

  const handleUpdateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const handleRemoveCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleAddSemester = () => {
    const newSemesterId = `semester-${Date.now()}`;
    const nextSemester = currentSemester.includes('First') 
      ? currentSemester.replace('First', 'Second')
      : `First Semester - ${parseInt(currentSemester.split('/')[0]) + 1}/${parseInt(currentSemester.split('/')[1]) + 1}`;

    const newSemester: SemesterData = {
      id: newSemesterId,
      name: nextSemester,
      courses: [{ id: 1, name: '', credits: 3, grade: 'A' }],
      gpa: "0.00"
    };

    setSemesters([...semesters, newSemester]);
    setActiveSemesterId(newSemesterId);
    setCurrentSemester(nextSemester);
    setCourses(newSemester.courses);
  };

  const saveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      courses: [...courses],
      gpa: calculateGPA(),
      isWeighted,
      semester: currentSemester
    };
    setHistory([calculation, ...history]);

    const updatedSemesters = semesters.map(sem => 
      sem.id === activeSemesterId
        ? { ...sem, courses: [...courses], gpa: calculateGPA() }
        : sem
    );
    setSemesters(updatedSemesters);
  };

  const handleExport = () => {
    exportToCSV(courses, isWeighted, currentSemester);
  };

  const handlePrint = () => {
    printReport(semesters, isWeighted);
  };

  const handleReset = () => {
    setCourses([{ id: 1, name: '', credits: 3, grade: 'A' }]);
    setIsWeighted(false);
  };

  const loadCalculation = (calc: SavedCalculation) => {
    setCourses(calc.courses);
    setIsWeighted(calc.isWeighted);
  };

  const deleteCalculation = (id: string) => {
    setHistory(history.filter(calc => calc.id !== id));
  };

  const handleSemesterSelect = (semesterId: string) => {
    setActiveSemesterId(semesterId);
    const semester = semesters.find(s => s.id === semesterId);
    if (semester) {
      setCourses(semester.courses);
      setCurrentSemester(semester.name);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 
                         dark:from-dark-900 dark:to-indigo-950 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="card p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-float" />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      GPA Calculator
                    </h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <ActionButtons
                      onSave={saveCalculation}
                      onExport={handleExport}
                      onPrint={handlePrint}
                      onReset={handleReset}
                    />
                    <InfoPanel showInfo={showInfo} setShowInfo={setShowInfo} />
                    <MenuButton />
                  </div>
                </div>

                <AcademicCalendar
                  semesters={semesters}
                  onSemesterSelect={handleSemesterSelect}
                  activeSemesterId={activeSemesterId}
                  onAddSemester={handleAddSemester}
                />

                <GradeSystemToggle isWeighted={isWeighted} onToggle={setIsWeighted} />

                <div className="space-y-4">
                  {courses.map((course) => (
                    <CourseRow
                      key={course.id}
                      course={course}
                      onUpdate={handleUpdateCourse}
                      onRemove={handleRemoveCourse}
                      canRemove={courses.length > 1}
                      isWeighted={isWeighted}
                    />
                  ))}
                </div>

                <button
                  onClick={handleAddCourse}
                  className="button-secondary mt-4 flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Course</span>
                </button>

                <GPADisplay courses={courses} isWeighted={isWeighted} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GPAProjection
                    currentGPA={calculateGPA()}
                    totalCredits={courses.reduce((sum, course) => sum + course.credits, 0)}
                    isWeighted={isWeighted}
                  />
                  <CumulativeGPA
                    semesters={semesters}
                    isWeighted={isWeighted}
                  />
                </div>

                <GPATrends semesters={semesters} isWeighted={isWeighted} />
                
                <HistoryPanel
                  history={history}
                  onLoad={loadCalculation}
                  onDelete={deleteCalculation}
                />
              </div>
            </div>
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;