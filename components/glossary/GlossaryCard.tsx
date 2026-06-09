'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, BookOpen } from 'lucide-react'
import { GlossaryTerm } from '@/types'

// Group colors for abbreviation badge — keyed by GlossaryTerm.category
const ABBR_COLORS: Partial<Record<string, string>> = {
  ai_basics:  '#9B3FFF',
  prompting:  '#00CCA8',
  tools:      '#FF69DB',
  workflow:   '#C27FFF',
  coding:     '#C27FFF',
}

interface GlossaryCardProps {
  term: GlossaryTerm
  // Accordion control — when provided, this card is controlled by the parent
  openId?: string | null
  onOpen?: (id: string | null) => void
}

export default function GlossaryCard({ term, openId, onOpen }: GlossaryCardProps) {
  const [localExpanded, setLocalExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  // Controlled mode (accordion) when parent passes openId; else local state
  const isControlled = openId !== undefined
  const expanded = isControlled ? openId === term.id : localExpanded

  const toggle = () => {
    if (isControlled) {
      onOpen?.(expanded ? null : term.id)
    } else {
      setLocalExpanded(p => !p)
    }
  }

  // Scroll opened card into view, clearing the sticky header (nav 64px + search/tabs ~108px)
  useEffect(() => {
    if (!expanded || !cardRef.current) return
    const STICKY = 172 // topnav + search bar + tabs
    const GAP = 16     // breathing room above the card

    // Wait one frame so the previous card has collapsed (instant) and
    // the new card's position in the DOM is stable before measuring
    const id = setTimeout(() => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      if (rect.top < STICKY + GAP) {
        const y = rect.top + window.scrollY - STICKY - GAP
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      }
    }, 16)

    return () => clearTimeout(id)
  }, [expanded])

  const isAbbrev = !!term.full_form
  const badgeColor = ABBR_COLORS[term.category] ?? '#9B3FFF'

  const validLinks = (term.related_links ?? []).filter((l) =>
    ['/skills', '/prompts', '/dos-donts', '/glossary'].some((p) => l.href.startsWith(p))
  )

  // ── Abbreviation card (matches /abbreviations page style) ───────────────
  if (isAbbrev) {
    return (
      <div
        ref={cardRef as React.RefObject<HTMLDivElement>}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(155,63,255,0.3)'
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(155,63,255,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <button
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full text-left px-5 py-5 flex items-start gap-4 transition-colors duration-100"
          style={{
            background: hovered && !expanded
              ? 'rgba(155,63,255,0.03)'
              : expanded ? 'rgba(155,63,255,0.05)' : 'transparent',
          }}
        >
          {/* Full name + inline abbreviation tag + definition — same style as terminology */}
          <div className="flex-1 min-w-0 text-left">
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 10px', marginBottom: 8 }}>
              <span
                style={{
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1.25,
                }}
              >
                {term.full_form}
              </span>
              {/* Small inline abbreviation tag */}
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 22,
                  fontWeight: 600,
                  color: badgeColor,
                  background: `${badgeColor}15`,
                  border: `1px solid ${badgeColor}28`,
                  borderRadius: 100,
                  padding: '2px 8px',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}
              >
                {term.term}
              </span>
            </div>
            {!expanded && (
              <p
                className="line-clamp-2"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: 22, lineHeight: 1.6 }}
              >
                {term.short_definition}
              </p>
            )}
          </div>

          <ChevronDown
            size={16}
            className="shrink-0 mt-1.5 transition-transform duration-200"
            style={{
              color: expanded ? '#C27FFF' : 'rgba(255,255,255,0.25)',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>

        {/* Expanded body — opens with animation, closes instantly to avoid layout conflict */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: expanded ? '600px' : '0px',
            transition: expanded ? 'max-height 0.32s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          <div className="px-4 pb-4 space-y-3" style={{ paddingTop: '2px' }}>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontSize: 22, color: 'rgba(255,255,255,0.6)' }}
            >
              {term.short_definition}
            </p>

            {term.example_usage && (
              <div
                className="rounded-xl px-4 py-3"
                style={{ background: 'rgba(155,63,255,0.07)', border: '1px solid rgba(155,63,255,0.15)', borderRadius: 10 }}
              >
                <div
                  className="mb-1.5"
                  style={{ color: '#C27FFF', fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  How it&apos;s used
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
                >
                  {term.example_usage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Terminology card (original style) ───────────────────────────────────
  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: expanded
          ? '1px solid rgba(155,63,255,0.25)'
          : hovered
          ? '1px solid rgba(155,63,255,0.15)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: expanded
          ? '0 0 0 1px rgba(155,63,255,0.1), rgba(0,0,0,0.3) 0 8px 24px'
          : hovered
          ? 'rgba(0,0,0,0.2) 0 4px 12px'
          : 'none',
        transform: hovered && !expanded ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <button
        onClick={toggle}
        className="w-full text-left px-5 py-5 flex items-start gap-4 transition-all duration-150"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2.5">
            <span
              className="leading-snug"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {term.term}
            </span>
          </div>
          {term.short_definition && (
            <p
              className={`text-sm leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
            >
              {term.short_definition}
            </p>
          )}
        </div>
        <ChevronDown
          size={16}
          className="flex-shrink-0 mt-1.5 transition-all duration-300"
          style={{
            color: expanded ? '#C27FFF' : 'rgba(255,255,255,0.25)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        className="overflow-hidden"
        style={{
          maxHeight: expanded ? '1200px' : '0px',
          transition: expanded ? 'max-height 0.32s cubic-bezier(0.4,0,0.2,1)' : 'none',
        }}
      >
        <div
          className="px-5 pb-5 space-y-4 animate-fade-in"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}
        >
          {term.detailed_explanation &&
            term.detailed_explanation.trim() !== term.short_definition?.trim() && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}
            >
              {term.detailed_explanation}
            </p>
          )}

          {term.layman_explanation &&
            term.layman_explanation.trim() !== term.short_definition?.trim() && (
            <div
              className="rounded-xl px-4 py-3.5"
              style={{ background: 'rgba(232,200,64,0.06)', border: '1px solid rgba(232,200,64,0.15)', borderRadius: 12 }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: '11px' }}>💡</span>
                <span
                  style={{ color: '#E8C840', fontWeight: 700, textTransform: 'uppercase' as const, fontSize: 22, letterSpacing: '0.1em' }}
                >
                  In plain English
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(232,200,64,0.75)', fontFamily: 'var(--font-body)' }}
              >
                {term.layman_explanation}
              </p>
            </div>
          )}

          {term.example_usage && (
            <div
              className="rounded-xl px-4 py-3.5"
              style={{ background: 'rgba(155,63,255,0.06)', border: '1px solid rgba(155,63,255,0.12)' }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={11} style={{ color: '#C27FFF' }} />
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: '#C27FFF' }}
                >
                  How it&apos;s used
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
              >
                {term.example_usage}
              </p>
            </div>
          )}

          {term.aliases.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs self-center" style={{ color: 'rgba(255,255,255,0.2)' }}>Also called:</span>
              {term.aliases.map((alias) => (
                <span
                  key={alias}
                  style={{ background: 'rgba(155,63,255,0.12)', color: '#C27FFF', borderRadius: 8, padding: '3px 8px', fontSize: 22 }}
                >
                  {alias}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </article>
  )
}
