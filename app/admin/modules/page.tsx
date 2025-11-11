'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { fetchWithAuth, getUser } from '@/lib/auth';
import type { Module, ModuleTag, User } from '@/lib/types';

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(getUser());
    fetchModules();
  }, []);

  useEffect(() => {
    filterModules();
  }, [modules, searchQuery, tagFilter, accessFilter, statusFilter]);

  async function fetchModules() {
    try {
      const response = await fetchWithAuth('/api/modules');
      const data = await response.json();
      setModules(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
      setIsLoading(false);
    }
  }

  function filterModules() {
    let filtered = [...modules];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    if (tagFilter !== 'all') {
      filtered = filtered.filter((m) => m.tags.includes(tagFilter as ModuleTag));
    }

    if (accessFilter !== 'all') {
      filtered = filtered.filter((m) => m.access_level === accessFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    setFilteredModules(filtered);
  }

  const canUpload = currentUser && ['superadmin', 'admin', 'facilitator'].includes(currentUser.role);

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
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
            🔒 Modules
          </h1>
          <p className="text-[var(--foreground)] opacity-60">
            Password-protected resource library for coaching materials
          </p>
        </div>
        {canUpload && (
          <Link href="/admin/modules/new">
            <Button variant="primary">
              📚 Add Module
            </Button>
          </Link>
        )}
      </div>

      {/* Access Level Notice */}
      <Card className="mb-6 bg-[var(--light-sage)] border-[var(--primary)]">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔐</span>
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-1">
              Secure Module Library
            </h3>
            <p className="text-sm text-[var(--foreground)] opacity-80">
              This section is password-protected. Only authorized administrators and facilitators
              can upload and manage modules. Access levels control who can view each resource.
            </p>
            {currentUser && (
              <p className="text-xs text-[var(--foreground)] opacity-60 mt-2">
                Your access level: <strong>{currentUser.role}</strong>
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid md:grid-cols-5 gap-4">
          <Input
            type="search"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="border border-[var(--border)] rounded-lg px-3 py-2"
          >
            <option value="all">All Tags</option>
            <option value="1-on-1">1-on-1</option>
            <option value="team">Team</option>
            <option value="facilitator">Facilitator</option>
          </select>

          <select
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
            className="border border-[var(--border)] rounded-lg px-3 py-2"
          >
            <option value="all">All Access Levels</option>
            <option value="admin">Admin Only</option>
            <option value="facilitators">Facilitators</option>
            <option value="public">Public</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[var(--border)] rounded-lg px-3 py-2"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <Button variant="outline">
            📥 Export List
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">{modules.length}</p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Total Modules</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {modules.filter(m => m.status === 'published').length}
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Published</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {modules.filter(m => m.access_level === 'facilitators').length}
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Facilitator Only</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {modules.filter(m => m.status === 'draft').length}
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Drafts</p>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.length === 0 ? (
          <Card className="col-span-full text-center py-12">
            <p className="text-[var(--foreground)] opacity-60">
              No modules found matching your filters
            </p>
          </Card>
        ) : (
          filteredModules.map((module) => (
            <Link href={`/admin/modules/${module.id}`} key={module.id}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    variant={
                      module.status === 'published' ? 'success' :
                      module.status === 'draft' ? 'warning' : 'error'
                    }
                  >
                    {module.status}
                  </Badge>
                  {module.access_level === 'admin' && (
                    <span className="text-lg" title="Admin Only">🔐</span>
                  )}
                  {module.access_level === 'facilitators' && (
                    <span className="text-lg" title="Facilitators Only">🔒</span>
                  )}
                </div>

                <h3 className="font-semibold text-[var(--foreground)] mb-2 text-lg">
                  {module.title}
                </h3>

                <p className="text-sm text-[var(--foreground)] opacity-70 mb-4 flex-1 line-clamp-3">
                  {module.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--foreground)] opacity-60">
                  <span>📎 {module.files.length} file{module.files.length !== 1 ? 's' : ''}</span>
                  <span>v{module.version}</span>
                  <span>{new Date(module.updated_at).toLocaleDateString()}</span>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
