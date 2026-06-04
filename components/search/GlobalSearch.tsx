'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Search, X, ArrowRight, Hash, Lightbulb, MessageSquare, Shield, BookOpen } from 'lucide-react'
import { searchAll, SearchItem, SearchItemType } from '@/lib/data/search-index'
import { useSearch } from '@/lib/context/search-context'
import { useRouter } from 'next/navigation'

// ─── Config ───────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<SearchItemType, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  abbreviation: { label: 'Abbreviations', color: '#533afd', bg: 'rgba(83,58,253,0.08)', icon: Hash },
  term:         { label: 'Terms',         color: '#0d7a5f', bg: 'rgba(13,122,95,0.08)',  icon: BookOpen },
  skill:        { label: 'Skills',        color: '#b45309', bg: 'rgba(180,83,9,0.08)',   icon: Lightbulb },
  prompt:       { label: 'Prompt Systems', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', icon: MessageSquare },
  principle:    { label: 'Principles',    color: '#be185d', bg: 'rgba(190,24,93,0.08)',  icon: Shield },
}

const DISPLAY_ORDER: SearchItemType[] = ['abbreviation', 'term', 'skill', 'prompt', 'principle']

// ─── Highlight helper ─────────────────────────────────────────────────────

function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ background: 'rgba(83,58,253,0.15)', color: '#533afd', borderRadius: '2px', padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  )
}

// ─── Single result row ─────────────────────────────────────────────────────

function ResultRow({
  item,
  query,
  isFocused,
  onHover,
  onClick,
}: {
  item: SearchItem
  query: string
  isFocused: boolean
  onHover: () => void
  onClick: () => void
}) {
  const cfg = TYPE_CONFIG[item.type]
  const Icon = cfg.icon

  return (
    <button
      onMouseEnter={onHover}
      onClick={onClick}
      className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors duration-100"
      style={{ background: isFocused ? '#f6f9fc' : 'transparent' }}
    >
      <span
        className="shrink-0 size-7 rounded-lg flex items-center justify-center mt-0.5"
        style={{ background: cfg.bg, color: cfg.color }}
      >
        <Icon size={13} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-sm font-medium" style={{ color: '#0d253d' }}>
            <Highlighted text={item.title} query={query} />
          </span>
          {item.subtitle && (
            <span className="text-xs truncate" style={{ color: '#a8c3de' }}>
              {item.subtitle}
            </span>
          )}
        </div>
        {item.snippet && (
          <p className="text-xs leading-relaxed line-clamp-1" style={{ color: '#64748d' }}>
            <Highlighted text={item.snippet} query={query} />
          </p>
        )}
      </div>

      <ArrowRight
        size={13}
        className="shrink-0 mt-1 transition-opacity"
        style={{ color: '#a8c3de', opacity: isFocused ? 1 : 0 }}
      />
    </button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export default function GlobalSearch() {
  const { isOpen, close } = useSearch()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(0)

  const grouped = useMemo(() => searchAll(query), [query])

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    const list: SearchItem[] = []
    for (const type of DISPLAY_ORDER) {
      list.push(...(grouped[type] ?? []))
    }
    return list
  }, [grouped])

  const totalResults = flatResults.length
  const hasResults = totalResults > 0
  const showResults = query.trim().length >= 2

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setFocusedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // ⌘K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        isOpen ? close() : (document.dispatchEvent(new CustomEvent('open-search')))
      }
      if (e.key === 'Escape' && isOpen) close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close])

  // Keyboard navigation within results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showResults) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, totalResults - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selected = flatResults[focusedIndex]
        if (selected) {
          router.push(selected.href)
          close()
        }
      }
    },
    [showResults, totalResults, flatResults, focusedIndex, router, close]
  )

  // Reset focus when query changes
  useEffect(() => { setFocusedIndex(0) }, [query])

  const handleResultClick = (item: SearchItem) => {
    router.push(item.href)
    close()
  }

  if (!isOpen) return null

  // Calculate global index offset per type group
  let runningIndex = 0
  const groupOffsets: Partial<Record<SearchItemType, number>> = {}
  for (const type of DISPLAY_ORDER) {
    groupOffsets[type] = runningIndex
    runningIndex += grouped[type]?.length ?? 0
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      style={{ background: 'rgba(13,37,61,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: '#ffffff',
          border: '1px solid #e3e8ee',
          boxShadow: 'rgba(0,55,112,0.18) 0 24px 60px, rgba(0,55,112,0.08) 0 4px 12px',
          maxHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: showResults ? '1px solid #e3e8ee' : 'none' }}
        >
          <Search size={18} style={{ color: '#a8c3de', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search skills, prompts, terms, principles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-base outline-none bg-transparent"
            style={{ color: '#0d253d' }}
          />
          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="size-6 rounded-md flex items-center justify-center transition-colors"
                style={{ background: '#f6f9fc', color: '#64748d' }}
              >
                <X size={12} />
              </button>
            )}
            <kbd
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium"
              style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', color: '#a8c3de' }}
            >
              esc
            </kbd>
          </div>
        </div>

        {/* Results area */}
        {showResults && (
          <div className="overflow-y-auto flex-1">
            {!hasResults ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm" style={{ color: '#64748d' }}>
                  No results for &ldquo;<strong style={{ color: '#0d253d' }}>{query}</strong>&rdquo;
                </p>
                <p className="text-xs mt-1" style={{ color: '#a8c3de' }}>
                  Try a different word — terms, skill names, or prompt topics.
                </p>
              </div>
            ) : (
              <div>
                {DISPLAY_ORDER.map((type) => {
                  const items = grouped[type] ?? []
                  if (!items.length) return null
                  const cfg = TYPE_CONFIG[type]
                  const offset = groupOffsets[type] ?? 0

                  return (
                    <div key={type}>
                      {/* Group header */}
                      <div
                        className="flex items-center justify-between px-4 py-2"
                        style={{ background: '#f9fafc', borderBottom: '1px solid #f0f4f8' }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {items.length}
                        </span>
                      </div>

                      {/* Results in this group */}
                      {items.map((item, i) => (
                        <ResultRow
                          key={item.id}
                          item={item}
                          query={query}
                          isFocused={focusedIndex === offset + i}
                          onHover={() => setFocusedIndex(offset + i)}
                          onClick={() => handleResultClick(item)}
                        />
                      ))}
                    </div>
                  )
                })}

                {/* Footer */}
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderTop: '1px solid #e3e8ee', background: '#f9fafc' }}
                >
                  <span className="text-[10px]" style={{ color: '#a8c3de' }}>
                    {totalResults} result{totalResults !== 1 ? 's' : ''}
                  </span>
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: '#a8c3de' }}>
                    <span>↑↓ navigate</span>
                    <span>↵ open</span>
                    <span>esc close</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state — before typing */}
        {!showResults && (
          <div className="px-5 py-6">
            <p className="text-xs mb-3" style={{ color: '#a8c3de' }}>Browse by section</p>
            <div className="flex flex-wrap gap-2">
              {DISPLAY_ORDER.map((type) => {
                const cfg = TYPE_CONFIG[type]
                const Icon = cfg.icon
                const hrefs: Record<SearchItemType, string> = {
                  abbreviation: '/glossary',
                  term: '/glossary',
                  skill: '/skills',
                  prompt: '/prompts',
                  principle: '/dos-donts',
                }
                return (
                  <button
                    key={type}
                    onClick={() => { router.push(hrefs[type]); close() }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}20` }}
                  >
                    <Icon size={12} />
                    {cfg.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
