'use client'

import { useState } from 'react'
import { ChevronDown, Wrench, BookOpen, Tag } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { GlossaryTerm } from '@/types'
import { CategoryBadge } from '@/components/ui/Badge'

interface GlossaryCardProps {
  term: GlossaryTerm
}

export default function GlossaryCard({ term }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: expanded
          ? 'linear-gradient(160deg, rgba(19,19,42,0.95) 0%, rgba(14,14,28,0.95) 100%)'
          : hovered
          ? 'rgba(16,16,32,0.9)'
          : 'rgba(14,14,28,0.85)',
        border: expanded
          ? '1px solid rgba(139,92,246,0.25)'
          : hovered
          ? '1px solid rgba(255,255,255,0.09)'
          : '1px solid rgba(255,255,255,0.055)',
        boxShadow: expanded
          ? '0 8px 32px rgba(109,40,217,0.12), 0 0 0 1px rgba(139,92,246,0.08)'
          : hovered
          ? '0 4px 16px rgba(0,0,0,0.3)'
          : 'none',
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
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
            <span className="text-[17px] font-bold text-white leading-snug tracking-tight">
              {term.term}
            </span>
            {term.full_form && (
              <span className="text-sm font-normal" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {term.full_form}
              </span>
            )}
          </div>

          <div className="mb-2.5">
            <CategoryBadge category={term.category} />
          </div>

          {term.short_definition && (
            <p
              className={cn('text-sm leading-relaxed', !expanded && 'line-clamp-2')}
              style={{ color: 'rgba(255,255,255,0.52)' }}
            >
              {term.short_definition}
            </p>
          )}
        </div>

        <ChevronDown
          size={16}
          className="flex-shrink-0 mt-1.5 transition-all duration-300"
          style={{
            color: expanded ? '#8b5cf6' : 'rgba(255,255,255,0.2)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Expanded body with smooth reveal */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? '600px' : '0px' }}
      >
        <div
          className="px-5 pb-5 space-y-4 animate-fade-in"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}
        >
          {term.detailed_explanation && (
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {term.detailed_explanation}
            </p>
          )}

          {term.example_usage && (
            <div
              className="rounded-xl px-4 py-3.5"
              style={{
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(139,92,246,0.12)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={11} className="text-purple-400" />
                <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest">
                  Example
                </span>
              </div>
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {term.example_usage}
              </p>
            </div>
          )}

          {term.tool_tags.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Wrench size={11} style={{ color: 'rgba(255,255,255,0.22)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.22)' }}>
                  Related Tools
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {term.tool_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs transition-colors duration-150"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.42)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {term.aliases.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Tag size={11} style={{ color: 'rgba(255,255,255,0.22)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.22)' }}>
                  Also known as
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {term.aliases.map((alias) => (
                  <span
                    key={alias}
                    className="px-2.5 py-1 rounded-lg text-xs transition-colors duration-150"
                    style={{
                      background: 'rgba(124,58,237,0.08)',
                      border: '1px solid rgba(139,92,246,0.14)',
                      color: 'rgba(167,139,250,0.65)',
                    }}
                  >
                    {alias}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
