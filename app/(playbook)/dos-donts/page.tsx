'use client'

import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

/* ── Cinematic gradient artworks, one per principle ─────────────────────── */
/* Inspired by dramatic single light-source photography: dark field + focused glow */
const ARTWORKS: Record<string, { bg: string; overlay?: string }> = {

  // 1. A precise amber horizon line — defining clarity from darkness
  'define': {
    bg: [
      'radial-gradient(ellipse 90% 3px at 50% 62%, #FFA040 0%, rgba(255,100,0,0.5) 40%, transparent 100%)',
      'radial-gradient(ellipse 55% 28% at 50% 62%, rgba(255,110,0,0.09) 0%, transparent 100%)',
      'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(0,10,40,0.7) 0%, transparent 80%)',
      'linear-gradient(180deg, #020810 0%, #000C22 60%, #010208 100%)',
    ].join(','),
  },

  // 2. Two diverging light trails — chaos vs discipline
  'fast': {
    bg: [
      'linear-gradient(148deg, rgba(255,70,30,0.35) 0%, rgba(255,70,30,0.1) 35%, transparent 60%)',
      'linear-gradient(32deg,  rgba(60,150,255,0.25) 0%, rgba(60,150,255,0.08) 35%, transparent 60%)',
      'radial-gradient(ellipse 22% 55% at 18% 80%, rgba(255,90,0,0.28) 0%, transparent 80%)',
      'radial-gradient(ellipse 22% 55% at 82% 20%, rgba(60,150,255,0.22) 0%, transparent 80%)',
      'linear-gradient(180deg, #040008 0%, #05000F 100%)',
    ].join(','),
  },

  // 3. Grid of verification nodes — structure and testing
  'test': {
    bg: [
      'radial-gradient(circle 2.5px at 22% 32%, rgba(155,63,255,0.85) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 44% 32%, rgba(155,63,255,0.55) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 66% 32%, rgba(155,63,255,0.75) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 88% 32%, rgba(155,63,255,0.45) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 22% 56%, rgba(155,63,255,0.45) 0%, transparent 100%)',
      'radial-gradient(circle 3px   at 44% 56%, rgba(194,127,255,0.95) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 66% 56%, rgba(155,63,255,0.55) 0%, transparent 100%)',
      'radial-gradient(circle 3px   at 88% 56%, rgba(194,127,255,0.9) 0%, transparent 100%)',
      'radial-gradient(circle 2px   at 22% 78%, rgba(155,63,255,0.35) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 44% 78%, rgba(155,63,255,0.6) 0%, transparent 100%)',
      'radial-gradient(circle 3px   at 66% 78%, rgba(194,127,255,1.0) 0%, transparent 100%)',
      'radial-gradient(circle 2.5px at 88% 78%, rgba(155,63,255,0.7) 0%, transparent 100%)',
      'radial-gradient(ellipse 80% 60% at 66% 68%, rgba(100,40,180,0.08) 0%, transparent 100%)',
      'linear-gradient(180deg, #040010 0%, #070016 100%)',
    ].join(','),
  },

  // 4. Warm arch of human light — doorway/threshold (ref 1 energy)
  'human': {
    bg: [
      'radial-gradient(ellipse 65% 50% at 50% 100%, rgba(255,145,30,0.55) 0%, rgba(255,80,0,0.3) 28%, rgba(80,130,255,0.12) 58%, transparent 100%)',
      'radial-gradient(ellipse 28% 18% at 50% 100%, rgba(255,210,100,0.5) 0%, transparent 100%)',
      'radial-gradient(ellipse 100% 25% at 50% 100%, rgba(10,0,20,0.6) 0%, transparent 100%)',
      'linear-gradient(180deg, #030006 0%, #0A0518 55%, #020008 100%)',
    ].join(','),
    overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" style="position:absolute;inset:0;width:100%;height:100%">
      <ellipse cx="200" cy="200" rx="120" ry="80" fill="none" stroke="rgba(255,140,40,0.18)" stroke-width="1"/>
      <ellipse cx="200" cy="200" rx="80" ry="52" fill="none" stroke="rgba(255,160,60,0.14)" stroke-width="0.8"/>
      <!-- silhouette figure -->
      <g transform="translate(192,148)" fill="rgba(0,0,10,0.95)">
        <ellipse cx="8" cy="6" rx="5" ry="5.5"/>
        <rect x="3" y="11" width="10" height="18" rx="3"/>
        <rect x="0" y="12" width="4" height="12" rx="2"/>
        <rect x="12" y="12" width="4" height="12" rx="2"/>
        <rect x="3" y="29" width="4" height="16" rx="2"/>
        <rect x="9" y="29" width="4" height="16" rx="2"/>
      </g>
    </svg>`,
  },

  // 5. Purple verification beam — a path of light confirmed
  'verify': {
    bg: [
      'radial-gradient(ellipse 10% 100% at 50% 50%, rgba(155,63,255,0.55) 0%, rgba(155,63,255,0.12) 50%, transparent 100%)',
      'radial-gradient(ellipse 40% 55% at 50% 50%, rgba(120,40,220,0.06) 0%, transparent 100%)',
      'linear-gradient(90deg, transparent 0%, rgba(155,63,255,0.04) 45%, rgba(155,63,255,0.07) 50%, rgba(155,63,255,0.04) 55%, transparent 100%)',
      'linear-gradient(180deg, #040010 0%, #06001A 100%)',
    ].join(','),
  },

  // 6. Expanding golden rings — leverage multiplying outward
  'leverage': {
    bg: [
      'radial-gradient(circle at 50% 52%, rgba(255,190,50,0.9) 0%, rgba(255,130,0,0.6) 5%, rgba(200,80,255,0.2) 15%, rgba(80,130,255,0.12) 28%, transparent 45%)',
      'radial-gradient(circle at 50% 52%, transparent 6%, rgba(255,120,0,0.18) 9%, transparent 14%)',
      'radial-gradient(circle at 50% 52%, transparent 16%, rgba(180,60,255,0.1) 20%, transparent 26%)',
      'radial-gradient(circle at 50% 52%, transparent 30%, rgba(80,120,255,0.07) 34%, transparent 40%)',
      'linear-gradient(180deg, #030006 0%, #050010 100%)',
    ].join(','),
  },

  // 7. Deep converging horizon — context as the vast field before the prompt
  'context': {
    bg: [
      'linear-gradient(180deg, rgba(80,120,220,0.0) 0%, rgba(80,120,220,0.12) 55%, rgba(255,120,30,0.3) 88%, rgba(255,90,0,0.5) 100%)',
      'radial-gradient(ellipse 100% 6% at 50% 100%, rgba(255,160,50,0.55) 0%, transparent 100%)',
      'radial-gradient(ellipse 3% 3% at 50% 68%, rgba(255,220,120,0.4) 0%, transparent 100%)',
      'linear-gradient(180deg, #030010 0%, #050018 100%)',
    ].join(','),
  },

  // 8. Rhythmic concentric arcs — repeating tasks as teal sonar waves
  'repeat': {
    bg: [
      'radial-gradient(ellipse 88% 12% at 50% 48%, rgba(0,200,170,0.22) 0%, transparent 100%)',
      'radial-gradient(ellipse 66% 9% at 50% 60%, rgba(0,200,170,0.18) 0%, transparent 100%)',
      'radial-gradient(ellipse 44% 6% at 50% 70%, rgba(0,200,170,0.15) 0%, transparent 100%)',
      'radial-gradient(ellipse 22% 4% at 50% 78%, rgba(0,200,170,0.18) 0%, transparent 100%)',
      'radial-gradient(ellipse 6%  2% at 50% 84%, rgba(0,220,190,0.5) 0%, transparent 100%)',
      'linear-gradient(180deg, #010010 0%, #030012 100%)',
    ].join(','),
  },

  // 9. Single ember of warm light — the solitary judgment (ref 2 meditation energy)
  'singular': {
    bg: [
      'radial-gradient(circle at 50% 52%, rgba(255,190,50,0.95) 0%, rgba(255,120,0,0.7) 4%, rgba(255,50,0,0.3) 14%, rgba(200,0,80,0.15) 28%, rgba(120,0,60,0.06) 45%, transparent 60%)',
      'radial-gradient(ellipse 70% 18% at 50% 62%, rgba(180,0,60,0.12) 0%, transparent 100%)',
      'linear-gradient(180deg, #020002 0%, #060004 55%, #030002 100%)',
    ].join(','),
    overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" style="position:absolute;inset:0;width:100%;height:100%">
      <!-- seated silhouette -->
      <g transform="translate(188,118)" fill="rgba(5,0,2,0.97)">
        <ellipse cx="12" cy="5" rx="5" ry="5.5"/>
        <path d="M5 10 Q2 22 0 26 Q6 30 12 29 Q18 30 24 26 Q22 22 19 10 Z"/>
        <path d="M0 25 Q-8 28 -10 32 Q-5 36 12 36 Q29 36 34 32 Q32 28 24 25"/>
      </g>
    </svg>`,
  },

  // 10. Two overlapping lens circles — sharpening together, not replacing
  'sharpen': {
    bg: [
      'radial-gradient(circle at 36% 50%, rgba(155,63,255,0.32) 0%, rgba(120,40,200,0.1) 28%, transparent 50%)',
      'radial-gradient(circle at 64% 50%, rgba(255,110,30,0.28) 0%, rgba(220,80,0,0.1) 28%, transparent 50%)',
      'radial-gradient(ellipse 18% 30% at 50% 50%, rgba(255,240,220,0.14) 0%, transparent 100%)',
      'linear-gradient(180deg, #040008 0%, #070010 100%)',
    ].join(','),
  },
}

