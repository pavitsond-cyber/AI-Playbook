'use client'

import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'
import SiteFooter from '@/components/glossary/SiteFooter'

/* ── Cinematic gradient artworks — designed for landscape card-top format ── */
const ARTWORKS: Record<string, { bg: string; overlay?: string }> = {

  // 1. Orange-red beam converging to a sharp point (ref 2 style)
  'define': {
    bg: [
      'radial-gradient(ellipse 8% 90% at 50% 50%, rgba(255,240,200,0.95) 0%, rgba(255,160,20,0.8) 12%, rgba(255,80,0,0.6) 30%, rgba(180,30,0,0.3) 55%, transparent 80%)',
      'radial-gradient(ellipse 35% 100% at 50% 50%, rgba(255,100,20,0.4) 0%, rgba(200,40,0,0.2) 45%, transparent 75%)',
      'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(255,60,0,0.12) 0%, transparent 65%)',
      'linear-gradient(180deg, #020005 0%, #030008 100%)',
    ].join(','),
  },

  // 2. Two diverging light trails — warm orange-red + cool blue (ref 3 style)
  'fast': {
    bg: [
      'radial-gradient(ellipse 40% 55% at 18% 22%, rgba(255,140,30,0.75) 0%, rgba(255,80,0,0.5) 25%, rgba(200,50,0,0.2) 55%, transparent 80%)',
      'radial-gradient(ellipse 40% 55% at 82% 78%, rgba(50,150,255,0.65) 0%, rgba(20,90,220,0.4) 25%, rgba(10,50,180,0.15) 55%, transparent 80%)',
      'linear-gradient(135deg, rgba(255,100,20,0.15) 0%, transparent 45%)',
      'linear-gradient(315deg, rgba(50,130,255,0.12) 0%, transparent 45%)',
      'linear-gradient(180deg, #020005 0%, #030010 100%)',
    ].join(','),
  },

  // 3. Dark starfield with scattered glowing dots in purple/red/orange/blue (ref 5)
  'test': {
    bg: [
      'radial-gradient(circle 2px at 12% 18%, rgba(200,80,255,0.95) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 28% 42%, rgba(255,80,30,0.9) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 45% 22%, rgba(80,160,255,0.85) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 63% 55%, rgba(200,50,255,0.9) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 79% 30%, rgba(255,120,40,0.85) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 91% 68%, rgba(80,140,255,0.8) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 35% 72%, rgba(255,60,20,0.9) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 55% 85%, rgba(180,50,255,0.85) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 72% 15%, rgba(80,180,255,0.75) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 8% 60%, rgba(255,100,30,0.85) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 50% 48%, rgba(220,80,255,0.9) 0%, transparent 100%)',
      'radial-gradient(circle 2px at 88% 45%, rgba(255,140,60,0.8) 0%, transparent 100%)',
      'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(80,20,120,0.12) 0%, transparent 100%)',
      'linear-gradient(180deg, #020005 0%, #030010 100%)',
    ].join(','),
  },

  // 4. Massive red/orange/purple converging light curtains, tiny figure silhouette (ref 4)
  'human': {
    bg: [
      'radial-gradient(ellipse 120% 80% at 50% 115%, rgba(255,100,20,0.7) 0%, rgba(255,50,0,0.5) 20%, rgba(180,20,80,0.35) 40%, rgba(100,20,200,0.2) 60%, transparent 80%)',
      'radial-gradient(ellipse 60% 80% at 20% 110%, rgba(255,80,0,0.5) 0%, rgba(200,30,100,0.3) 35%, rgba(80,0,180,0.15) 65%, transparent 85%)',
      'radial-gradient(ellipse 60% 80% at 80% 110%, rgba(255,80,0,0.5) 0%, rgba(200,30,100,0.3) 35%, rgba(80,0,180,0.15) 65%, transparent 85%)',
      'radial-gradient(ellipse 30% 25% at 50% 115%, rgba(255,200,80,0.65) 0%, transparent 100%)',
      'linear-gradient(180deg, #020005 0%, #060010 60%, #020005 100%)',
    ].join(','),
    overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" style="position:absolute;inset:0;width:100%;height:100%">
      <ellipse cx="300" cy="225" rx="155" ry="110" fill="none" stroke="rgba(255,140,40,0.15)" stroke-width="1.2"/>
      <ellipse cx="300" cy="225" rx="100" ry="72" fill="none" stroke="rgba(255,160,60,0.1)" stroke-width="0.9"/>
      <g transform="translate(288,158)" fill="rgba(2,0,10,0.96)">
        <ellipse cx="12" cy="6" rx="6" ry="6.5"/>
        <rect x="4" y="13" width="16" height="22" rx="4"/>
        <rect x="0" y="14" width="5.5" height="15" rx="2.5"/>
        <rect x="18.5" y="14" width="5.5" height="15" rx="2.5"/>
        <rect x="4" y="34" width="6" height="18" rx="2.5"/>
        <rect x="14" y="34" width="6" height="18" rx="2.5"/>
      </g>
    </svg>`,
  },

  // 5. Focused blue-white beam through dark center (ref 2 variation, cooler)
  'verify': {
    bg: [
      'radial-gradient(ellipse 6% 85% at 50% 50%, rgba(220,240,255,0.9) 0%, rgba(100,180,255,0.75) 15%, rgba(50,150,255,0.55) 35%, rgba(20,80,220,0.25) 60%, transparent 82%)',
      'radial-gradient(ellipse 25% 100% at 50% 50%, rgba(50,130,255,0.35) 0%, rgba(20,70,200,0.15) 50%, transparent 75%)',
      'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(30,100,255,0.1) 0%, transparent 65%)',
      'linear-gradient(180deg, #020005 0%, #030010 100%)',
    ].join(','),
  },

  // 6. Orange sphere center with swirling blue/purple rings expanding outward (ref 1)
  'leverage': {
    bg: [
      'radial-gradient(circle at 50% 48%, rgba(255,220,100,0.98) 0%, rgba(255,140,20,0.85) 5%, rgba(255,80,0,0.65) 10%, rgba(200,50,255,0.35) 22%, rgba(80,130,255,0.2) 38%, rgba(50,80,200,0.08) 55%, transparent 70%)',
      'radial-gradient(ellipse 90% 50% at 50% 48%, rgba(180,50,255,0.18) 20%, rgba(180,50,255,0.12) 28%, transparent 35%)',
      'radial-gradient(ellipse 130% 70% at 50% 48%, rgba(60,100,255,0.12) 35%, rgba(60,100,255,0.08) 45%, transparent 52%)',
      'linear-gradient(180deg, #020005 0%, #050010 100%)',
    ].join(','),
  },

  // 7. Deep perspective with warm horizon glow at base, blue-purple overhead (ref 4 variation)
  'context': {
    bg: [
      'linear-gradient(180deg, rgba(60,80,200,0.0) 0%, rgba(80,60,180,0.2) 35%, rgba(160,40,120,0.35) 60%, rgba(255,100,20,0.55) 85%, rgba(255,150,30,0.7) 100%)',
      'radial-gradient(ellipse 100% 8% at 50% 100%, rgba(255,180,50,0.65) 0%, transparent 100%)',
      'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,80,0,0.3) 0%, transparent 100%)',
      'radial-gradient(ellipse 3% 3% at 50% 58%, rgba(255,220,120,0.5) 0%, transparent 100%)',
      'linear-gradient(180deg, #020005 0%, #030010 100%)',
    ].join(','),
  },

  // 8. Swirling nebula arcs of blue/purple radiating from center (ref 1 variation)
  'repeat': {
    bg: [
      'radial-gradient(circle at 50% 50%, rgba(255,160,40,0.7) 0%, rgba(255,80,0,0.5) 5%, rgba(180,40,255,0.35) 14%, rgba(80,120,255,0.2) 26%, transparent 42%)',
      'radial-gradient(ellipse 110% 40% at 50% 50%, rgba(160,40,255,0.2) 18%, rgba(160,40,255,0.12) 26%, transparent 34%)',
      'radial-gradient(ellipse 40% 110% at 50% 50%, rgba(80,100,255,0.15) 22%, rgba(80,100,255,0.08) 32%, transparent 42%)',
      'radial-gradient(ellipse 140% 60% at 50% 50%, rgba(120,50,255,0.1) 30%, rgba(60,80,200,0.06) 42%, transparent 52%)',
      'linear-gradient(180deg, #020005 0%, #030010 100%)',
    ].join(','),
  },

  // 9. Single warm orange-gold ember in pure black — small but intense (ref 1 sphere only)
  'singular': {
    bg: [
      'radial-gradient(circle at 50% 48%, rgba(255,230,120,0.98) 0%, rgba(255,160,20,0.85) 3%, rgba(255,100,0,0.7) 7%, rgba(200,50,0,0.45) 14%, rgba(120,20,0,0.2) 26%, rgba(60,5,0,0.08) 40%, transparent 56%)',
      'radial-gradient(ellipse 60% 18% at 50% 62%, rgba(150,20,0,0.15) 0%, transparent 100%)',
      'linear-gradient(180deg, #020005 0%, #050003 60%, #020005 100%)',
    ].join(','),
    overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(282,120)" fill="rgba(5,0,2,0.97)">
        <ellipse cx="18" cy="7" rx="7" ry="7.5"/>
        <path d="M6 14 Q2 28 0 34 Q8 40 18 38 Q28 40 36 34 Q34 28 30 14 Z"/>
        <path d="M0 33 Q-12 37 -14 44 Q-6 48 18 48 Q42 48 50 44 Q48 37 36 33"/>
      </g>
    </svg>`,
  },

  // 10. Orange comet upper-left + blue comet lower-right, two distinct lights (ref 3 exact)
  'sharpen': {
    bg: [
      'radial-gradient(circle at 18% 22%, rgba(255,160,40,0.9) 0%, rgba(255,100,20,0.7) 4%, rgba(255,60,0,0.4) 10%, rgba(180,30,0,0.15) 22%, transparent 38%)',
      'radial-gradient(circle at 82% 78%, rgba(60,160,255,0.85) 0%, rgba(30,110,230,0.65) 4%, rgba(20,70,200,0.35) 10%, rgba(10,40,150,0.12) 22%, transparent 38%)',
      'linear-gradient(135deg, rgba(255,120,20,0.12) 0%, transparent 35%)',
      'linear-gradient(315deg, rgba(40,120,255,0.1) 0%, transparent 35%)',
      'linear-gradient(180deg, #020005 0%, #030010 100%)',
    ].join(','),
  },
}

