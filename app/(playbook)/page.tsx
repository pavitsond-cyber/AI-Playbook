'use client'

import Link from 'next/link'
import { Shield, Zap, MessageSquare, Users, Play, AlertTriangle, ArrowRight, BarChart2, GitBranch } from 'lucide-react'

const primaryCards = [
  {
    icon: Shield,
    title: 'Operating Principles',
    description: 'Rules for using AI at scale — where to automate, where to stay human, and how to set quality bars.',
    href: '/dos-donts',
  },
  {
    icon: Zap,
    title: 'Workflow Library',
    description: 'Senior-level workflows for product, design, research, ops, and brand — built around real Headout problems.',
    href: '/workflows',
  },
  {
    icon: MessageSquare,
    title: 'Prompt Systems',
    description: 'Deep prompt chains for PRD critique, research synthesis, design QA, localization review, and campaign production.',
    href: '/prompts',
  },
  {
    icon: Users,
    title: 'AI by Team',
    description: 'Leverage maps, repeatable workflows, and quality bars per team — not generic use case lists.',
    href: '/by-team',
  },
  {
    icon: Play,
    title: 'Case Studies',
    description: 'What actually happened when Headout teams used AI. What worked, what failed, what others can reuse.',
    href: '/case-studies',
  },
  {
    icon: AlertTriangle,
    title: 'Risk & Governance',
    description: 'Risk by workflow type, not generic AI warnings. Controls, failure modes, and what humans must own.',
    href: '/risks',
  },
]

const foundationLinks = [
  { label: 'AI Maturity Model', href: '/maturity', description: 'Where your team is and where to go next' },
  { label: 'Tool Framework', href: '/tools', description: 'What to use, when to avoid it, and why' },
  { label: 'Build vs Buy vs Automate', href: '/build-vs-buy', description: 'Decision framework for AI investment' },
]

const allSections = [
  { label: 'Operating Principles', href: '/dos-donts' },
  { label: 'Maturity Model', href: '/maturity' },
  { label: 'Build vs Buy', href: '/build-vs-buy' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Prompt Systems', href: '/prompts' },
  { label: 'Skills', href: '/skills' },
  { label: 'Tools', href: '/tools' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'AI by Team', href: '/by-team' },
  { label: 'Risk & Governance', href: '/risks' },
  { label: 'AI Shifts', href: '/timeline' },
  { label: 'Impl. Basics', href: '/tech-basics' },
  { label: 'AI Reference', href: '/glossary' },
]

export default function HubPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">

      {/* Hero */}
      <div className="mb-12 animate-fade-up delay-0">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wide"
          style={{ background: '#b9b9f9', color: '#4434d4' }}
        >
          <span className="size-1.5 rounded-full" style={{ background: '#533afd' }} />
          Headout · AI Session 2026
        </div>

        <h1
          className="text-3xl sm:text-5xl leading-tight mb-4"
          style={{ color: '#0d253d', fontWeight: 300, letterSpacing: '-1.4px' }}
        >
          AI Leverage at Headout
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-2 max-w-2xl" style={{ color: '#64748d', fontWeight: 300 }}>
          Built for teams who already use AI — and want to use it consistently, at scale, and at a higher quality bar.
        </p>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#a8c3de', fontWeight: 300 }}>
          Not a beginner guide. A senior operating reference.
        </p>
      </div>

      {/* Primary section cards */}
      <div className="mb-12">
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#64748d' }}
        >
          Core sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
          {primaryCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col p-5 rounded-xl animate-fade-up transition-all duration-200"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '12px',
                  boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(83,58,253,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = 'rgba(0,55,112,0.08) 0 8px 24px, rgba(0,55,112,0.04) 0 2px 6px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e3e8ee'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'rgba(0,55,112,0.08) 0 1px 3px'
                }}
              >
                <div
                  className="size-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(83,58,253,0.08)', color: '#533afd' }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: '#0d253d' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-3" style={{ color: '#64748d' }}>
                  {card.description}
                </p>
                <div className="flex items-center justify-end">
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: '#64748d' }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Foundations quick links */}
      <div className="mb-12">
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#64748d' }}
        >
          Foundations
        </h2>
        <div className="flex flex-col gap-2">
          {foundationLinks.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-150"
              style={{
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(83,58,253,0.3)'
                e.currentTarget.style.background = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e3e8ee'
                e.currentTarget.style.background = '#f6f9fc'
              }}
            >
              <div>
                <div className="text-sm font-semibold" style={{ color: '#0d253d' }}>{card.label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#64748d' }}>{card.description}</div>
              </div>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200 shrink-0"
                style={{ color: '#a8c3de' }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* All sections */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#64748d' }}
        >
          All sections
        </h2>
        <div className="flex flex-wrap gap-2">
          {allSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
              style={{
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                color: '#61718a',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(83,58,253,0.25)'
                e.currentTarget.style.color = '#533afd'
                e.currentTarget.style.background = 'rgba(83,58,253,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e3e8ee'
                e.currentTarget.style.color = '#61718a'
                e.currentTarget.style.background = '#f6f9fc'
              }}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
