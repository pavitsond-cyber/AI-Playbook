'use client'

import {
  useState, useMemo, useEffect, useRef, useCallback
} from 'react'
import {
  Search, X, ArrowUpRight, Hash, Lightbulb,
  MessageSquare, Shield, BookOpen
} from 'lucide-react'
import { searchAll, SearchItem, SearchItemType } from '@/lib/data/search-index'
import { useRouter } from 'next/navigation'

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
  { label: 'Principles',     href: '/dos-donts', type: 'principle' as SearchItemType },
  { label: 'Prompt Systems', href: '/prompts',   type: 'prompt'    as SearchItemType },
  { label: 'Skills',         href: '/skills',    type: 'skill'     as SearchItemType },
  { label: 'Glossary',       href: '/glossary',  type: 'term'      as SearchItemType },
]

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
  const [visible, setVisible] = useState(false)   // controls mount
  const [animate, setAnimate] = useState(false)   // controls slide-in
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
          // Small delay so the sheet is rendered before we try to focus
          setTimeout(() => inputRef.current?.focus(), 80)
        })
      )
    } else {
      setAnimate(false)
      // Wait for slide-out before unmounting
      const t = setTimeout(() => setVisible(false), 320)
      return () => clearTimeout(t)
    }
  }, [open])

  // Reset query when closed
  useEffect(() => { if (!open) setQ('') }, [open])

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  // Prevent body scroll while open
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
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: animate ? 1 : 0,
          transition: 'opacity 0.28s ease-out',
        }}
      />

      {/* Sheet — slides up from bottom */}
      <div
        style={{
          position: 'fixed',
          left: 0, right: 0, bottom: 0,
          zIndex: 999,
          background: '#0E0018',
          borderTop: '1px solid rgba(155,63,255,0.2)',
          borderRadius: '20px 20px 0 0',
          // Full height minus status bar area
          maxHeight: 'calc(100dvh - 48px)',
          display: 'flex',
          flexDirection: 'column',
          transform: animate ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)',
          overflow: 'hidden',
        }}
      >
        {/* Drag handle */}
        <div style={{
          display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, flexShrink: 0,
        }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Search input row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <div style={{
            flex: 1,
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(155,63,255,0.3)',
            borderRadius: 14,
            boxShadow: '0 0 0 3px rgba(155,63,255,0.08)',
          }}>
            <Search size={15} style={{ color: '#C27FFF', flexShrink: 0 }} />
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
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 15, color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--font-body)',
              }}
            />
            {q && (
              <button
                onClick={() => { setQ(''); inputRef.current?.focus() }}
                style={{
                  width: 20, height: 20, borderRadius: 6,
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <X size={11} color="rgba(255,255,255,0.5)" />
              </button>
            )}
          </div>

          {/* Cancel button */}
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              color: '#C27FFF', padding: '8px 4px', flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Cancel
          </button>
        </div>

        {/* Results area — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>

          {/* Quick nav */}
          {!hasQ && (
            <div style={{ padding: '20px 16px' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)',
                marginBottom: 12,
              }}>
                Quick navigate
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {QUICK.map(link => {
                  const c = TYPE_CFG[link.type]
                  const Icon = c.icon
                  return (
                    <button
                      key={link.href}
                      onClick={() => go(link.href)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        padding: '8px 14px', borderRadius: 100,
                        background: c.bg, border: `1px solid ${c.border}`,
                        color: c.color, fontSize: 13, fontWeight: 500,
                        fontFamily: 'var(--font-body)',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon size={12} /> {link.label}
                    </button>
                  )
                })}
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 20, lineHeight: 1.6,
              }}>
                Start typing to search across all skills, prompts, terms, and principles.
              </p>
            </div>
          )}

          {/* No results */}
          {hasQ && total === 0 && (
            <div style={{ padding: '48px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 6, fontFamily: 'var(--font-body)' }}>
                Nothing found for &ldquo;<strong>{q}</strong>&rdquo;
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
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
              <div key={type} style={{ marginBottom: 4 }}>
                {/* Group header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 16px 6px',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 5,
                    background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={10} color={c.color} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.08em', color: c.color,
                  }}>
                    {c.label}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '1px 7px',
                    borderRadius: 10, background: c.bg, color: c.color,
                    fontFamily: 'var(--font-body)',
                  }}>
                    {items.length}
                  </span>
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => go(item.href)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      transition: 'background 100ms',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                    onTouchStart={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(155,63,255,0.08)' }}
                    onTouchEnd={e => { setTimeout(() => { (e.currentTarget as HTMLElement).style.background = '' }, 150) }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: c.bg, border: `1px solid ${c.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={15} color={c.color} />
                    </div>

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

          {/* Bottom safe-area padding */}
          <div style={{ height: 32 }} />
        </div>
      </div>
    </>
  )
}
