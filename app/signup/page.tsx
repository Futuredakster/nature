import Link from 'next/link';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <nav className="container-main py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-xl font-bold text-[var(--primary)]">Resilience Platform</h1>
          </Link>
          <Link href="/login" className="text-sm text-[var(--primary)] hover:underline">
            Already have an account? Sign in
          </Link>
        </nav>
      </header>

      <main className="container-main py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Join Our Community
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-70">
              Start your journey toward emotional resilience in the backcountry
            </p>
          </div>

          <Card>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  required
                />
              </div>

              <Input
                type="email"
                label="Email Address"
                placeholder="john.doe@example.com"
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="Create a secure password"
                helperText="At least 8 characters"
                required
              />

              <Input
                type="tel"
                label="Phone Number (Optional)"
                placeholder="(555) 123-4567"
              />

              <div>
                <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
                  I'm interested in:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-[var(--foreground)]">1-on-1 Coaching</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-[var(--foreground)]">Team Workshops</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-[var(--foreground)]">Facilitator Certification</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary" className="w-full">
                  Create Account
                </Button>
              </div>

              <p className="text-xs text-center text-[var(--foreground)] opacity-60">
                By signing up, you agree to our{' '}
                <Link href="/terms" className="text-[var(--primary)] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[var(--primary)] hover:underline">Privacy Policy</Link>
              </p>
            </form>
          </Card>

          <p className="text-center text-sm text-[var(--foreground)] opacity-60 mt-6">
            This is a prototype. Signup functionality is mocked.
          </p>
        </div>
      </main>
    </div>
  );
}
