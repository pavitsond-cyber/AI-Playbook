'use client'

import {
  useState, useMemo, useEffect, useRef, useCallback
} from 'react'
import {
  Search, X, ArrowUpRight, Hash, Lightbulb,
  MessageSquare, BookOpen
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
  const [animate, setAnimate] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const grouped = useMemo(() => searchAll(q), [q])
  const flat = useMemo(() => ORDER.flatMap(t => grouped[t] ?? []), [grouped])
  const total = flat.length
  const hasQ = q.trim().length >= 2

  // Mount → animate in
  useEffect(() => {
    if (open) {
      setVisible(true)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true)
          setTimeout(() => inputRef.current?.focus(), 20)
        })
      )
    } else {
      setAnimate(false)
      const t = setTimeout(() => setVisible(false), 300)
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

  // Lock body scroll — only overflow:hidden, NOT position:fixed (fixes iOS keyboard scroll)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = useCallback((href: string) => {
    router.push(href)
    onClose()
  }, [router, onClose])

  if (!visible) return null

  return (
    <div
      className="playbook-search-overlay"
      data-open={animate ? 'true' : 'false'}
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
        padding: '12px 16px',
        paddingTop: 'max(12px, env(safe-area-inset-top))',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        background: 'transparent',
        }}>
        {/* Search input */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 18,
          backdropFilter: 'blur(24px) saturate(150%)',
          WebkitBackdropFilter: 'blur(24px) saturate(150%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
        }}>
          <Search size={15} style={{ color: '#C27FFF', flexShrink: 0 }} />
          <input
            ref={inputRef}
            autoFocus
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
            }}
          />
          {q && (
            <button
              onClick={() => { setQ(''); inputRef.current?.focus() }}
              style={{
                width: 20, height: 20, borderRadius: 6,
                background: 'none',
                border: 'none', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <X size={11} color="rgba(255,255,255,0.5)" />
            </button>
          )}
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 500,
            color: '#C27FFF',
            padding: '8px 4px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Cancel
        </button>
        </div>

        {/* ── Results ─────────────────────────────────────────── */}
        {/* Always scrollable so the iOS keyboard never traps content */}
        <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}>

        {/* Empty state */}
        {!hasQ && (
          <div style={{ padding: '48px 16px', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6,
            }}>
              Start typing to search skills, prompts, tools, terms…
            </p>
          </div>
        )}

        {/* No results */}
        {hasQ && total === 0 && (
          <div style={{ padding: '64px 16px', textAlign: 'center' }}>
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
          const Icon = c.icon

          return (
            <div key={type}>
              {/* Group label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '12px 16px 6px',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em', color: c.color,
                }}>
                  {c.label}
                </span>
                <span style={{
                  fontSize: 12, fontWeight: 600,
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
                    padding: '13px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onTouchStart={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(155,63,255,0.07)' }}
                  onTouchEnd={e => { setTimeout(() => { (e.currentTarget as HTMLElement).style.background = '' }, 150) }}
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
                  <ArrowUpRight size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0 }} />
                </div>
              ))}
            </div>
          )
        })}

          <div style={{ height: 40, paddingBottom: 'env(safe-area-inset-bottom, 20px)' }} />
        </div>
      </div>
    </div>
  )
}