// Actual photo images, one per card in order
const CARD_IMAGES = [
  '/images/principles/p1.png',
  '/images/principles/p2.png',
  '/images/principles/p3.png',
  '/images/principles/p4.png',
  '/images/principles/p5.png',
  '/images/principles/p6.png',
  '/images/principles/p7.png',
  '/images/principles/p8.png',
  '/images/principles/p9.png',
  '/images/principles/p10.png',
]

const principles = [
  {
    theme: 'Quality',
    color: '#9B3FFF',
    items: [
      { title: 'Define good before you run AI.', detail: 'If you cannot write one sentence describing a good output, AI will not produce it reliably.' },
      { title: 'Fast and wrong is worse than slow and right.', detail: 'Speed is a bonus, not the goal. If AI gets you there faster but worse, you have not saved time.' },
      { title: 'No workflow without a test set.', detail: 'One good run is not a pattern. Every prompt system needs real inputs tested against it and real outputs someone has signed off on.' },
    ],
  },
  {
    theme: 'Ownership',
    color: '#FF69DB',
    items: [
      { title: 'Taste, ethics, and final decisions stay human.', detail: 'AI drafts and challenges. It does not decide. Creative direction, strategic calls, and final approval belong to you.' },
      { title: 'Customer-facing output requires a verification path.', detail: 'Any AI output reaching a customer needs a human review step. No exceptions.' },
    ],
  },
  {
    theme: 'Systems over one-offs',
    color: '#00CCA8',
    items: [
      { title: 'A prompt that works once is a note. A prompt system is leverage.', detail: 'If it works three times, make it reusable. One-off prompting does not compound.' },
      { title: 'Context before prompts.', detail: 'Weak output is almost always a context problem, not a model problem. Invest in context first.' },
    ],
  },
  {
    theme: 'Right task for AI',
    color: '#E8C840',
    items: [
      { title: 'Use AI where tasks repeat and inputs are predictable.', detail: 'These conditions define where AI creates real leverage. If one is missing, do not build yet.' },
      { title: 'Do not use AI where judgment is singular.', detail: 'Knowing the person, the room, the history. AI cannot substitute for judgment built on relationships and institutional knowledge.' },
      { title: 'AI should sharpen review, not replace it.', detail: 'AI surfaces the predictable issues. The human focuses on what actually requires judgment.' },
    ],
  },
]

