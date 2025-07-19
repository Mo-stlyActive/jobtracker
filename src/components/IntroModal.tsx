"use client";

import React, { useEffect, useRef } from "react";

interface IntroModalProps {
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) focusable[0].focus();
      
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [onClose]);

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="intro-title" 
      aria-describedby="intro-desc"
    >
      <div ref={modalRef} className="modal-content" tabIndex={-1}>
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 id="intro-title" className="text-2xl font-bold text-primary-700 dark:text-primary-300">
              Welcome to JobTracker!
            </h2>
            <button
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close intro"
              onClick={onClose}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div id="intro-desc" className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>Your modern job application tracking system with powerful features:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Search & Filter:</strong> Find applications quickly with advanced filtering options</li>
              <li><strong>Multiple Views:</strong> Switch between List, Timeline, and Analytics views</li>
              <li><strong>Data Export:</strong> Export filtered results to JSON or CSV formats</li>
              <li><strong>Dark Mode:</strong> Toggle between light and dark themes</li>
              <li><strong>PWA Support:</strong> Install as a native app on your device</li>
              <li><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile</li>
            </ul>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Getting Started:</strong> Explore the sample data to see how JobTracker works, 
                then customize it with your own job applications. All data is stored locally in your browser.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <button
            className="btn-primary w-full"
            onClick={onClose}
            aria-label="Get Started"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;