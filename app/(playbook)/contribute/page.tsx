import { ArrowRight } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const steps = [
  { step: 1, title: 'Pick a category', detail: 'Decide what you want to contribute: a term, skill, prompt, workflow, or case study.' },
  { step: 2, title: 'Use the right template', detail: 'Each category has a template. Go to the Templates page, copy the right one, and fill it in.' },
  { step: 3, title: 'Submit via the contribution sheet', detail: 'Paste your completed template into the Contribution Sheet (Google Sheets link below).' },
  { step: 4, title: 'Review and publish', detail: 'Submissions are reviewed weekly. If your contribution meets the quality bar, it gets added to the playbook.' },
  { step: 5, title: 'Get credit', detail: 'Contributors are credited in the playbook entry. Share what you built — it\'s good for you and the team.' },
]

const categories = [
  {
    icon: '📖',
    title: 'Term or abbreviation',
    description: 'A new AI term, abbreviation, or definition that\'s missing from the Glossary.',
    template: '/templates',
    where: 'Glossary or Abbreviations page',
  },
  {
    icon: '⚡',
    title: 'Skill',
    description: 'A practical AI skill you\'ve used — with steps, tools, and an example output.',
    template: '/templates',
    where: 'Skills Library',
  },
  {
    icon: '💬',
    title: 'Prompt',
    description: 'A prompt you\'ve tested and refined. Include the use case and expected output.',
    template: '/templates',
    where: 'Prompt Library',
  },
  {
    icon: '🔄',
    title: 'Workflow',
    description: 'A step-by-step workflow for a real task. Something the team can follow today.',
    template: '/templates',
    where: 'Workflows',
  },
  {
    icon: '📊',
    title: 'Case study',
    description: 'A real example from your team. What you did, what worked, and what you learned.',
    template: '/templates',
    where: 'Case Studies',
  },
]

export default function ContributePage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Contribute"
        description="Help the AI Playbook grow. Share what you know — your prompts, skills, and workflows belong here."
        badge="Keep Improving It"
      />

      {/* Contribution sheet CTA */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl mb-10"
        style={{
          background: 'rgba(124,58,237,0.08)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '12px',
        }}
      >
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">Contribution Sheet</h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Use the shared Google Sheet to submit your contributions. Fill in the template, paste it in, and it will be reviewed.
          </p>
        </div>
        <a
          href="#contribution-sheet"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150"
          style={{
            background: 'rgba(124,58,237,0.25)',
            color: 'rgba(167,139,250,0.95)',
            border: '1px solid rgba(124,58,237,0.35)',
          }}
        >
          Open sheet <ArrowRight size={14} />
        </a>
      </div>

      {/* How it works */}
      <div className="mb-10">
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          How it works
        </h2>
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.step}
              className="flex gap-4 p-4 rounded-xl"
              style={{
                background: 'rgba(14,14,28,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="shrink-0 size-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  color: 'rgba(167,139,250,0.9)',
                  minWidth: '28px',
                }}
              >
                {step.step}
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">{step.title}</div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What to contribute */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          What you can contribute
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(14,14,28,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
              }}
            >
              <div className="text-2xl mb-3">{cat.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{cat.title}</h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {cat.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{ background: 'rgba(124,58,237,0.1)', color: 'rgba(167,139,250,0.7)' }}
                >
                  → {cat.where}
                </span>
                <a
                  href={cat.template}
                  className="text-xs"
                  style={{ color: 'rgba(167,139,250,0.6)' }}
                >
                  Get template →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div
        className="mt-8 p-4 rounded-xl text-sm"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        <strong className="text-white/50">Quality bar:</strong> Contributions should be tested, specific, and useful to others. Rough notes and unverified content won&apos;t be published without review.
      </div>
    </div>
  )
}
