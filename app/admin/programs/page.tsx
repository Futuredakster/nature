'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { fetchWithAuth } from '@/lib/auth';
import type { Program } from '@/lib/types';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await fetchWithAuth('/api/programs');
        const data = await response.json();
        setPrograms(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
        setIsLoading(false);
      }
    }
    fetchPrograms();
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
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Programs</h1>
          <p className="text-[var(--foreground)] opacity-60">
            Manage coaching programs, workshops, and certification courses
          </p>
        </div>
        <Button variant="primary">🎓 Create Program</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id} className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="info">
                {program.type === 'one_on_one' ? '1-on-1' :
                 program.type === 'workshop' ? 'Workshop' : 'Certification'}
              </Badge>
              <Badge variant={program.enrollment_settings.open ? 'success' : 'warning'}>
                {program.enrollment_settings.open ? 'Open' : 'Closed'}
              </Badge>
            </div>

            <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
              {program.title}
            </h3>

            <p className="text-sm text-[var(--foreground)] opacity-70 mb-4 flex-1">
              {program.description}
            </p>

            <div className="pt-4 border-t border-[var(--border)] space-y-2 text-xs text-[var(--foreground)] opacity-60">
              <p>📚 {program.modules.length} modules</p>
              <p>👥 {program.facilitators.length} facilitators</p>
              {program.enrollment_settings.capacity && (
                <p>🎯 Capacity: {program.enrollment_settings.capacity}</p>
              )}
            </div>

            <Link href={`/admin/programs/${program.id}`} className="mt-4">
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
