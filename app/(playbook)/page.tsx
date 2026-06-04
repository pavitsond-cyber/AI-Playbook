'use client'

import Link from 'next/link'
import { Shield, MessageSquare, Lightbulb, BookOpen, ArrowRight } from 'lucide-react'
import BlobLayer from '@/components/ui/BlobLayer'
import InlineSearch from '@/components/search/InlineSearch'

const sections = [
  { icon: Shield,        title: 'Operating Principles', description: 'How we use AI as a team — quality bars, human ownership, and when not to automate.',               href: '/dos-donts', count: '12 principles',        color: '#C27FFF' },
  { icon: MessageSquare, title: 'Prompt Systems',       description: 'Multi-step prompt chains for high-stakes work: PRD review, research synthesis, design QA.',        href: '/prompts',   count: '8 systems',            color: '#FF69DB' },
  { icon: Lightbulb,     title: 'Skills',               description: 'Senior-level AI skills with quality bars and downloadable templates.',                              href: '/skills',    count: '11 skills',            color: '#00CCA8' },
  { icon: BookOpen,      title: 'Reference',            description: 'Glossary of AI terms and abbreviations used in day-to-day work.',                                   href: '/glossary',  count: 'Terms & abbreviations', color: '#E8C840' },
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
          marginBottom: 24,
          maxWidth: 800,
        }}>
          <span className="gradient-text">AI Leverage</span>{' '}
          <span>at Scale.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up delay-150" style={{
          fontFamily: 'var(--font-body)',
          fontSize: 17,
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 500,
          marginBottom: 44,
        }}>
          A working reference for teams using AI — operating principles, reusable prompt systems, and practical skills.
        </p>

        {/* Search */}
        <div className="animate-fade-up delay-250" style={{ maxWidth: 560, marginBottom: 72 }}>
          <InlineSearch placeholder="Search skills, prompts, terms, principles…" shortcut wrapperStyle={{ width: '100%' }} />
        </div>

        {/* Divider */}
        <div className="section-divider animate-fade-up delay-350" style={{ marginBottom: 44 }} />

        {/* Cards */}
        <div className="animate-fade-up delay-450" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
          {sections.map(card => {
            const Icon = card.icon
            return (
              <Link key={card.href} href={card.href} className="dark-card"
                style={{ padding: '28px 24px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={18} color={card.color} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}>{card.title}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.07em', paddingTop: 3 }}>{card.count}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', flex: 1, marginBottom: 20 }}>{card.description}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ArrowRight size={15} color="rgba(155,63,255,0.5)" />
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
