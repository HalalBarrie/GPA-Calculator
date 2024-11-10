import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-500
        hover:bg-gray-100 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
        group
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`
            w-6 h-6 text-yellow-500 dark:text-gray-400
            transition-all duration-500 absolute
            ${isDark ? 'opacity-0 rotate-[-180deg]' : 'opacity-100 rotate-0'}
          `}
        />
        <Moon 
          className={`
            w-6 h-6 text-gray-400 dark:text-indigo-300
            transition-all duration-500 absolute
            ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}
          `}
        />
      </div>
    </button>
  );
};