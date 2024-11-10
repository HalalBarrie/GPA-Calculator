import React from 'react';
import { Save, FileDown, Printer, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onExport: () => void;
  onPrint: () => void;
  onReset: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSave,
  onExport,
  onPrint,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Save className="w-4 h-4" />
        Save
      </button>
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <FileDown className="w-4 h-4" />
        Export
      </button>
      <button
        onClick={onPrint}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
};