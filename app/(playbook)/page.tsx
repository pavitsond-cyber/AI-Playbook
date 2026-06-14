'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const sections = [
  { num: '01', title: 'Skills',   sub: '21 modules',    href: '/skills'   },
  { num: '02', title: 'Prompts',  sub: '15 patterns',   href: '/prompts'  },
  { num: '03', title: 'Glossary', sub: '54 concepts',   href: '/glossary' },
  { num: '04', title: 'Tools',    sub: '18 essentials', href: '/tools'    },
]

type Section = typeof sections[0]
type CardNavigateHandler = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void

/* ── Desktop card (2×2 grid, large) ──────────────────────────────────────── */
function DesktopCard({
  s,
  navigating,
  onNavigate,
}: {
  s: Section
  navigating: boolean
  onNavigate: CardNavigateHandler
}) {
  const [hovered, setHovered] = useState(false)
  const active = hovered || navigating

  return (
    <Link
      href={s.href}
      onClick={event => onNavigate(event, s.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 'clamp(20px, 2.2vw, 32px)',
        borderRadius: 20, overflow: 'hidden',
        background: active
          ? 'linear-gradient(109deg, rgba(255,255,255,0.18) 3.87%, rgba(255,255,255,0.05) 101%)'
          : 'linear-gradient(109deg, rgba(255,255,255,0.10) 3.87%, rgba(255,255,255,0.00) 101%)',
        border: active ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.09)',
        backdropFilter: active ? 'blur(24px) saturate(180%)' : 'blur(16px)',
        WebkitBackdropFilter: active ? 'blur(24px) saturate(180%)' : 'blur(16px)',
        boxShadow: active ? '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)' : '0 2px 16px rgba(0,0,0,0.18)',
        filter: navigating ? 'brightness(0.92)' : 'brightness(1)',
        transition: 'background 0.24s ease-in-out, border-color 0.24s ease-in-out, box-shadow 0.24s ease-in-out, backdrop-filter 0.24s ease-in-out, filter 0.3s ease-in-out',
        cursor: 'pointer',
        minHeight: 'clamp(140px, 13vw, 180px)',
        position: 'relative',
      }}
    >
      {/* Number — top left */}
      <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1.1vw,16px)', fontWeight: 400, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.3)', lineHeight: 1 }}>
        {s.num}
      </span>

      {/* Title + sub + arrow — bottom */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,1.8vw,28px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1 }}>{s.title}</span>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1.05vw,15px)', fontWeight: 400, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.45)', lineHeight: 1 }}>{s.sub}</span>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)', transform: active ? 'translateX(3px) translateY(-3px)' : 'translateX(0)', transition: 'background 0.24s ease-in-out, transform 0.3s ease-in-out' }}>
          <ArrowUpRight size={20} color="#ffffff" />
        </div>
      </div>
    </Link>
  )
}

