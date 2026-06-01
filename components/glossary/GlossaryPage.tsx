'use client'

import { useState, useMemo } from 'react'
import { GlossaryTerm } from '@/types'
import { filterTerms } from '@/lib/utils/search'
import SearchBar from './SearchBar'
import GlossaryGrid from './GlossaryGrid'
import EmptyState from './EmptyState'
import SiteFooter from './SiteFooter'

type TabId = 'abbreviations' | 'terminologies'

const TABS: { id: TabId; label: string }[] = [
  { id: 'abbreviations', label: 'Abbreviations' },
  { id: 'terminologies', label: 'Terminologies' },
]

interface GlossaryPageProps {
  terms: GlossaryTerm[]
}

export default function GlossaryPage({ terms }: GlossaryPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>('abbreviations')
  const [query, setQuery] = useState('')

  const tabTerms = useMemo(
    () => ({
      abbreviations: terms.filter((t) => t.full_form && t.full_form.trim() !== ''),
      terminologies: terms.filter((t) => !t.full_form || t.full_form.trim() === ''),
    }),
    [terms]
  )

  const filtered = useMemo(
    () => filterTerms(tabTerms[activeTab], query),
    [tabTerms, activeTab, query]
  )

  const matchCounts = useMemo(
    () => ({
      abbreviations: filterTerms(tabTerms.abbreviations, query).length,
      terminologies: filterTerms(tabTerms.terminologies, query).length,
    }),
    [tabTerms, query]
  )

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 max-w-3xl mx-auto w-full">

        {/* Page title */}
        <div className="px-5 pt-7 pb-5 animate-fade-up delay-75">
          <h1 className="text-xl leading-tight" style={{ color: '#0d253d', fontWeight: 300, letterSpacing: '-0.26px' }}>Glossary</h1>
          <p className="text-sm mt-1" style={{ color: '#64748d' }}>
            {terms.length} terms · tap any card to expand
          </p>
        </div>

        {/* Sticky: search then tabs */}
        <div
          className="sticky top-0 lg:top-0 z-20 animate-fade-in delay-0"
          style={{
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid #e3e8ee',
          }}
        >
          {/* Search */}
          <div className="px-5 pt-3 pb-2">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search terms, abbreviations, tools…"
            />
          </div>

          {/* Tabs */}
          <div className="flex px-5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const count = query ? matchCounts[tab.id] : tabTerms[tab.id].length
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-1 pb-3 pt-2 mr-6
                    text-sm font-medium transition-all duration-200 focus-visible:outline-none"
                >
                  <span
                    className="transition-colors duration-200"
                    style={{ color: isActive ? '#0d253d' : '#64748d' }}
                  >
                    {tab.label}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium transition-all duration-200"
                    style={
                      isActive
                        ? { background: '#533afd', color: '#fff' }
                        : { background: '#f6f9fc', color: '#64748d', border: '1px solid #e3e8ee' }
                    }
                  >
                    {count}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-250"
                    style={{
                      background: '#533afd',
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

        {/* Results — key on activeTab triggers remount + re-animation */}
        <div className="px-5 pt-5 pb-8">
          {filtered.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <div key={activeTab} className="animate-tab-fade">
              {query && (
                <p className="text-xs mb-4" style={{ color: '#64748d' }}>
                  {filtered.length} {filtered.length === 1 ? 'result' : 'results'} in{' '}
                  {TABS.find((t) => t.id === activeTab)?.label.toLowerCase()} for &ldquo;{query}&rdquo;
                </p>
              )}
              <GlossaryGrid terms={filtered} />
            </div>
          )}
        </div>

      </div>

      <SiteFooter />
    </div>
  )
}
