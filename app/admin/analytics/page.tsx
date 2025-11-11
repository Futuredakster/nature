'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { fetchWithAuth } from '@/lib/auth';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetchWithAuth('/api/analytics/overview');
        const data = await response.json();
        setStats(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(`Exporting analytics as ${format.toUpperCase()}... (Mock functionality)`);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-20">
          <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Analytics & Reports</h1>
          <p className="text-[var(--foreground)] opacity-60">
            Track platform engagement and program performance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            📥 Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            📄 Export PDF
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">New Signups (30d)</p>
          <p className="text-3xl font-bold text-[var(--foreground)]">{stats.newSignups30Days}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% vs last month</p>
        </Card>

        <Card>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Module Downloads</p>
          <p className="text-3xl font-bold text-[var(--foreground)]">247</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% vs last month</p>
        </Card>

        <Card>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Session Bookings</p>
          <p className="text-3xl font-bold text-[var(--foreground)]">34</p>
          <p className="text-xs text-red-600 mt-2">↓ 3% vs last month</p>
        </Card>

        <Card>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Avg. Completion Rate</p>
          <p className="text-3xl font-bold text-[var(--foreground)]">78%</p>
          <p className="text-xs text-green-600 mt-2">↑ 5% vs last month</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Engagement by Program Type
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--foreground)]">1-on-1 Coaching</span>
                <span className="text-[var(--foreground)] opacity-60">45%</span>
              </div>
              <div className="h-3 bg-[var(--sidebar-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--primary)]" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--foreground)]">Team Workshops</span>
                <span className="text-[var(--foreground)] opacity-60">35%</span>
              </div>
              <div className="h-3 bg-[var(--sidebar-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--secondary)]" style={{ width: '35%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--foreground)]">Facilitator Certification</span>
                <span className="text-[var(--foreground)] opacity-60">20%</span>
              </div>
              <div className="h-3 bg-[var(--sidebar-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)]" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            User Growth (Last 6 Months)
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[12, 18, 22, 28, 35, 42].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-[var(--primary)] rounded-t"
                style={{ height: `${height * 3}px` }}
                title={`Month ${i + 1}: ${height} users`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-[var(--foreground)] opacity-60 mt-2">
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Module Access Analytics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3 text-sm font-semibold">Module</th>
                <th className="text-left p-3 text-sm font-semibold">Views</th>
                <th className="text-left p-3 text-sm font-semibold">Downloads</th>
                <th className="text-left p-3 text-sm font-semibold">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)]">
                <td className="p-3 text-sm">Trauma-Informed Facilitation Basics</td>
                <td className="p-3 text-sm">156</td>
                <td className="p-3 text-sm">89</td>
                <td className="p-3 text-sm">24 min</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="p-3 text-sm">Building Emotional Resilience</td>
                <td className="p-3 text-sm">134</td>
                <td className="p-3 text-sm">76</td>
                <td className="p-3 text-sm">18 min</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="p-3 text-sm">Team Debriefing After Critical Incidents</td>
                <td className="p-3 text-sm">98</td>
                <td className="p-3 text-sm">54</td>
                <td className="p-3 text-sm">31 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
