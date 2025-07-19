"use client";

import React from "react";

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, onToggle }) => {
  return (
    <button
      className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-ring"
      aria-label="Toggle dark mode"
      onClick={onToggle}
    >
      {dark ? (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      ) : (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;