/* Map each principle item to its artwork key */
const ART_KEYS = [
  'define', 'fast', 'test',          // Quality
  'human', 'verify',                  // Ownership
  'leverage', 'context',              // Systems
  'repeat', 'singular', 'sharpen',   // Right task
]

const principles = [
  {
    theme: 'Quality',
    color: '#9B3FFF',
    items: [
      {
        title: 'Define good before you run AI.',
        detail: 'If you cannot write one sentence describing a good output, AI will not produce it reliably.',
      },
      {
        title: 'Fast and wrong is worse than slow and right.',
        detail: 'Speed is a bonus, not the goal. If AI gets you there faster but worse, you have not saved time.',
      },
      {
        title: 'No workflow without a test set.',
        detail: 'One good run is not a pattern. Every prompt system needs real inputs tested against it and real outputs someone has signed off on.',
      },
    ],
  },
  {
    theme: 'Ownership',
    color: '#FF69DB',
    items: [
      {
        title: 'Taste, ethics, and final decisions stay human.',
        detail: 'AI drafts and challenges. It does not decide. Creative direction, strategic calls, and final approval belong to you.',
      },
      {
        title: 'Customer-facing output requires a verification path.',
        detail: 'Any AI output reaching a customer needs a human review step. No exceptions.',
      },
    ],
  },
  {
    theme: 'Systems over one-offs',
    color: '#00CCA8',
    items: [
      {
        title: 'A prompt that works once is a note. A prompt system is leverage.',
        detail: 'If it works three times, make it reusable. One-off prompting does not compound.',
      },
      {
        title: 'Context before prompts.',
        detail: 'Weak output is almost always a context problem, not a model problem. Invest in context first.',
      },
    ],
  },
  {
    theme: 'Right task for AI',
    color: '#E8C840',
    items: [
      {
        title: 'Use AI where tasks repeat and inputs are predictable.',
        detail: 'These conditions define where AI creates real leverage. If one is missing, do not build yet.',
      },
      {
        title: 'Do not use AI where judgment is singular.',
        detail: 'Knowing the person, the room, the history. AI cannot substitute for judgment built on relationships and institutional knowledge.',
      },
      {
        title: 'AI should sharpen review, not replace it.',
        detail: 'AI surfaces the predictable issues. The human focuses on what actually requires judgment.',
      },
    ],
  },
]

