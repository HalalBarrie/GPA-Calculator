import React from 'react';
import { Info } from 'lucide-react';

interface InfoPanelProps {
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ showInfo, setShowInfo }) => {
  return (
    <>
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 
                 dark:hover:text-indigo-400 transition-colors"
        aria-label="Toggle information panel"
      >
        <Info className="w-6 h-6" />
      </button>
      
      {showInfo && (
        <div className="mb-6 p-4 bg-indigo-50 dark:bg-gray-800/50 rounded-lg">
          <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">How to use:</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            <li>Choose between 4.0 Scale or 15-Point Scale</li>
            <li>Enter your course names (optional)</li>
            <li>Adjust credit hours for each course</li>
            <li>Select your letter grade</li>
            <li>Your GPA will be calculated automatically</li>
          </ul>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            <p><strong>4.0 Scale:</strong> Traditional GPA system (A=4.0, B=3.0, etc.)</p>
            <p><strong>15-Point Scale:</strong> Weighted system (A=15, B=12, etc.)</p>
          </div>
        </div>
      )}
    </>
  );
};