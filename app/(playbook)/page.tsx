'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import InlineSearch from '@/components/search/InlineSearch'

const sections = [
  { num: '01', title: 'Skills',   sub: '21 resources',  href: '/skills'   },
  { num: '02', title: 'Prompts',  sub: '15 templates',  href: '/prompts'  },
  { num: '03', title: 'Glossary', sub: '54 terms',      href: '/glossary' },
]

/* ── Desktop card (single row, larger) ──────────────────────────────────── */
function DesktopCard({ s }: { s: typeof sections[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={s.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
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
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' : '0 2px 12px rgba(0,0,0,0.15)',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, backdrop-filter 0.28s ease',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 'clamp(20px,2.1vw,30px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>
        {s.num}
      </span>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, transform: hovered ? 'scale(1.04)' : 'scale(1)', transformOrigin: 'bottom left', transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 'clamp(18px,1.95vw,28px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1 }}>{s.title}</span>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 'clamp(11px,0.97vw,14px)', fontWeight: 400, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{s.sub}</span>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0.5, transform: hovered ? 'translateX(3px) translateY(-3px)' : 'translateX(0)', transition: 'opacity 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <ArrowUpRight size={24} color="#ffffff" />
        </div>
      </div>
    </Link>
  )
}

/* ── Mobile card (2-col grid, Figma spec) ──────────────────────────────── */
function MobileCard({ s }: { s: typeof sections[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={s.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        /* 2 columns with 7.6px gap: calc(50% - gap/2) */
        width: 'calc(50% - 3.8px)',
        height: 121,
        padding: 9,
        borderRadius: 4,
        flexShrink: 0,
        background: hovered
          ? 'linear-gradient(109deg, rgba(255,255,255,0.22) 3.87%, rgba(255,255,255,0.04) 101%)'
          : 'linear-gradient(109deg, rgba(255,255,255,0.12) 3.87%, rgba(255,255,255,0.00) 101%)',
        border: hovered ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
      }}
    >
      {/* Number */}
      <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 22, fontWeight: 400, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>
        {s.num}
      </span>
      {/* Title + sub + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1 }}>{s.title}</span>
          <span style={{ fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{s.sub}</span>
        </div>
        <ArrowUpRight size={20} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
      </div>
    </Link>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0D0B1E', overflow: 'hidden' }}>

      {/* ── Video ─────────────────────────────────────────────────────── */}
      {/* Mobile: full-screen (Figma shows diver full portrait)           */}
      {/* Desktop: right 58% of screen                                   */}
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 bottom-0 right-0 h-full w-full sm:w-[58%]"
        style={{ objectFit: 'cover', objectPosition: '72% center', zIndex: 0 }}
      >
        <source src="/videos/landing-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Desktop gradient mask ─────────────────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, #0D0B1E 0%, #0D0B1E 30%, rgba(13,11,30,0.96) 42%, rgba(13,11,30,0.75) 54%, rgba(13,11,30,0.3) 70%, rgba(13,11,30,0.05) 85%, transparent 100%)',
        }}
      />

      {/* ── Mobile gradient — dark top fade matching Figma ────────────── */}
      <div
        className="sm:hidden absolute pointer-events-none"
        style={{
          top: -3, left: -14, width: 445, height: 239,
          zIndex: 1,
          background: 'linear-gradient(to bottom, #0e1439, rgba(14,20,57,0))',
        }}
      />
      {/* Mobile: subtle dark overall tint for readability */}
      <div
        className="sm:hidden absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'rgba(13,11,30,0.35)' }}
      />

      {/* ── Purple/pink atmosphere ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-60%', left: '-15%',
        width: '130%', height: '260%',
        zIndex: 1, pointerEvents: 'none',
        transform: 'scaleY(-1)', opacity: 0.4, mixBlendMode: 'screen',
      }}>
        <img src="/images/landing-gradient.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP NAV (hidden on mobile — TopNav handles mobile)
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden sm:flex absolute items-center justify-between"
        style={{ top: 32, left: 'clamp(20px, 5.15vw, 80px)', right: 'clamp(20px, 5.15vw, 80px)', zIndex: 20 }}
      >
        <img src="/images/headout-logo.svg" alt="Headout" style={{ height: 16, width: 109, display: 'block', flexShrink: 0 }} />
        <div style={{ width: 'clamp(240px, 28vw, 400px)' }}>
          <InlineSearch placeholder="Search…" compact />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  — Figma node 110:1842
          Content: left:30px, top:80px (just below TopNav 64px)
          Title: 60px stacked, cards: 2×2 grid, gap: 7.6px
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="sm:hidden absolute"
        style={{ top: 80, left: 30, right: 30, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 25 }}
      >
        {/* Title + subtitle stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 60,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            paddingBottom: '0.06em',
            background: 'linear-gradient(163.1deg, #ffffff 41.19%, rgba(255,255,255,0) 112.51%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI Playbook
          </h1>
          <p style={{
            fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
            margin: 0,
            background: 'linear-gradient(168.5deg, #ffffff 41.19%, rgba(255,255,255,0) 112.51%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Headout team&apos;s repository for everything in design and beyond
          </p>
        </div>

        {/* 2×2 card grid — flex-wrap with 7.6px gap */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7.6 }}>
          {sections.map(s => <MobileCard key={s.href} s={s} />)}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT — Figma node 91:1716
          Content: left:74px, top:244px, title+subtitle side-by-side, cards in single row
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden sm:flex absolute"
        style={{
          top: 'clamp(120px, 30vh, 244px)',
          left: 'clamp(20px, 5.15vw, 80px)',
          right: 'clamp(20px, 5.15vw, 80px)',
          zIndex: 10,
          flexDirection: 'column',
          gap: 'clamp(28px, 4.3vw, 62px)',
        }}
      >
        {/* Title + subtitle side by side */}
        <div className="flex flex-row items-center" style={{ gap: 'clamp(12px, 2.2vw, 32px)' }}>
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(44px, 6.25vw, 90px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            paddingBottom: '0.06em',
            paddingRight: '0.04em',
            background: 'linear-gradient(163.1deg, #ffffff 41.19%, rgba(255,255,255,0) 112.51%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI Playbook
          </h1>
          <p style={{
            fontFamily: "'halyard-text','DM Sans',system-ui,sans-serif",
            fontSize: 'clamp(13px, 1.67vw, 24px)',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
            maxWidth: 337,
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

        {/* Single-row cards */}
        <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vw, 23px)', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
          {sections.map(s => <DesktopCard key={s.href} s={s} />)}
        </div>
      </div>

    </div>
  )
}
