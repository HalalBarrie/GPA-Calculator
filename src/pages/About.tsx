import React from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

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
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">About GPA Calculator</h1>
          </div>

          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
              <p>
                I believe in making academic planning accessible and stress-free. My GPA Calculator 
                helps students track their academic progress with precision and ease, supporting both 
                standard 4.0 and weighted 15-point grading scales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Multiple semester tracking</li>
                <li>Dual grading scale support (4.0 and 15-point)</li>
                <li>GPA projection tools</li>
                <li>Academic progress visualization</li>
                <li>Export and print capabilities</li>
                <li>Automatic grade history saving</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Development</h2>
              <p>
                Built with modern web technologies, the calculator prioritizes user experience, 
                accessibility, and reliability. I'm constantly improving based on user feedback 
                and educational needs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};