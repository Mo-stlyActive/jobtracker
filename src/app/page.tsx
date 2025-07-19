"use client";

import { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

import DashboardJobList from "@/components/DashboardJobList";
import Timeline from "@/components/Timeline";
import Analytics from "@/components/Analytics";
import JobDetailsModal from "@/components/JobDetailsModal";
import ExportModal from "@/components/ExportModal";
import FilterPanel from "@/components/FilterPanel";
import IntroModal from "@/components/IntroModal";
import InstallPrompt from "@/components/InstallPrompt";
import ThemeToggle from "@/components/ThemeToggle";

import { Job, FilterState, JOB_STATUSES } from "@/types";
import { 
  getInitialJobs, 
  getInitialDark, 
  getInitialCustomFields, 
  saveDarkMode,
  searchJobs,
  filterJobsByStatus,
  filterJobsByTags,
  filterJobsByDateRange
} from "@/utils/storage";

import jobsData from "@/data/jobs.json";

const STATUS_COLORS: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Interview: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Withdrawn: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [dark, setDark] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    tags: [],
    country: "",
    search: "",
    dateRange: { start: "", end: "" },
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "timeline" | "analytics">("list");
  const [showIntro, setShowIntro] = useState(false);

  const customFields = getInitialCustomFields();

  // Initialize data
  useEffect(() => {
    const localJobs = getInitialJobs();
    if (localJobs.length > 0) {
      setJobs(localJobs);
    } else {
      setJobs(jobsData as Job[]);
    }
  }, []);

  // Initialize theme
  useEffect(() => {
    setDark(getInitialDark());
  }, []);

  // Apply theme
  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle("dark", dark);
    saveDarkMode(dark);
  }, [dark]);

  // Check for intro modal
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("jobtracker-seen-intro");
      setShowIntro(!seen);
    }
  }, []);

  // Collect all unique tags and countries
  const allTags = Array.from(new Set(jobs.flatMap(j => j.tags))).filter(Boolean);
  const allCountries = Array.from(new Set(jobs.map(j => j.country))).filter(Boolean);

  // Apply all filters
  const filteredJobs = jobs
    .filter(job => {
      // Search filter
      if (search && !searchJobs([job], search).length) return false;
      
      // Status filter
      if (filters.status && job.status !== filters.status) return false;
      
      // Country filter
      if (filters.country && job.country !== filters.country) return false;
      
      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.every(tag => job.tags.includes(tag))) return false;
      
      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const filtered = filterJobsByDateRange([job], filters.dateRange.start, filters.dateRange.end);
        if (!filtered.length) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "company":
          comparison = a.company.localeCompare(b.company);
          break;
        case "position":
          comparison = a.position.localeCompare(b.position);
          break;
        case "status":
          comparison = JOB_STATUSES.indexOf(a.status as any) - JOB_STATUSES.indexOf(b.status as any);
          break;
        case "country":
          comparison = a.country.localeCompare(b.country);
          break;
        default: // date
          const dateA = new Date(a.applicationDate || a.id).getTime();
          const dateB = new Date(b.applicationDate || b.id).getTime();
          comparison = dateA - dateB;
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Analytics data
  const totalApps = jobs.length;
  const statusStats = JOB_STATUSES.map(status => jobs.filter(j => j.status === status).length);

  const pieData = {
    labels: JOB_STATUSES,
    datasets: [{
      data: statusStats,
      backgroundColor: [
        "#60a5fa", // Applied
        "#fde68a", // Interview  
        "#6ee7b7", // Offer
        "#fca5a5", // Rejected
        "#e5e7eb", // Withdrawn
      ],
      borderWidth: 1,
    }],
  };

  // Timeline data
  function groupJobsByDate(jobs: Job[]) {
    const groups: Record<string, Job[]> = {};
    jobs.forEach(job => {
      const date = new Date(job.applicationDate || job.id).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(job);
    });
    return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }

  const timelineGroups = groupJobsByDate(filteredJobs);

  function updateFilters(newFilters: Partial<FilterState>) {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }

  function clearAllFilters() {
    setFilters({
      status: "",
      tags: [],
      country: "",
      search: "",
      dateRange: { start: "", end: "" },
    });
    setSearch("");
  }

  function toggleSortOrder() {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  }

  function dismissIntro() {
    setShowIntro(false);
    localStorage.setItem("jobtracker-seen-intro", "1");
  }

  // Only render after theme is determined
  if (dark === null) {
    return null;
  }

  const hasActiveFilters = search || filters.status || filters.country || 
    filters.tags.length > 0 || filters.dateRange.start || filters.dateRange.end;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      dark ? "dark bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              JobTracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your job applications with ease
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
              {[
                { key: "list", icon: "☰", label: "List" },
                { key: "timeline", icon: "📅", label: "Timeline" },
                { key: "analytics", icon: "📊", label: "Analytics" }
              ].map(view => (
                <button
                  key={view.key}
                  onClick={() => setCurrentView(view.key as "list" | "timeline" | "analytics")}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    currentView === view.key
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title={view.label}
                >
                  <span className="mr-1">{view.icon}</span>
                  <span className="hidden sm:inline">{view.label}</span>
                </button>
              ))}
            </div>

            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
          </div>
        </header>

        {/* Controls */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search companies, positions, notes..."
                  className="input"
                />
              </div>

              {/* Quick Controls */}
              <div className="flex flex-wrap gap-2 items-center">
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

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="select"
                >
                  <option value="date">Sort by Date</option>
                  <option value="company">Sort by Company</option>
                  <option value="position">Sort by Position</option>
                  <option value="status">Sort by Status</option>
                  <option value="country">Sort by Country</option>
                </select>

                <button
                  onClick={toggleSortOrder}
                  className="btn-secondary"
                  title={`Sort ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>

                <button
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`btn ${showFilterPanel || hasActiveFilters ? "btn-primary" : "btn-secondary"}`}
                >
                  🔍 Filters
                </button>

                <button
                  onClick={() => setShowExportModal(true)}
                  className="btn-success"
                >
                  📤 Export
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="btn-danger"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {filteredJobs.length} of {totalApps} applications
                  {hasActiveFilters ? " (filtered)" : ""}
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {JOB_STATUSES.map(status => {
                    const count = filteredJobs.filter(j => j.status === status).length;
                    return count > 0 ? (
                      <span key={status} className={`badge ${STATUS_COLORS[status]}`}>
                        {status}: {count}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        {showFilterPanel && (
          <FilterPanel
            filters={filters}
            updateFilters={updateFilters}
            allTags={allTags}
            allCountries={allCountries}
            onClose={() => setShowFilterPanel(false)}
          />
        )}

        {/* Main Content */}
        <main>
          {currentView === "analytics" && (
            <Analytics
              jobs={jobs}
              filteredJobs={filteredJobs}
              statusColors={STATUS_COLORS}
            />
          )}

          {currentView === "timeline" && (
            <Timeline
              timelineGroups={timelineGroups}
              customFields={customFields}
              statusColors={STATUS_COLORS}
              onJobClick={setSelectedJob}
            />
          )}

          {currentView === "list" && (
            <>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 mb-4">
                    {totalApps === 0 
                      ? "Get started by exploring the sample data or adding your own applications."
                      : "Try adjusting your search or filters to find applications."
                    }
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="btn-primary"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <DashboardJobList
                  jobs={filteredJobs}
                  statusColors={STATUS_COLORS}
                  onJobClick={setSelectedJob}
                />
              )}
            </>
          )}
        </main>

        {/* Modals */}
        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            customFields={customFields}
            statusColors={STATUS_COLORS}
            onClose={() => setSelectedJob(null)}
          />
        )}

        {showExportModal && (
          <ExportModal
            jobs={filteredJobs.length > 0 ? filteredJobs : jobs}
            onClose={() => setShowExportModal(false)}
          />
        )}

        {showIntro && (
          <IntroModal onClose={dismissIntro} />
        )}

        <InstallPrompt />

        {/* Help Button */}
        <button
          className="fixed bottom-4 left-4 z-40 btn-ghost"
          onClick={() => setShowIntro(true)}
          aria-label="Show help"
        >
          ℹ️ Help
        </button>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>JobTracker &copy; 2025 - Open Source Application Management</p>
          <p className="text-xs mt-1">
            Built with Next.js, React, and TypeScript
          </p>
        </footer>
      </div>
    </div>
  );
}