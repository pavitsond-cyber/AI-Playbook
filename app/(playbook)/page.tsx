'use client'

import Link from 'next/link'
import InlineSearch from '@/components/search/InlineSearch'

const sections = [
  { num: '01', title: 'Skills',     sub: '21 resources',  href: '/skills'    },
  { num: '02', title: 'Prompts',    sub: '5 resources',   href: '/prompts'   },
  { num: '03', title: 'Glossary',   sub: '50+ resources', href: '/glossary'  },
  { num: '04', title: 'Principles', sub: '4 guidelines',  href: '/dos-donts' },
]

/* Shared edge padding — logo and content share the same horizontal margin */
const H_PAD = 'clamp(20px, 5.1vw, 74px)'

export default function LandingPage() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#1a1028',
      overflow: 'hidden',
      fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
    }}>

      {/* ── Video background ──────────────────────────────── */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/videos/landing-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ──────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,0,20,0.35)', zIndex: 1, pointerEvents: 'none' }} />

      {/* ── Figma gradient overlay (flipped: dark top → blue mid → pink bot) */}
      <div style={{
        position: 'absolute', top: '-60%', left: '-15%',
        width: '130%', height: '260%',
        zIndex: 2, pointerEvents: 'none',
        transform: 'scaleY(-1)', opacity: 0.55, mixBlendMode: 'screen',
      }}>
        <img src="/images/landing-gradient.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Top nav ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 28, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: H_PAD, paddingRight: H_PAD,
        zIndex: 10,
      }}>
        {/* Headout logo */}
        <img src="/images/headout-logo.svg" alt="headout"
          style={{ height: 16, width: 109, display: 'block', flexShrink: 0 }} />

        {/* Search bar — replaces "THE RESOURCE LIBRARY" */}
        <div style={{ width: 'clamp(200px, 22vw, 320px)' }}>
          <InlineSearch
            placeholder="Search…"
            compact
            alignRight
            dropdownWidth={400}
          />
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      {/* Horizontally centred container with LEFT-ALIGNED text inside */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -46%)',
        zIndex: 10,
        width: 'min(90vw, 960px)',   /* centred fixed-width block */
        display: 'flex',
        flexDirection: 'column',
        gap: 52,
      }}>

        {/* Headline + subtitle — TEXT LEFT-ALIGNED */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(52px, 8.5vw, 122px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            /* Figma gradient: white → transparent at 169° */
            background: 'linear-gradient(169.38deg, #ffffff 41%, rgba(255,255,255,0.15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            /* overflow: visible so nothing clips */
            overflow: 'visible',
            paddingRight: '0.06em',   /* tiny buffer so k descender never clips */
          }}>
            AI Playbook
          </h1>

          <p style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(16px, 2vw, 28px)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            margin: 0,
            color: '#ffffff',
          }}>
            Headout team&apos;s repository for everything in AI
          </p>
        </div>

        {/* Section links — left-aligned row */}
        <div style={{
          display: 'flex',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="landing-section-link"
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}
            >
              <span style={{
                fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(18px, 1.9vw, 28px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: '#c18dff',
              }}>
                {s.num}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="landing-section-title" style={{
                  fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                  fontSize: 'clamp(22px, 2.6vw, 38px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                }}>
                  {s.title}
                </span>
                <span style={{
                  fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                  fontSize: 'clamp(13px, 1.3vw, 18px)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  {s.sub}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
