'use client'

import {
  useState, useMemo, useEffect, useRef, useCallback
} from 'react'
import {
  Search, X, ArrowUpRight, Hash, Lightbulb,
  MessageSquare, Shield, BookOpen, CornerDownLeft
} from 'lucide-react'
import { searchAll, SearchItem, SearchItemType } from '@/lib/data/search-index'
import { useRouter } from 'next/navigation'

// ─── Config ───────────────────────────────────────────────────────────────

const TYPE_CFG: Record<SearchItemType, {
  label: string; color: string; bg: string; border: string
  icon: React.ElementType
}> = {
  abbreviation: { label: 'Abbreviations',  color: '#533afd', bg: 'rgba(83,58,253,0.07)',  border: 'rgba(83,58,253,0.15)',  icon: Hash },
  term:         { label: 'Terms',           color: '#0d7a5f', bg: 'rgba(13,122,95,0.07)',  border: 'rgba(13,122,95,0.15)',  icon: BookOpen },
  skill:        { label: 'Skills',          color: '#b45309', bg: 'rgba(180,83,9,0.07)',   border: 'rgba(180,83,9,0.15)',   icon: Lightbulb },
  prompt:       { label: 'Prompt Systems',  color: '#7c3aed', bg: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.15)', icon: MessageSquare },
  principle:    { label: 'Principles',      color: '#be185d', bg: 'rgba(190,24,93,0.07)',  border: 'rgba(190,24,93,0.15)',  icon: Shield },
}

const ORDER: SearchItemType[] = ['abbreviation', 'term', 'skill', 'prompt', 'principle']

const QUICK = [
  { label: 'Operating Principles', href: '/dos-donts', type: 'principle' as SearchItemType },
  { label: 'Prompt Systems',       href: '/prompts',   type: 'prompt'    as SearchItemType },
  { label: 'Skills',               href: '/skills',    type: 'skill'     as SearchItemType },
  { label: 'Reference',            href: '/glossary',  type: 'term'      as SearchItemType },
]

// ─── Highlight helper ─────────────────────────────────────────────────────

