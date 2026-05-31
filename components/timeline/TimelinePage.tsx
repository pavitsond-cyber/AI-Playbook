'use client'

import { useState, useMemo } from 'react'
import SiteFooter from '@/components/glossary/SiteFooter'

interface TimelineEntry {
  date: string
  display_date: string
  month: string
  year: number
  capability: string
  tool: string
}

interface MonthSection {
  key: string
  month: string
  year: number
  count: number
  entries: TimelineEntry[]
}

interface TimelinePageProps {
  data: MonthSection[]
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Group entries by date within a month
function groupByDate(entries: TimelineEntry[]): { date: string; display: string; items: TimelineEntry[] }[] {
  const map = new Map<string, TimelineEntry[]>()
  for (const e of entries) {
    if (!map.has(e.date)) map.set(e.date, [])
    map.get(e.date)!.push(e)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, items]) => ({ date, display: items[0].display_date, items }))
}

// Get all unique years from data
function getYears(data: MonthSection[]): number[] {
  return [...new Set(data.map(m => m.year))].sort((a, b) => b - a)
}

export default function TimelinePage({ data }: TimelinePageProps) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [query, setQuery] = useState('')

  const years = useMemo(() => getYears(data), [data])
  const totalEntries = data.reduce((s, m) => s + m.count, 0)

  const filtered = useMemo(() => {
    let sections = selectedYear === 'all' ? data : data.filter(m => m.year === selectedYear)
    if (!query.trim()) return sections
    const q = query.toLowerCase()
    return sections
      .map(m => ({
        ...m,
        entries: m.entries.filter(e =>
          e.capability.toLowerCase().includes(q) || e.tool.toLowerCase().includes(q)
        ),
      }))
      .filter(m => m.entries.length > 0)
  }, [data, selectedYear, query])

  const filteredTotal = filtered.reduce((s, m) => s + m.entries.length, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full">

        {/* Header */}
        <div className="px-5 pt-7 pb-5 animate-fade-up delay-75">
          <h1 className="text-xl leading-tight" style={{ color: '#0d253d', fontWeight: 300, letterSpacing: '-0.26px' }}>
            AI Timeline
          </h1>
          <p className="text-sm mt-1" style={{ color: '#64748d' }}>
            {totalEntries.toLocaleString()} product launches · sourced from There&apos;s An AI For That
          </p>
        </div>

        {/* Sticky controls */}
        <div
          className="sticky top-0 z-20 animate-fade-in delay-0"
          style={{
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid #e3e8ee',
          }}
        >
          {/* Search */}
          <div className="px-5 pt-3 pb-2">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="15" height="15" viewBox="0 0 15 15" fill="none"
              >
                <path
                  d="M10 6.5C10 8.43 8.43 10 6.5 10C4.57 10 3 8.43 3 6.5C3 4.57 4.57 3 6.5 3C8.43 3 10 4.57 10 6.5ZM9.3 10.007L12 12.707L12.707 12L10.007 9.3C9.68 9.56 9.32 9.78 8.93 9.94L9.3 10.007Z"
                  fill="#94a3b8" stroke="#94a3b8" strokeWidth="0.3"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search capabilities or tools…"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-all"
                style={{
                  background: '#f6f9fc',
                  border: '1px solid #e3e8ee',
                  color: '#0d253d',
                }}
              />
            </div>
          </div>

          {/* Year filter tabs */}
          <div className="flex gap-1 px-5 pb-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedYear('all')}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
              style={
                selectedYear === 'all'
                  ? { background: '#533afd', color: '#fff' }
                  : { background: '#f6f9fc', color: '#64748d', border: '1px solid #e3e8ee' }
              }
            >
              All years
            </button>
            {years.map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
                style={
                  selectedYear === y
                    ? { background: '#533afd', color: '#fff' }
                    : { background: '#f6f9fc', color: '#64748d', border: '1px solid #e3e8ee' }
                }
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Results count when searching */}
        {query && (
          <div className="px-5 pt-4">
            <p className="text-xs" style={{ color: '#64748d' }}>
              {filteredTotal} {filteredTotal === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        {/* Timeline content */}
        <div className="px-5 pt-5 pb-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm" style={{ color: '#64748d' }}>No results found for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            filtered.map((section) => {
              const dateGroups = groupByDate(section.entries)
              return (
                <div key={section.key} className="mb-10">
                  {/* Month header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="px-3 py-1 rounded-lg text-sm font-semibold"
                      style={{ background: '#533afd', color: '#fff', letterSpacing: '-0.2px' }}
                    >
                      {section.month} {section.year}
                    </div>
                    <span className="text-xs" style={{ color: '#64748d' }}>
                      {section.entries.length} launches
                    </span>
                    <div className="flex-1 h-px" style={{ background: '#e3e8ee' }} />
                  </div>

                  {/* Date groups */}
                  <div className="space-y-4">
                    {dateGroups.map(({ date, display, items }) => (
                      <div key={date} className="flex gap-4">
                        {/* Date column */}
                        <div className="flex-shrink-0 w-16 pt-0.5">
                          <span className="text-xs font-medium tabular-nums" style={{ color: '#64748d' }}>
                            {display.split(' ')[0]} {display.split(' ')[1]}
                          </span>
                        </div>

                        {/* Timeline line + entries */}
                        <div className="flex gap-3 flex-1 min-w-0">
                          {/* Vertical line + dot */}
                          <div className="flex flex-col items-center gap-0 flex-shrink-0">
                            <div
                              className="size-2 rounded-full mt-1.5 flex-shrink-0"
                              style={{ background: '#533afd' }}
                            />
                            {items.length > 1 && (
                              <div className="w-px flex-1 mt-1" style={{ background: '#e3e8ee', minHeight: '20px' }} />
                            )}
                          </div>

                          {/* Cards */}
                          <div className="flex-1 min-w-0 pb-2 space-y-2">
                            {items.map((entry, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl transition-colors duration-150 group"
                                style={{ border: '1px solid #e3e8ee', background: '#fff' }}
                                onMouseEnter={e => {
                                  (e.currentTarget as HTMLElement).style.background = '#f6f9fc'
                                }}
                                onMouseLeave={e => {
                                  (e.currentTarget as HTMLElement).style.background = '#fff'
                                }}
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm leading-snug" style={{ color: '#0d253d', fontWeight: 500 }}>
                                    {entry.capability}
                                  </p>
                                  <p className="text-xs mt-0.5" style={{ color: '#64748d' }}>
                                    {entry.tool}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
      <SiteFooter />
    </div>
  )
}
