'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { fetchWithAuth } from '@/lib/auth';
import type { Program, Module, User } from '@/lib/types';

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [facilitators, setFacilitators] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProgram();
  }, [resolvedParams.id]);

  async function fetchProgram() {
    try {
      const response = await fetchWithAuth(`/api/programs/${resolvedParams.id}`);
      const data = await response.json();

      if (response.ok) {
        setProgram(data.data);

        // Fetch modules
        const modulesRes = await fetchWithAuth('/api/modules');
        const modulesData = await modulesRes.json();
        if (modulesRes.ok) {
          const programModules = modulesData.data.filter((m: Module) =>
            data.data.modules.includes(m.id)
          );
          setModules(programModules);
        }

        // Fetch facilitators
        const usersRes = await fetchWithAuth('/api/users');
        const usersData = await usersRes.json();
        if (usersRes.ok) {
          const programFacilitators = usersData.data.filter((u: User) =>
            data.data.facilitators.includes(u.id)
          );
          setFacilitators(programFacilitators);
        }
      } else {
        alert(data.error || 'Failed to load program');
        router.push('/admin/programs');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch program:', error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-20">
          <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="p-8">
        <Card className="text-center py-12">
          <p className="text-[var(--foreground)] opacity-60">Program not found</p>
          <Link href="/admin/programs" className="mt-4 inline-block">
            <Button variant="primary">Back to Programs</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const programTypeLabel =
    program.type === 'one_on_one' ? '1-on-1 Coaching' :
    program.type === 'workshop' ? 'Workshop' : 'Certification';

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/programs" className="text-sm text-[var(--primary)] hover:underline">
          ← Back to Programs
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">{program.title}</h1>
            <Badge variant="info">{programTypeLabel}</Badge>
            <Badge variant={program.enrollment_settings.open ? 'success' : 'warning'}>
              {program.enrollment_settings.open ? 'Open' : 'Closed'}
            </Badge>
          </div>
          <p className="text-sm text-[var(--foreground)] opacity-60">
            Created {new Date(program.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">✏️ Edit</Button>
          <Button variant="primary">👥 Manage Enrollment</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Description</h3>
            <p className="text-[var(--foreground)] opacity-80 whitespace-pre-line">
              {program.description}
            </p>
          </Card>

          {/* Curriculum / Modules */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Curriculum ({modules.length} Modules)
              </h3>
              <Button variant="outline" className="text-sm">
                + Add Module
              </Button>
            </div>

            {modules.length === 0 ? (
              <p className="text-sm text-[var(--foreground)] opacity-60 text-center py-8">
                No modules added yet
              </p>
            ) : (
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <Link key={module.id} href={`/admin/modules/${module.id}`}>
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--sidebar-bg)] transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm text-[var(--foreground)]">
                            {module.title}
                          </h4>
                          <Badge variant={module.status === 'published' ? 'success' : 'warning'}>
                            {module.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-[var(--foreground)] opacity-60 line-clamp-2">
                          {module.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {module.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          {/* Facilitators */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Facilitators ({facilitators.length})
              </h3>
              <Button variant="outline" className="text-sm">
                + Assign Facilitator
              </Button>
            </div>

            {facilitators.length === 0 ? (
              <p className="text-sm text-[var(--foreground)] opacity-60 text-center py-8">
                No facilitators assigned yet
              </p>
            ) : (
              <div className="space-y-3">
                {facilitators.map((facilitator) => (
                  <div
                    key={facilitator.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)]"
                  >
                    <div>
                      <p className="font-medium text-sm text-[var(--foreground)]">
                        {facilitator.name}
                      </p>
                      <p className="text-xs text-[var(--foreground)] opacity-60">
                        {facilitator.email}
                      </p>
                      {facilitator.profile.certifications && facilitator.profile.certifications.length > 0 && (
                        <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">
                          {facilitator.profile.certifications.join(', ')}
                        </p>
                      )}
                    </div>
                    <Badge variant="success">{facilitator.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Progress Tracking (Certification Only) */}
          {program.type === 'certification' && (
            <Card>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Trainee Progress
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)]">
                  <div>
                    <p className="font-medium text-sm text-[var(--foreground)]">Taylor Brooks</p>
                    <p className="text-xs text-[var(--foreground)] opacity-60">Facilitator Trainee</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-[var(--foreground)]">2/3</p>
                      <p className="text-xs text-[var(--foreground)] opacity-60">modules</p>
                    </div>
                    <div className="w-24 h-2 bg-[var(--sidebar-bg)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)]" style={{ width: '67%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statistics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Enrolled</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">12</p>
              </div>
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Completed</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">8</p>
              </div>
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Active</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">4</p>
              </div>
              {program.enrollment_settings.capacity && (
                <div>
                  <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Capacity</p>
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {program.enrollment_settings.capacity}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Settings */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Settings</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Enrollment</p>
                <Badge variant={program.enrollment_settings.open ? 'success' : 'warning'}>
                  {program.enrollment_settings.open ? 'Open' : 'Closed'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Program Type</p>
                <Badge variant="info">{programTypeLabel}</Badge>
              </div>
              <div>
                <p className="text-sm text-[var(--foreground)] opacity-60 mb-1">Program ID</p>
                <p className="text-[var(--foreground)] font-mono text-xs">{program.id}</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                📧 Send Update Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📊 View Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📋 Export Roster
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600">
                🗑️ Archive Program
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
