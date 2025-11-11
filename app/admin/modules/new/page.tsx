'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input, Textarea } from '../../../components/ui/Input';
import { fetchWithAuth, getUser } from '@/lib/auth';
import type { ModuleTag, AccessLevel } from '@/lib/types';

export default function NewModulePage() {
  const router = useRouter();
  const currentUser = getUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as ModuleTag[],
    access_level: 'facilitators' as AccessLevel,
    status: 'draft' as 'draft' | 'published'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const canPublish = currentUser && ['superadmin', 'admin'].includes(currentUser.role);

  const handleTagToggle = (tag: ModuleTag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'Select at least one tag';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetchWithAuth('/api/modules', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
          description: formData.description,
          tags: formData.tags,
          access_level: formData.access_level,
          status: formData.status,
          files: [] // In a real app, files would be uploaded separately
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Module created successfully!');
        router.push(`/admin/modules/${data.data.id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create module');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Failed to create module:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/modules" className="text-sm text-[var(--primary)] hover:underline">
          ← Back to Modules
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Create New Module</h1>
        <p className="text-[var(--foreground)] opacity-60">
          Add a new resource to the password-protected module library
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Basic Information</h3>

          <div className="space-y-4">
            <Input
              label="Module Title"
              placeholder="e.g., Trauma-Informed Facilitation Basics"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              required
            />

            <Textarea
              label="Description"
              placeholder="Detailed description of what this module covers..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={errors.description}
              helperText="Provide a comprehensive overview of the module content"
              required
            />
          </div>
        </Card>

        {/* Tags */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Tags</h3>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-4">
            Select which audiences this module is designed for
          </p>

          <div className="space-y-3">
            {(['1-on-1', 'team', 'facilitator'] as ModuleTag[]).map((tag) => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="w-4 h-4"
                />
                <div>
                  <span className="text-sm font-medium text-[var(--foreground)] capitalize">
                    {tag}
                  </span>
                  <p className="text-xs text-[var(--foreground)] opacity-60">
                    {tag === '1-on-1' && 'For individual coaching sessions'}
                    {tag === 'team' && 'For team workshops and group sessions'}
                    {tag === 'facilitator' && 'For facilitator training and certification'}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {errors.tags && (
            <p className="text-sm text-red-600 mt-2">{errors.tags}</p>
          )}
        </Card>

        {/* Access Level */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Access Level 🔒
          </h3>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-4">
            Control who can view this module
          </p>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="access_level"
                value="admin"
                checked={formData.access_level === 'admin'}
                onChange={(e) => setFormData({ ...formData, access_level: e.target.value as AccessLevel })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    Admin Only
                  </span>
                  <span className="text-lg">🔐</span>
                </div>
                <p className="text-xs text-[var(--foreground)] opacity-60">
                  Only administrators can view this module
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="access_level"
                value="facilitators"
                checked={formData.access_level === 'facilitators'}
                onChange={(e) => setFormData({ ...formData, access_level: e.target.value as AccessLevel })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    Facilitators
                  </span>
                  <span className="text-lg">🔒</span>
                </div>
                <p className="text-xs text-[var(--foreground)] opacity-60">
                  Facilitators and coaches can view (recommended for training materials)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="access_level"
                value="public"
                checked={formData.access_level === 'public'}
                onChange={(e) => setFormData({ ...formData, access_level: e.target.value as AccessLevel })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    Public
                  </span>
                  <span className="text-lg">🌍</span>
                </div>
                <p className="text-xs text-[var(--foreground)] opacity-60">
                  All authenticated users can view
                </p>
              </div>
            </label>
          </div>
        </Card>

        {/* File Upload Placeholder */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Files</h3>
          <p className="text-sm text-[var(--foreground)] opacity-60 mb-4">
            Upload resources (PDFs, audio, video, documents)
          </p>

          <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center">
            <div className="text-4xl mb-3">📎</div>
            <p className="text-sm text-[var(--foreground)] opacity-70 mb-3">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="outline" type="button">
              Choose Files
            </Button>
            <p className="text-xs text-[var(--foreground)] opacity-50 mt-3">
              (Mock file upload - in prototype, files are not actually uploaded)
            </p>
          </div>
        </Card>

        {/* Submit Actions */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                Ready to {canPublish ? 'save or publish' : 'save as draft'}?
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-60">
                {canPublish
                  ? 'You can save as draft or publish immediately'
                  : 'Drafts can be published later by an admin'}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/modules')}
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="outline"
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                disabled={isSubmitting}
                isLoading={isSubmitting && formData.status === 'draft'}
                className="min-w-[130px]"
              >
                Save as Draft
              </Button>

              {canPublish && (
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => setFormData({ ...formData, status: 'published' })}
                  disabled={isSubmitting}
                  isLoading={isSubmitting && formData.status === 'published'}
                  className="min-w-[130px]"
                >
                  Publish Now
                </Button>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
