'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { fetchWithAuth, getUser } from '@/lib/auth';
import type { Module, User } from '@/lib/types';

export default function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(getUser());
    fetchModule();
  }, [resolvedParams.id]);

  async function fetchModule() {
    try {
      const response = await fetchWithAuth(`/api/modules/${resolvedParams.id}`);
      const data = await response.json();

      if (response.ok) {
        setModule(data.data);

        // Fetch author info
        const authorRes = await fetchWithAuth(`/api/users/${data.data.author_id}`);
        const authorData = await authorRes.json();
        if (authorRes.ok) {
          setAuthor(authorData.data);
        }
      } else {
        alert(data.error || 'Failed to load module');
        router.push('/admin/modules');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch module:', error);
      setIsLoading(false);
    }
  }

  async function handlePublish() {
    if (!module) return;

    try {
      const response = await fetchWithAuth(`/api/modules/${module.id}/publish`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        setModule(data.data);
        alert('Module published successfully!');
      }
    } catch (error) {
      console.error('Failed to publish module:', error);
    }
  }

  const canPublish = currentUser && ['superadmin', 'admin'].includes(currentUser.role);
  const canEdit = currentUser && ['superadmin', 'admin', 'facilitator'].includes(currentUser.role);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-20">
          <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="p-8">
        <Card className="text-center py-12">
          <p className="text-[var(--foreground)] opacity-60">Module not found</p>
          <Link href="/admin/modules" className="mt-4 inline-block">
            <Button variant="primary">Back to Modules</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Link href="/admin/modules" className="text-sm text-[var(--primary)] hover:underline">
          ← Back to Modules
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6 md:mb-8">
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{module.title}</h1>
            <Badge
              variant={
                module.status === 'published' ? 'success' :
                module.status === 'draft' ? 'warning' : 'error'
              }
            >
              {module.status}
            </Badge>
            {module.access_level === 'admin' && <span className="text-2xl" title="Admin Only">🔐</span>}
            {module.access_level === 'facilitators' && <span className="text-2xl" title="Facilitators Only">🔒</span>}
          </div>
          <p className="text-xs md:text-sm text-[var(--foreground)] opacity-60">
            Version {module.version} • Updated {new Date(module.updated_at).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2 md:gap-3 w-full lg:w-auto">
          {canEdit && (
            <Button variant="outline">✏️ Edit</Button>
          )}
          {canPublish && module.status === 'draft' && (
            <Button variant="primary" onClick={handlePublish}>
              📤 Publish
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Description</h3>
            <p className="text-[var(--foreground)] opacity-80 whitespace-pre-line">
              {module.description}
            </p>
          </Card>

          {/* Files */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Files ({module.files.length})
            </h3>
            <div className="space-y-3">
              {module.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--sidebar-bg)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {file.mimetype.includes('pdf') ? '📄' :
                       file.mimetype.includes('audio') ? '🎵' :
                       file.mimetype.includes('video') ? '🎥' :
                       file.mimetype.includes('word') ? '📝' : '📎'}
                    </span>
                    <div>
                      <p className="font-medium text-sm text-[var(--foreground)]">
                        {file.filename}
                      </p>
                      <p className="text-xs text-[var(--foreground)] opacity-60">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" className="text-xs md:text-sm px-2 md:px-3">
                      👁️ Preview
                    </Button>
                    <Button variant="outline" className="text-xs md:text-sm px-2 md:px-3">
                      📥 Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Version History */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Version History
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium">
                  {module.version}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-[var(--foreground)]">Current Version</p>
                  <p className="text-xs text-[var(--foreground)] opacity-60">
                    Updated {new Date(module.updated_at).toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--foreground)] opacity-60 mt-1">
                    By {author?.name || 'Unknown'}
                  </p>
                </div>
              </div>
              {module.version > 1 && (
                <div className="flex items-start gap-3 pb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--border)] text-[var(--foreground)] flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-[var(--foreground)]">Initial Version</p>
                    <p className="text-xs text-[var(--foreground)] opacity-60">
                      Created {new Date(module.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <Card>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[var(--foreground)] opacity-60 mb-1">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <Badge key={tag} variant="info">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[var(--foreground)] opacity-60 mb-1">Access Level</p>
                <Badge variant={
                  module.access_level === 'admin' ? 'error' :
                  module.access_level === 'facilitators' ? 'warning' : 'success'
                }>
                  {module.access_level === 'admin' ? 'Admin Only' :
                   module.access_level === 'facilitators' ? 'Facilitators' : 'Public'}
                </Badge>
              </div>

              <div>
                <p className="text-[var(--foreground)] opacity-60 mb-1">Author</p>
                <p className="text-[var(--foreground)]">{author?.name || 'Unknown'}</p>
              </div>

              <div>
                <p className="text-[var(--foreground)] opacity-60 mb-1">Created</p>
                <p className="text-[var(--foreground)]">
                  {new Date(module.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-[var(--foreground)] opacity-60 mb-1">Last Updated</p>
                <p className="text-[var(--foreground)]">
                  {new Date(module.updated_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-[var(--foreground)] opacity-60 mb-1">Module ID</p>
                <p className="text-[var(--foreground)] font-mono text-xs">{module.id}</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          {canEdit && (
            <Card>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📎 Upload Files
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏷️ Edit Metadata
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📋 Duplicate
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  🗑️ Archive
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