let artIndex = 0

export default function OperatingPrinciplesPage() {
  // reset counter for SSR consistency
  let idx = 0

  return (
    <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)', maxWidth: 960, margin: '0 auto' }}>
        <PageHeader title="Operating Principles" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {principles.map((group) => (
            <div key={group.theme}>

              {/* Theme label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <h2 style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: group.color,
                }}>
                  {group.theme}
                </h2>
                <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((item) => {
                  const artKey = ART_KEYS[idx++]
                  const art = ARTWORKS[artKey]
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col sm:flex-row"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderLeft: `2px solid ${group.color}50`,
                        borderRadius: 16,
                        overflow: 'hidden',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
                        e.currentTarget.style.borderLeftColor = group.color
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                        e.currentTarget.style.borderLeftColor = `${group.color}50`
                      }}
                    >
                      {/* ── Artwork panel ───────────────────────────── */}
                      <div
                        className="w-full h-40 sm:w-48 sm:h-auto shrink-0"
                        style={{
                          position: 'relative',
                          background: art.bg,
                          overflow: 'hidden',
                          minHeight: 0,
                        }}
                      >

                        {/* SVG silhouette overlay (if any) */}
                        {art.overlay && (
                          <div
                            style={{ position: 'absolute', inset: 0 }}
                            dangerouslySetInnerHTML={{ __html: art.overlay }}
                          />
                        )}

                        {/* Bottom fade into card background */}
                        <div style={{
                          position: 'absolute', left: 0, right: 0, bottom: 0, height: 40,
                          background: 'linear-gradient(to bottom, transparent, rgba(10,0,16,0.35))',
                          pointerEvents: 'none',
                        }} />
                        {/* Right fade (desktop) — merges art into text area */}
                        <div className="hidden sm:block" style={{
                          position: 'absolute', top: 0, right: 0, bottom: 0, width: 48,
                          background: 'linear-gradient(to right, transparent, rgba(10,0,16,0.6))',
                          pointerEvents: 'none',
                        }} />
                      </div>

                      {/* ── Text ────────────────────────────────────── */}
                      <div style={{ padding: '22px 24px', flex: 1, minWidth: 0 }}>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 19, fontWeight: 700,
                          color: '#ffffff', lineHeight: 1.3, marginBottom: 8,
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 15, lineHeight: 1.65,
                          color: 'rgba(255,255,255,0.5)', margin: 0,
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
