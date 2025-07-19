import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardJobList from '@/components/DashboardJobList';
import { Job } from '@/types';

const mockJobs: Job[] = [
  {
    id: 'test-job-1',
    company: 'TechCorp Solutions',
    position: 'Senior Software Engineer',
    status: 'Applied',
    notes: 'Great opportunity for full-stack development',
    tags: ['react', 'nodejs', 'full-stack'],
    country: 'United States',
    salaryExpectation: '$120,000-$140,000',
    applicationDate: '2024-12-15',
    applicationMethod: 'Company Career Portal',
    jobPosting: 'Senior Software Engineer - Full Stack',
    requirements: 'React, Node.js, TypeScript, 5+ years experience',
    coverLetterUsed: 'Standard Tech Cover Letter',
    cvUsed: 'Full Stack Developer CV',
  },
  {
    id: 'test-job-2',
    company: 'InnovateSoft Inc.',
    position: 'Frontend Developer',
    status: 'Interview',
    notes: 'Specializes in React ecosystem',
    tags: ['react', 'frontend', 'priority'],
    country: 'Canada',
    salaryExpectation: 'CAD $90,000-$110,000',
    applicationDate: '2024-12-18',
    applicationMethod: 'LinkedIn',
  },
];

const mockStatusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Interview: 'bg-yellow-100 text-yellow-800',
  Offer: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Withdrawn: 'bg-gray-100 text-gray-800',
};

const mockOnJobClick = jest.fn();

describe('DashboardJobList', () => {
  beforeEach(() => {
    mockOnJobClick.mockClear();
  });

  it('renders job list with all jobs', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('@ TechCorp Solutions')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('@ InnovateSoft Inc.')).toBeInTheDocument();
  });

  it('displays job status badges', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('Interview')).toBeInTheDocument();
  });

  it('displays priority indicator for priority jobs', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('⭐ Priority')).toBeInTheDocument();
  });

  it('displays job tags', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#nodejs')).toBeInTheDocument();
    expect(screen.getByText('#frontend')).toBeInTheDocument();
  });

  it('displays salary expectations when provided', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('💰 $120,000-$140,000')).toBeInTheDocument();
    expect(screen.getByText('💰 CAD $90,000-$110,000')).toBeInTheDocument();
  });

  it('displays application dates when provided', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('📅 Dec 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('📅 Dec 18, 2024')).toBeInTheDocument();
  });

  it('calls onJobClick when a job card is clicked', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    const firstJobCard = screen.getByText('Senior Software Engineer').closest('div[role="button"], div[tabindex], button, [onclick]') || 
                         screen.getByText('Senior Software Engineer').closest('div');
    
    if (firstJobCard) {
      fireEvent.click(firstJobCard);
      expect(mockOnJobClick).toHaveBeenCalledWith(mockJobs[0]);
    }
  });

  it('displays application method when provided', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('Applied via: Company Career Portal')).toBeInTheDocument();
    expect(screen.getByText('Applied via: LinkedIn')).toBeInTheDocument();
  });

  it('truncates long notes', () => {
    const longNoteJob: Job = {
      ...mockJobs[0],
      notes: 'This is a very long note that should be truncated when displayed in the job list. '.repeat(10),
    };

    render(
      <DashboardJobList
        jobs={[longNoteJob]}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    const noteText = screen.getByText(/This is a very long note/);
    expect(noteText.textContent).toContain('...');
  });

  it('displays empty state when no jobs provided', () => {
    render(
      <DashboardJobList
        jobs={[]}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('No job applications to display')).toBeInTheDocument();
  });

  it('displays job requirements and posting info when available', () => {
    render(
      <DashboardJobList
        jobs={mockJobs}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('Requirements:')).toBeInTheDocument();
    expect(screen.getByText(/React, Node.js, TypeScript/)).toBeInTheDocument();
    expect(screen.getByText('Job Posting:')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer - Full Stack')).toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const minimalJob: Job = {
      id: 'minimal-job',
      company: 'Minimal Corp',
      position: 'Developer',
      status: 'Applied',
      notes: 'Basic job entry',
      tags: ['test'],
      country: 'Test Country',
    };

    render(
      <DashboardJobList
        jobs={[minimalJob]}
        statusColors={mockStatusColors}
        onJobClick={mockOnJobClick}
      />
    );

    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('@ Minimal Corp')).toBeInTheDocument();
    expect(screen.getByText('Applied')).toBeInTheDocument();
  });
});