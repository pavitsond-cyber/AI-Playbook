import PageHeader from '@/components/playbook/PageHeader'

const teasers = [
  {
    team: 'Brand & Design',
    problem: 'Creating a consistent visual direction for a new campaign with a small team',
    tool: 'Midjourney + Claude',
    outcome: 'Delivered 3 full visual concept boards in half the usual time',
    status: 'coming-soon',
  },
  {
    team: 'Product',
    problem: 'Writing a PRD for a complex checkout feature under a tight deadline',
    tool: 'Claude',
    outcome: 'PRD drafted in 90 minutes instead of a full day; 40% fewer revision cycles',
    status: 'coming-soon',
  },
  {
    team: 'Design',
    problem: 'Generating 20+ UX copy variants for a new booking state screen',
    tool: 'Claude',
    outcome: 'Got 30 options in 10 minutes, shortlisted 4, shipped 2 for A/B testing',
    status: 'coming-soon',
  },
  {
    team: 'Research',
    problem: 'Synthesizing 12 user interview transcripts from a usability study',
    tool: 'NotebookLM + Claude',
    outcome: 'Full synthesis in 45 minutes; surfaced 2 insights that weren\'t in the original notes',
    status: 'coming-soon',
  },
  {
    team: 'Engineering',
    problem: 'Building an internal CSV parsing and normalisation tool for the operations team',
    tool: 'Cursor + Claude',
    outcome: 'Working prototype in 2 hours; saved ~4 hours/week of manual work',
    status: 'coming-soon',
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Case Studies"
        description="Real examples of AI in action at Headout. What worked, what failed, and what you can reuse."
        badge="See AI in Action"
      />

      {/* Coming soon banner */}
      <div
        className="rounded-xl px-5 py-4 mb-8 flex items-start gap-3 text-sm"
        style={{
          background: 'rgba(83,58,253,0.05)',
          border: '1px solid rgba(83,58,253,0.15)',
        }}
      >
        <span className="shrink-0 text-lg">📖</span>
        <div>
          <strong style={{ color: '#273951' }}>Case studies are being collected.</strong>
          <span className="ml-1" style={{ color: '#64748d' }}>
            Full write-ups with screenshots, prompts, and learnings will be published here. Here's a preview of what's coming.
          </span>
        </div>
      </div>

      {/* Teaser cards */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#64748d' }}
        >
          Coming soon
        </h2>
        <div className="space-y-3">
          {teasers.map((cs, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
                opacity: 0.9,
              }}
            >
              {/* Team badge */}
              <div className="shrink-0">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: '#b9b9f9',
                    color: '#4434d4',
                  }}
                >
                  {cs.team}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-sm mb-1" style={{ color: '#273951' }}>{cs.problem}</p>
                <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#64748d' }}>
                  <span>Tool: {cs.tool}</span>
                  <span>·</span>
                  <span style={{ color: '#16a34a' }}>{cs.outcome}</span>
                </div>
              </div>

              <div
                className="shrink-0 text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: '#b9b9f9',
                  color: '#4434d4',
                }}
              >
                Coming soon
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribute CTA */}
      <div
        className="mt-10 p-5 rounded-xl"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(83,58,253,0.2)',
          boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
        }}
      >
        <h3 className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>Have a case study to share?</h3>
        <p className="text-sm mb-4" style={{ color: '#64748d' }}>
          Did AI save you time this week? Tell us what you did, what tool you used, and what the result was.
        </p>
        <a
          href="/contribute"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-normal transition-colors duration-150"
          style={{
            background: '#533afd',
            color: '#ffffff',
            borderRadius: '9999px',
          }}
        >
          Submit yours →
        </a>
      </div>
    </div>
  )
}
