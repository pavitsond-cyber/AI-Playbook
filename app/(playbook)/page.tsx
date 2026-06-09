'use client'

import Link from 'next/link'

const sections = [
  { num: '01', title: 'Skills',     sub: '21 resources',  href: '/skills'    },
  { num: '02', title: 'Prompts',    sub: '5 resources',   href: '/prompts'   },
  { num: '03', title: 'Glossary',   sub: '50+ resources', href: '/glossary'  },
  { num: '04', title: 'Principles', sub: '4 guidelines',  href: '/dos-donts' },
]

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
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/landing-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay to darken the video slightly ────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,0,20,0.35)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── Top nav ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 1292,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        {/* Headout logo — correct proportions, no stretch */}
        <img
          src="/images/headout-logo.svg"
          alt="headout"
          style={{
            height: 16,
            width: 109,   /* exact SVG viewBox ratio */
            display: 'block',
            flexShrink: 0,
          }}
        />

        {/* "THE RESOURCE LIBRARY" — reduced contrast */}
        <p style={{
          fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: '0.43em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',   /* low contrast */
          margin: 0,
          whiteSpace: 'nowrap',
        }}>
          The resource library
        </p>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: 74,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 60,
        zIndex: 10,
      }}>

        {/* Headline + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Headline — solid white, no clipping gradient */}
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(64px, 9vw, 130px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}>
            AI Playbook
          </h1>

          {/* Subtitle — solid white */}
          <p style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(18px, 2.1vw, 30px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#ffffff',
            maxWidth: 520,
          }}>
            A repository for everything in AI
          </p>
        </div>

        {/* Section links — bounce scale on hover, no color change */}
        <div style={{ display: 'flex', gap: 63, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="landing-section-link"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                width: 195,
              }}
            >
              <span style={{
                fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(20px, 2.1vw, 30px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#c18dff',
              }}>
                {s.num}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {/* Title — bouncy scale on hover via CSS class */}
                <span
                  className="landing-section-title"
                  style={{
                    fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                    fontSize: 'clamp(26px, 2.8vw, 40px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                  }}
                >
                  {s.title}
                </span>
                <span style={{
                  fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                  fontSize: 'clamp(14px, 1.4vw, 20px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
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
