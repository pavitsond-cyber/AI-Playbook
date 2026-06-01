import PageHeader from '@/components/playbook/PageHeader'

const levels = [
  {
    level: 1,
    title: 'Individual prompting',
    subtitle: 'Ad-hoc, person-by-person, no shared system',
    description: 'People use AI one-off for drafting, brainstorming, and summarizing. Output quality varies by person. There are no shared prompts, no quality bar, and no documented workflow.',
    signals: [
      '"I use ChatGPT sometimes."',
      'No team-wide tool agreement',
      'Good results happen by accident',
      'No one can repeat a good output reliably',
      'AI is used as a convenience tool, not a workflow component',
    ],
    risk: 'Inconsistent quality. High variance. No leverage beyond individual time savings.',
    toAdvance: 'Document what works. When a prompt produces excellent output, save it. Start turning individual prompts into shared systems.',
    color: '#dc2626',
    bgColor: 'rgba(239,68,68,0.06)',
    borderColor: 'rgba(239,68,68,0.2)',
  },
  {
    level: 2,
    title: 'Repeatable workflows',
    subtitle: 'Shared prompts, agreed tools, some consistency',
    description: 'Teams have shared prompts for recurring tasks. Output is more consistent. Some tools have been agreed on. Time savings are visible.',
    signals: [
      '"We have a prompt for this."',
      'Tool recommendations documented somewhere',
      'Time savings tracked informally',
      'Some tasks run faster and more consistently',
      'New team members can follow existing prompts',
    ],
    risk: 'Output quality still varies. No formal review process. Prompts drift as people modify them. No rubric for what "good" looks like.',
    toAdvance: 'Add evaluation rubrics. Define what good output looks like for each workflow. Build a review step into every recurring workflow.',
    color: '#b45309',
    bgColor: 'rgba(234,136,12,0.06)',
    borderColor: 'rgba(234,136,12,0.2)',
  },
  {
    level: 3,
    title: 'Quality-controlled systems',
    subtitle: 'Rubrics, review steps, known failure modes',
    description: 'AI output has review rules, evaluation rubrics, and evidence checks. The team knows the failure modes of each workflow and has controls in place.',
    signals: [
      'QA checklists exist for AI output',
      'Brand/tone review is a named step in copy workflows',
      'Research synthesis includes confidence levels and source links',
      'Failure modes are documented ("AI does X badly, we always check Y")',
      'Someone owns the quality bar for each workflow',
    ],
    risk: 'Review can slow things down if the process is heavier than the value. Risk of checkbox compliance — reviewing without thinking.',
    toAdvance: 'Embed AI into core team processes, not just individual workflows. AI should be infrastructure, not an add-on.',
    color: '#0284c7',
    bgColor: 'rgba(2,132,199,0.06)',
    borderColor: 'rgba(2,132,199,0.2)',
  },
  {
    level: 4,
    title: 'Team-level operating model',
    subtitle: 'AI embedded in standard process, measurable improvement',
    description: 'AI is embedded in research, design, content, QA, and product processes. Teams do not think of AI as a special tool — it is part of how work gets done.',
    signals: [
      'Every major workflow has a documented AI step',
      'Quality has improved measurably — not just speed',
      'New hires are onboarded to the AI operating model',
      'Cross-team workflows have AI components',
      'Teams are making decisions using AI-assisted synthesis',
    ],
    risk: 'Complacency. Teams start skipping review steps. Over-reliance on AI for decisions that require human judgment. Drift from quality standards.',
    toAdvance: 'Build internal context-aware tools. Stop relying on generic tools for high-context Headout tasks. AI should know Headout context.',
    color: '#533afd',
    bgColor: 'rgba(83,58,253,0.06)',
    borderColor: 'rgba(83,58,253,0.2)',
  },
  {
    level: 5,
    title: 'Internal AI infrastructure',
    subtitle: 'Custom tools, agents, company context — governed',
    description: 'Teams build custom agents, tools, and workflows using internal data and Headout context. AI has access to company knowledge and can act on it. Governance is in place.',
    signals: [
      'Internal tools built on top of AI APIs',
      'Workflows that access Headout-specific data',
      'AI assists with decisions using internal context (bookings, research, copy library)',
      'Governance policies exist for data access and output review',
      'Engineering and non-engineering teams collaborate on AI tooling',
    ],
    risk: 'Maintenance overhead. Security and data privacy complexity. Governance at scale. Risk of building tools faster than the team can govern them.',
    toAdvance: 'This is the target state. Focus on governance, reusability, and measuring business impact.',
    color: '#16a34a',
    bgColor: 'rgba(34,197,94,0.06)',
    borderColor: 'rgba(34,197,94,0.2)',
  },
]

export default function MaturityPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="AI Maturity Model"
        description="Five levels of AI adoption — from individual prompting to team-level infrastructure. The playbook is designed to push teams toward Levels 3, 4, and 5."
        badge="Foundations"
      />

      {/* Target callout */}
      <div
        className="mb-8 p-4 rounded-xl text-sm"
        style={{
          background: 'rgba(83,58,253,0.05)',
          border: '1px solid rgba(83,58,253,0.15)',
        }}
      >
        <strong style={{ color: '#273951' }}>Target state:</strong>
        <span style={{ color: '#64748d' }}> Most Headout teams should be operating at Levels 3–4. Level 5 requires engineering collaboration and is the direction for internal tooling. Level 1 is where most teams start — the goal is not to stay there.</span>
      </div>

      <div className="space-y-4">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className="rounded-xl overflow-hidden"
            style={{
              background: '#ffffff',
              border: `1px solid ${lvl.borderColor}`,
              borderRadius: '12px',
              boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-start gap-4"
              style={{ background: lvl.bgColor, borderBottom: `1px solid ${lvl.borderColor}` }}
            >
              <div
                className="shrink-0 size-9 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: '#ffffff', color: lvl.color, border: `1.5px solid ${lvl.borderColor}` }}
              >
                {lvl.level}
              </div>
              <div>
                <h3 className="text-base font-semibold" style={{ color: '#0d253d' }}>{lvl.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: '#64748d' }}>{lvl.subtitle}</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#273951' }}>{lvl.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {/* Signals */}
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>
                    Signals you are here
                  </div>
                  <ul className="space-y-1.5">
                    {lvl.signals.map((s, i) => (
                      <li key={i} className="flex items-start gap-2" style={{ color: '#64748d' }}>
                        <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: lvl.color }} />
                        <span className="text-xs">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk */}
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>
                    Risk at this level
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748d' }}>{lvl.risk}</p>
                </div>

                {/* How to advance */}
                <div
                  className="p-3 rounded-lg"
                  style={{ background: '#f6f9fc', border: '1px solid #e3e8ee' }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>
                    To advance
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{lvl.toAdvance}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
