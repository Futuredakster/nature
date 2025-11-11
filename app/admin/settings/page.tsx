'use client';

import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState('Resilience Platform');
  const [openRegistration, setOpenRegistration] = useState(true);
  const [defaultAccessLevel, setDefaultAccessLevel] = useState('public');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert('Settings saved successfully! (Mock functionality)');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Settings</h1>
        <p className="text-[var(--foreground)] opacity-60">
          Configure platform settings and preferences
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* General Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            General Settings
          </h3>
          <div className="space-y-4">
            <Input
              label="Platform Name"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              helperText="Display name for your platform"
            />

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={openRegistration}
                  onChange={(e) => setOpenRegistration(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-[var(--foreground)]">
                  Allow open registration
                </span>
              </label>
              <p className="text-xs text-[var(--foreground)] opacity-60 mt-1 ml-6">
                When enabled, new users can sign up without invitation
              </p>
            </div>
          </div>
        </Card>

        {/* Module Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Module Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
                Default Access Level for New Modules
              </label>
              <select
                value={defaultAccessLevel}
                onChange={(e) => setDefaultAccessLevel(e.target.value)}
                className="w-full"
              >
                <option value="admin">Admin Only</option>
                <option value="facilitators">Facilitators</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Branding */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Branding
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value="#21543c"
                  className="w-12 h-12 rounded border border-[var(--border)]"
                  readOnly
                />
                <span className="text-sm text-[var(--foreground)] opacity-60">
                  #21543c (Forest Green)
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
                Logo Upload
              </label>
              <Button variant="outline">Choose File</Button>
              <p className="text-xs text-[var(--foreground)] opacity-60 mt-2">
                Recommended size: 200x200px, PNG or SVG
              </p>
            </div>
          </div>
        </Card>

        {/* Email Templates */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Email Templates
          </h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              📧 Welcome Email Template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📧 Invitation Email Template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📧 Password Reset Template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📧 Session Reminder Template
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleSave}>
            Save Settings
          </Button>
          {saved && (
            <span className="text-sm text-green-600">✓ Settings saved successfully</span>
          )}
        </div>
      </div>
    </div>
  );
}
