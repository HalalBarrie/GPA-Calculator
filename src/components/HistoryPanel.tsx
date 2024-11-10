import React from 'react';
import { History, Trash2, Calendar } from 'lucide-react';
import { SavedCalculation } from '../types';

interface HistoryPanelProps {
  history: SavedCalculation[];
  onLoad: (calculation: SavedCalculation) => void;
  onDelete: (id: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onLoad, 
  onDelete 
}) => {
  if (history.length === 0) {
    return null;
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Calculation History</h2>
      </div>
      <div className="space-y-3">
        {history.map((calc) => (
          <div 
            key={calc.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {calc.semester}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-sm font-medium text-indigo-600">
                  GPA: {calc.gpa}
                </span>
                <span className="text-sm text-gray-500">
                  {calc.isWeighted ? '15-Point Scale' : '4.0 Scale'}
                </span>
                <span className="text-sm text-gray-500">
                  {calc.courses.length} courses
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatTimestamp(calc.timestamp)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onLoad(calc)}
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
              >
                Load
              </button>
              <button
                onClick={() => onDelete(calc.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                aria-label="Delete calculation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};