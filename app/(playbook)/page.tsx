'use client'

import Link from 'next/link'
import { BookOpen, Zap, Play, Shield, ArrowRight } from 'lucide-react'

const bucketCards = [
  {
    icon: BookOpen,
    title: 'Understand AI',
    description: 'Decode the language of AI. Glossary, abbreviations, and technical basics.',
    count: '35 entries',
    href: '/glossary',
    color: '#533afd',
  },
  {
    icon: Zap,
    title: 'Use AI',
    description: 'Practical skills, tools, prompts, and workflows for your daily work.',
    count: '30 skills · 19 tools',
    href: '/skills',
    color: '#533afd',
  },
  {
    icon: Play,
    title: 'See AI in Action',
    description: 'Real examples from Headout teams. What worked, what failed, and what you can reuse.',
    count: '8 case studies',
    href: '/case-studies',
    color: '#533afd',
  },
  {
    icon: Shield,
    title: 'Use AI Responsibly',
    description: "Do's, don'ts, limitations, hallucinations, and privacy guidelines.",
    count: '12 guidelines',
    href: '/dos-donts',
    color: '#533afd',
  },
]

const startHereCards = [
  { label: 'Learn the terms', href: '/glossary', description: 'AI glossary & abbreviations' },
  { label: 'Try a workflow', href: '/workflows', description: 'Step-by-step AI workflows' },
  { label: 'Find a tool', href: '/tools', description: 'Tool library with 19+ tools' },
]

const allSections = [
  { label: 'AI Glossary', href: '/glossary' },
  { label: 'Abbreviations', href: '/abbreviations' },
  { label: 'Tech Basics', href: '/tech-basics' },
  { label: 'Skills Library', href: '/skills' },
  { label: 'Tool Library', href: '/tools' },
  { label: 'Prompt Library', href: '/prompts' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: "By Team", href: '/by-team' },
  { label: "Do's & Don'ts", href: '/dos-donts' },
  { label: 'Risks & Limitations', href: '/risks' },
]

export default function HubPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">

      {/* Hero */}
      <div className="mb-12 animate-fade-up delay-0">
        {/* Pill */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wide"
          style={{
            background: '#b9b9f9',
            color: '#4434d4',
          }}
        >
          <span className="size-1.5 rounded-full" style={{ background: '#533afd' }} />
          Headout · AI Session 2026
        </div>

        <h1
          className="text-3xl sm:text-5xl leading-tight mb-4"
          style={{ color: '#0d253d', fontWeight: 300, letterSpacing: '-1.4px' }}
        >
          Your AI Playbook
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: '#64748d', fontWeight: 300 }}>
          Everything you need to understand, use, and experiment with AI — built for Headout.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4">
          {['35+ terms', '30 skills', '19 tools', '15 workflows'].map((stat) => (
            <div
              key={stat}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: '#64748d' }}
            >
              <span
                className="size-1 rounded-full"
                style={{ background: '#533afd' }}
              />
              {stat}
            </div>
          ))}
        </div>
      </div>

      {/* 5 Bucket Cards */}
      <div className="mb-12">
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#64748d' }}
        >
          Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
          {bucketCards.map((card) => {
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
                {/* Icon */}
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

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium"
                    style={{ color: '#533afd' }}
                  >
                    {card.count}
                  </span>
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

      {/* Start Here */}
      <div className="mb-12">
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#64748d' }}
        >
          Start Here
        </h2>
        <div className="flex flex-col gap-2">
          {startHereCards.map((card) => (
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
                <div className="text-xs mt-0.5" style={{ color: '#64748d' }}>
                  {card.description}
                </div>
              </div>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200 shrink-0"
                style={{ color: '#a8c3de' }}
                onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.color = '#533afd' }}
                onMouseLeave={(e) => { (e.currentTarget as SVGElement).style.color = '#a8c3de' }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick section links */}
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
