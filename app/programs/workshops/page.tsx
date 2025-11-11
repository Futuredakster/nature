import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function WorkshopsPage() {
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
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              Team Workshops
            </h1>
            <p className="text-xl text-[var(--foreground)] opacity-70">
              Building collective resilience for backcountry teams
            </p>
          </div>

          <Card className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Workshop Offerings</h2>
            <p className="text-[var(--foreground)] opacity-80 mb-6">
              Our team workshops provide structured support for SAR teams, ski patrols, guiding organizations,
              and other groups facing challenging situations together. Build stronger team cohesion and
              develop effective debriefing protocols.
            </p>

            <div className="space-y-6">
              <div className="p-4 border border-[var(--border)] rounded-lg">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Critical Incident Debriefing</h3>
                <p className="text-sm text-[var(--foreground)] opacity-70">
                  Structured group processing after traumatic events using CISD and psychological first aid frameworks
                </p>
              </div>
              <div className="p-4 border border-[var(--border)] rounded-lg">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Team Resilience Building</h3>
                <p className="text-sm text-[var(--foreground)] opacity-70">
                  Ongoing workshops to strengthen team bonds and develop collective coping strategies
                </p>
              </div>
              <div className="p-4 border border-[var(--border)] rounded-lg">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Leadership Support</h3>
                <p className="text-sm text-[var(--foreground)] opacity-70">
                  Specialized workshops for team leaders managing group dynamics and member wellbeing
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/signup">
              <Button variant="primary" className="text-lg px-8 py-3">
                Book a Workshop for Your Team
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
