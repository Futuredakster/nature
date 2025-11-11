import Link from 'next/link';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <nav className="container-main py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-xl font-bold text-[var(--primary)]">Resilience Platform</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn btn-outline min-w-[120px]">Sign In</Link>
            <Link href="/signup" className="btn btn-primary min-w-[120px]">Get Started</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-[var(--light-sage)] to-[var(--background)]">
          <div className="container-main text-center">
            <h1 className="text-5xl font-bold text-[var(--foreground)] mb-6">
              Building Resilience in the Backcountry
            </h1>
            <p className="text-xl text-[var(--foreground)] opacity-80 max-w-3xl mx-auto">
              Learn how our trauma-informed, nature-based approach helps wilderness professionals
              and outdoor enthusiasts develop emotional resilience
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20">
          <div className="container-main">
            <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
              Our Approach
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Trauma-Informed Care
                </h3>
                <p className="text-[var(--foreground)] opacity-70">
                  Grounded in evidence-based understanding of trauma and neurobiology, our methods
                  recognize the unique stressors of wilderness environments and emergency response situations.
                </p>
              </Card>

              <Card>
                <div className="text-4xl mb-4">🌲</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Nature-Based Healing
                </h3>
                <p className="text-[var(--foreground)] opacity-70">
                  We leverage the therapeutic power of natural environments, integrating wilderness
                  experiences with proven psychological techniques for lasting resilience.
                </p>
              </Card>

              <Card>
                <div className="text-4xl mb-4">⛰️</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Backcountry Specialized
                </h3>
                <p className="text-[var(--foreground)] opacity-70">
                  Our team understands the specific challenges of guides, SAR teams, ski patrol,
                  and wilderness professionals facing critical incidents in remote settings.
                </p>
              </Card>

              <Card>
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Community Support
                </h3>
                <p className="text-[var(--foreground)] opacity-70">
                  Connect with others who understand your experiences. Our community provides
                  peer support alongside professional coaching and facilitation.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-20 bg-[var(--light-sage)]">
          <div className="container-main">
            <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
              Who We Serve
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="flex items-start gap-4">
                <div className="text-3xl">🥾</div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
                    Wilderness Guides & Outfitters
                  </h3>
                  <p className="text-[var(--foreground)] opacity-70">
                    Professional guides managing groups in remote environments, facing weather emergencies,
                    medical situations, and client dynamics.
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="text-3xl">🚁</div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
                    Search & Rescue Teams
                  </h3>
                  <p className="text-[var(--foreground)] opacity-70">
                    SAR volunteers and professionals responding to emergencies, body recoveries,
                    and high-stress rescue operations.
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="text-3xl">⛷️</div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
                    Ski Patrol & Avalanche Professionals
                  </h3>
                  <p className="text-[var(--foreground)] opacity-70">
                    Resort and backcountry ski patrol managing avalanche control, accident response,
                    and visitor safety in challenging conditions.
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="text-3xl">🏕️</div>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
                    Outdoor Educators & Youth Leaders
                  </h3>
                  <p className="text-[var(--foreground)] opacity-70">
                    Instructors and trip leaders working with youth and adults in outdoor settings,
                    managing group dynamics and safety.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-20">
          <div className="container-main">
            <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
              Choose Your Path
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <div className="text-4xl mb-4">🧭</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  1-on-1 Coaching
                </h3>
                <p className="text-[var(--foreground)] opacity-70 mb-4">
                  Personalized support for processing specific incidents, building coping strategies,
                  and developing long-term resilience.
                </p>
                <Link href="/programs/coaching">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </Card>

              <Card>
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Team Workshops
                </h3>
                <p className="text-[var(--foreground)] opacity-70 mb-4">
                  Group sessions for teams, including debriefing protocols, collective resilience
                  building, and organizational support.
                </p>
                <Link href="/programs/workshops">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </Card>

              <Card>
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Facilitator Certification
                </h3>
                <p className="text-[var(--foreground)] opacity-70 mb-4">
                  Comprehensive training for coaches and team leaders wanting to facilitate
                  resilience work with others.
                </p>
                <Link href="/programs/certification">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/signup">
                <Button variant="primary" className="text-lg px-12 py-4">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-8 bg-[var(--card-bg)]">
        <div className="container-main text-center">
          <p className="text-sm text-[var(--foreground)] opacity-60">
            © 2025 Resilience Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
