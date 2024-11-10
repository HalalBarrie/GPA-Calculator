import React from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How is my GPA calculated?",
      answer: "Your GPA is calculated based on your course grades and credit hours. For the 4.0 scale, each grade is assigned a point value (A=4.0, B=3.0, etc.) multiplied by credit hours. For the 15-point scale, grades are weighted differently (A=15, B=12, etc.)."
    },
    {
      question: "Can I switch between grading scales?",
      answer: "Yes! You can toggle between the 4.0 and 15-point scales using the toggle button at the top of the calculator. Your grades will automatically recalculate."
    },
    {
      question: "How do I add multiple semesters?",
      answer: "Click the 'Add Semester' button in the Academic Calendar section. You can manage multiple semesters and track your progress across your academic career."
    },
    {
      question: "Is my data saved?",
      answer: "Yes, your calculations are automatically saved in your browser's local storage. You can also export your data to CSV or print it for your records."
    },
    {
      question: "How does GPA projection work?",
      answer: "The GPA projection tool lets you add hypothetical courses and grades to see how they would affect your overall GPA. This helps you plan your academic goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Calculator
        </button>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h1>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h2>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};