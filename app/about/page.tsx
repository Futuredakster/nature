import Link from 'next/link';
import { Card } from '../components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <nav className="container-main py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-xl font-bold text-[var(--primary)]">Resilience Platform</h1>
          </Link>
        </nav>
      </header>

      <main className="container-main py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">About Us</h1>

          <Card className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Our Mission</h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              We provide trauma-informed, nature-based coaching and support for backcountry adventurers,
              wilderness professionals, and outdoor organizations facing challenging situations.
            </p>
            <p className="text-[var(--foreground)] opacity-80">
              Our approach combines evidence-based psychological techniques with the healing power
              of natural environments to build lasting emotional resilience.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Contact</h2>
            <p className="text-[var(--foreground)] opacity-80">
              Email: info@resilienceplatform.com<br />
              Phone: (555) 123-4567
            </p>
            <p className="text-sm text-[var(--foreground)] opacity-60 mt-4">
              (Prototype - contact information is fictional)
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
