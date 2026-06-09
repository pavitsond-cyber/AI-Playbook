'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const sections = [
  { num: '01', title: 'Skills',     sub: '21 resources',   href: '/skills'    },
  { num: '02', title: 'Prompts',    sub: '15 templates',   href: '/prompts'   },
  { num: '03', title: 'Glossary',   sub: '54 terms',       href: '/glossary'  },
  { num: '04', title: 'Principles', sub: '10 principles',  href: '/dos-donts' },
]

/* ── Section card with glassmorphism hover ─────────────────────────────── */
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
        width: 'clamp(160px, 16vw, 213px)',
        height: 'clamp(130px, 13vw, 159px)',
        padding: 'clamp(10px, 1vw, 14px)',
        borderRadius: 8,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        // Glassmorphism — solidifies on hover
        background: hovered
          ? 'linear-gradient(109deg, rgba(255,255,255,0.22) 3.87%, rgba(255,255,255,0.06) 101%)'
          : 'linear-gradient(109deg, rgba(255,255,255,0.12) 3.87%, rgba(255,255,255,0.00) 101%)',
        border: hovered
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid rgba(255,255,255,0.07)',
        backdropFilter: hovered ? 'blur(20px) saturate(180%)' : 'blur(12px)',
        WebkitBackdropFilter: hovered ? 'blur(20px) saturate(180%)' : 'blur(12px)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
          : '0 2px 12px rgba(0,0,0,0.2)',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, backdrop-filter 0.28s ease',
        cursor: 'pointer',
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
        fontSize: 'clamp(20px, 2.2vw, 30px)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: 'rgba(255,255,255,0.4)',
        lineHeight: 1,
        transition: 'color 0.25s ease',
      }}>
        {s.num}
      </span>

      {/* Bottom row: title+sub + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 6,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transformOrigin: 'bottom left',
          transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <span style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(20px, 2.4vw, 28px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            lineHeight: 1,
          }}>
            {s.title}
          </span>
          <span style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(12px, 1.1vw, 14px)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1,
          }}>
            {s.sub}
          </span>
        </div>

        {/* Arrow — always present, fades + shifts on hover */}
        <div style={{
          width: 'clamp(22px, 2.2vw, 26px)',
          height: 'clamp(22px, 2.2vw, 26px)',
          borderRadius: '50%',
          background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? 'translateX(2px) translateY(-2px)' : 'translateX(0) translateY(0)',
          transition: 'opacity 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease',
        }}>
          <ArrowUpRight size={14} color="#ffffff" />
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
    }}>

      {/* ── Video — right column desktop, full-screen mobile ──────────── */}
      {/* Desktop: video fills the right 55% of the screen (portrait crop of horizontal video) */}
      {/* Mobile: video fills full screen for an immersive vertical look */}
      <video
        autoPlay muted loop playsInline
        className="absolute"
        style={{
          top: 0, bottom: 0, right: 0,
          // Mobile: full width; Desktop: right 55%
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          zIndex: 0,
        }}
      >
        <source src="/videos/landing-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Left-to-right gradient masking — blends video into dark bg ── */}
      {/* Mobile: top-to-bottom dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          // Desktop: horizontal fade — left solid dark → transparent right
          background: [
            'linear-gradient(to right, #0D0B1E 0%, #0D0B1E 38%, rgba(13,11,30,0.88) 52%, rgba(13,11,30,0.45) 68%, rgba(13,11,30,0.1) 82%, transparent 100%)',
          ].join(','),
        }}
      />

      {/* ── Mobile: extra dark overlay for readability ─────────────────── */}
      <div
        className="sm:hidden absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(13,11,30,0.55)' }}
      />

      {/* ── Purple/pink Figma gradient atmosphere — left side glow ──── */}
      <div style={{
        position: 'absolute',
        top: '-60%', left: '-15%',
        width: '130%', height: '260%',
        zIndex: 1, pointerEvents: 'none',
        transform: 'scaleY(-1)', opacity: 0.45, mixBlendMode: 'screen',
      }}>
        <img src="/images/landing-gradient.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Main content — vertically centered in the left column ──────── */}
      <div
        className="absolute"
        style={{
          zIndex: 10,
          left: 'clamp(20px, 5.1vw, 74px)',
          right: 'clamp(20px, 5.1vw, 74px)',
          top: '50%',
          transform: 'translateY(-46%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(36px, 4.5vw, 62px)',
          maxWidth: 860,
        }}
      >

        {/* ── Title + subtitle ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center" style={{ gap: 'clamp(16px, 2.5vw, 32px)' }}>
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(48px, 7vw, 90px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            background: 'linear-gradient(163deg, #ffffff 41%, rgba(255,255,255,0) 112%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI Playbook
          </h1>

          <p style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(15px, 1.6vw, 22px)',
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
            maxWidth: 340,
            margin: 0,
            background: 'linear-gradient(163deg, #ffffff 41%, rgba(255,255,255,0) 112%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Headout team&apos;s repository for everything in design and beyond
          </p>
        </div>

        {/* ── Section cards ──────────────────────────────────────────── */}
        <div
          className="flex flex-wrap"
          style={{ gap: 'clamp(10px, 1.6vw, 23px)' }}
        >
          {sections.map(s => (
            <SectionCard key={s.href} s={s} />
          ))}
        </div>

      </div>
    </div>
  )
}
