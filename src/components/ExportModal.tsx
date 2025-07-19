"use client";

import React, { useState } from "react";
import { Job } from "@/types";
import { exportJobsAsJSON, exportJobsAsCSV } from "@/utils/storage";

interface ExportModalProps {
  jobs: Job[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({
  jobs,
  onClose
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv'>('csv');
  const [includeFields, setIncludeFields] = useState({
    basic: true,           // Company, Position, Status, Country
    dates: true,           // Application Date, Reminder
    application: true,     // Application Method, Job Posting, Salary
    documents: true,       // CV Used, Cover Letter Used
    content: true,         // Notes, Requirements
    tags: true,            // Tags
    customFields: true     // Any additional custom fields
  });

  function handleExport() {
    if (selectedFormat === 'json') {
      exportFilteredJSON();
    } else {
      exportFilteredCSV();
    }
    onClose();
  }

  function exportFilteredJSON() {
    const filteredData = jobs.map(job => {
      const filtered: Record<string, any> = {};
      
      if (includeFields.basic) {
        filtered.id = job.id;
        filtered.company = job.company;
        filtered.position = job.position;
        filtered.status = job.status;
        filtered.country = job.country;
      }
      
      if (includeFields.dates) {
        if (job.applicationDate) filtered.applicationDate = job.applicationDate;
        if (job.reminder) filtered.reminder = job.reminder;
      }
      
      if (includeFields.application) {
        if (job.salaryExpectation) filtered.salaryExpectation = job.salaryExpectation;
        if (job.applicationMethod) filtered.applicationMethod = job.applicationMethod;
        if (job.jobPosting) filtered.jobPosting = job.jobPosting;
      }
      
      if (includeFields.documents) {
        if (job.cvUsed) filtered.cvUsed = job.cvUsed;
        if (job.coverLetterUsed) filtered.coverLetterUsed = job.coverLetterUsed;
      }
      
      if (includeFields.content) {
        if (job.notes) filtered.notes = job.notes;
        if (job.requirements) filtered.requirements = job.requirements;
      }
      
      if (includeFields.tags && job.tags) {
        filtered.tags = job.tags;
      }
      
      if (includeFields.customFields) {
        // Include any other fields not covered above
        Object.keys(job).forEach(key => {
          if (!filtered.hasOwnProperty(key) && job[key]) {
            filtered[key] = job[key];
          }
        });
      }
      
      return filtered;
    });

    const content = exportJobsAsJSON(filteredData as Job[]);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jobtracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportFilteredCSV() {
    const filteredData = jobs.map(job => {
      const filtered: Record<string, any> = {};
      
      if (includeFields.basic) {
        filtered.id = job.id;
        filtered.company = job.company;
        filtered.position = job.position;
        filtered.status = job.status;
        filtered.country = job.country;
      }
      
      if (includeFields.dates) {
        if (job.applicationDate) filtered.applicationDate = job.applicationDate;
        if (job.reminder) filtered.reminder = job.reminder;
      }
      
      if (includeFields.application) {
        if (job.salaryExpectation) filtered.salaryExpectation = job.salaryExpectation;
        if (job.applicationMethod) filtered.applicationMethod = job.applicationMethod;
        if (job.jobPosting) filtered.jobPosting = job.jobPosting;
      }
      
      if (includeFields.documents) {
        if (job.cvUsed) filtered.cvUsed = job.cvUsed;
        if (job.coverLetterUsed) filtered.coverLetterUsed = job.coverLetterUsed;
      }
      
      if (includeFields.content) {
        if (job.notes) filtered.notes = job.notes;
        if (job.requirements) filtered.requirements = job.requirements;
      }
      
      if (includeFields.tags && job.tags) {
        filtered.tags = job.tags;
      }
      
      if (includeFields.customFields) {
        Object.keys(job).forEach(key => {
          if (!filtered.hasOwnProperty(key) && job[key]) {
            filtered[key] = job[key];
          }
        });
      }
      
      return filtered;
    });

    const content = exportJobsAsCSV(filteredData as Job[]);
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jobtracker-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleAllFields(enabled: boolean) {
    setIncludeFields({
      basic: enabled,
      dates: enabled,
      application: enabled,
      documents: enabled,
      content: enabled,
      tags: enabled,
      customFields: enabled
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content max-w-2xl"
      >
        {/* Header */}
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              📤 Export Job Applications
            </h2>
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
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Exporting {jobs.length} job application{jobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Content */}
        <div className="card-body space-y-6">
          {/* Format Selection */}
          <div>
            <label className="form-label mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedFormat('csv')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedFormat === 'csv'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold text-gray-900 dark:text-white">CSV</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Spreadsheet format</div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedFormat('json')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedFormat === 'json'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold text-gray-900 dark:text-white">JSON</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Developer format</div>
                </div>
              </button>
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="form-label">
                Include Fields
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAllFields(true)}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  Select All
                </button>
                <button
                  onClick={() => toggleAllFields(false)}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'basic', label: 'Basic Info', desc: 'Company, Position, Status, Country' },
                { key: 'dates', label: 'Dates', desc: 'Application Date, Reminders' },
                { key: 'application', label: 'Application Details', desc: 'Salary, Method, Job Posting' },
                { key: 'documents', label: 'Documents', desc: 'CV Used, Cover Letter Used' },
                { key: 'content', label: 'Content', desc: 'Notes, Requirements' },
                { key: 'tags', label: 'Tags', desc: 'All tags and categories' },
                { key: 'customFields', label: 'Custom Fields', desc: 'Additional custom data' }
              ].map(field => (
                <label key={field.key} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <input
                    type="checkbox"
                    checked={includeFields[field.key as keyof typeof includeFields]}
                    onChange={e => setIncludeFields(prev => ({ ...prev, [field.key]: e.target.checked }))}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {field.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {field.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Export Preview
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              • Format: {selectedFormat.toUpperCase()}
              <br />
              • Records: {jobs.length} job application{jobs.length !== 1 ? 's' : ''}
              <br />
              • Fields: {Object.values(includeFields).filter(Boolean).length} field group{Object.values(includeFields).filter(Boolean).length !== 1 ? 's' : ''} selected
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={!Object.values(includeFields).some(Boolean)}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export {selectedFormat.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;