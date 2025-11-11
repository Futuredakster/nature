'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clearAuth, getUser } from '@/lib/auth';
import { User } from '@/lib/types';

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[var(--primary)] text-white'
          : 'text-[var(--foreground)] hover:bg-[var(--primary)] hover:bg-opacity-10'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/login';
  };

  const navItems = [
    { href: '/admin', icon: '📊', label: 'Dashboard' },
    { href: '/admin/users', icon: '👥', label: 'Users' },
    { href: '/admin/modules', icon: '📚', label: 'Modules' },
    { href: '/admin/programs', icon: '🎓', label: 'Programs' },
    { href: '/admin/sessions', icon: '📅', label: 'Sessions' },
    { href: '/admin/community', icon: '💬', label: 'Community' },
    { href: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <aside className="w-64 min-h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col">
      <div className="p-6 border-b border-[var(--border)]">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-2xl">🏔️</span>
          <div>
            <h1 className="text-lg font-bold text-[var(--primary)]">Resilience</h1>
            <p className="text-xs text-[var(--foreground)] opacity-60">Admin Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
          />
        ))}
      </nav>

      {user && (
        <div className="p-4 border-t border-[var(--border)]">
          <div className="mb-3">
            <p className="text-sm font-medium text-[var(--foreground)]">{user.name}</p>
            <p className="text-xs text-[var(--foreground)] opacity-60">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]">
              {user.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline w-full text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
