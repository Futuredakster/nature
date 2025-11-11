'use client';

import React from 'react';
import { Card } from '../../components/ui/Card';

export default function CommunityPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Community</h1>
        <p className="text-[var(--foreground)] opacity-60">
          Community features and forum management (Coming Soon)
        </p>
      </div>

      <Card className="max-w-3xl">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
            Community Features
          </h2>
          <p className="text-[var(--foreground)] opacity-70 mb-6 max-w-xl mx-auto">
            This section will include community forums, discussion threads, group spaces,
            and moderation tools. Inspired by Responder Alliance's community structure.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="p-4 rounded-lg bg-[var(--sidebar-bg)]">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">📝 Planned Features</h3>
              <ul className="text-sm text-[var(--foreground)] opacity-70 space-y-1">
                <li>• Discussion forums by topic</li>
                <li>• Private group spaces</li>
                <li>• Direct messaging</li>
                <li>• Resource sharing</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-[var(--sidebar-bg)]">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">🛡️ Moderation Tools</h3>
              <ul className="text-sm text-[var(--foreground)] opacity-70 space-y-1">
                <li>• Content moderation queue</li>
                <li>• User reporting system</li>
                <li>• Community guidelines enforcement</li>
                <li>• Facilitator oversight</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
