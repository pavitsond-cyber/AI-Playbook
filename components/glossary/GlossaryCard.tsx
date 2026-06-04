'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen } from 'lucide-react'
import { GlossaryTerm } from '@/types'

interface GlossaryCardProps {
  term: GlossaryTerm
}

export default function GlossaryCard({ term }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Filter related_links to only valid in-playbook destinations
  const validLinks = (term.related_links ?? []).filter((l) =>
    ['/skills', '/prompts', '/dos-donts', '/glossary'].some((p) => l.href.startsWith(p))
  )

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: '#ffffff',
        border: expanded
          ? '1px solid rgba(83,58,253,0.3)'
          : hovered
          ? '1px solid rgba(83,58,253,0.2)'
          : '1px solid #e3e8ee',
        boxShadow: expanded
          ? 'rgba(0,55,112,0.08) 0 8px 24px, rgba(0,55,112,0.04) 0 2px 6px'
          : hovered
          ? 'rgba(0,55,112,0.08) 0 4px 12px'
          : 'rgba(0,55,112,0.08) 0 1px 3px',
        transform: hovered && !expanded ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left px-5 py-5 flex items-start gap-4 transition-all duration-150"
      >
        <div className="flex-1 min-w-0">
          {/* Term + full form */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2.5">
            <span className="text-[17px] font-semibold leading-snug tracking-tight" style={{ color: '#0d253d' }}>
              {term.term}
            </span>
            {term.full_form && (
              <span className="text-sm font-normal" style={{ color: '#64748d' }}>
                — {term.full_form}
              </span>
            )}
          </div>

          {term.short_definition && (
            <p
              className={`text-sm leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}
              style={{ color: '#64748d' }}
            >
              {term.short_definition}
            </p>
          )}
        </div>

        <ChevronDown
          size={16}
          className="flex-shrink-0 mt-1.5 transition-all duration-300"
          style={{
            color: expanded ? '#533afd' : '#a8c3de',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Expanded body */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? '1200px' : '0px' }}
      >
        <div
          className="px-5 pb-5 space-y-4 animate-fade-in"
          style={{ borderTop: '1px solid #e3e8ee', paddingTop: '1rem' }}
        >
          {/* Full explanation */}
          {term.detailed_explanation &&
            term.detailed_explanation.trim() !== term.short_definition?.trim() && (
            <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>
              {term.detailed_explanation}
            </p>
          )}

          {/* In plain English */}
          {term.layman_explanation &&
            term.layman_explanation.trim() !== term.short_definition?.trim() &&
            term.layman_explanation.trim() !== term.detailed_explanation?.trim() && (
            <div
              className="rounded-xl px-4 py-3.5"
              style={{ background: '#fdf8f0', border: '1px solid rgba(155,104,41,0.15)' }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: '11px' }}>💡</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#9b6829' }}>
                  In plain English
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#5c3d1a' }}>
                {term.layman_explanation}
              </p>
            </div>
          )}

          {/* Real-world example */}
          {term.example_usage && (
            <div
              className="rounded-xl px-4 py-3.5"
              style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.12)' }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={11} style={{ color: '#533afd' }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#533afd' }}>
                  How it's used
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>
                {term.example_usage}
              </p>
            </div>
          )}

          {/* Also known as */}
          {term.aliases.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs self-center" style={{ color: '#a8c3de' }}>Also called:</span>
              {term.aliases.map((alias) => (
                <span
                  key={alias}
                  className="px-2.5 py-0.5 rounded-lg text-xs"
                  style={{ background: '#b9b9f9', color: '#4434d4' }}
                >
                  {alias}
                </span>
              ))}
            </div>
          )}

          {/* Skills & prompts connections */}
          {validLinks.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: '#64748d' }}>
                Use in playbook
              </span>
              <div className="flex flex-wrap gap-2">
                {validLinks.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
                    style={{
                      background: 'rgba(83,58,253,0.07)',
                      border: '1px solid rgba(83,58,253,0.18)',
                      color: '#4434d4',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#533afd'
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.borderColor = '#533afd'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(83,58,253,0.07)'
                      e.currentTarget.style.color = '#4434d4'
                      e.currentTarget.style.borderColor = 'rgba(83,58,253,0.18)'
                    }}
                  >
                    <span>→</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
