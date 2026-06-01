import PageHeader from '@/components/playbook/PageHeader'
import CopyButton from '@/components/playbook/CopyButton'

const categories = [
  {
    id: 'ux-writing',
    label: 'UX Writing',
    color: '#533afd',
    prompts: [
      {
        title: 'Empty state copy',
        useCase: 'Product design — empty states',
        expectedOutput: '10 headline + subtext pairs under character limits',
        text: 'Generate 10 UX copy options for an empty state for [feature]. User has reached this state because [reason]. Keep header under 6 words, subtext under 16 words.',
      },
      {
        title: 'Error message variants',
        useCase: 'Product design — error states',
        expectedOutput: 'Human-friendly error messages in multiple tones',
        text: 'Write 6 error message variants for [error type] in a [product type] app. Vary the tone from apologetic to helpful to direct. Keep each under 20 words.',
      },
    ],
  },
  {
    id: 'product',
    label: 'Product',
    color: '#533afd',
    prompts: [
      {
        title: 'PRD from rough idea',
        useCase: 'Product management — feature planning',
        expectedOutput: 'Structured PRD with goals, problems, metrics, edge cases',
        text: "Turn this rough feature idea into a structured PRD with goals, user problems, success metrics, edge cases, and open questions.\n\nFeature idea: [paste here]",
      },
      {
        title: 'User story generator',
        useCase: 'Product management — sprint planning',
        expectedOutput: 'Ready-to-use user stories in standard format',
        text: 'Write 5 user stories for [feature name]. Format as "As a [user type], I want to [action] so that [outcome]." Include acceptance criteria for each.',
      },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    color: '#533afd',
    prompts: [
      {
        title: 'Interview synthesis',
        useCase: 'User research — synthesis',
        expectedOutput: 'Top themes, pain points, and notable quotes',
        text: 'Summarize these 5 user interview transcripts. Extract the top 3 themes, key pain points, and notable quotes. Highlight any surprising or contradictory findings.\n\n[Paste transcripts here]',
      },
      {
        title: 'Competitor analysis',
        useCase: 'Product / marketing — competitive intelligence',
        expectedOutput: 'Structured breakdown of competitor positioning',
        text: 'Analyze [competitor name] as a competitor to Headout. Cover: value proposition, target audience, pricing model, key differentiators, and 3 things Headout could learn from them.',
      },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    color: '#533afd',
    prompts: [
      {
        title: 'Code review',
        useCase: 'Engineering — code quality',
        expectedOutput: '3 specific improvement suggestions with reasoning',
        text: 'Review this code and suggest 3 improvements for readability, performance, and edge case handling. Explain why each improvement matters.\n\n```\n[Paste code here]\n```',
      },
      {
        title: 'Debug helper',
        useCase: 'Engineering — debugging',
        expectedOutput: 'Root cause analysis and fix suggestions',
        text: "I'm getting this error: [paste error]. My code is trying to [describe intent]. Here's the relevant code:\n\n```\n[Paste code]\n```\n\nWhat's likely causing this and how would you fix it?",
      },
    ],
  },
  {
    id: 'brand-marketing',
    label: 'Brand & Marketing',
    color: '#533afd',
    prompts: [
      {
        title: 'Visual direction concepts',
        useCase: 'Brand / marketing — campaign planning',
        expectedOutput: '5 visual concepts with mood, palette, and image prompts',
        text: 'Generate 5 visual direction concepts for [campaign/product]. Each concept should have: a concept name, mood description, color palette, visual references (describe 3 images), and 3 Midjourney prompt suggestions.',
      },
      {
        title: 'Ad copy variants',
        useCase: 'Marketing — paid advertising',
        expectedOutput: 'Copy variants for different platforms and formats',
        text: 'Write ad copy for [product/campaign] targeting [audience]. Create 3 variants: one emotional, one rational, one urgency-driven. For each, write a headline (max 8 words) and body copy (max 30 words).',
      },
    ],
  },
]

export default function PromptsPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Prompt Library"
        description="Ready-to-use prompts for every team. Copy, adapt, and improve."
        badge="Use AI"
      />

      <div className="space-y-10">
        {categories.map((category) => (
          <section key={category.id}>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-2 h-5 rounded-sm"
                style={{ background: category.color, opacity: 0.7 }}
              />
              <h2 className="text-base font-semibold" style={{ color: '#0d253d' }}>{category.label} Prompts</h2>
            </div>

            <div className="space-y-3">
              {category.prompts.map((prompt) => (
                <div
                  key={prompt.title}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e8ee',
                    boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
                  }}
                >
                  {/* Header */}
                  <div
                    className="flex items-start justify-between px-5 py-4"
                    style={{ borderBottom: '1px solid #e3e8ee' }}
                  >
                    <div>
                      <h3 className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>{prompt.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#64748d' }}>
                        <span>Use case: {prompt.useCase}</span>
                        <span>Output: {prompt.expectedOutput}</span>
                      </div>
                    </div>
                    <CopyButton text={prompt.text} />
                  </div>

                  {/* Prompt text */}
                  <div
                    className="px-5 py-4 text-sm font-mono leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: '#f6f9fc',
                      border: '1px solid #e3e8ee',
                      color: '#273951',
                      fontSize: '0.8rem',
                    }}
                  >
                    {prompt.text}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div
        className="mt-10 p-4 rounded-xl text-sm"
        style={{
          background: 'rgba(83,58,253,0.05)',
          border: '1px solid rgba(83,58,253,0.15)',
          color: '#64748d',
        }}
      >
        <strong style={{ color: '#273951' }}>Tip:</strong> Replace anything in [brackets] with your specifics before sending. The more context you give, the better the output.
      </div>
    </div>
  )
}
