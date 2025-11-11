'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { fetchWithAuth } from '@/lib/auth';
import type { DashboardStats, Session, User } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch dashboard stats
        const statsRes = await fetchWithAuth('/api/analytics/overview');
        const statsData = await statsRes.json();
        setStats(statsData.data);

        // Fetch upcoming sessions
        const sessionsRes = await fetchWithAuth('/api/sessions?upcoming=true');
        const sessionsData = await sessionsRes.json();
        setUpcomingSessions(sessionsData.data.slice(0, 5));

        // Fetch recent users
        const usersRes = await fetchWithAuth('/api/users');
        const usersData = await usersRes.json();
        setRecentUsers(usersData.data.slice(0, 5));

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

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
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-[var(--foreground)] opacity-60">
          Overview of your resilience coaching platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">New Signups</p>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                {stats?.newSignups30Days || 0}
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">Last 30 days</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Total Modules</p>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                {stats?.totalModules || 0}
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">Resources</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Active Coaches</p>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                {stats?.activeCoaches || 0}
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">Facilitators & coaches</p>
            </div>
            <div className="text-3xl">🎓</div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Upcoming Sessions</p>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                {stats?.upcomingSessions || 0}
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">Scheduled</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/modules/new">
            <Button variant="primary">
              📚 Create Module
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="secondary">
              👤 Invite Facilitator
            </Button>
          </Link>
          <Link href="/admin/programs">
            <Button variant="secondary">
              🎓 Create Program
            </Button>
          </Link>
          <Link href="/admin/sessions">
            <Button variant="outline">
              📅 Schedule Session
            </Button>
          </Link>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Upcoming Sessions</h3>
            <Link href="/admin/sessions" className="text-sm text-[var(--primary)] hover:underline">
              View All
            </Link>
          </div>

          {upcomingSessions.length === 0 ? (
            <p className="text-sm text-[var(--foreground)] opacity-60 py-8 text-center">
              No upcoming sessions scheduled
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--sidebar-bg)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-[var(--foreground)]">{session.title}</h4>
                    <Badge variant="info">{new Date(session.start_time).toLocaleDateString()}</Badge>
                  </div>
                  <p className="text-xs text-[var(--foreground)] opacity-60">
                    📍 {session.location} • {session.attendees.length}/{session.capacity} attendees
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Users */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Recent Users</h3>
            <Link href="/admin/users" className="text-sm text-[var(--primary)] hover:underline">
              View All
            </Link>
          </div>

          {recentUsers.length === 0 ? (
            <p className="text-sm text-[var(--foreground)] opacity-60 py-8 text-center">
              No users found
            </p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--sidebar-bg)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm text-[var(--foreground)]">{user.name}</h4>
                      <p className="text-xs text-[var(--foreground)] opacity-60">{user.email}</p>
                    </div>
                    <Badge
                      variant={
                        user.status === 'active' ? 'success' :
                        user.status === 'invited' ? 'warning' : 'info'
                      }
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--foreground)] opacity-50">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
