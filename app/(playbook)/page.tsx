'use client'

import Link from 'next/link'

const sections = [
  { num: '01', title: 'Skills',     sub: '21 resources',  href: '/skills'    },
  { num: '02', title: 'Prompts',    sub: '5 resources',   href: '/prompts'   },
  { num: '03', title: 'Glossary',   sub: '50+ resources', href: '/glossary'  },
  { num: '04', title: 'Principles', sub: '4 guidelines',  href: '/dos-donts' },
]

/* Shared horizontal margin so logo and headline always share the same left edge */
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

      {/* ── Video background ─────────────────────────────── */}
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

      {/* ── Dark overlay ─────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,0,20,0.35)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── Top nav — logo left-aligned at H_PAD ─────────── */}
      <div style={{
        position: 'absolute',
        top: 32,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: H_PAD,
        paddingRight: H_PAD,
        zIndex: 10,
      }}>
        {/* Headout logo — same left edge as headline */}
        <img
          src="/images/headout-logo.svg"
          alt="headout"
          style={{
            height: 16,
            width: 109,
            display: 'block',
            flexShrink: 0,
          }}
        />

        {/* "THE RESOURCE LIBRARY" — low contrast */}
        <p style={{
          fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: '0.43em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
          margin: 0,
          whiteSpace: 'nowrap',
        }}>
          The resource library
        </p>
      </div>

      {/* ── Main content — same left edge as logo ────────── */}
      <div style={{
        position: 'absolute',
        left: H_PAD,
        top: '42%',           /* slightly above centre — diver sits in the right half */
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 52,
        zIndex: 10,
        maxWidth: '55vw',     /* keep text away from the diver on wide screens */
      }}>

        {/* Headline + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(52px, 8.5vw, 122px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#ffffff',
            whiteSpace: 'nowrap',
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
            A repository for everything in AI
          </p>
        </div>

        {/* Section links */}
        <div style={{ display: 'flex', gap: 'clamp(32px, 4.4vw, 63px)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="landing-section-link"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                minWidth: 0,
              }}
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
                <span
                  className="landing-section-title"
                  style={{
                    fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                    fontSize: 'clamp(22px, 2.6vw, 38px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                  }}
                >
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
