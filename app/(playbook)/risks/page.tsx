import PageHeader from '@/components/playbook/PageHeader'

const risks = [
  {
    risk: 'Hallucination',
    severity: 'high',
    whatItMeans: 'AI generates information that sounds plausible but is factually incorrect. It doesn\'t "know" it\'s wrong — it produces confident nonsense.',
    examples: ['Inventing a statistic', 'Wrong company names or dates', 'Fake citations or URLs'],
    howToReduce: 'Always verify facts independently. Don\'t use AI output for anything where accuracy is critical without checking against a reliable source.',
  },
  {
    risk: 'Privacy risk',
    severity: 'high',
    whatItMeans: 'Data pasted into public AI tools may be used for training or stored by the provider. This is a real risk for confidential company and user data.',
    examples: ['Pasting user emails', 'Sharing unreleased product plans', 'Including API keys or passwords'],
    howToReduce: 'Never paste real user data, credentials, or confidential strategy documents into public AI tools. Use anonymized data or internal tools.',
  },
  {
    risk: 'Bias',
    severity: 'medium',
    whatItMeans: 'AI models are trained on internet data, which reflects human biases. Outputs can reinforce stereotypes or exclude underrepresented perspectives.',
    examples: ['Gender stereotypes in generated images', 'Culturally narrow advice', 'Skewed recommendations'],
    howToReduce: 'Review AI-generated content for bias before publishing. Ask the AI to consider diverse perspectives. Apply your own critical judgment.',
  },
  {
    risk: 'Outdated information',
    severity: 'medium',
    whatItMeans: 'AI models have a knowledge cutoff date. They don\'t know about events after their training ended — which may be months or years ago.',
    examples: ['Wrong pricing or availability', 'Outdated legal or regulatory info', 'Old competitor strategies'],
    howToReduce: 'For anything time-sensitive, verify with up-to-date sources. Use Perplexity for research that requires current information.',
  },
  {
    risk: 'Copyright',
    severity: 'medium',
    whatItMeans: 'AI-generated content (text, images, code) may resemble or be derived from copyrighted material. Commercial use of such content could be legally risky.',
    examples: ['AI images resembling a specific artist\'s style', 'AI code that mirrors open-source libraries', 'Marketing copy that echoes competitor messaging'],
    howToReduce: 'Review AI outputs for obvious similarities. Follow your company\'s IP guidelines. When in doubt, create from scratch or get legal guidance.',
  },
  {
    risk: 'Overconfidence',
    severity: 'medium',
    whatItMeans: 'AI sounds authoritative even when it\'s wrong. It doesn\'t hedge or say "I\'m not sure" in the way a human expert would.',
    examples: ['Confident legal or medical advice', 'Incorrect technical explanations that sound credible', 'Fabricated expert opinions'],
    howToReduce: 'Never treat AI as a domain expert. Bring in real experts for high-stakes decisions. Question confident-sounding outputs on topics you know well.',
  },
  {
    risk: 'Poor prompts → poor outputs',
    severity: 'low',
    whatItMeans: 'Vague or unclear prompts produce generic or off-target outputs. Garbage in, garbage out — AI amplifies what you give it.',
    examples: ['One-word prompts', 'Missing context about audience or goal', 'Unclear success criteria'],
    howToReduce: 'Invest time in writing clear prompts. Include: who it\'s for, what format you need, what good looks like. See the Prompt Library for templates.',
  },
]

const severityStyles = {
  high: { bg: 'rgba(239,68,68,0.1)', text: '#dc2626', border: 'rgba(239,68,68,0.2)', label: 'High' },
  medium: { bg: 'rgba(234,136,12,0.1)', text: '#b45309', border: 'rgba(234,136,12,0.2)', label: 'Medium' },
  low: { bg: 'rgba(34,197,94,0.1)', text: '#16a34a', border: 'rgba(34,197,94,0.2)', label: 'Low' },
}

export default function RisksPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Risks & Limitations"
        description="Every AI tool has limitations. Understanding them helps you use AI more responsibly and effectively."
        badge="Use AI Responsibly"
      />

      {/* Table header */}
      <div
        className="hidden lg:grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wider mb-2 rounded-lg"
        style={{
          background: '#f6f9fc',
          color: '#64748d',
          border: '1px solid #e3e8ee',
        }}
      >
        <div className="col-span-2">Risk</div>
        <div className="col-span-1">Level</div>
        <div className="col-span-4">What it means</div>
        <div className="col-span-5">How to reduce it</div>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => {
          const sev = severityStyles[risk.severity as keyof typeof severityStyles]
          return (
            <div
              key={risk.risk}
              className="p-5 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold" style={{ color: '#0d253d' }}>{risk.risk}</h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: sev.bg, color: sev.text, border: `1px solid ${sev.border}` }}
                    >
                      {sev.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>
                    {risk.whatItMeans}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: '#64748d' }}
                  >
                    Examples
                  </div>
                  <ul className="space-y-1">
                    {risk.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2">
                        <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: sev.text, opacity: 0.6 }} />
                        <span style={{ color: '#64748d' }}>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    background: '#f6f9fc',
                    border: '1px solid #e3e8ee',
                  }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: '#64748d' }}
                  >
                    How to reduce it
                  </div>
                  <p style={{ color: '#273951' }}>{risk.howToReduce}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
