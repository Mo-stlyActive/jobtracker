"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { CustomField, Job } from "@/types";

interface TimelineProps {
  timelineGroups: [string, Job[]][];
  customFields: CustomField[];
  statusColors: Record<string, string>;
  onJobClick: (job: Job) => void;
}

const Timeline: React.FC<TimelineProps> = ({ 
  timelineGroups, 
  customFields, 
  statusColors, 
  onJobClick 
}) => {
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📅 Application Timeline
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Chronological view of your job applications
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {timelineGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No applications in timeline
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Applications will appear here as you add them
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {timelineGroups.map(([date, jobs], groupIndex) => (
              <div key={date} className="relative">
                {/* Date Header */}
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 relative"></div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300">
                      {formatDate(date)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {jobs.length} application{jobs.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Applications for this date */}
                <div className="ml-10 space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => onJobClick(job)}
                      className="card hover:shadow-xl transition-all duration-200 cursor-pointer group"
                    >
                      <div className="card-body">
                        {/* Job Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {job.position}
                            </h4>
                            <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
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

                        {/* Status and Metadata */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {/* Status Badge */}
                          <span className={`badge ${statusColors[job.status] || 'badge-gray'}`}>
                            {job.status}
                          </span>

                          {/* Country */}
                          <span className="badge badge-gray">
                            📍 {job.country}
                          </span>

                          {/* Salary */}
                          {job.salaryExpectation && (
                            <span className="badge badge-success">
                              💰 {job.salaryExpectation}
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
                              🔔 {new Date(job.reminder).toLocaleDateString()}
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

                        {/* Application Method & Job Posting */}
                        {(job.applicationMethod || job.jobPosting) && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 space-y-1">
                            {job.applicationMethod && (
                              <div><strong>Applied via:</strong> {job.applicationMethod}</div>
                            )}
                            {job.jobPosting && (
                              <div><strong>Job Posting:</strong> {job.jobPosting}</div>
                            )}
                          </div>
                        )}

                        {/* Notes Preview */}
                        {job.notes && (
                          <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                            <div className="text-gray-600 dark:text-gray-300 text-sm">
                              <ReactMarkdown>
                                {job.notes.length > 150 ? job.notes.substring(0, 150) + '...' : job.notes}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}

                        {/* Key Custom Fields */}
                        {(job.requirements || job.cvUsed || job.coverLetterUsed) && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                            {job.requirements && (
                              <div className="text-sm mb-2">
                                <strong className="text-gray-700 dark:text-gray-300">Requirements:</strong>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">
                                  {job.requirements.length > 80 ? job.requirements.substring(0, 80) + '...' : job.requirements}
                                </span>
                              </div>
                            )}
                            {job.cvUsed && (
                              <div className="text-sm mb-1">
                                <strong className="text-gray-700 dark:text-gray-300">CV:</strong>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">{job.cvUsed}</span>
                              </div>
                            )}
                            {job.coverLetterUsed && (
                              <div className="text-sm">
                                <strong className="text-gray-700 dark:text-gray-300">Cover Letter:</strong>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">{job.coverLetterUsed}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Click indicator */}
                        <div className="flex items-center justify-end text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            Click for full details →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connecting line for timeline (except for last item) */}
                {groupIndex < timelineGroups.length - 1 && (
                  <div className="absolute left-2 top-16 w-0.5 h-16 bg-primary-200 dark:bg-primary-700"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline legend */}
      {timelineGroups.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-primary-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            💡 <strong>Timeline shows applications by date.</strong> Click any application to view full details.
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;