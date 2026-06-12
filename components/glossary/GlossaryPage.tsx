'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { GlossaryTerm } from '@/types'
import GlossaryGrid from './GlossaryGrid'
import GlossaryCard from './GlossaryCard'
import { useDockedTitle } from '@/components/nav/PageChromeContext'
import StickyTabs from '@/components/playbook/StickyTabs'

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
  const [activeAlpha, setActiveAlpha]     = useState<string | null>(null)
  const [openCardId, setOpenCardId]       = useState<string | null>(null)
  const titleRef = useDockedTitle('Glossary')

  const tabTerms = useMemo(() => ({
    abbreviations: terms.filter(t => t.full_form && t.full_form.trim() !== ''),
    terminologies: terms.filter(t => !t.full_form || t.full_form.trim() === ''),
  }), [terms])

  const filtered = tabTerms[activeTab]

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
    setOpenCardId(null)
  }, [activeTab])

  // Deep-link handler: switch to correct tab, open card, scroll to exact position
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    // Determine which tab contains this term so we switch before trying to scroll
    const isAbbrev = tabTerms.abbreviations.some(t => t.id === hash)
    const isTerm   = tabTerms.terminologies.some(t => t.id === hash)
    if (!isAbbrev && !isTerm) return

    setActiveTab(isAbbrev ? 'abbreviations' : 'terminologies')
    setOpenCardId(hash)

    // Wait for tab content to render, then scroll below the sticky navigation and tabs.
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (!el) return
      const NAV_OFFSET = 132
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    }, 300)
  }, [tabTerms])

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

  // ── Shared sidebar button style ────────────────────────────────────────
  const sidebarBtn = (isActive: boolean, has: boolean) => ({
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
    <div>
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>

        {/* Page title */}
        <div ref={titleRef} data-page-title className="animate-fade-up delay-75" style={{ padding: "24px clamp(20px,4vw,48px) 16px" }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 400, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 12 }}>
            Glossary
          </h1>
          <p className="mt-1" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>
            {terms.length} terms · tap any card to expand
          </p>
        </div>

        {/* Sticky tabs — sits directly below the frosted navigation */}
        <StickyTabs>
          <div className="playbook-sticky-tabs__track" style={{ display: "flex", gap: 24, padding: "8px clamp(20px,4vw,48px) 0" }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center px-1 pb-5 pt-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none"
                >
                  <span className="transition-colors duration-200" style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                    {tab.label}
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
        </StickyTabs>

        {/* Results */}
        <div style={{ padding: "20px clamp(20px,4vw,48px) clamp(40px,4vw,64px)" }}>
          {activeTab === 'abbreviations' ? (
            /* ── Abbreviations — single column, no sidebar ─────────────── */
            <div key="abbreviations" className="animate-tab-fade">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="space-y-8">
                  {abbrGroups.map((group, gi) => (
                    <div key={group.category} id={`abbr-group-${group.category}`} className="animate-fade-up" style={{ animationDelay: `${gi * 40}ms` }}>
                      {/* Category header — mirrors letter badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
                          color: group.color, background: `${group.color}18`,
                          border: `1px solid ${group.color}30`, borderRadius: 100,
                          padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.1em',
                          flexShrink: 0,
                        }}>
                          {group.label}
                        </span>
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
                <div className="space-y-8">
                  {letterGroups.map(({ letter, terms: groupTerms }, gi) => (
                    <div key={letter} id={`alpha-section-${letter}`} className="animate-fade-up" style={{ animationDelay: `${gi * 40}ms` }}>
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
    </div>
  )
}
