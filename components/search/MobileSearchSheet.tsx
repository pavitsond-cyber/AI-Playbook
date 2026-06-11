'use client'

import {
  useState, useMemo, useEffect, useRef, useCallback
} from 'react'
import {
  Search, X, ArrowUpRight, Hash, Lightbulb,
  MessageSquare, Shield, BookOpen
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
  principle:    { label: 'Principles',      color: '#be185d', bg: 'rgba(190,24,93,0.07)',  border: 'rgba(190,24,93,0.15)',  icon: Shield },
  tool:         { label: 'Tools',           color: '#E8C840', bg: 'rgba(232,200,64,0.07)', border: 'rgba(232,200,64,0.15)', icon: Lightbulb },
}

const ORDER: SearchItemType[] = ['abbreviation', 'term', 'skill', 'prompt', 'tool']

const QUICK = [
  { label: 'PROMPTS',  href: '/prompts',  color: '#9B3FFF', bg: 'rgba(155,63,255,0.1)',  border: 'rgba(155,63,255,0.2)'  },
  { label: 'SKILLS',   href: '/skills',   color: '#FF69DB', bg: 'rgba(255,105,219,0.1)', border: 'rgba(255,105,219,0.2)' },
  { label: 'GLOSSARY', href: '/glossary', color: '#00CCA8', bg: 'rgba(0,204,168,0.1)',   border: 'rgba(0,204,168,0.2)'   },
  { label: 'TOOLS',    href: '/tools',    color: '#E8C840', bg: 'rgba(232,200,64,0.1)',  border: 'rgba(232,200,64,0.2)'  },
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

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [open])

  const go = useCallback((href: string) => {
    router.push(href)
    onClose()
  }, [router, onClose])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: '#0A0010',
        willChange: 'transform',
        // Slide in from right
        transform: animate ? 'translateX(0)' : 'translateX(100%)',
        transition: animate
          ? 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          : 'transform 0.22s cubic-bezier(0.55, 0, 1, 0.45)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        paddingTop: 'max(12px, env(safe-area-inset-top))',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        background: 'rgba(10,0,16,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        {/* Search input */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(155,63,255,0.35)',
          borderRadius: 12,
          boxShadow: '0 0 0 3px rgba(155,63,255,0.07)',
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
      {/* Scroll only when results are present; locked in empty state */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: hasQ ? 'auto' : 'hidden',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      } as React.CSSProperties}>

        {/* Quick nav */}
        {!hasQ && (
          <div style={{ padding: '24px 16px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.3)', marginBottom: 14,
            }}>
              Quick navigate
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
              {QUICK.map(link => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  style={{
                    padding: '9px 16px', borderRadius: 100,
                    background: link.bg, border: `1px solid ${link.border}`,
                    color: link.color, fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-body)', cursor: 'pointer',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
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
  )
}
