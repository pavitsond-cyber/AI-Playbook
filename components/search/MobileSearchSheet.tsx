'use client'

import {
  useState, useMemo, useEffect, useRef, useCallback
} from 'react'
import {
  Search, X, ArrowUpRight, Hash, Lightbulb,
  MessageSquare, BookOpen,
} from 'lucide-react'
import { searchAll, SearchItemType } from '@/lib/data/search-index'
import { useRouter } from 'next/navigation'

const TYPE_CFG: Record<SearchItemType, {
  label: string; color: string; bg: string; border: string
  icon: React.ElementType
}> = {
  abbreviation: { label: 'Abbreviations',  color: '#E8C840', bg: 'rgba(232,200,64,0.07)', border: 'rgba(232,200,64,0.15)', icon: Hash },
  term:         { label: 'Terms',           color: '#0d7a5f', bg: 'rgba(13,122,95,0.07)',  border: 'rgba(13,122,95,0.15)',  icon: BookOpen },
  skill:        { label: 'Skills',          color: '#b45309', bg: 'rgba(180,83,9,0.07)',   border: 'rgba(180,83,9,0.15)',   icon: Lightbulb },
  prompt:       { label: 'Prompt Systems',  color: '#7c3aed', bg: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.15)', icon: MessageSquare },
  tool:         { label: 'Tools',           color: '#E8C840', bg: 'rgba(232,200,64,0.07)', border: 'rgba(232,200,64,0.15)', icon: Lightbulb },
}

const ORDER: SearchItemType[] = ['abbreviation', 'term', 'skill', 'prompt', 'tool']

function Hi({ text, q }: { text: string; q: string }) {
  if (!q || !text) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark style={{
        background: 'rgba(155,63,255,0.18)', color: '#C27FFF',
        borderRadius: '2px', padding: '0 1px', fontWeight: 600, fontStyle: 'normal',
      }}>
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  )
}

interface MobileSearchSheetProps {
  open: boolean
  onClose: () => void
}

export default function MobileSearchSheet({ open, onClose }: MobileSearchSheetProps) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const grouped = useMemo(() => searchAll(q), [q])
  const flat = useMemo(() => ORDER.flatMap(t => grouped[t] ?? []), [grouped])
  const total = flat.length
  const hasQ = q.trim().length >= 2

  // CSS @keyframes handle the animation automatically on mount/unmount.
  // No two-phase render needed — avoids React batching the state updates together.
  useEffect(() => {
    if (open) {
      setClosing(false)
      setVisible(true)
      const t = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(t)
    } else if (visible) {
      setClosing(true) // data-closing='true' → triggers out animation
      const t = setTimeout(() => {
        setVisible(false)
        setClosing(false)
      }, 280)
      return () => clearTimeout(t)
    }
  }, [open])

  // Reset query on close
  useEffect(() => { if (!open) setQ('') }, [open])

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  // Lock body scroll while visible (release immediately on close — sheet animates out on its own)
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [visible])

  const go = useCallback((href: string) => {
    router.push(href)
    onClose()
  }, [router, onClose])

  if (!visible) return null

  return (
    <div
      className="playbook-search-overlay"
      data-closing={closing ? 'true' : 'false'}
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="playbook-search-sheet">
        {/* ── Top bar ─────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 20px',
          paddingTop: 'max(20px, env(safe-area-inset-top))',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
          background: 'transparent',
        }}>
          {/* Search input — styled to match .playbook-header-actions glass pill */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            height: 44,
            padding: '0 14px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 9999,
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            boxShadow: '0 3px 10px -8px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search skills, prompts, terms…"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 15,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--font-body)',
                minWidth: 0,
              }}
            />
            {q && (
              <button
                onClick={() => { setQ(''); inputRef.current?.focus() }}
                style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <X size={12} color="rgba(255,255,255,0.6)" />
              </button>
            )}
          </div>

          {/* Glass X close button — same styling as back/header control */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="playbook-header-control playbook-header-control--frost"
            style={{ flexShrink: 0 }}
          >
            <X size={20} strokeWidth={2} aria-hidden />
          </button>
        </div>

        {/* ── Results ─────────────────────────────────────────── */}
        {/* overflow-y: scroll (not auto) ensures momentum scroll on iOS even with keyboard open */}
        <div style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        } as React.CSSProperties}>

          {/* Empty state */}
          {!hasQ && (
            <div style={{ padding: '20px 20px', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7,
              }}>
                Start typing to search<br />skills, prompts, tools, terms…
              </p>
            </div>
          )}

          {/* No results */}
          {hasQ && total === 0 && (
            <div style={{ padding: '64px 20px', textAlign: 'center' }}>
              <p style={{
                fontSize: 15, color: 'rgba(255,255,255,0.55)',
                marginBottom: 6, fontFamily: 'var(--font-body)',
              }}>
                Nothing found for &ldquo;<strong>{q}</strong>&rdquo;
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
                Try a skill name, AI term, or prompt topic.
              </p>
            </div>
          )}

          {/* Grouped results */}
          {hasQ && total > 0 && ORDER.map(type => {
            const items = grouped[type] ?? []
            if (!items.length) return null
            const c = TYPE_CFG[type]

            return (
              <div key={type}>
                {/* Group label */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '14px 20px 6px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.08em', color: c.color,
                  }}>
                    {c.label}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '1px 7px', borderRadius: 10,
                    background: c.bg, color: c.color, fontFamily: 'var(--font-body)',
                  }}>
                    {items.length}
                  </span>
                </div>

                {/* Items */}
                {items.map(item => (
                  <div
                    key={item.id}
                    onClick={() => go(item.href)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '13px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      WebkitTapHighlightColor: 'transparent',
                      transition: 'background 0.15s ease',
                    }}
                    onTouchStart={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(155,63,255,0.08)' }}
                    onTouchEnd={e => { setTimeout(() => { (e.currentTarget as HTMLElement).style.background = '' }, 180) }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14, fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)', margin: '0 0 2px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        <Hi text={item.title} q={q} />
                      </p>
                      {item.snippet && (
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          <Hi text={item.snippet} q={q} />
                        </p>
                      )}
                    </div>
                    <ArrowUpRight size={14} color="rgba(255,255,255,0.22)" style={{ flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            )
          })}

          <div style={{ height: 48, paddingBottom: 'env(safe-area-inset-bottom, 24px)' }} />
        </div>
      </div>
    </div>
  )
}
