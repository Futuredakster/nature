'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { setAuth, isAuthenticated } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      // Save auth data
      setAuth(result.data);

      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset email would be sent to your email address. (Mock functionality)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--light-sage)] to-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="text-5xl">🏔️</span>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--primary)] mb-1">Admin Portal</h1>
          <p className="text-sm text-[var(--foreground)] opacity-60">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Email Address"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[var(--primary)] hover:underline w-full text-center"
            >
              Forgot password?
            </button>
          </form>
        </div>

        {/* Test Credentials Helper */}
        <div className="mt-6 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)]">
          <p className="text-xs font-semibold text-[var(--foreground)] mb-2">
            Test Credentials (Prototype):
          </p>
          <div className="space-y-1 text-xs text-[var(--foreground)] opacity-70">
            <p><strong>Admin:</strong> marcus@example.com (any password)</p>
            <p><strong>Super Admin:</strong> alex@example.com (any password)</p>
            <p><strong>Facilitator:</strong> ava@example.com (any password)</p>
            <p><strong>Coach:</strong> dana@example.com (any password)</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
