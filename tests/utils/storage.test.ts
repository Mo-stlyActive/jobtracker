import {
  getInitialJobs,
  getInitialDark,
  getInitialCustomFields,
  saveJobs,
  saveDarkMode,
  saveCustomFields,
  exportJobsAsJSON,
  exportJobsAsCSV,
  importJobsFromJSON,
  validateJob,
  generateJobId,
  searchJobs,
  filterJobsByStatus,
  filterJobsByTags,
  filterJobsByDateRange,
} from '@/utils/storage';
import { Job, CustomField } from '@/types';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockJobs: Job[] = [
  {
    id: 'test-job-1',
    company: 'TechCorp Solutions',
    position: 'Senior Software Engineer',
    status: 'Applied',
    notes: 'Great opportunity for full-stack development',
    tags: ['react', 'nodejs', 'full-stack'],
    country: 'United States',
    applicationDate: '2024-12-15',
  },
  {
    id: 'test-job-2',
    company: 'InnovateSoft Inc.',
    position: 'Frontend Developer',
    status: 'Interview',
    notes: 'Specializes in React ecosystem',
    tags: ['react', 'frontend'],
    country: 'Canada',
    applicationDate: '2024-12-18',
  },
];

describe('Storage Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInitialJobs', () => {
    it('returns empty array when no jobs in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = getInitialJobs();
      expect(result).toEqual([]);
    });

    it('returns parsed jobs from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockJobs));
      const result = getInitialJobs();
      expect(result).toEqual(mockJobs);
    });

    it('returns empty array when localStorage has invalid JSON', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      const result = getInitialJobs();
      expect(result).toEqual([]);
    });
  });

  describe('getInitialDark', () => {
    it('returns stored dark mode preference', () => {
      mockLocalStorage.getItem.mockReturnValue('true');
      const result = getInitialDark();
      expect(result).toBe(true);
    });

    it('returns false when preference is false', () => {
      mockLocalStorage.getItem.mockReturnValue('false');
      const result = getInitialDark();
      expect(result).toBe(false);
    });

    it('returns system preference when no stored preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = getInitialDark();
      expect(result).toBe(true); // Because our mock matchMedia returns true for dark theme
    });
  });

  describe('getInitialCustomFields', () => {
    it('returns empty array when no custom fields in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = getInitialCustomFields();
      expect(result).toEqual([]);
    });

    it('returns parsed custom fields from localStorage', () => {
      const customFields: CustomField[] = [
        { name: 'Salary Expectation', key: 'salaryExpectation' },
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(customFields));
      const result = getInitialCustomFields();
      expect(result).toEqual(customFields);
    });
  });

  describe('saveJobs', () => {
    it('saves jobs to localStorage', () => {
      saveJobs(mockJobs);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'jobtracker-jobs',
        JSON.stringify(mockJobs)
      );
    });

    it('clears analytics cache when saving jobs', () => {
      saveJobs(mockJobs);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        'jobtracker-analytics-cache'
      );
    });
  });

  describe('saveDarkMode', () => {
    it('saves dark mode preference to localStorage', () => {
      saveDarkMode(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'jobtracker-dark',
        'true'
      );
    });
  });

  describe('exportJobsAsJSON', () => {
    it('returns formatted JSON string', () => {
      const result = exportJobsAsJSON(mockJobs);
      expect(result).toBe(JSON.stringify(mockJobs, null, 2));
    });
  });

  describe('exportJobsAsCSV', () => {
    it('returns CSV format with headers and data', () => {
      const result = exportJobsAsCSV(mockJobs);
      
      expect(result).toContain('id,company,position,status');
      expect(result).toContain('TechCorp Solutions');
      expect(result).toContain('Senior Software Engineer');
    });

    it('returns empty string for empty jobs array', () => {
      const result = exportJobsAsCSV([]);
      expect(result).toBe('');
    });

    it('handles array fields correctly', () => {
      const result = exportJobsAsCSV(mockJobs);
      expect(result).toContain('react; nodejs; full-stack');
    });
  });

  describe('importJobsFromJSON', () => {
    it('imports valid JSON job data', () => {
      const jsonString = JSON.stringify(mockJobs);
      const result = importJobsFromJSON(jsonString);
      expect(result).toEqual(mockJobs);
    });

    it('returns empty array for invalid JSON', () => {
      const result = importJobsFromJSON('invalid json');
      expect(result).toEqual([]);
    });

    it('filters out invalid job objects', () => {
      const invalidJobs = [
        mockJobs[0],
        { invalid: 'job' }, // Missing required fields
        mockJobs[1],
      ];
      const jsonString = JSON.stringify(invalidJobs);
      const result = importJobsFromJSON(jsonString);
      expect(result).toHaveLength(2);
    });
  });

  describe('validateJob', () => {
    it('returns true for valid job', () => {
      const result = validateJob(mockJobs[0]);
      expect(result).toBe(true);
    });

    it('returns false for job missing required fields', () => {
      const invalidJob = { id: '1', company: 'Test' };
      const result = validateJob(invalidJob);
      expect(result).toBe(false);
    });
  });

  describe('generateJobId', () => {
    it('generates ID with company, position, and date', () => {
      const result = generateJobId('TechCorp Solutions', 'Senior Developer');
      expect(result).toMatch(/^techcorp-solutions-senior-developer-\d{4}-\d{2}-\d{2}$/);
    });

    it('sanitizes special characters', () => {
      const result = generateJobId('Tech@Corp!', 'Senior/Developer');
      expect(result).toMatch(/^techcorp-seniordeveloper-\d{4}-\d{2}-\d{2}$/);
    });

    it('truncates long strings', () => {
      const longCompany = 'Very Long Company Name That Should Be Truncated Because It Exceeds The Limit';
      const result = generateJobId(longCompany, 'Developer');
      expect(result.length).toBeLessThanOrEqual(60); // 50 chars + date
    });
  });

  describe('searchJobs', () => {
    it('returns all jobs when query is empty', () => {
      const result = searchJobs(mockJobs, '');
      expect(result).toEqual(mockJobs);
    });

    it('searches by company name', () => {
      const result = searchJobs(mockJobs, 'TechCorp');
      expect(result).toHaveLength(1);
      expect(result[0].company).toBe('TechCorp Solutions');
    });

    it('searches by position', () => {
      const result = searchJobs(mockJobs, 'Frontend');
      expect(result).toHaveLength(1);
      expect(result[0].position).toBe('Frontend Developer');
    });

    it('searches by tags', () => {
      const result = searchJobs(mockJobs, 'react');
      expect(result).toHaveLength(2);
    });

    it('is case insensitive', () => {
      const result = searchJobs(mockJobs, 'TECHCORP');
      expect(result).toHaveLength(1);
    });
  });

  describe('filterJobsByStatus', () => {
    it('filters jobs by status', () => {
      const result = filterJobsByStatus(mockJobs, 'Applied');
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('Applied');
    });

    it('returns all jobs when status is "all"', () => {
      const result = filterJobsByStatus(mockJobs, 'all');
      expect(result).toEqual(mockJobs);
    });

    it('returns all jobs when status is empty', () => {
      const result = filterJobsByStatus(mockJobs, '');
      expect(result).toEqual(mockJobs);
    });
  });

  describe('filterJobsByTags', () => {
    it('filters jobs that have all specified tags', () => {
      const result = filterJobsByTags(mockJobs, ['react']);
      expect(result).toHaveLength(2);
    });

    it('filters jobs that have multiple tags', () => {
      const result = filterJobsByTags(mockJobs, ['react', 'nodejs']);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-job-1');
    });

    it('returns all jobs when no tags specified', () => {
      const result = filterJobsByTags(mockJobs, []);
      expect(result).toEqual(mockJobs);
    });
  });

  describe('filterJobsByDateRange', () => {
    it('filters jobs within date range', () => {
      const result = filterJobsByDateRange(mockJobs, '2024-12-14', '2024-12-16');
      expect(result).toHaveLength(1);
      expect(result[0].applicationDate).toBe('2024-12-15');
    });

    it('returns all jobs when no date range specified', () => {
      const result = filterJobsByDateRange(mockJobs, '', '');
      expect(result).toEqual(mockJobs);
    });

    it('filters out jobs without application dates', () => {
      const jobsWithoutDates = [
        { ...mockJobs[0], applicationDate: undefined },
        mockJobs[1],
      ] as Job[];
      
      const result = filterJobsByDateRange(jobsWithoutDates, '2024-12-01', '2024-12-31');
      expect(result).toHaveLength(1);
    });
  });
});