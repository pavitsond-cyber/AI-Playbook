import PageHeader from '@/components/playbook/PageHeader'

const principles = [
  {
    theme: 'Quality',
    themeDesc: 'Define good before you start.',
    items: [
      {
        title: "Define 'good' before you run AI.",
        detail: "If you cannot write a one-line quality bar for the output, AI will not produce it reliably. The quality bar comes first — always. 'Better than what we have' is not a quality bar.",
        practice: 'Write the evaluation criteria before writing the prompt. If you cannot articulate what pass and fail look like, you are not ready to build the workflow.',
      },
      {
        title: 'Fast and wrong is worse than slow and right.',
        detail: 'AI-assisted output that is lower quality than what you would have produced manually is not progress. The goal is better output. Speed is a bonus, not the point.',
        practice: 'Before deploying a workflow, run it on 10+ real inputs. If output quality is inconsistent, fix the system before scaling it.',
      },
      {
        title: 'No workflow without a test set.',
        detail: 'Good intentions are not a quality bar. Every prompt system that runs at team scale needs a representative sample of inputs it has been tested against, with outputs that have been reviewed.',
        practice: 'Document the test set alongside the prompt. When the system fails on a new input, add it to the test set.',
      },
    ],
  },
  {
    theme: 'Ownership',
    themeDesc: 'AI assists. Humans are responsible.',
    items: [
      {
        title: 'You own the output. Not the model.',
        detail: 'There is no "AI did it" as an excuse. If you ran the prompt, reviewed the output, and published it — you authored it. The model is a tool. You are the professional.',
        practice: 'Before sharing or publishing any AI-assisted output, read it as if you wrote it yourself. Would you sign your name to this? If not, fix it.',
      },
      {
        title: 'Taste, ethics, and final decisions stay human.',
        detail: 'AI drafts, synthesises, challenges, and classifies. It does not decide. Creative direction, strategic calls, ethical judgments, and final approval belong to the person responsible for the work.',
        practice: "Use AI to generate options, surface blind spots, and pressure-test assumptions. Make the call yourself.",
      },
      {
        title: 'Customer-facing output requires a verification path.',
        detail: 'Any AI output that reaches a customer — copy, recommendations, pricing, support answers — needs a human review step. Ship without a verification path only when the cost of error is negligible.',
        practice: 'Before any AI-assisted output goes live: who reviewed it? What did they check? If the answer is unclear, the workflow is not ready.',
      },
    ],
  },
  {
    theme: 'Systems over one-offs',
    themeDesc: 'If it works, build it. If you built it, maintain it.',
    items: [
      {
        title: 'A prompt that works once is a note. A prompt system is leverage.',
        detail: 'If a prompt produces consistently useful output across inputs and team members, document it. If it works three times, build a reusable workflow. One-off prompting does not compound.',
        practice: 'When you find something that works well, spend 15 minutes writing it up as a reusable system. Share it. The leverage is in the distribution.',
      },
      {
        title: "Don't build workflows you can't evaluate.",
        detail: "If you cannot tell whether the output is good or bad, you cannot run it at scale. Evaluation criteria are not optional — they are the foundation. A workflow without a quality bar is just noise at speed.",
        practice: 'Before deploying: what does passing look like? What does failing look like? Can two people independently agree on which is which?',
      },
      {
        title: 'Context before prompts.',
        detail: 'Weak output is almost always a context problem, not a model problem. The model has no knowledge of your specific task, constraints, audience, or quality bar unless you provide it. Invest in context first.',
        practice: "If output quality is disappointing, don't change the prompt — add more context. Describe the task, the audience, the quality bar, and what bad output looks like.",
      },
    ],
  },
  {
    theme: 'Right task for AI',
    themeDesc: 'Not everything should be automated.',
    items: [
      {
        title: 'Use AI where tasks repeat, inputs are predictable, and the quality bar is clear.',
        detail: 'These three conditions define where AI creates real leverage: high-volume, well-defined tasks where the quality bar can be articulated and the inputs follow a pattern. If one of these is missing, re-evaluate.',
        practice: "When deciding whether to build an AI workflow: does this task repeat at least weekly? Are the inputs similar enough to systematise? Can I define what good looks like? If not all three — don't build yet.",
      },
      {
        title: "Don't use AI where judgment is singular.",
        detail: 'Some work requires irreplaceable human context: knowing the person, the room, the history, the nuance of the decision. AI cannot substitute for judgment that is built on relationships and institutional knowledge.',
        practice: 'If the answer depends on who the person is, what the relationship is, or what happened in a meeting last week — this is not AI territory.',
      },
      {
        title: 'AI should sharpen review, not replace it.',
        detail: 'The best use of AI in a review process is as a first-pass filter — surfacing the 80% of issues that are systematic and predictable so the human reviewer can focus on the 20% that require judgment.',
        practice: 'After any AI-assisted QA pass: what did the reviewer actually spend time on? If they are still spending time on obvious issues, the AI pass is not working. If they are only deciding edge cases, it is.',
      },
    ],
  },
]

export default function OperatingPrinciplesPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Operating Principles"
        description="How we use AI as a team. Not guidelines about AI in general — specific rules for how we operate."
        badge="Principles"
      />

      <div className="space-y-8">
        {principles.map((group) => (
          <div key={group.theme}>
            <div className="mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748d' }}>
                {group.theme}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#a8c3de' }}>{group.themeDesc}</p>
            </div>

            <div className="space-y-3">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e8ee',
                    borderRadius: '12px',
                    boxShadow: 'rgba(0,55,112,0.04) 0 1px 3px',
                  }}
                >
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#0d253d' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#273951' }}>{item.detail}</p>
                  <div
                    className="px-3 py-2.5 rounded-lg text-xs leading-relaxed"
                    style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.12)', color: '#4434d4' }}
                  >
                    <span className="font-semibold">In practice: </span>
                    <span style={{ color: '#273951' }}>{item.practice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
