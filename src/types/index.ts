export interface Job {
  id: string;
  company: string;
  position: string;
  status: string;
  notes: string;
  tags: string[];
  country: string;
  reminder?: string; // ISO date string
  applicationDate?: string;
  applicationMethod?: string;
  salaryExpectation?: string;
  jobPosting?: string;
  requirements?: string;
  coverLetterUsed?: string;
  cvUsed?: string;
  [key: string]: string | number | boolean | string[] | undefined; // Allow custom fields
}

export interface CustomField {
  name: string;
  key: string;
}

export interface FilterState {
  status: string;
  tags: string[];
  country: string;
  search: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface AnalyticsData {
  totalApplications: number;
  statusBreakdown: Record<string, number>;
  monthlyApplications: Record<string, number>;
  topCompanies: Array<{ name: string; count: number }>;
  averageResponseTime: number;
  successRate: number;
}

export interface ExportFormat {
  format: 'json' | 'csv' | 'pdf';
  filename: string;
  includeFields: string[];
}

export interface TimelineEvent {
  id: string;
  jobId: string;
  company: string;
  position: string;
  event: string;
  date: string;
  description?: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
}

export interface UserSettings {
  theme: Theme;
  notifications: {
    reminders: boolean;
    email: boolean;
    browser: boolean;
  };
  defaultFields: string[];
  customFields: CustomField[];
}

export const JOB_STATUSES = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn'
] as const;

export type JobStatus = typeof JOB_STATUSES[number];

export const APPLICATION_METHODS = [
  'Company Website',
  'Company Career Portal',
  'LinkedIn',
  'Indeed',
  'AngelList',
  'Recruiter',
  'Referral',
  'Job Board',
  'Direct Contact',
  'Other'
] as const;

export type ApplicationMethod = typeof APPLICATION_METHODS[number];