function Hi({ text, q }: { text: string; q: string }) {
  if (!q || !text) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark style={{
        background: 'rgba(83,58,253,0.13)', color: '#533afd',
        borderRadius: '2px', padding: '0 1px', fontWeight: 600,
        fontStyle: 'normal',
      }}>
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────

interface Props {
  placeholder?: string
  compact?: boolean          // smaller padding + font (nav variant)
  alignRight?: boolean       // drop-down aligns to right edge (nav)
  dropdownWidth?: number     // fixed px width for dropdown (nav)
  shortcut?: boolean         // register ⌘K
  inputStyle?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
}

// ─── Component ────────────────────────────────────────────────────────────

export default function InlineSearch({
  placeholder = 'Search skills, prompts, terms…',
  compact = false,
  alignRight = false,
  dropdownWidth,
  shortcut = false,
  inputStyle,
  wrapperStyle,
}: Props) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)   // for entrance animation
  const [focused, setFocused] = useState(-1)

  const wrapRef  = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef  = useRef<HTMLDivElement>(null)

  const grouped = useMemo(() => searchAll(q), [q])
  const flat = useMemo(() => ORDER.flatMap(t => grouped[t] ?? []), [grouped])
  const total = flat.length
  const hasQ = q.trim().length >= 2
  const showDropdown = open

  // ─── Animate in ───────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)))
    } else {
      setMounted(false)
    }
  }, [open])

  // ─── Click outside ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQ('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ─── ⌘K shortcut ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!shortcut) return
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [shortcut])

  // ─── Reset focused index when query changes ────────────────────────────
  useEffect(() => setFocused(-1), [q])

  // ─── Scroll focused item into view ────────────────────────────────────
  useEffect(() => {
    if (focused >= 0 && listRef.current) {
      const els = listRef.current.querySelectorAll<HTMLElement>('[data-item]')
      els[focused]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [focused])

  // ─── Navigate ─────────────────────────────────────────────────────────
  const go = useCallback((href: string) => {
    router.push(href)
    setOpen(false)
    setQ('')
  }, [router])

  // ─── Keyboard ─────────────────────────────────────────────────────────
  const handleKey = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocused(i => Math.min(i + 1, total - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocused(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (focused >= 0 && flat[focused]) go(flat[focused].href)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setQ('')
      inputRef.current?.blur()
    }
  }

  // ─── Flat-index offsets per group ──────────────────────────────────────
  let run = 0
  const offsets: Partial<Record<SearchItemType, number>> = {}
  for (const t of ORDER) { offsets[t] = run; run += grouped[t]?.length ?? 0 }

  const borderCol = open ? 'rgba(83,58,253,0.38)' : '#e3e8ee'

  return (
    <div ref={wrapRef} style={{ position: 'relative', ...wrapperStyle }}>

      {/* ── Input bar ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: compact ? '7px 12px' : '11px 16px',
          background: '#fff',
          // When dropdown is open: share border with dropdown (no bottom border)
          borderTop: `1px solid ${borderCol}`,
          borderLeft: `1px solid ${borderCol}`,
          borderRight: `1px solid ${borderCol}`,
          borderBottom: showDropdown ? '1px solid rgba(83,58,253,0.08)' : `1px solid ${borderCol}`,
          borderRadius: showDropdown ? '12px 12px 0 0' : '12px',
          cursor: 'text',
          transition: 'border-color 150ms, border-radius 150ms',
          boxShadow: showDropdown ? 'none' : (open ? '0 0 0 3px rgba(83,58,253,0.07)' : 'rgba(0,55,112,0.06) 0 1px 3px'),
          ...inputStyle,
        }}
        onClick={() => { inputRef.current?.focus(); setOpen(true) }}
      >
        <Search
          size={compact ? 14 : 15}
          style={{ color: open ? '#533afd' : '#a8c3de', flexShrink: 0, transition: 'color 150ms' }}
        />
        <input
          ref={inputRef}
          type="text"
          value={q}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={e => { setQ(e.target.value); setOpen(true) }}
          onKeyDown={handleKey}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: compact ? 13 : 14, color: '#0d253d',
          }}
        />
        {q ? (
          <button
            onMouseDown={e => e.preventDefault()}
            onClick={() => { setQ(''); inputRef.current?.focus() }}
            style={{
              width: 18, height: 18, borderRadius: 5,
              background: '#f0f4f8', border: '1px solid #e3e8ee',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <X size={10} color="#64748d" />
          </button>
        ) : shortcut ? (
          <kbd style={{
            fontSize: 10, padding: '2px 6px', borderRadius: 5,
            background: '#f6f9fc', border: '1px solid #e3e8ee', color: '#a8c3de',
            flexShrink: 0, lineHeight: 1.4,
          }}>⌘K</kbd>
        ) : null}
      </div>

      {/* ── Dropdown ──────────────────────────────────────────────────── */}
      {showDropdown && (
        <div
          ref={listRef}
          style={{
            position: 'absolute',
            top: '100%',   // starts exactly where input ends — no gap, no overlap
            ...(alignRight ? { right: 0 } : { left: 0, right: 0 }),
            ...(dropdownWidth ? { width: dropdownWidth, left: 'auto' } : {}),
            background: '#fff',
            // Share the same border color as input, no top border (input bottom IS the divider)
            borderTop: 'none',
            borderLeft: `1px solid rgba(83,58,253,0.38)`,
            borderRight: `1px solid rgba(83,58,253,0.38)`,
            borderBottom: `1px solid rgba(83,58,253,0.38)`,
            borderRadius: '0 0 12px 12px',
            // Light, grounded shadow — not floating/modal-like
            boxShadow: '0 6px 20px rgba(0,55,112,0.08), 0 2px 6px rgba(0,55,112,0.04)',
            zIndex: 200,
            maxHeight: 460,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            // Subtle fade + slide — no scale (scale = popup feel)
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 160ms ease, transform 160ms ease',
          } as React.CSSProperties}
        >

          {/* ── Empty state (focused, no query) ───────────────────────── */}
          {!hasQ && (
            <div style={{ padding: '14px 14px 16px' }}>
              <p style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.07em', color: '#a8c3de', marginBottom: 10,
              }}>
                Quick navigate
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {QUICK.map(link => {
                  const c = TYPE_CFG[link.type]
                  const Icon = c.icon
                  return (
                    <button
                      key={link.href}
                      onClick={() => go(link.href)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 11px', borderRadius: 20,
                        background: c.bg, border: `1px solid ${c.border}`,
                        color: c.color, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                        transition: 'transform 120ms, box-shadow 120ms',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = `0 4px 10px ${c.color}25`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = ''
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      <Icon size={11} /> {link.label}
                    </button>
                  )
                })}
              </div>
              <p style={{ fontSize: 11, color: '#c8d4e0', marginTop: 12, lineHeight: 1.5 }}>
                Start typing to search across all skills, prompts, terms, and principles.
              </p>
            </div>
          )}

          {/* ── No results ────────────────────────────────────────────── */}
          {hasQ && total === 0 && (
            <div style={{ padding: '28px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#273951', marginBottom: 4 }}>
                Nothing found for &ldquo;<strong>{q}</strong>&rdquo;
              </p>
              <p style={{ fontSize: 12, color: '#a8c3de' }}>
                Try a skill name, AI term, or prompt topic.
              </p>
            </div>
          )}

          {/* ── Grouped results ───────────────────────────────────────── */}
          {hasQ && total > 0 && ORDER.map(type => {
            const items = grouped[type] ?? []
            if (!items.length) return null
            const c = TYPE_CFG[type]
            const Icon = c.icon
            const base = offsets[type] ?? 0

            return (
              <div key={type} style={{ paddingBottom: 4 }}>

                {/* Group header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 16px 4px',
                  borderTop: '1px solid #f3f4f8',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5,
                      background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={10} color={c.color} />
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.08em', color: c.color,
                    }}>
                      {c.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '1px 7px',
                    borderRadius: 10, background: c.bg, color: c.color,
                  }}>
                    {items.length}
                  </span>
                </div>

                {/* Items */}
                {items.map((item, i) => {
                  const idx = base + i
                  const isFocused = focused === idx
                  return (
                    <div
                      key={item.id}
                      data-item
                      onClick={() => go(item.href)}
                      onMouseEnter={() => setFocused(idx)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '9px 12px',
                        margin: '1px 6px',
                        borderRadius: 10,
                        cursor: 'pointer',
                        background: isFocused ? `rgba(83,58,253,0.04)` : 'transparent',
                        border: isFocused ? `1px solid rgba(83,58,253,0.1)` : '1px solid transparent',
                        transition: 'background 100ms, border-color 100ms',
                      }}
                    >
                      {/* Type icon */}
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: isFocused ? c.bg : '#f6f9fc',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 1,
                        transition: 'background 100ms',
                      }}>
                        <Icon size={13} color={isFocused ? c.color : '#a8c3de'} />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: 'flex', alignItems: 'baseline',
                          gap: 6, marginBottom: 2, flexWrap: 'wrap',
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#0d253d', lineHeight: 1.3 }}>
                            <Hi text={item.title} q={q} />
                          </span>
                          {item.subtitle && (
                            <span style={{
                              fontSize: 11, color: '#a8c3de',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              maxWidth: 160,
                            }}>
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                        <p style={{
                          fontSize: 11, color: '#64748d', lineHeight: 1.45, margin: 0,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                        } as React.CSSProperties}>
                          <Hi text={item.snippet} q={q} />
                        </p>
                      </div>

                      {/* Arrow */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: isFocused ? c.bg : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, alignSelf: 'center',
                        transition: 'background 100ms',
                      }}>
                        <ArrowUpRight
                          size={12}
                          color={isFocused ? c.color : '#d0d8e4'}
                          style={{ transition: 'color 100ms' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          {/* ── Footer ────────────────────────────────────────────────── */}
          {hasQ && total > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 16px 10px',
              borderTop: '1px solid #f3f4f8',
            }}>
              <span style={{ fontSize: 10, color: '#c0cad6' }}>
                {total} result{total !== 1 ? 's' : ''}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, color: '#c0cad6' }}>
                <span>↑↓ move</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <CornerDownLeft size={10} />
                  <span>open</span>
                </div>
                <span>esc close</span>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
