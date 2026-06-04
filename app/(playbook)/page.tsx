'use client'

import Link from 'next/link'
import { Shield, MessageSquare, Lightbulb, BookOpen, ArrowRight } from 'lucide-react'
import InlineSearch from '@/components/search/InlineSearch'

const sections = [
  {
    icon: Shield,
    title: 'Operating Principles',
    description: 'How we use AI as a team — quality bars, human ownership, and when not to automate.',
    href: '/dos-donts',
    count: '12 principles',
  },
  {
    icon: MessageSquare,
    title: 'Prompt Systems',
    description: 'Multi-step prompt chains for high-stakes work: PRD review, research synthesis, design QA, and more.',
    href: '/prompts',
    count: '8 systems',
  },
  {
    icon: Lightbulb,
    title: 'Skills',
    description: 'Senior-level AI skills with quality bars and downloadable templates.',
    href: '/skills',
    count: '11 skills',
  },
  {
    icon: BookOpen,
    title: 'Reference',
    description: 'Glossary of AI terms and abbreviations used in day-to-day work.',
    href: '/glossary',
    count: 'Terms & abbreviations',
  },
]

export default function HubPage() {
  return (
    <div className="px-5 sm:px-8 py-10 max-w-5xl mx-auto">

      {/* Hero */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl leading-tight mb-3"
          style={{ color: '#0d253d', fontWeight: 300, letterSpacing: '-1px' }}
        >
          AI Playbook
        </h1>
        <p className="text-base leading-relaxed max-w-xl mb-0" style={{ color: '#64748d', fontWeight: 300 }}>
          A working reference for teams using AI — operating principles, reusable prompt systems, and practical skills.
        </p>
      </div>

      {/* Universal search */}
      <div className="mb-10">
        <InlineSearch
          placeholder="Search skills, prompts, terms, principles…"
          shortcut
          wrapperStyle={{ width: '100%', maxWidth: '640px' }}
        />
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col p-5 rounded-xl transition-all duration-200"
              style={{
                background: '#ffffff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(83,58,253,0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = 'rgba(0,55,112,0.08) 0 8px 24px'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e3e8ee'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'rgba(0,55,112,0.06) 0 1px 3px'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="size-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(83,58,253,0.08)', color: '#533afd' }}
                >
                  <Icon size={18} />
                </div>
                <span className="text-xs" style={{ color: '#a8c3de' }}>{card.count}</span>
              </div>
              <h2 className="text-base font-semibold mb-1.5" style={{ color: '#0d253d' }}>{card.title}</h2>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#64748d' }}>
                {card.description}
              </p>
              <div className="flex items-center justify-end">
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  style={{ color: '#a8c3de' }}
                />
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
