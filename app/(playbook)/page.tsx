'use client'

import Link from 'next/link'

const sections = [
  { num: '01', title: 'Skills',      sub: '21 resources',   href: '/skills'    },
  { num: '02', title: 'Prompts',     sub: '5 resources',    href: '/prompts'   },
  { num: '03', title: 'Glossary',    sub: '50+ resources',  href: '/glossary'  },
  { num: '04', title: 'Principles',  sub: '4 guidelines',   href: '/dos-donts' },
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

      {/* ── Video background ──────────────────────────────────── */}
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
        {/* Drop video src here e.g. <source src="/video/bg.mp4" type="video/mp4" /> */}
      </video>

      {/* ── Background gradient SVG (purple/blue ellipses) ────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
        <img
          src="/images/landing-bg.svg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
        />
      </div>

      {/* ── Extra deep violet vignette on right ───────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'radial-gradient(ellipse 80% 90% at 80% 50%, rgba(60,20,100,0.45) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Top nav ───────────────────────────────────────────── */}
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
        {/* Headout logo */}
        <img
          src="/images/headout-logo.svg"
          alt="headout"
          style={{ height: 16, width: 'auto', display: 'block' }}
        />

        {/* "THE RESOURCE LIBRARY" */}
        <p style={{
          fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          background: 'linear-gradient(175.7deg, #ffffff 41%, rgba(255,255,255,0) 113%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
          whiteSpace: 'nowrap',
        }}>
          The resource library
        </p>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
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
          <h1 style={{
            fontFamily: "'Halyard Display', Georgia, serif",
            fontSize: 'clamp(64px, 9vw, 130px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            background: 'linear-gradient(169.4deg, #ffffff 41%, rgba(255,255,255,0) 113%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI Playbook
          </h1>
          <p style={{
            fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(18px, 2.1vw, 30px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            margin: 0,
            background: 'linear-gradient(177.5deg, #ffffff 41%, rgba(255,255,255,0) 113%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            maxWidth: 520,
          }}>
            A repository for everything in AI
          </p>
        </div>

        {/* Section links */}
        <div style={{
          display: 'flex',
          gap: 63,
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        }}>
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 22, width: 195 }}
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
                <span style={{
                  fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
                  fontSize: 'clamp(26px, 2.8vw, 40px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c18dff'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
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
