import Link from 'next/link'
import { Shield, MessageSquare, Lightbulb, BookOpen, ArrowUpRight } from 'lucide-react'
import BlobLayer from '@/components/ui/BlobLayer'
import InlineSearch from '@/components/search/InlineSearch'

export const dynamic = 'force-dynamic'

const sections = [
  {
    icon: MessageSquare,
    title: 'Prompt Systems',
    description: 'Structured prompts for the work that fastens your process everyday.',
    href: '/prompts',
    count: '8 systems',
    color: '#FF69DB',
    accent: 'rgba(255,105,219,0.12)',
    accentBorder: 'rgba(255,105,219,0.2)',
  },
  {
    icon: Lightbulb,
    title: 'Skills',
    description: 'Opinionated AI skills with a clear bar. Ready to run.',
    href: '/skills',
    count: '11 skills',
    color: '#00CCA8',
    accent: 'rgba(0,204,168,0.12)',
    accentBorder: 'rgba(0,204,168,0.2)',
  },
  {
    icon: BookOpen,
    title: 'Reference',
    description: 'Everyday terms we use, defined for you.',
    href: '/glossary',
    count: 'Terms & abbreviations',
    color: '#E8C840',
    accent: 'rgba(232,200,64,0.12)',
    accentBorder: 'rgba(232,200,64,0.2)',
  },
  {
    icon: Shield,
    title: 'Operating Principles',
    description: 'The standards we hold to and where we draw the line.',
    href: '/dos-donts',
    count: '10 principles',
    color: '#C27FFF',
    accent: 'rgba(194,127,255,0.12)',
    accentBorder: 'rgba(194,127,255,0.2)',
  },
]

export default function HubPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0010', position: 'relative', overflow: 'hidden' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(80px,8vw,130px) clamp(20px,4vw,48px) clamp(60px,6vw,100px)' }}>

        {/* Eyebrow */}
        <div className="eyebrow-tag animate-fade-up delay-0" style={{ marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#FF00CC,#9B3FFF)', display: 'inline-block' }} />
          AI Session 2026
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-75" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px,6vw,96px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          color: '#ffffff',
          marginBottom: 32,
          maxWidth: 800,
        }}>
          <span className="gradient-text">AI Leverage</span>{' '}
          <span>at Scale.</span>
        </h1>

        {/* Search */}
        <div className="animate-fade-up delay-150" style={{ maxWidth: 560, marginBottom: 64 }}>
          <InlineSearch placeholder="Search skills, prompts, terms, principles…" shortcut wrapperStyle={{ width: '100%' }} />
        </div>

        {/* Divider */}
        <div className="section-divider animate-fade-up delay-250" style={{ marginBottom: 48 }} />

        {/* Section cards — 2-col grid, uniform height */}
        <div
          className="animate-fade-up delay-350"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
          }}
        >
          {sections.map(card => {
            const Icon = card.icon
            return (
              <Link
                key={card.href}
                href={card.href}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px 28px 24px',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  minHeight: 200,
                  transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = `${card.color}40`
                  el.style.background = `${card.accent.replace('0.12', '0.05')}`
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.background = 'rgba(255,255,255,0.03)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Top row: icon + count */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: card.accent,
                    border: `1px solid ${card.accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color={card.color} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.22)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    paddingTop: 2,
                  }}>
                    {card.count}
                  </span>
                </div>

                {/* Title */}
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px,2vw,22px)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}>
                    {card.title}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.42)',
                    margin: 0,
                  }}>
                    {card.description}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}>
                  <div style={{
                    width: 28, height: 28,
                    borderRadius: 8,
                    background: card.accent,
                    border: `1px solid ${card.accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ArrowUpRight size={13} color={card.color} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
