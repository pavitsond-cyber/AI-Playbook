'use client'

import Link from 'next/link'
import { BookOpen, Zap, Play, Shield, Plus, ArrowRight } from 'lucide-react'

const bucketCards = [
  {
    icon: BookOpen,
    title: 'Understand AI',
    description: 'Decode the language of AI. Glossary, abbreviations, and technical basics.',
    count: '35 entries',
    href: '/glossary',
    color: '#7c3aed',
  },
  {
    icon: Zap,
    title: 'Use AI',
    description: 'Practical skills, tools, prompts, and workflows for your daily work.',
    count: '30 skills · 19 tools',
    href: '/skills',
    color: '#6d28d9',
  },
  {
    icon: Play,
    title: 'See AI in Action',
    description: 'Real examples from Headout teams. What worked, what failed, and what you can reuse.',
    count: '8 case studies',
    href: '/case-studies',
    color: '#7c3aed',
  },
  {
    icon: Shield,
    title: 'Use AI Responsibly',
    description: "Do's, don'ts, limitations, hallucinations, and privacy guidelines.",
    count: '12 guidelines',
    href: '/dos-donts',
    color: '#6d28d9',
  },
  {
    icon: Plus,
    title: 'Keep Improving It',
    description: 'Contribute prompts, skills, and workflows. Help the playbook grow.',
    count: 'Contribute',
    href: '/contribute',
    color: '#7c3aed',
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
  { label: 'Templates', href: '/templates' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contribute', href: '/contribute' },
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
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
            color: 'rgba(167,139,250,0.9)',
          }}
        >
          <span className="size-1.5 rounded-full bg-purple-400" />
          Headout · AI Session 2026
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Your AI Playbook
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Everything you need to understand, use, and experiment with AI — built for Headout.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4">
          {['35+ terms', '30 skills', '19 tools', '15 workflows'].map((stat) => (
            <div
              key={stat}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <span
                className="size-1 rounded-full"
                style={{ background: 'rgba(124,58,237,0.6)' }}
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
          style={{ color: 'rgba(255,255,255,0.3)' }}
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
                  background: 'rgba(14,14,28,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Icon */}
                <div
                  className="size-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa' }}
                >
                  <Icon size={18} />
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">{card.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {card.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'rgba(167,139,250,0.7)' }}
                  >
                    {card.count}
                  </span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
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
          style={{ color: 'rgba(255,255,255,0.3)' }}
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
                background: 'rgba(14,14,28,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'
                e.currentTarget.style.background = 'rgba(14,14,28,0.95)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(14,14,28,0.8)'
              }}
            >
              <div>
                <div className="text-sm font-semibold text-white">{card.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {card.description}
                </div>
              </div>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200 shrink-0"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick section links */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'rgba(255,255,255,0.3)' }}
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
                background: 'rgba(14,14,28,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.55)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                e.currentTarget.style.background = 'rgba(14,14,28,0.8)'
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
