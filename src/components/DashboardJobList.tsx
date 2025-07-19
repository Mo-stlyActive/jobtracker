"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Job } from "@/types";

interface DashboardJobListProps {
  jobs: Job[];
  statusColors: Record<string, string>;
  onJobClick: (job: Job) => void;
}

const DashboardJobList: React.FC<DashboardJobListProps> = ({ 
  jobs, 
  statusColors, 
  onJobClick 
}) => {
  
  function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  function formatSalary(salary?: string): string {
    if (!salary) return '';
    return salary.replace(/(\d+),?(\d{3})/g, '$1,$2');
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <p className="text-gray-500 dark:text-gray-400">No job applications to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <div
          key={job.id}
          onClick={() => onJobClick(job)}
          className="card hover:shadow-lg transition-all duration-200 cursor-pointer group"
        >
          <div className="card-body">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {job.position}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                  @ {job.company}
                </p>
              </div>
              
              {/* Priority indicator */}
              {job.tags.includes('priority') && (
                <div className="mt-2 sm:mt-0">
                  <span className="badge badge-danger">
                    ⭐ Priority
                  </span>
                </div>
              )}
            </div>

            {/* Status and Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* Status Badge */}
              <span className={`badge ${statusColors[job.status] || 'badge-gray'}`}>
                {job.status}
              </span>

              {/* Country */}
              <span className="badge badge-gray">
                📍 {job.country}
              </span>

              {/* Application Date */}
              {job.applicationDate && (
                <span className="badge badge-primary">
                  📅 {formatDate(job.applicationDate)}
                </span>
              )}

              {/* Salary */}
              {job.salaryExpectation && (
                <span className="badge badge-success">
                  💰 {formatSalary(job.salaryExpectation)}
                </span>
              )}

              {/* Reminder */}
              {job.reminder && (
                <span className={`badge ${
                  new Date(job.reminder) < new Date()
                    ? "badge-danger"
                    : new Date(job.reminder) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      ? "badge-warning"
                      : "badge-success"
                }`}>
                  🔔 {formatDate(job.reminder)}
                </span>
              )}
            </div>

            {/* Tags */}
            {job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.filter(tag => tag !== 'priority').map((tag, i) => (
                  <span key={i} className="badge badge-primary">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Application Method */}
            {job.applicationMethod && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                <strong>Applied via:</strong> {job.applicationMethod}
              </div>
            )}

            {/* Notes Preview */}
            {job.notes && (
              <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  <ReactMarkdown>
                    {job.notes.length > 200 ? job.notes.substring(0, 200) + '...' : job.notes}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Key Custom Fields Preview */}
            {(job.requirements || job.jobPosting) && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {job.requirements && (
                  <div className="text-sm mb-2">
                    <strong className="text-gray-700 dark:text-gray-300">Requirements:</strong>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {job.requirements.length > 100 ? job.requirements.substring(0, 100) + '...' : job.requirements}
                    </span>
                  </div>
                )}
                {job.jobPosting && (
                  <div className="text-sm">
                    <strong className="text-gray-700 dark:text-gray-300">Job Posting:</strong>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{job.jobPosting}</span>
                  </div>
                )}
              </div>
            )}

            {/* Footer with action hint */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Click to view full details
                </div>
                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                  <svg className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  View Details
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardJobList;