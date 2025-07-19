// Utility functions for localStorage and data management
import type { Job, CustomField, UserSettings, AnalyticsData } from '../types';

const STORAGE_KEYS = {
  JOBS: 'jobtracker-jobs',
  DARK_MODE: 'jobtracker-dark',
  CUSTOM_FIELDS: 'jobtracker-custom-fields',
  USER_SETTINGS: 'jobtracker-settings',
  ANALYTICS_CACHE: 'jobtracker-analytics-cache',
} as const;

// Jobs storage
export function getInitialJobs(): Job[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored jobs:', error);
        return [];
      }
    }
  }
  return [];
}

export function saveJobs(jobs: Job[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    // Clear analytics cache when jobs are updated
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS_CACHE);
  }
}

// Theme storage
export function getInitialDark(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (stored !== null) {
      return stored === 'true';
    }
    // Default to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export function saveDarkMode(isDark: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDark.toString());
  }
}

// Custom fields storage
export function getInitialCustomFields(): CustomField[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_FIELDS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing custom fields:', error);
        return [];
      }
    }
  }
  return [];
}

export function saveCustomFields(fields: CustomField[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FIELDS, JSON.stringify(fields));
  }
}

// User settings storage
export function getUserSettings(): UserSettings | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing user settings:', error);
        return null;
      }
    }
  }
  return null;
}

export function saveUserSettings(settings: UserSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  }
}

// Analytics cache
export function getCachedAnalytics(): AnalyticsData | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYTICS_CACHE);
    if (stored) {
      try {
        const cached = JSON.parse(stored);
        // Check if cache is less than 1 hour old
        const cacheAge = Date.now() - cached.timestamp;
        if (cacheAge < 3600000) { // 1 hour
          return cached.data;
        }
      } catch (error) {
        console.error('Error parsing cached analytics:', error);
      }
    }
  }
  return null;
}

export function saveAnalyticsCache(data: AnalyticsData): void {
  if (typeof window !== 'undefined') {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.ANALYTICS_CACHE, JSON.stringify(cacheEntry));
  }
}

// Data import/export utilities
export function exportJobsAsJSON(jobs: Job[]): string {
  return JSON.stringify(jobs, null, 2);
}

export function exportJobsAsCSV(jobs: Job[]): string {
  if (jobs.length === 0) return '';

  // Get all unique keys from all jobs
  const allKeys = new Set<string>();
  jobs.forEach(job => Object.keys(job).forEach(key => allKeys.add(key)));
  
  const headers = Array.from(allKeys);
  const csvContent = [
    headers.join(','),
    ...jobs.map(job => 
      headers.map(header => {
        const value = job[header];
        if (Array.isArray(value)) {
          return `"${value.join('; ')}"`;
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  return csvContent;
}

export function importJobsFromJSON(jsonString: string): Job[] {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      return parsed.filter(job => 
        job && typeof job === 'object' && 
        job.id && job.company && job.position
      );
    }
  } catch (error) {
    console.error('Error importing JSON:', error);
  }
  return [];
}

// Validation utilities
export function validateJob(job: Partial<Job>): job is Job {
  return !!(
    job.id &&
    job.company &&
    job.position &&
    job.status &&
    typeof job.notes === 'string' &&
    Array.isArray(job.tags) &&
    job.country
  );
}

export function generateJobId(company: string, position: string): string {
  const date = new Date().toISOString().split('T')[0];
  const slug = `${company}-${position}`.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  return `${slug}-${date}`;
}

// Search and filter utilities
export function searchJobs(jobs: Job[], query: string): Job[] {
  if (!query) return jobs;
  
  const searchTerm = query.toLowerCase();
  return jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm) ||
    job.position.toLowerCase().includes(searchTerm) ||
    job.notes.toLowerCase().includes(searchTerm) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    job.country.toLowerCase().includes(searchTerm)
  );
}

export function filterJobsByStatus(jobs: Job[], status: string): Job[] {
  if (!status || status === 'all') return jobs;
  return jobs.filter(job => job.status === status);
}

export function filterJobsByTags(jobs: Job[], tags: string[]): Job[] {
  if (tags.length === 0) return jobs;
  return jobs.filter(job => 
    tags.every(tag => job.tags.includes(tag))
  );
}

export function filterJobsByDateRange(jobs: Job[], startDate: string, endDate: string): Job[] {
  if (!startDate && !endDate) return jobs;
  
  return jobs.filter(job => {
    if (!job.applicationDate) return false;
    
    const applicationDate = new Date(job.applicationDate);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    
    return applicationDate >= start && applicationDate <= end;
  });
}