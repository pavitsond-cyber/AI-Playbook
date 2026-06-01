import PageHeader from '@/components/playbook/PageHeader'

const principles = [
  {
    theme: 'Quality & craft',
    themeDesc: 'AI should raise the bar, not lower it.',
    items: [
      {
        title: 'Do not automate judgment before you can define judgment.',
        detail: 'If you cannot describe what good output looks like, AI will not find it for you. Define the quality bar first. Then build the workflow.',
      },
      {
        title: 'AI should not reduce craft standards.',
        detail: 'Use it to move faster without lowering the bar. "Fast and good" is the target. "Fast and good enough" is a regression.',
      },
      {
        title: 'Every AI workflow needs an owner, a reviewer, and a quality bar.',
        detail: 'Without these three, you have ad-hoc prompting — not a system. Who owns the prompt? Who reviews the output? What does passing look like?',
      },
      {
        title: 'If AI output cannot be evaluated, it should not be operationalized.',
        detail: 'No rubric, no rollout. This applies to copy, research synthesis, design QA, and any AI-assisted workflow. Build the evaluation method before scaling the workflow.',
      },
    ],
  },
  {
    theme: 'Workflow design',
    themeDesc: 'Speed without system is just faster noise.',
    items: [
      {
        title: 'Move from one-off prompting to reusable prompt systems.',
        detail: 'A prompt that works once is useful. A prompt system that works every time across the team is leverage. Document what works. Build the system around it.',
      },
      {
        title: 'Use AI where repetition is high and context is codifiable.',
        detail: 'The best AI workflows are for tasks that repeat often, where the inputs are predictable and the quality bar is clear. Not all valuable work is worth automating.',
      },
      {
        title: 'Do not confuse speed with leverage.',
        detail: 'Getting a bad output in 2 minutes instead of 20 is not progress. The goal is better decisions, higher-quality output, or work that was previously impossible — not just faster drafts.',
      },
      {
        title: 'Every AI workflow should do at least one of these: save time, improve quality, increase coverage, or unlock something previously impossible.',
        detail: 'If a workflow only saves a little time on low-stakes output, it is not worth maintaining. The threshold should be meaningful — not marginal.',
      },
    ],
  },
  {
    theme: 'Human ownership',
    themeDesc: 'AI assists. Humans decide.',
    items: [
      {
        title: 'Humans own taste, prioritization, ethics, and final decisions.',
        detail: 'AI can draft, synthesize, compare, and classify. It cannot own the judgment call. Taste, prioritization, ethics, and final approval stay with the person responsible for the work.',
      },
      {
        title: 'Any AI output used in product must have a verification path.',
        detail: 'Customer-facing AI output — copy, recommendations, decisions — needs a human review step or a confidence threshold. Ship without a verification path only when the cost of error is negligible.',
      },
      {
        title: 'AI should make good teams sharper — not careless.',
        detail: 'If using AI is leading to less rigorous review, less critical thinking, or lower-quality output, the workflow is broken. Fix the review process, not the prompt.',
      },
      {
        title: 'Use AI to improve decision quality, not just output volume.',
        detail: 'More decks, more drafts, and more options are not inherently valuable. The measure is whether decisions are better informed, faster, or more defensible — not whether you produced more output.',
      },
    ],
  },
]

export default function OperatingPrinciplesPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Operating Principles"
        description="Rules for using AI at scale — not just responsibly, but effectively. These apply to every team, workflow, and tool choice."
        badge="Foundations"
      />

      <div className="space-y-10">
        {principles.map((section) => (
          <div key={section.theme}>
            {/* Theme header */}
            <div className="flex items-start gap-3 mb-5">
              <div
                className="w-1 self-stretch rounded-full shrink-0"
                style={{ background: '#533afd', minHeight: '40px' }}
              />
              <div>
                <h2 className="text-base font-semibold" style={{ color: '#0d253d' }}>{section.theme}</h2>
                <p className="text-sm mt-0.5" style={{ color: '#64748d' }}>{section.themeDesc}</p>
              </div>
            </div>

            <div className="space-y-3 ml-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e8ee',
                    borderRadius: '12px',
                    boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-2 leading-snug"
                    style={{ color: '#0d253d' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748d' }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Human ownership quick reference */}
      <div
        className="mt-12 rounded-xl p-6"
        style={{
          background: '#f6f9fc',
          border: '1px solid #e3e8ee',
        }}
      >
        <h2 className="text-sm font-semibold mb-5" style={{ color: '#0d253d' }}>Human ownership — quick reference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#dc2626' }}
            >
              Humans must own
            </div>
            <ul className="space-y-1.5">
              {[
                'Taste and creative judgment',
                'Final decisions',
                'Prioritization',
                'Ethics and values',
                'Brand judgment',
                'User empathy and interpretation',
                'Strategic framing',
                'Quality approval',
                'Sensitive communications',
                'High-risk product flows',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#273951' }}>
                  <span className="shrink-0 mt-1.5 size-1.5 rounded-full" style={{ background: '#dc2626', opacity: 0.6 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#16a34a' }}
            >
              AI can assist with
            </div>
            <ul className="space-y-1.5">
              {[
                'Drafting and structuring',
                'Synthesizing large inputs',
                'Comparing options',
                'Classifying and tagging',
                'Generating option sets',
                'Checking inconsistencies',
                'Scaling repetitive work',
                'Finding gaps',
                'Creating first-pass structures',
                'Automating low-risk workflows',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#273951' }}>
                  <span className="shrink-0 mt-1.5 size-1.5 rounded-full" style={{ background: '#16a34a', opacity: 0.6 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
