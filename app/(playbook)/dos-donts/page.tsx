'use client'

import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

/* ── Cinematic gradient artworks — designed for landscape card-top format ── */
const ARTWORKS: Record<string, { bg: string; overlay?: string }> = {

  // 1. Precise amber horizon — defining clarity from dark
  'define': {
    bg: [
      'radial-gradient(ellipse 80% 4px at 50% 58%, #FFA040 0%, rgba(255,110,0,0.6) 35%, transparent 100%)',
      'radial-gradient(ellipse 60% 35% at 50% 58%, rgba(255,120,0,0.1) 0%, transparent 100%)',
      'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(0,0,30,0.8) 0%, transparent 70%)',
      'linear-gradient(180deg, #010810 0%, #000C22 70%, #010208 100%)',
    ].join(','),
  },

  // 2. Diverging warm/cool trails — speed vs discipline
  'fast': {
    bg: [
      'radial-gradient(ellipse 55% 70% at 18% 80%, rgba(255,100,20,0.45) 0%, rgba(255,60,0,0.2) 40%, transparent 80%)',
      'radial-gradient(ellipse 55% 70% at 82% 20%, rgba(60,150,255,0.35) 0%, rgba(30,100,220,0.15) 40%, transparent 80%)',
      'linear-gradient(145deg, rgba(255,80,0,0.12) 0%, transparent 50%)',
      'linear-gradient(35deg,  rgba(60,150,255,0.1) 0%, transparent 50%)',
      'linear-gradient(180deg, #040008 0%, #05000F 100%)',
    ].join(','),
  },

  // 3. Verification node grid — structure and pattern
  'test': {
    bg: [
      'radial-gradient(circle 3px at 17% 30%, rgba(155,63,255,0.9) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 34% 30%, rgba(155,63,255,0.55) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 51% 30%, rgba(155,63,255,0.75) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 68% 30%, rgba(155,63,255,0.45) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 85% 30%, rgba(155,63,255,0.65) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 17% 57%, rgba(155,63,255,0.45) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 34% 57%, rgba(194,127,255,1.0) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 51% 57%, rgba(155,63,255,0.6) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 68% 57%, rgba(194,127,255,0.95) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 85% 57%, rgba(155,63,255,0.5) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 17% 80%, rgba(155,63,255,0.3) 0%, transparent 100%)',
      'radial-gradient(circle 3px at 51% 80%, rgba(155,63,255,0.7) 0%, transparent 100%)',
      'radial-gradient(circle 4px at 68% 80%, rgba(194,127,255,1.0) 0%, transparent 100%)',
      'radial-gradient(ellipse 70% 55% at 55% 65%, rgba(100,40,180,0.09) 0%, transparent 100%)',
      'linear-gradient(180deg, #040010 0%, #070016 100%)',
    ].join(','),
  },

  // 4. Warm arch — human threshold (ref 1 energy), central glow
  'human': {
    bg: [
      'radial-gradient(ellipse 80% 65% at 50% 105%, rgba(255,145,30,0.65) 0%, rgba(255,80,0,0.35) 30%, rgba(100,140,255,0.12) 58%, transparent 100%)',
      'radial-gradient(ellipse 35% 22% at 50% 105%, rgba(255,220,100,0.6) 0%, transparent 100%)',
      'linear-gradient(180deg, #030006 0%, #0B0618 60%, #020008 100%)',
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

  // 5. Verification beam — purple path confirmed
  'verify': {
    bg: [
      'radial-gradient(ellipse 12% 100% at 50% 50%, rgba(155,63,255,0.65) 0%, rgba(155,63,255,0.15) 45%, transparent 100%)',
      'radial-gradient(ellipse 45% 60% at 50% 50%, rgba(120,40,220,0.07) 0%, transparent 100%)',
      'linear-gradient(90deg, transparent 0%, rgba(155,63,255,0.05) 45%, rgba(155,63,255,0.1) 50%, rgba(155,63,255,0.05) 55%, transparent 100%)',
      'linear-gradient(180deg, #040010 0%, #06001A 100%)',
    ].join(','),
  },

  // 6. Expanding golden rings — leverage multiplying
  'leverage': {
    bg: [
      'radial-gradient(circle at 50% 48%, rgba(255,200,50,0.95) 0%, rgba(255,130,0,0.65) 6%, rgba(200,80,255,0.22) 18%, rgba(80,130,255,0.12) 32%, transparent 50%)',
      'radial-gradient(circle at 50% 48%, transparent 7%, rgba(255,120,0,0.2) 11%, transparent 16%)',
      'radial-gradient(circle at 50% 48%, transparent 19%, rgba(180,60,255,0.12) 23%, transparent 30%)',
      'radial-gradient(circle at 50% 48%, transparent 34%, rgba(80,120,255,0.08) 38%, transparent 46%)',
      'linear-gradient(180deg, #030006 0%, #050010 100%)',
    ].join(','),
  },

  // 7. Deep converging horizon — context as vast field
  'context': {
    bg: [
      'linear-gradient(180deg, rgba(80,120,220,0.0) 0%, rgba(80,120,220,0.14) 50%, rgba(255,120,30,0.35) 85%, rgba(255,90,0,0.55) 100%)',
      'radial-gradient(ellipse 100% 7% at 50% 100%, rgba(255,170,50,0.6) 0%, transparent 100%)',
      'radial-gradient(ellipse 4% 4% at 50% 62%, rgba(255,230,130,0.45) 0%, transparent 100%)',
      'linear-gradient(180deg, #030010 0%, #050018 100%)',
    ].join(','),
  },

  // 8. Rhythmic teal arcs — repeating pattern
  'repeat': {
    bg: [
      'radial-gradient(ellipse 95% 14% at 50% 42%, rgba(0,200,170,0.25) 0%, transparent 100%)',
      'radial-gradient(ellipse 72% 10% at 50% 56%, rgba(0,200,170,0.2) 0%, transparent 100%)',
      'radial-gradient(ellipse 50% 7%  at 50% 68%, rgba(0,200,170,0.18) 0%, transparent 100%)',
      'radial-gradient(ellipse 30% 5%  at 50% 77%, rgba(0,200,170,0.2) 0%, transparent 100%)',
      'radial-gradient(ellipse 10% 3%  at 50% 84%, rgba(0,220,190,0.55) 0%, transparent 100%)',
      'linear-gradient(180deg, #010010 0%, #030012 100%)',
    ].join(','),
  },

  // 9. Single ember — solitary judgment (ref 2 meditation)
  'singular': {
    bg: [
      'radial-gradient(circle at 50% 50%, rgba(255,200,50,0.98) 0%, rgba(255,120,0,0.75) 5%, rgba(255,50,0,0.35) 16%, rgba(200,0,80,0.18) 32%, rgba(100,0,50,0.07) 50%, transparent 65%)',
      'radial-gradient(ellipse 75% 20% at 50% 65%, rgba(160,0,60,0.14) 0%, transparent 100%)',
      'linear-gradient(180deg, #020002 0%, #060004 60%, #020002 100%)',
    ].join(','),
    overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(282,120)" fill="rgba(5,0,2,0.97)">
        <ellipse cx="18" cy="7" rx="7" ry="7.5"/>
        <path d="M6 14 Q2 28 0 34 Q8 40 18 38 Q28 40 36 34 Q34 28 30 14 Z"/>
        <path d="M0 33 Q-12 37 -14 44 Q-6 48 18 48 Q42 48 50 44 Q48 37 36 33"/>
      </g>
    </svg>`,
  },

  // 10. Two overlapping lenses — sharpening together
  'sharpen': {
    bg: [
      'radial-gradient(circle at 33% 50%, rgba(155,63,255,0.4) 0%, rgba(120,40,200,0.14) 32%, transparent 55%)',
      'radial-gradient(circle at 67% 50%, rgba(255,110,30,0.35) 0%, rgba(220,80,0,0.12) 32%, transparent 55%)',
      'radial-gradient(ellipse 22% 38% at 50% 50%, rgba(255,248,230,0.16) 0%, transparent 100%)',
      'linear-gradient(180deg, #040008 0%, #07000E 100%)',
    ].join(','),
  },
}

const ART_KEYS = [
  'define', 'fast', 'test',
  'human', 'verify',
  'leverage', 'context',
  'repeat', 'singular', 'sharpen',
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
                style={{ gap: 12 }}
              >
                {group.items.map((item) => {
                  const artKey = ART_KEYS[idx++]
                  const art = ARTWORKS[artKey]
                  return (
                    <div
                      key={item.title}
                      style={{
                        borderRadius: 18,
                        overflow: 'hidden',
                        background: 'rgba(8,0,18,0.85)',
                        border: `1px solid rgba(255,255,255,0.07)`,
                        borderTop: `1px solid rgba(255,255,255,0.1)`,
                        transition: 'border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
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
                      {/* ── Artwork — full width top ─────────────── */}
                      <div
                        style={{
                          position: 'relative',
                          height: 200,
                          background: art.bg,
                          overflow: 'hidden',
                        }}
                      >
                        {/* SVG overlay (silhouette figures) */}
                        {art.overlay && (
                          <div
                            style={{ position: 'absolute', inset: 0 }}
                            dangerouslySetInnerHTML={{ __html: art.overlay }}
                          />
                        )}

                        {/* Seamless bottom fade into card bg */}
                        <div style={{
                          position: 'absolute', left: 0, right: 0, bottom: 0, height: 90,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,0,18,0.7) 55%, rgba(8,0,18,0.97) 100%)',
                          pointerEvents: 'none',
                        }} />

                        {/* Subtle section-color tint at bottom edge */}
                        <div style={{
                          position: 'absolute', left: 0, right: 0, bottom: 0, height: 3,
                          background: `linear-gradient(to right, transparent, ${group.color}30, transparent)`,
                        }} />
                      </div>

                      {/* ── Text ──────────────────────────────────── */}
                      <div style={{ padding: '2px 22px 26px' }}>
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
    </div>
  )
}
