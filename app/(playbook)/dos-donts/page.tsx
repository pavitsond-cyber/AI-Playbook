'use client'

import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

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

export default function OperatingPrinciplesPage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)', maxWidth: 960, margin: '0 auto' }}>
        <PageHeader
          title="Operating Principles"
         
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {principles.map((group) => (
            <div key={group.theme}>

              {/* Theme label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: group.color, flexShrink: 0,
                }} />
                <h2 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 22,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em',
                  color: group.color,
                }}>
                  {group.theme}
                </h2>
                <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
              </div>

              {/* Principle cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderLeft: `2px solid ${group.color}40`,
                      borderRadius: 14,
                      padding: '22px 24px',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.borderLeftColor = group.color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                      e.currentTarget.style.borderLeftColor = `${group.color}40`
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.3,
                      marginBottom: 8,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 22,
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.5)',
                      margin: 0,
                    }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
