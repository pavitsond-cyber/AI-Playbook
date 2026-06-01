import PageHeader from '@/components/playbook/PageHeader'

const paths = [
  {
    id: 'existing-tool',
    path: 'Use an existing AI tool',
    examples: 'Claude, ChatGPT, Perplexity, NotebookLM',
    when: [
      'Task is occasional or exploratory',
      'No sensitive company data involved',
      'Output quality requirements are moderate',
      'No integration into a production system needed',
    ],
    avoid: [
      'High-frequency tasks where manual prompting becomes overhead',
      'Tasks requiring internal Headout context the tool cannot access',
      'Customer-facing output at scale without a review system',
    ],
    effort: 'Low',
    cost: 'Low',
    riskLevel: 'Low–medium (output quality, data handling)',
  },
  {
    id: 'prompt-system',
    path: 'Build a prompt system',
    examples: 'Multi-step prompt chain, shared prompt library, structured template',
    when: [
      'Task recurs frequently across the team',
      'Output quality is inconsistent with single prompts',
      'Inputs are predictable and can be standardised',
      'A review rubric can be defined',
    ],
    avoid: [
      'One-off or rare tasks',
      'Tasks where each instance requires completely different context',
    ],
    effort: 'Low–medium (design + documentation)',
    cost: 'Low',
    riskLevel: 'Medium (prompt drift, maintenance, reviewer compliance)',
  },
  {
    id: 'automate',
    path: 'Automate a workflow',
    examples: 'API integration, scheduled AI jobs, tool-to-tool automation',
    when: [
      'Workflow runs at high volume with predictable inputs',
      'Manual steps are clearly defined and low-judgment',
      'Error cost is low enough to accept automation risk',
      'Integration between tools is feasible',
    ],
    avoid: [
      'Workflows with high judgment requirements',
      'Sensitive customer-facing flows without fallback',
      'Any step where errors are costly or hard to detect',
    ],
    effort: 'Medium (engineering time, testing, monitoring)',
    cost: 'Medium',
    riskLevel: 'Medium–high (error propagation, monitoring requirements)',
  },
  {
    id: 'internal-tool',
    path: 'Build an internal tool',
    examples: 'AI-powered internal app using Headout data, custom agent, Slack bot',
    when: [
      'Task requires Headout-specific context (bookings, content, suppliers)',
      'Generic tools cannot be adequately prompted for the use case',
      'Volume justifies engineering investment',
      'Team will use it consistently enough to maintain it',
    ],
    avoid: [
      'Experimental or unvalidated use cases',
      'Teams without engineering support or tool maintenance capacity',
      'Tasks where a prompt system would suffice',
    ],
    effort: 'High (engineering, design, data access, governance)',
    cost: 'High',
    riskLevel: 'High (maintenance, data privacy, access controls, governance)',
  },
  {
    id: 'no-ai',
    path: 'Do not use AI here',
    examples: 'High-stakes decisions, legally sensitive output, human-only judgment tasks',
    when: [
      'The cost of error is very high (legal, safety, ethics)',
      'The task requires contextual judgment AI cannot access',
      'Output quality cannot be reliably evaluated',
      'Trust or accountability is on the line',
    ],
    avoid: [
      'Applying this too broadly — most tasks have a role for AI',
    ],
    effort: 'None',
    cost: 'None',
    riskLevel: 'Risk of under-using AI, not over-using it',
  },
]

const criteria = [
  { factor: 'Frequency of task', low: 'Use existing tool', high: 'Automate or build internal tool' },
  { factor: 'Cost of error', low: 'Use existing tool or prompt system', high: 'Human review required — do not fully automate' },
  { factor: 'Need for Headout context', low: 'Generic tool is sufficient', high: 'Build internal tool or integrate internal data' },
  { factor: 'Data sensitivity', low: 'Use external tool with care', high: 'Internal deployment only — do not send to public APIs' },
  { factor: 'Output quality requirements', low: 'Prompt system with light review', high: 'Full QA rubric, verification path, human sign-off' },
  { factor: 'Scale of usage', low: 'Single team, occasional', high: 'Automate or build — manual prompting becomes overhead' },
  { factor: 'Time saved per run', low: 'Below 15 min — probably not worth operationalising', high: 'Above 30 min per task — worth systemising' },
  { factor: 'Strategic value', low: 'Nice to have — use what is available', high: 'Worth engineering investment and maintenance' },
]

const effortColors: Record<string, { bg: string; text: string }> = {
  'Low': { bg: 'rgba(34,197,94,0.1)', text: '#16a34a' },
  'Low–medium (design + documentation)': { bg: 'rgba(34,197,94,0.1)', text: '#16a34a' },
  'Medium (engineering time, testing, monitoring)': { bg: 'rgba(234,136,12,0.1)', text: '#b45309' },
  'High (engineering, design, data access, governance)': { bg: 'rgba(239,68,68,0.1)', text: '#dc2626' },
  'None': { bg: 'rgba(100,116,141,0.1)', text: '#64748d' },
}

export default function BuildVsBuyPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Build vs Buy vs Automate"
        description="A decision framework for every AI investment — from a shared prompt to a full internal tool. Use this before committing time, money, or engineering capacity."
        badge="Foundations"
      />

      {/* Decision paths */}
      <div className="space-y-4 mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#64748d' }}>
          Five paths
        </h2>
        {paths.map((p, i) => (
          <div
            key={p.id}
            className="p-5 rounded-xl"
            style={{
              background: '#ffffff',
              border: '1px solid #e3e8ee',
              borderRadius: '12px',
              boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="size-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(83,58,253,0.1)', color: '#533afd' }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold" style={{ color: '#0d253d' }}>{p.path}</h3>
                </div>
                <p className="text-xs ml-7" style={{ color: '#64748d' }}>{p.examples}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                  style={
                    effortColors[p.effort]
                      ? { background: effortColors[p.effort].bg, color: effortColors[p.effort].text }
                      : { background: 'rgba(83,58,253,0.08)', color: '#4434d4' }
                  }
                >
                  {p.effort} effort
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ml-7">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#16a34a' }}>
                  Use this when
                </div>
                <ul className="space-y-1">
                  {p.when.map((w, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: '#273951' }}>
                      <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: '#16a34a' }} />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#dc2626' }}>
                  Avoid when
                </div>
                <ul className="space-y-1">
                  {p.avoid.map((a, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: '#273951' }}>
                      <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: '#dc2626' }} />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-3 italic" style={{ color: '#64748d' }}>Risk: {p.riskLevel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decision matrix */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#64748d' }}>
          Decision criteria
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #e3e8ee' }}
        >
          <div
            className="grid grid-cols-12 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: '#f6f9fc', borderBottom: '1px solid #e3e8ee', color: '#64748d' }}
          >
            <div className="col-span-4">Factor</div>
            <div className="col-span-4">Low → lower investment</div>
            <div className="col-span-4">High → more investment needed</div>
          </div>
          {criteria.map((row, i) => (
            <div
              key={row.factor}
              className="grid grid-cols-12 px-5 py-3.5 text-sm"
              style={{
                borderBottom: i < criteria.length - 1 ? '1px solid #e3e8ee' : 'none',
                background: '#ffffff',
              }}
            >
              <div className="col-span-4 font-medium text-xs" style={{ color: '#0d253d' }}>{row.factor}</div>
              <div className="col-span-4 text-xs pr-4" style={{ color: '#64748d' }}>{row.low}</div>
              <div className="col-span-4 text-xs" style={{ color: '#273951' }}>{row.high}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
