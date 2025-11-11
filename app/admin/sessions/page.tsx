'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { fetchWithAuth } from '@/lib/auth';
import type { Session } from '@/lib/types';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetchWithAuth('/api/sessions');
        const data = await response.json();
        setSessions(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
        setIsLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const now = new Date();
  const filteredSessions = sessions.filter(s => {
    const sessionDate = new Date(s.start_time);
    if (filter === 'upcoming') return sessionDate > now;
    if (filter === 'past') return sessionDate <= now;
    return true;
  });

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
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Sessions & Events</h1>
          <p className="text-[var(--foreground)] opacity-60">
            Manage coaching sessions and workshop schedules
          </p>
        </div>
        <Button variant="primary">📅 Schedule Session</Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'upcoming' ? 'primary' : 'outline'}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </Button>
        <Button
          variant={filter === 'past' ? 'primary' : 'outline'}
          onClick={() => setFilter('past')}
        >
          Past
        </Button>
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-[var(--foreground)] opacity-60">No sessions found</p>
          </Card>
        ) : (
          filteredSessions.map((session) => (
            <Card key={session.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-[var(--foreground)]">
                      {session.title}
                    </h3>
                    <Badge variant={new Date(session.start_time) > now ? 'success' : 'info'}>
                      {new Date(session.start_time) > now ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-[var(--foreground)] opacity-70">
                    <div>
                      <span className="font-medium">📅 Date:</span>{' '}
                      {new Date(session.start_time).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">🕐 Time:</span>{' '}
                      {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div>
                      <span className="font-medium">📍 Location:</span> {session.location}
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-[var(--foreground)] opacity-60">
                    <span className="font-medium">Attendees:</span>{' '}
                    {session.attendees.length}/{session.capacity}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="text-sm">View</Button>
                  <Button variant="outline" className="text-sm">Edit</Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