/* ── Mobile card (2-col grid, Figma spec) ──────────────────────────────── */
function MobileCard({
  s,
  navigating,
  onNavigate,
}: {
  s: Section
  navigating: boolean
  onNavigate: CardNavigateHandler
}) {
  const [active, setActive] = useState(false)
  const pressed = active || navigating

  return (
    <Link
      href={s.href}
      onClick={event => onNavigate(event, s.href)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 180)}
      onTouchCancel={() => setActive(false)}
      style={{
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: 'calc(50% - 3.8px)',
        height: 121,
        padding: 9,
        borderRadius: 14, overflow: "hidden",
        flexShrink: 0,
        /* Tap = desktop hover: glass solidifies, inset highlight, shadow */
        background: pressed
          ? 'linear-gradient(109deg, rgba(255,255,255,0.22) 3.87%, rgba(255,255,255,0.06) 101%)'
          : 'linear-gradient(109deg, rgba(255,255,255,0.12) 3.87%, rgba(255,255,255,0.00) 101%)',
        border: pressed ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: pressed ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' : 'none',
        filter: navigating ? 'brightness(0.92)' : 'brightness(1)',
        transition: 'background 0.24s ease-in-out, border-color 0.24s ease-in-out, box-shadow 0.24s ease-in-out, filter 0.3s ease-in-out',
        cursor: 'pointer',
        /* Kills the browser default dark tap flash entirely */
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
      }}
    >
      {/* Number */}
      <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>
        {s.num}
      </span>
      {/* Title + sub + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1 }}>{s.title}</span>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{s.sub}</span>
        </div>
        <ArrowUpRight size={20} color={pressed ? '#ffffff' : 'rgba(255,255,255,0.7)'} style={{ flexShrink: 0, transition: 'color 0.24s ease-in-out' }} />
      </div>
    </Link>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const router = useRouter()
  const [navigatingHref, setNavigatingHref] = useState<string | null>(null)

  /* Eagerly prefetch all section routes so navigation is instant on tap */
  useEffect(() => {
    sections.forEach(s => router.prefetch(s.href))
  }, [router])

  const navigateFromCard: CardNavigateHandler = (event, href) => {
    if (navigatingHref) {
      event.preventDefault()
      return
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    setNavigatingHref(href)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => router.push(href), reduceMotion ? 0 : 300)
  }

  return (
    <div
      className="landing-root"
      data-navigating={navigatingHref ? 'true' : 'false'}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        filter: navigatingHref ? 'blur(2px)' : 'blur(0)',
        transition: 'filter 0.3s ease-in-out',
      }}
    >

      {/* ── MOBILE background — Figma node 163:587 ──────────────────────── */}
      <div
        className="sm:hidden absolute"
        style={{
          inset: 0, zIndex: 0,
          backgroundImage: `url('${BP}/images/mobile-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Desktop gradient mask — left solid dark → transparent right ── */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, #0D0B1E 0%, #0D0B1E 28%, rgba(13,11,30,0.92) 40%, rgba(13,11,30,0.6) 55%, rgba(13,11,30,0.2) 72%, rgba(13,11,30,0.05) 88%, transparent 100%)',
        }}
      />

      {/* ── Purple/pink atmosphere (desktop only) ────────────────────── */}
      <div className="hidden sm:block" style={{
        position: 'absolute', top: '-60%', left: '-15%',
        width: '130%', height: '260%',
        zIndex: 1, pointerEvents: 'none',
        transform: 'scaleY(-1)', opacity: 0.4, mixBlendMode: 'screen',
      }}>
        <img src={`${BP}/images/landing-gradient.svg`} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TopNav (always visible) handles desktop logo+search on homepage
      ══════════════════════════════════════════════════════════════════ */}

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  — Figma node 110:1842
          Content: 20px mobile gutter, below the shared page header
          Title: 60px stacked, cards: 2×2 grid, gap: 7.6px
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="sm:hidden absolute flex flex-col"
        style={{ top: 108, left: 20, right: 20, zIndex: 10, gap: 25 }}
      >
        {/* Title + byline — slides in from left */}
        <div className="animate-slide-right delay-75" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 38, fontWeight: 400, lineHeight: 1,
            letterSpacing: '-0.02em', margin: 0, paddingBottom: '0.06em', color: '#ffffff',
          }}>
            An AI head start
          </h1>
          <span style={{
            fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
            fontSize: 13, fontWeight: 400, letterSpacing: '0.01em',
            color: 'rgba(255,255,255,0.4)', lineHeight: 1,
          }}>
            from Headout Design
          </span>
        </div>

        {/* Subtitle — fades up slightly after title */}
        <p className="animate-fade-up delay-150" style={{
          fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
          fontSize: 16, fontWeight: 400, lineHeight: 1.5,
          letterSpacing: '-0.02em', margin: 0, color: '#ffffff',
        }}>
          Prompts, tools, skills, and field notes from how we use AI to think sharper, design faster, and ship with fewer blank pages.
        </p>

        {/* 2×2 card grid — each card pops in with stagger */}
        <div className="card-stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: 7.6 }}>
          {sections.map(s => (
            <MobileCard
              key={s.href}
              s={s}
              navigating={navigatingHref === s.href}
              onNavigate={navigateFromCard}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT — heading stacked above 2×2 card grid
          Aligned to the back arrow: same max-width + padding as the nav
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden sm:flex flex-col absolute"
        style={{
          top: 'clamp(80px, 16vh, 140px)',
          left: 0,
          right: 0,
          zIndex: 10,
          paddingInline: 'max(env(safe-area-inset-left, 0px), clamp(20px, 4vw, 48px))',
        }}
      >
      <div style={{ width: '100%', maxWidth: 960, marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 40px)' }}>
        {/* Heading + byline + subtitle — stacked */}
        <div className="flex flex-col animate-slide-right delay-100" style={{ gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.2vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: 0,
              color: '#ffffff',
            }}>
              An AI head start
            </h1>
            <span style={{
              fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
              fontSize: 'clamp(12px, 0.9vw, 14px)', fontWeight: 400, letterSpacing: '0.01em',
              color: 'rgba(255,255,255,0.4)', lineHeight: 1,
            }}>
              from Headout Design
            </span>
          </div>
          <p style={{
            fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
            fontSize: 'clamp(14px, 1.25vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            maxWidth: 560,
            margin: 0,
            color: 'rgba(255,255,255,0.7)',
          }}>
            Prompts, tools, skills, and field notes from how we use AI to think sharper, design faster, and ship with fewer blank pages.
          </p>
        </div>

        {/* 4-col single-row card grid */}
        <div className="card-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(10px, 1.2vw, 14px)' }}>
          {sections.map(s => (
            <DesktopCard
              key={s.href}
              s={s}
              navigating={navigatingHref === s.href}
              onNavigate={navigateFromCard}
            />
          ))}
        </div>
      </div>
      </div>

      {/* ── Contribute nudge — bottom of page, both breakpoints ─────────── */}
      <div
        className="animate-fade-up delay-350"
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 4vh, 40px)',
          left: 0,
          right: 0,
          zIndex: 10,
          paddingInline: 'max(env(safe-area-inset-left, 0px), clamp(20px, 4vw, 48px))',
        }}
      >
        <div style={{ width: '100%', maxWidth: 960, marginInline: 'auto' }}>
          <span style={{
            fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
            fontSize: 'clamp(14px, 1.11vw, 16px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '-0.01em',
          }}>
            Share your prompts, tools, and skills with the team.{' '}
            <Link
              href="/contribute"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationColor: 'rgba(255,255,255,0.5)',
                transition: 'text-decoration-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = '#ffffff'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = 'rgba(255,255,255,0.5)'
              }}
            >
              Contribute now
            </Link>
          </span>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
          background: '#0D0B1E',
          opacity: navigatingHref ? 0.72 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

    </div>
  )
}