export default function OperatingPrinciplesPage() {
  let idx = 0

  return (
    <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)', maxWidth: 1060, margin: '0 auto' }}>
        <PageHeader title="Operating Principles" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {principles.map((group) => (
            <div key={group.theme}>

              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <h2 style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: group.color,
                }}>
                  {group.theme}
                </h2>
                <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
              </div>

              {/* Card grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: 16 }}
              >
                {group.items.map((item) => {
                  const imgSrc = CARD_IMAGES[idx++]
                  return (
                    <div
                      key={item.title}
                      style={{
                        borderRadius: 18,
                        overflow: 'hidden',
                        background: 'rgba(8,0,18,0.85)',
                        border: `1px solid rgba(255,255,255,0.07)`,
                        borderTop: `1px solid rgba(255,255,255,0.1)`,
                        transition: 'border-color 0.18s ease, box-shadow 0.18s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${group.color}35`
                        e.currentTarget.style.borderTopColor = `${group.color}50`
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${group.color}18`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.borderTopColor = 'rgba(255,255,255,0.1)'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {/* ── Photo image — full width top ─────────── */}
                      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                        {/* Actual photo */}
                        <img
                          src={imgSrc}
                          alt=""
                          style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                        />

                        {/* Seamless gradient fade to card bg — no visible line */}
                        <div style={{
                          position: 'absolute', left: 0, right: 0, bottom: 0, height: 130,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,0,18,0.65) 50%, rgba(8,0,18,0.95) 80%, rgba(8,0,18,1) 100%)',
                          pointerEvents: 'none',
                        }} />
                      </div>

                      {/* ── Text ──────────────────────────────────── */}
                      <div style={{ padding: '0 22px 26px' }}>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 17,
                          fontWeight: 700,
                          color: '#ffffff',
                          lineHeight: 1.35,
                          marginBottom: 10,
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          lineHeight: 1.65,
                          color: 'rgba(255,255,255,0.45)',
                          margin: 0,
                        }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
