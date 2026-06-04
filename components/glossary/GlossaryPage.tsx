'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { GlossaryTerm } from '@/types'
import { filterTerms } from '@/lib/utils/search'
import SearchBar from './SearchBar'
import GlossaryGrid from './GlossaryGrid'
import GlossaryCard from './GlossaryCard'
import EmptyState from './EmptyState'
import SiteFooter from './SiteFooter'
import BlobLayer from '@/components/ui/BlobLayer'

type TabId = 'abbreviations' | 'terminologies'

const TABS: { id: TabId; label: string }[] = [
  { id: 'abbreviations', label: 'Abbreviations' },
  { id: 'terminologies', label: 'Terminologies' },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Category grouping for Abbreviations tab
const ABBR_GROUPS = [
  { category: 'ai_basics',  label: 'AI Concepts',    color: '#9B3FFF',  bg: 'rgba(155,63,255,0.06)' },
  { category: 'prompting',  label: 'Prompting & Ops', color: '#00CCA8',  bg: 'rgba(0,204,168,0.06)' },
  { category: 'tools',      label: 'Design & Vision', color: '#FF69DB',  bg: 'rgba(255,105,219,0.06)' },
  { category: 'workflow',   label: 'Workflow & Data', color: '#C27FFF',  bg: 'rgba(194,127,255,0.06)' },
]

interface GlossaryPageProps {
  terms: GlossaryTerm[]
}

export default function GlossaryPage({ terms }: GlossaryPageProps) {
  const [activeTab, setActiveTab]     = useState<TabId>('abbreviations')
  const [query, setQuery]             = useState('')
  const [activeAlpha, setActiveAlpha] = useState<string | null>(null)

  const tabTerms = useMemo(() => ({
    abbreviations: terms.filter((t) => t.full_form && t.full_form.trim() !== ''),
    terminologies: terms.filter((t) => !t.full_form || t.full_form.trim() === ''),
  }), [terms])

  const filtered = useMemo(
    () => filterTerms(tabTerms[activeTab], query),
    [tabTerms, activeTab, query]
  )

  const matchCounts = useMemo(() => ({
    abbreviations: filterTerms(tabTerms.abbreviations, query).length,
    terminologies: filterTerms(tabTerms.terminologies, query).length,
  }), [tabTerms, query])

  // ── Abbreviation groups ────────────────────────────────────────────────
  const abbrGroups = useMemo(() => {
    if (activeTab !== 'abbreviations') return []
    return ABBR_GROUPS.map(g => ({
      ...g,
      items: filtered.filter(t => t.category === g.category),
    })).filter(g => g.items.length > 0)
  }, [filtered, activeTab])

  // ── Terminology letter groups ──────────────────────────────────────────
  const letterGroups = useMemo(() => {
    if (activeTab !== 'terminologies') return []
    const grouped: Record<string, GlossaryTerm[]> = {}
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase()
      if (!grouped[letter]) grouped[letter] = []
      grouped[letter].push(term)
    }
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, terms]) => ({ letter, terms }))
  }, [filtered, activeTab])

  const activeLetters = useMemo(
    () => new Set(letterGroups.map(g => g.letter)),
    [letterGroups]
  )

  // Reset active letter when switching tabs or changing query
  useEffect(() => { setActiveAlpha(null) }, [activeTab, query])

  const scrollToLetter = useCallback((letter: string) => {
    if (!activeLetters.has(letter)) return
    const el = document.getElementById(`alpha-section-${letter}`)
    if (el) {
      // Offset for sticky nav (56px) + sticky search+tabs (~106px) + small gap
      const offset = 172
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveAlpha(letter)
    }
  }, [activeLetters])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0A0010', overflow: 'hidden' }}>
      <BlobLayer />
      <div className="flex-1 max-w-3xl mx-auto w-full" style={{ position: 'relative', zIndex: 1 }}>

        {/* Page title */}
        <div className="px-5 pt-7 pb-5 animate-fade-up delay-75">
          <h1
            className="leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            Reference
          </h1>
          <p
            className="mt-1"
            style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}
          >
            {terms.length} terms · tap any card to expand
          </p>
        </div>

        {/* Sticky search + tabs */}
        <div
          className="sticky top-14 z-20"
          style={{
            background: 'rgba(10,0,16,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="px-5 pt-3 pb-2">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search terms, abbreviations…"
            />
          </div>
          <div className="flex px-5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const count = query ? matchCounts[tab.id] : tabTerms[tab.id].length
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-1 pb-3 pt-2 mr-6 text-sm font-medium transition-all duration-200 focus-visible:outline-none"
                >
                  <span className="transition-colors duration-200" style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                    {tab.label}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium transition-all duration-200"
                    style={isActive
                      ? { background: '#9B3FFF', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {count}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-250"
                    style={{
                      background: '#9B3FFF',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        <div className="px-5 pt-5 pb-8">
          {filtered.length === 0 ? (
            <EmptyState query={query} />

          ) : activeTab === 'abbreviations' ? (
            /* ── Grouped abbreviations ─────────────────────────────────── */
            <div key="abbreviations" className="animate-tab-fade space-y-6">
              {query && (
                <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                </p>
              )}
              {abbrGroups.map(group => (
                <div key={group.category}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2" style={{ background: group.bg }}>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: group.color }} />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-body)', color: group.color }}
                    >
                      {group.label}
                    </span>
                    <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ background: `${group.color}18`, color: group.color }}>
                      {group.items.length}
                    </span>
                  </div>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14 }}
                  >
                    {group.items.map((term, i) => (
                      <div key={term.id} style={{ borderBottom: i === group.items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                        <GlossaryCard term={term} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          ) : (
            /* ── Terminologies with A-Z sidebar ────────────────────────── */
            <div key="terminologies" className="animate-tab-fade" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

              {/* ── A-Z sidebar ── */}
              <div
                className="hidden sm:flex flex-col shrink-0"
                style={{
                  position: 'sticky',
                  top: 172,
                  gap: 2,
                  paddingTop: 4,
                }}
              >
                {ALPHABET.map(letter => {
                  const has = activeLetters.has(letter)
                  const isActive = activeAlpha === letter
                  return (
                    <button
                      key={letter}
                      onClick={() => scrollToLetter(letter)}
                      disabled={!has}
                      style={{
                        width: 22,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        lineHeight: 1,
                        borderRadius: 5,
                        border: 'none',
                        padding: 0,
                        cursor: has ? 'pointer' : 'default',
                        transition: 'background 120ms, color 120ms, transform 80ms',
                        color:      isActive ? '#fff' : has ? '#C27FFF' : 'rgba(255,255,255,0.15)',
                        background: isActive ? '#9B3FFF' : has ? 'rgba(155,63,255,0.1)' : 'transparent',
                        transform:  'scale(1)',
                      }}
                      onMouseEnter={e => {
                        if (has && !isActive) {
                          e.currentTarget.style.background = 'rgba(155,63,255,0.2)'
                          e.currentTarget.style.transform = 'scale(1.1)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (has && !isActive) {
                          e.currentTarget.style.background = 'rgba(155,63,255,0.1)'
                          e.currentTarget.style.transform = 'scale(1)'
                        }
                      }}
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>

              {/* ── Terms grouped by letter ── */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {query && (
                  <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                  </p>
                )}

                {/* Mobile A-Z strip (shown only on small screens) */}
                <div
                  className="sm:hidden flex flex-wrap gap-1 mb-5 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {ALPHABET.map(letter => {
                    const has = activeLetters.has(letter)
                    const isActive = activeAlpha === letter
                    return (
                      <button
                        key={letter}
                        onClick={() => scrollToLetter(letter)}
                        disabled={!has}
                        style={{
                          width: 24, height: 24,
                          fontSize: 10, fontWeight: 700,
                          borderRadius: 5, border: 'none', padding: 0,
                          cursor: has ? 'pointer' : 'default',
                          color:      isActive ? '#ffffff' : has ? '#C27FFF' : 'rgba(255,255,255,0.15)',
                          background: isActive ? '#9B3FFF' : has ? 'rgba(155,63,255,0.1)' : 'transparent',
                        }}
                      >
                        {letter}
                      </button>
                    )
                  })}
                </div>

                <div className="space-y-8">
                  {letterGroups.map(({ letter, terms: groupTerms }) => (
                    <div key={letter} id={`alpha-section-${letter}`}>
                      {/* Letter badge */}
                      <div
                        className="flex items-center gap-3 mb-3"
                      >
                        <div
                          style={{
                            width: 32, height: 32,
                            borderRadius: 8,
                            background: 'rgba(155,63,255,0.12)',
                            color: '#C27FFF',
                            fontSize: 14, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {letter}
                        </div>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                          {groupTerms.length} {groupTerms.length === 1 ? 'term' : 'terms'}
                        </span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                      </div>

                      <GlossaryGrid terms={groupTerms} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
      <SiteFooter />
    </div>
  )
}
