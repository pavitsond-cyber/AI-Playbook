import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Minimal top bar */}
      <header className="flex items-center px-5 pt-6 animate-fade-in delay-0">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-purple-600 flex items-center justify-center
            shadow-lg shadow-purple-600/40">
            <span className="text-white text-xs font-bold leading-none">H</span>
          </div>
          <span className="text-sm font-semibold text-white/70">Headout</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-16 text-center">

        {/* Eyebrow pill */}
        <div
          className="animate-fade-up delay-75 inline-flex items-center gap-2 px-3.5 py-1.5
            rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
        >
          <div className="size-1.5 rounded-full bg-purple-400" />
          <span className="text-xs font-semibold text-purple-300 tracking-wide uppercase">
            Headout AI Education Session
          </span>
        </div>

        {/* Title */}
        <h1
          className="animate-fade-up delay-150 text-[44px] sm:text-5xl font-bold
            leading-[1.08] tracking-tight mb-5"
        >
          <span className="text-white">Headout</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(167,139,250,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI Library.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-250 text-base sm:text-lg text-white/40
            leading-relaxed max-w-sm mb-10"
        >
          Plain-English explanations for every AI term, abbreviation, and tool —
          curated for the Headout AI session, 2026.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-350">
          <Link
            href="/glossary"
            className="cta-pulse shimmer-btn group inline-flex items-center gap-2.5
              px-6 py-3.5 rounded-2xl font-semibold text-base text-white
              shadow-xl shadow-purple-600/20"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #7c3aed 100%)',
            }}
          >
            Get Started
            <ArrowRight
              size={17}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-up delay-450 flex items-center gap-6 mt-10">
          {[
            { icon: BookOpen, label: '20+ terms' },
            { icon: Layers,   label: '5 categories' },
            { icon: Zap,      label: 'Instant search' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={13} className="text-white/20" />
              <span className="text-xs text-white/25">{label}</span>
            </div>
          ))}
        </div>

      </main>

      {/* Bottom hint */}
      <div className="animate-fade-in delay-450 pb-8 flex justify-center">
        <p className="text-xs text-white/12">For internal use · Scan QR to access</p>
      </div>

    </div>
  )
}
