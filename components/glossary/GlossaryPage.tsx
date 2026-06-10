'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { GlossaryTerm } from '@/types'
import { filterTerms } from '@/lib/utils/search'
import SearchBar from './SearchBar'
import GlossaryGrid from './GlossaryGrid'
import GlossaryCard from './GlossaryCard'
import EmptyState from './EmptyState'
import SiteFooter from './SiteFooter'

type TabId = 'abbreviations' | 'terminologies'

const TABS: { id: TabId; label: string }[] = [
  { id: 'abbreviations', label: 'Abbreviations' },
  { id: 'terminologies', label: 'Terminologies' },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const ABBR_GROUPS = [
  { category: 'ai_basics',  label: 'AI Concepts',    color: '#9B3FFF', bg: 'rgba(155,63,255,0.06)',  short: 'AI' },
  { category: 'prompting',  label: 'Prompting',       color: '#00CCA8', bg: 'rgba(0,204,168,0.06)',   short: 'PR' },
  { category: 'tools',      label: 'Design',          color: '#FF69DB', bg: 'rgba(255,105,219,0.06)', short: 'DS' },
  { category: 'workflow',   label: 'Workflow',         color: '#C27FFF', bg: 'rgba(194,127,255,0.06)', short: 'WF' },
]

interface GlossaryPageProps { terms: GlossaryTerm[] }

export default function GlossaryPage({ terms }: GlossaryPageProps) {
  const [activeTab, setActiveTab]         = useState<TabId>('abbreviations')
  const [query, setQuery]                 = useState('')
  const [activeAlpha, setActiveAlpha]     = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openCardId, setOpenCardId]       = useState<string | null>(null)

  const tabTerms = useMemo(() => ({
    abbreviations: terms.filter(t => t.full_form && t.full_form.trim() !== ''),
    terminologies: terms.filter(t => !t.full_form || t.full_form.trim() === ''),
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

  useEffect(() => {
    setActiveAlpha(null)
    setActiveCategory(null)
    setOpenCardId(null)
  }, [activeTab, query])

  // Scroll to a letter section (terminologies)
  const scrollToLetter = useCallback((letter: string) => {
    if (!activeLetters.has(letter)) return
    const el = document.getElementById(`alpha-section-${letter}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 172
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveAlpha(letter)
    }
  }, [activeLetters])

  // Scroll to a category section (abbreviations)
  const scrollToCategory = useCallback((category: string) => {
    const el = document.getElementById(`abbr-group-${category}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 172
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveCategory(category)
    }
  }, [])

  // ── Shared sidebar button style ────────────────────────────────────────
  const sidebarBtn = (isActive: boolean, has: boolean, color = '#C27FFF') => ({
    width: 32,
    height: 28,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: 12,
    fontWeight: 700 as const,
    lineHeight: 1,
    borderRadius: 8,
    padding: 0,
    cursor: has ? 'pointer' : 'default',
    transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
    color:      isActive ? '#fff' : has ? '#C27FFF' : 'rgba(255,255,255,0.12)',
    background: isActive ? '#9B3FFF' : has ? 'rgba(155,63,255,0.12)' : 'transparent',
    border:     isActive
      ? '1px solid #9B3FFF'
      : has
      ? '1px solid rgba(155,63,255,0.28)'
      : '1px solid transparent',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0A0010' }}>
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>

        {/* Page title */}
        <div className="animate-fade-up delay-75" style={{ padding: "clamp(64px,6vw,100px) clamp(20px,4vw,48px) 20px" }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,64px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 8 }}>
            Glossary
          </h1>
          <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>
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
          <div style={{ padding: "10px clamp(20px,4vw,48px) 8px" }}>
            <SearchBar value={query} onChange={setQuery} placeholder="Search terms, abbreviations…" />
          </div>
          <div style={{ display: "flex", padding: "0 clamp(20px,4vw,48px)" }}>
            {TABS.map(tab => {
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
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background: '#9B3FFF',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        <div style={{ padding: "20px clamp(20px,4vw,48px) clamp(40px,4vw,64px)" }}>
          {filtered.length === 0 ? (
            <EmptyState query={query} />

          ) : activeTab === 'abbreviations' ? (
            /* ── Abbreviations — single column, no sidebar ─────────────── */
            <div key="abbreviations" className="animate-tab-fade">
              <div style={{ flex: 1, minWidth: 0 }}>
                {query && (
                  <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                  </p>
                )}

                <div className="space-y-8">
                  {abbrGroups.map(group => (
                    <div key={group.category} id={`abbr-group-${group.category}`}>
                      {/* Category header — mirrors letter badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 7,
                          padding: '5px 12px', borderRadius: 100,
                          background: group.bg, border: `1px solid ${group.color}25`,
                          flexShrink: 0,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                          <span style={{
                            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.1em', color: group.color,
                          }}>
                            {group.label}
                          </span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
                          {group.items.length} {group.items.length === 1 ? 'term' : 'terms'}
                        </span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                      </div>

                      {/* Individual floating cards — same as terminology cards */}
                      <div className="space-y-4">
                        {group.items.map(term => (
                          <GlossaryCard key={term.id} term={term} openId={openCardId} onOpen={setOpenCardId} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : (
            /* ── Terminologies with A-Z sidebar on the RIGHT ───────────── */
            <div key="terminologies" className="animate-tab-fade" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

              {/* Terms grouped by letter — comes first (left) */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {query && (
                  <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                  </p>
                )}

                <div className="space-y-8">
                  {letterGroups.map(({ letter, terms: groupTerms }) => (
                    <div key={letter} id={`alpha-section-${letter}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 9,
                          background: 'rgba(155,63,255,0.12)',
                          color: '#C27FFF',
                          fontFamily: 'var(--font-display)',
                          fontSize: 15, fontWeight: 800,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {letter}
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
                          {groupTerms.length} {groupTerms.length === 1 ? 'term' : 'terms'}
                        </span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                      </div>

                      <GlossaryGrid terms={groupTerms} openId={openCardId} onOpen={setOpenCardId} />
                    </div>
                  ))}
                </div>
              </div>

              {/* A-Z sidebar — sticky, RIGHT side */}
              <div
                className="hidden sm:flex flex-col shrink-0"
                style={{ position: 'sticky', top: 180, alignSelf: 'flex-start', gap: 5, paddingTop: 4 }}
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
                        ...sidebarBtn(isActive, has),
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={e => {
                        if (has && !isActive) {
                          e.currentTarget.style.background = 'rgba(155,63,255,0.2)'
                          e.currentTarget.style.transform = 'scale(1.08)'
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

            </div>
          )}
        </div>

      </div>
      <SiteFooter />
    </div>
  )
}
