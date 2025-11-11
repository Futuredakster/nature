import Link from 'next/link';
import { Card } from './components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <header className="border-b border-[var(--border)] bg-[var(--card-bg)]">
        <nav className="container-main py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-lg md:text-xl font-bold text-[var(--primary)]">Resilience Platform</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/login" className="btn btn-outline text-sm md:text-base px-4 md:px-5 min-w-[90px] md:min-w-[110px]">
              Sign In
            </Link>
            <Link href="/admin" className="btn btn-primary text-sm md:text-base px-4 md:px-5 min-w-[90px] md:min-w-[110px]">
              <span className="hidden sm:inline">Admin Portal</span>
              <span className="sm:hidden">Admin</span>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero with Mountain Background */}
        <section className="relative py-16 md:py-32 text-center overflow-hidden">
          {/* Mountain Background with SVG */}
          <div className="absolute inset-0 z-0">
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-50 to-white" />

            {/* Mountain SVG */}
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1440 800"
              preserveAspectRatio="xMidYMax slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Far background mountains - lighter */}
              <path
                d="M0,400 L200,280 L400,320 L600,240 L800,300 L1000,220 L1200,280 L1440,240 L1440,800 L0,800 Z"
                fill="#c8d8e4"
                opacity="0.4"
              />

              {/* Middle mountains - medium */}
              <path
                d="M0,500 L150,380 L350,420 L550,340 L750,400 L950,320 L1150,380 L1350,340 L1440,380 L1440,800 L0,800 Z"
                fill="#a8b8c8"
                opacity="0.6"
              />

              {/* Front mountains - darkest with snow caps */}
              <path
                d="M0,600 L100,480 L250,520 L400,420 L550,500 L700,400 L850,480 L1000,420 L1150,500 L1300,460 L1440,520 L1440,800 L0,800 Z"
                fill="#8899aa"
                opacity="0.8"
              />

              {/* Snow caps on front peaks */}
              <path
                d="M400,420 L380,440 L420,440 Z M700,400 L680,425 L720,425 Z M1000,420 L980,445 L1020,445 Z"
                fill="#ffffff"
                opacity="0.9"
              />

              {/* Pine trees silhouettes */}
              <g opacity="0.3" fill="#5a7a5f">
                <polygon points="50,650 60,680 40,680" />
                <polygon points="50,670 65,700 35,700" />
                <rect x="48" y="700" width="4" height="20" />

                <polygon points="150,680 160,710 140,710" />
                <polygon points="150,700 165,730 135,730" />
                <rect x="148" y="730" width="4" height="20" />

                <polygon points="1300,660 1310,690 1290,690" />
                <polygon points="1300,680 1315,710 1285,710" />
                <rect x="1298" y="710" width="4" height="20" />
              </g>
            </svg>

            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
          </div>

          {/* Content */}
          <div className="container-main relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--deep-earth)] mb-6 drop-shadow-sm">
              Trauma-Informed Coaching & Training <br />
              for Mountain Professionals
            </h2>
            <p className="text-lg md:text-xl text-[var(--deep-earth)] max-w-3xl mx-auto mb-8 drop-shadow-sm font-medium">
              Build resilience through evidence-based coaching, team workshops, and facilitator training. Supporting those affected by mountain trauma and helping individuals overcome fear.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Link href="/signup" className="btn btn-primary text-base px-8 py-3 shadow-lg w-full sm:w-auto min-w-[200px]">
                Get Started
              </Link>
              <Link href="/learn-more" className="btn btn-outline text-base px-8 py-3 bg-white/80 backdrop-blur-sm shadow-lg w-full sm:w-auto min-w-[200px]">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Core Offerings */}
        <section className="py-20">
          <div className="container-main">
            <h3 className="text-3xl font-bold text-center text-[var(--foreground)] mb-4">
              Coaching & Training Programs
            </h3>
            <p className="text-center text-[var(--foreground)] opacity-70 mb-12 max-w-3xl mx-auto">
              Evidence-based programs for mountain professionals, teams, and aspiring facilitators. Access our growing library of password-protected resources.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 1-on-1 Coaching */}
              <Card className="flex flex-col">
                <div className="text-4xl mb-4">🧭</div>
                <h4 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  1-on-1 Coaching
                </h4>
                <p className="text-[var(--foreground)] opacity-70 mb-4 flex-1">
                  Work one-on-one with certified coaches who understand backcountry challenges. Process traumatic incidents, build coping strategies, or overcome mountain-related fears.
                </p>
                <div className="text-sm text-[var(--foreground)] opacity-60 mb-4">
                  <strong>For:</strong> Individuals seeking personalized support
                </div>
                <Link href="/programs/coaching" className="btn btn-primary w-full">
                  Learn More
                </Link>
              </Card>

              {/* Team Workshops */}
              <Card className="flex flex-col">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Team Workshops
                </h4>
                <p className="text-[var(--foreground)] opacity-70 mb-4 flex-1">
                  Critical incident debriefings, resilience training, and team workshops. Build collective resilience and establish debriefing protocols for your organization.
                </p>
                <div className="text-sm text-[var(--foreground)] opacity-60 mb-4">
                  <strong>For:</strong> SAR teams, ski patrol, guide companies, outdoor organizations
                </div>
                <Link href="/programs/workshops" className="btn btn-primary w-full">
                  Learn More
                </Link>
              </Card>

              {/* Facilitator Certification */}
              <Card className="flex flex-col">
                <div className="text-4xl mb-4">🎓</div>
                <h4 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Facilitator Certification
                </h4>
                <p className="text-[var(--foreground)] opacity-70 mb-4 flex-1">
                  Comprehensive training for aspiring facilitators. Learn trauma-informed care, facilitation techniques, and nature-based therapeutic approaches.
                </p>
                <div className="text-sm text-[var(--foreground)] opacity-60 mb-4">
                  <strong>For:</strong> Coaches, therapists, team leaders, educators
                </div>
                <Link href="/programs/certification" className="btn btn-primary w-full">
                  Learn More
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We Support */}
        <section className="py-20 bg-[var(--light-sage)]">
          <div className="container-main">
            <h3 className="text-3xl font-bold text-center text-[var(--foreground)] mb-4">
              Our Approach
            </h3>
            <p className="text-center text-[var(--foreground)] opacity-70 mb-12 max-w-3xl mx-auto">
              Trauma-informed, evidence-based training and coaching designed specifically for mountain environments
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">Trauma-Informed</h4>
                <p className="text-[var(--foreground)] opacity-70 text-sm">
                  Evidence-based methods grounded in trauma science, neurobiology, and PTSD research
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">⛰️</div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">Mountain-Focused</h4>
                <p className="text-[var(--foreground)] opacity-70 text-sm">
                  Specialized expertise in avalanche incidents, rescue work, and backcountry challenges
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">Resource Library</h4>
                <p className="text-[var(--foreground)] opacity-70 text-sm">
                  Password-protected modules with training materials, guides, and community support
                </p>
              </Card>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[var(--foreground)] opacity-70 text-sm">
                <strong>Supporting:</strong> Mountain professionals dealing with critical incidents • SAR teams and ski patrol • Individuals with mountain-related fears or phobias • Aspiring facilitators and coaches
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container-main text-center">
            <h3 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-[var(--foreground)] opacity-70 mb-8 max-w-2xl mx-auto">
              Join our growing community of mountain professionals, teams, and individuals building resilience together.
            </p>
            <Link href="/signup" className="btn btn-primary text-base px-8 py-3">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 bg-[var(--card-bg)]">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏔️</span>
                <h4 className="font-bold text-[var(--primary)]">Resilience</h4>
              </div>
              <p className="text-sm text-[var(--foreground)] opacity-60">
                Trauma-informed, nature-based coaching for backcountry adventurers.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-[var(--foreground)] mb-3">Programs</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/programs/coaching" className="text-[var(--foreground)] opacity-60 hover:opacity-100">1-on-1 Coaching</Link></li>
                <li><Link href="/programs/workshops" className="text-[var(--foreground)] opacity-60 hover:opacity-100">Team Workshops</Link></li>
                <li><Link href="/programs/certification" className="text-[var(--foreground)] opacity-60 hover:opacity-100">Certification</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-[var(--foreground)] mb-3">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-[var(--foreground)] opacity-60 hover:opacity-100">About Us</Link></li>
                <li><Link href="/faq" className="text-[var(--foreground)] opacity-60 hover:opacity-100">FAQ</Link></li>
                <li><Link href="/blog" className="text-[var(--foreground)] opacity-60 hover:opacity-100">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-[var(--foreground)] mb-3">Contact</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-[var(--foreground)] opacity-60 hover:opacity-100">Get in Touch</Link></li>
                <li><Link href="/privacy" className="text-[var(--foreground)] opacity-60 hover:opacity-100">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[var(--foreground)] opacity-60 hover:opacity-100">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-[var(--border)] text-center text-sm text-[var(--foreground)] opacity-60">
            © 2025 Resilience Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
