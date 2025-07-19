"use client";

import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Job, CustomField } from "@/types";

interface JobDetailsModalProps {
  job: Job;
  customFields: CustomField[];
  statusColors: Record<string, string>;
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  customFields,
  statusColors,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus trap and keyboard handling
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  function formatDate(dateStr?: string): string {
    if (!dateStr) return 'Not specified';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  }

  function formatSalary(salary?: string): string {
    if (!salary) return 'Not specified';
    return salary.replace(/(\d+),?(\d{3})/g, '$1,$2');
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="modal-content max-w-4xl"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="card-header">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {job.position}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                @ {job.company}
              </p>
              
              {/* Status and Priority */}
              <div className="flex items-center gap-3 mt-4">
                <span className={`badge ${statusColors[job.status] || 'badge-gray'}`}>
                  {job.status}
                </span>
                {job.tags.includes('priority') && (
                  <span className="badge badge-danger">
                    ⭐ Priority Application
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="card-body space-y-8">
          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location & Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                📍 Location & Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Country:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{job.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Application Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(job.applicationDate)}</span>
                </div>
                {job.reminder && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Reminder:</span>
                    <span className={`font-medium ${
                      new Date(job.reminder) < new Date()
                        ? "text-danger-600 dark:text-danger-400"
                        : "text-success-600 dark:text-success-400"
                    }`}>
                      {formatDate(job.reminder)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Application Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                📄 Application Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Salary Expectation:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatSalary(job.salaryExpectation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Application Method:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{job.applicationMethod || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Job Posting:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{job.jobPosting || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Used */}
          {(job.cvUsed || job.coverLetterUsed) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                📋 Documents Used
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.cvUsed && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">CV/Resume</div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">{job.cvUsed}</div>
                  </div>
                )}
                {job.coverLetterUsed && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="font-medium text-green-800 dark:text-green-200 mb-1">Cover Letter</div>
                    <div className="text-sm text-green-600 dark:text-green-300">{job.coverLetterUsed}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                🎯 Job Requirements
              </h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{job.requirements}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {job.tags.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                🏷️ Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={`badge ${
                      tag === 'priority' 
                        ? 'badge-danger'
                        : 'badge-primary'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {job.notes && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  📝 Notes
                </h3>
                <button
                  onClick={() => copyToClipboard(job.notes)}
                  className="btn-ghost text-sm"
                >
                  📋 Copy
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{job.notes}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Additional Custom Fields */}
          {customFields.some(field => 
            job[field.key] && 
            !['salaryExpectation', 'applicationDate', 'applicationMethod', 'jobPosting', 'requirements', 'coverLetterUsed', 'cvUsed'].includes(field.key)
          ) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                📊 Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customFields.map(field => {
                  if (!job[field.key] || 
                      ['salaryExpectation', 'applicationDate', 'applicationMethod', 'jobPosting', 'requirements', 'coverLetterUsed', 'cvUsed'].includes(field.key)) {
                    return null;
                  }
                  return (
                    <div key={field.key} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="font-medium text-purple-800 dark:text-purple-200 mb-1 text-sm">{field.name}</div>
                      <div className="text-sm text-purple-600 dark:text-purple-300">{String(job[field.key])}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Job ID for reference */}
          <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Job ID: {job.id}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              💡 Showcase data for demonstration purposes
            </div>
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;