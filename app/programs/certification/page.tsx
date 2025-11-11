import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <nav className="container-main py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-xl font-bold text-[var(--primary)]">Resilience Platform</h1>
          </Link>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </nav>
      </header>

      <main className="container-main py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block">
            ← Back to Home
          </Link>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Facilitator Certification Program
            </h1>
            <p className="text-xl text-[var(--foreground)] opacity-70">
              Train to support others in wilderness resilience work
            </p>
          </div>

          <Card className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Program Overview</h2>
            <p className="text-[var(--foreground)] opacity-80 mb-6">
              Our comprehensive facilitator certification program trains coaches, therapists, team leaders,
              and educators to facilitate trauma-informed resilience work with backcountry professionals.
            </p>

            <h3 className="font-semibold text-[var(--foreground)] mb-3">Curriculum Includes:</h3>
            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <span className="text-lg">📚</span>
                <p className="text-[var(--foreground)] opacity-80">
                  Trauma-informed care principles and neurobiology
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">🌲</span>
                <p className="text-[var(--foreground)] opacity-80">
                  Nature-based therapeutic approaches
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">👥</span>
                <p className="text-[var(--foreground)] opacity-80">
                  Group facilitation skills and ethics
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">⛰️</span>
                <p className="text-[var(--foreground)] opacity-80">
                  Backcountry-specific incident response
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">🎯</span>
                <p className="text-[var(--foreground)] opacity-80">
                  Supervised practice hours with feedback
                </p>
              </div>
            </div>

            <div className="p-4 bg-[var(--light-sage)] rounded-lg">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Requirements</h3>
              <ul className="text-sm text-[var(--foreground)] opacity-80 space-y-1">
                <li>• Complete all core training modules</li>
                <li>• 40 hours supervised practice</li>
                <li>• Pass written and practical assessments</li>
                <li>• Background in coaching, therapy, or leadership preferred</li>
              </ul>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/signup">
              <Button variant="primary" className="text-lg px-8 py-3">
                Apply for Certification Program
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
