"use client";

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Job } from "@/types";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface AnalyticsProps {
  jobs: Job[];
  filteredJobs: Job[];
  statusColors: Record<string, string>;
}

const Analytics: React.FC<AnalyticsProps> = ({ 
  jobs, 
  filteredJobs,
  statusColors
}) => {
  const totalApps = jobs.length;
  const filteredTotal = filteredJobs.length;
  
  // Status statistics
  const statusStats = ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"].map(
    status => jobs.filter(j => j.status === status).length
  );
  
  const filteredStatusStats = ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"].map(
    status => filteredJobs.filter(j => j.status === status).length
  );

  // Success and response rates
  const successRate = filteredTotal ? Math.round((filteredJobs.filter(j => j.status === "Offer").length / filteredTotal) * 100) : 0;
  const responseRate = filteredTotal ? Math.round((filteredJobs.filter(j => ["Interview", "Offer"].includes(j.status)).length / filteredTotal) * 100) : 0;
  
  // Country distribution
  const countryStats = filteredJobs.reduce((acc, job) => {
    acc[job.country] = (acc[job.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCountries = Object.entries(countryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Monthly application trend
  const monthlyStats = filteredJobs.reduce((acc, job) => {
    const date = new Date(job.applicationDate || job.id);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = {
    labels: Object.keys(monthlyStats).sort().slice(-6),
    datasets: [{
      label: 'Applications',
      data: Object.keys(monthlyStats).sort().slice(-6).map(month => monthlyStats[month] || 0),
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2
    }]
  };

  // Top tags
  const tagStats = filteredJobs.reduce((acc, job) => {
    job.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Salary analysis
  const salariesWithData = filteredJobs
    .filter(job => job.salaryExpectation)
    .map(job => {
      const salary = job.salaryExpectation;
      if (!salary) return 0;
      const numbers = salary.match(/\d+/g);
      if (numbers) {
        const multiplier = salary.includes('k') || salary.includes('K') ? 1000 : 1;
        return parseInt(numbers[0]) * multiplier;
      }
      return 0;
    })
    .filter(salary => salary > 0);

  const avgSalary = salariesWithData.length > 0 
    ? Math.round(salariesWithData.reduce((a, b) => a + b, 0) / salariesWithData.length)
    : 0;

  const pieData = {
    labels: ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"],
    datasets: [{
      data: statusStats,
      backgroundColor: [
        "#60a5fa", // Applied - blue
        "#fbbf24", // Interview - yellow  
        "#34d399", // Offer - green
        "#f87171", // Rejected - red
        "#9ca3af", // Withdrawn - gray
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📊 Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Insights from your job applications
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{filteredTotal}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Applications</div>
            {filteredTotal !== totalApps && (
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                ({totalApps} total)
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-success-600 dark:text-success-400">{successRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Offer Rate</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {filteredJobs.filter(j => j.status === "Offer").length} offers
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-warning-600 dark:text-warning-400">{responseRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Response Rate</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Interview+ responses
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {avgSalary > 0 ? `$${Math.round(avgSalary/1000)}k` : 'N/A'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Salary</div>
            {avgSalary > 0 && (
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Based on {salariesWithData.length} applications
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Application Status Distribution
            </h3>
          </div>
          <div className="card-body">
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 mb-4">
                <Pie 
                  data={pieData} 
                  options={{ 
                    plugins: { legend: { display: false } }, 
                    maintainAspectRatio: false 
                  }} 
                />
              </div>
              <div className="space-y-2 w-full">
                {["Applied", "Interview", "Offer", "Rejected", "Withdrawn"].map((status, i) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${statusColors[status] || 'bg-gray-400'}`}></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{status}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {statusStats[i]} ({statusStats[i] > 0 ? Math.round((statusStats[i] / totalApps) * 100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Application Trend (Last 6 Months)
            </h3>
          </div>
          <div className="card-body">
            <div className="h-64">
              <Bar 
                data={monthlyData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(156, 163, 175, 0.3)' }
                    },
                    x: {
                      grid: { color: 'rgba(156, 163, 175, 0.3)' }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Countries */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🌍 Top Countries
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {topCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{country}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(count / filteredTotal) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Tags */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🏷️ Popular Tags
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {topTags.map(([tag, count]) => (
                <div key={tag} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">#{tag}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(count / filteredTotal) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-primary-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {filteredJobs.filter(j => j.status === "Interview").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Interviews</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success-600 dark:text-success-400">
              {filteredJobs.filter(j => j.status === "Offer").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Offers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
              {filteredJobs.filter(j => j.tags.includes('priority')).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Priority Apps</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredJobs.filter(j => j.reminder && new Date(j.reminder) >= new Date()).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Reminders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;