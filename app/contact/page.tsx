import Link from 'next/link';
import { Card } from '../components/ui/Card';

export default function Page() {
  const titles = { faq: 'FAQ', contact: 'Contact Us', privacy: 'Privacy Policy', terms: 'Terms of Service' };
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
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8"></h1>
        <Card>
          <p className="text-[var(--foreground)] opacity-80">
            This is a prototype page. Content for  will be added in production.
          </p>
        </Card>
      </main>
    </div>
  );
}
