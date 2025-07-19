"use client";

import React, { useState } from "react";
import { FilterState, JOB_STATUSES } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  allTags: string[];
  allCountries: string[];
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  updateFilters,
  allTags,
  allCountries,
  onClose
}) => {
  const [localDateRange, setLocalDateRange] = useState({
    start: filters.dateRange.start || '',
    end: filters.dateRange.end || ''
  });

  function applyDateRange() {
    updateFilters({ 
      dateRange: { 
        start: localDateRange.start, 
        end: localDateRange.end 
      } 
    });
  }

  function toggleTag(tag: string) {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  }

  function clearAllFilters() {
    updateFilters({
      status: "",
      country: "",
      tags: [],
      search: "",
      dateRange: { start: "", end: "" }
    });
    setLocalDateRange({ start: '', end: '' });
  }

  const hasActiveFilters = filters.status || filters.country || 
    filters.tags.length > 0 || filters.dateRange.start || filters.dateRange.end;

  return (
    <div className="card mb-6">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            🔍 Advanced Filters
          </h3>
          <div className="flex gap-2">
            <button
              onClick={clearAllFilters}
              className="btn-danger text-sm"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="btn-ghost text-sm"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status & Country */}
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                value={filters.status}
                onChange={e => updateFilters({ status: e.target.value })}
                className="select"
              >
                <option value="">All Statuses</option>
                {JOB_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <select
                value={filters.country}
                onChange={e => updateFilters({ country: e.target.value })}
                className="select"
              >
                <option value="">All Countries</option>
                {allCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Application Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={localDateRange.start}
                  onChange={e => setLocalDateRange(prev => ({ ...prev, start: e.target.value }))}
                  onBlur={applyDateRange}
                  className="input"
                  placeholder="Start date"
                />
                <input
                  type="date"
                  value={localDateRange.end}
                  onChange={e => setLocalDateRange(prev => ({ ...prev, end: e.target.value }))}
                  onBlur={applyDateRange}
                  className="input"
                  placeholder="End date"
                />
              </div>
              {(filters.dateRange.start || filters.dateRange.end) && (
                <div className="mt-2 text-xs text-success-600 dark:text-success-400">
                  ✓ Date range filter active
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mt-6">
            <label className="form-label">
              Filter by Tags ({filters.tags.length} selected)
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`badge transition-colors ${
                    filters.tags.includes(tag)
                      ? "badge-primary"
                      : "badge-gray hover:badge-primary"
                  }`}
                >
                  #{tag}
                  {filters.tags.includes(tag) && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
            {filters.tags.length > 0 && (
              <div className="mt-2 text-xs text-success-600 dark:text-success-400">
                ✓ Must have all selected tags: {filters.tags.map(tag => `#${tag}`).join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Active Filters:
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {filters.status && <div>• Status: {filters.status}</div>}
              {filters.country && <div>• Country: {filters.country}</div>}
              {filters.tags.length > 0 && <div>• Tags: {filters.tags.join(', ')}</div>}
              {filters.dateRange.start && filters.dateRange.end && (
                <div>• Date: {new Date(filters.dateRange.start).toLocaleDateString()} - {new Date(filters.dateRange.end).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;