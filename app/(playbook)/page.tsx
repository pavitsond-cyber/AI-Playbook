'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import InlineSearch from '@/components/search/InlineSearch'

const sections = [
  { num: '01', title: 'Skills',     sub: '21 resources',   href: '/skills'    },
  { num: '02', title: 'Prompts',    sub: '15 templates',   href: '/prompts'   },
  { num: '03', title: 'Glossary',   sub: '54 terms',       href: '/glossary'  },
  { num: '04', title: 'Principles', sub: '10 principles',  href: '/dos-donts' },
]

/*
 * Figma spec (node 91:1716 @ 1440×800):
 *  – Nav:     centered 1292px container → left edge = (1440-1292)/2 = 74px
 *  – Content: left: 74px, top: 244px
 *  – Title:   90px Halyard Display, gradient, no-wrap
 *  – Sub:     24px Halyard Text, w: 337px, same row as title (gap 32px)
 *  – Cards:   4 × (213×159px), gap 23px, single row (no wrap)
 *  – Video:   right portion of viewport, object-position center
 */
const LEFT = 74          // px — matches Figma 74px left edge
const NAV_TOP = 32       // px — Figma nav top
const CONTENT_TOP = 244  // px — Figma content top

/* ── Glass card ─────────────────────────────────────────────────────────── */
function SectionCard({ s }: { s: typeof sections[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={s.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Fixed size matching Figma, fluid between 160–213px
        width: 'clamp(140px, 14.8vw, 213px)',
        height: 'clamp(120px, 11vw, 159px)',
        padding: 'clamp(10px, 0.84vw, 12px)',
        borderRadius: 5,
        flexShrink: 0,
        background: hovered
          ? 'linear-gradient(109deg, rgba(255,255,255,0.22) 3.87%, rgba(255,255,255,0.06) 101%)'
          : 'linear-gradient(109deg, rgba(255,255,255,0.12) 3.87%, rgba(255,255,255,0.00) 101%)',
        border: hovered ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
        backdropFilter: hovered ? 'blur(20px) saturate(180%)' : 'blur(12px)',
        WebkitBackdropFilter: hovered ? 'blur(20px) saturate(180%)' : 'blur(12px)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
          : '0 2px 12px rgba(0,0,0,0.15)',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, backdrop-filter 0.28s ease',
        cursor: 'pointer',
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
        fontSize: 'clamp(20px, 2.1vw, 30px)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: 'rgba(255,255,255,0.4)',
        lineHeight: 1,
      }}>
        {s.num}
      </span>

      {/* Title + sub + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 7,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transformOrigin: 'bottom left',
          transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <span style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(18px, 1.95vw, 28px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            lineHeight: 1,
          }}>
            {s.title}
          </span>
          <span style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(11px, 0.97vw, 14px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1,
          }}>
            {s.sub}
          </span>
        </div>

        {/* Arrow */}
        <div style={{
          width: 26, height: 26,
          borderRadius: '50%',
          background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          opacity: hovered ? 1 : 0.55,
          transform: hovered ? 'translateX(2px) translateY(-2px)' : 'translateX(0)',
          transition: 'opacity 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease',
        }}>
          <ArrowUpRight size={13} color="#ffffff" />
        </div>
      </div>
    </Link>
  )
}

/* ── Homepage ───────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0D0B1E',
      overflow: 'hidden',
      fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
    }}>

      {/* ── Video — right side desktop, full-screen mobile ────────────── */}
      {/* Figma: video occupies the right ~58% of the viewport            */}
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 bottom-0 right-0 h-full w-full sm:w-[58%]"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      >
        <source src="/videos/landing-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient — left-to-right horizontal mask ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, #0D0B1E 0%, #0D0B1E 35%, rgba(13,11,30,0.92) 48%, rgba(13,11,30,0.55) 62%, rgba(13,11,30,0.15) 78%, transparent 100%)',
        }}
      />

      {/* ── Mobile dark overlay ───────────────────────────────────────── */}
      <div
        className="sm:hidden absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(13,11,30,0.6)' }}
      />

      {/* ── Purple/pink atmosphere glow ───────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '-60%', left: '-15%',
        width: '130%', height: '260%',
        zIndex: 1, pointerEvents: 'none',
        transform: 'scaleY(-1)', opacity: 0.4, mixBlendMode: 'screen',
      }}>
        <img src="/images/landing-gradient.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Desktop nav — logo LEFT-aligned at 74px + search bar ─────── */}
      {/* (Hidden on mobile — TopNav from layout handles mobile)          */}
      <div
        className="hidden sm:flex absolute items-center justify-between"
        style={{
          top: NAV_TOP,
          left: LEFT,
          right: LEFT,
          zIndex: 20,
        }}
      >
        <img
          src="/images/headout-logo.svg"
          alt="Headout"
          style={{ height: 16, width: 109, display: 'block', flexShrink: 0 }}
        />

        <div style={{ width: 'clamp(240px, 28vw, 400px)' }}>
          <InlineSearch placeholder="Search…" compact />
        </div>
      </div>

      {/* ── Main content — left: 74px, top: 244px (matches Figma exactly) */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          /* Desktop: fixed position matching Figma spec */
          left: `clamp(20px, ${LEFT / 14.4}vw, ${LEFT}px)`,   /* 74/1440 ≈ 5.14vw */
          top: `clamp(120px, ${CONTENT_TOP / 8}vh, ${CONTENT_TOP}px)`, /* scales with viewport height */
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(32px, 4.3vw, 62px)',
        }}
      >

        {/* ── Title + subtitle — side by side (Figma: gap 32px) ──────── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center"
          style={{ gap: 'clamp(14px, 2.2vw, 32px)' }}
        >
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(44px, 6.25vw, 90px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            background: 'linear-gradient(163.1deg, #ffffff 41.19%, rgba(255,255,255,0) 112.51%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI Playbook
          </h1>

          <p style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(14px, 1.67vw, 24px)',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
            width: 'clamp(200px, 23.4vw, 337px)',
            margin: 0,
            flexShrink: 0,
            background: 'linear-gradient(163.4deg, #ffffff 41.19%, rgba(255,255,255,0) 112.51%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Headout team&apos;s repository for everything in design and beyond
          </p>
        </div>

        {/* ── Cards — SINGLE ROW, no wrap (Figma: gap 23px) ──────────── */}
        {/* Desktop: all 4 cards in one horizontal line                   */}
        {/* Mobile: horizontal scroll                                     */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(8px, 1.6vw, 23px)',
            flexWrap: 'nowrap',          /* ← single line, never wraps */
            overflowX: 'auto',           /* ← scroll on very small screens */
            scrollbarWidth: 'none',      /* ← hide scrollbar */
            paddingBottom: 4,            /* ← breathing room */
          }}
        >
          {sections.map(s => (
            <SectionCard key={s.href} s={s} />
          ))}
        </div>

      </div>
    </div>
  )
}
