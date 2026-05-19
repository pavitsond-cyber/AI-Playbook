import PageHeader from '@/components/playbook/PageHeader'

const dos = [
  { title: 'Always review AI output', detail: 'AI can produce convincing but incorrect information. Read every output before using it — especially for facts, dates, numbers, and claims.' },
  { title: 'Give clear context', detail: 'The more specific you are in your prompt, the better the output. Include who the audience is, what format you need, and what the goal is.' },
  { title: 'Use AI as a first draft tool', detail: 'AI is excellent at generating starting points. Use its output as a scaffold, then apply your own knowledge and judgment.' },
  { title: 'Iterate and refine', detail: 'If the first output isn\'t right, don\'t start over — refine. Tell the AI what to change, improve, or adjust. Conversation-style prompting works well.' },
  { title: 'Document what works', detail: 'When you find a prompt or workflow that gives great results, save it. Share it with your team in the Prompt Library or Contribute section.' },
  { title: 'Ask for multiple options', detail: 'Asking for 5 or 10 variants gives you choice. It\'s faster to pick from options than to generate one at a time.' },
  { title: 'Use AI for brainstorming', detail: 'AI is great at generating ideas rapidly. Even if the ideas aren\'t perfect, they can unlock new directions you wouldn\'t have thought of alone.' },
  { title: 'Keep sensitive data out', detail: 'Avoid pasting real user data, private company financials, or credentials into public AI tools. Use anonymized or synthetic data instead.' },
]

const donts = [
  { title: 'Don\'t ship without reviewing', detail: 'Never copy AI output directly into a product, document, or customer communication without reading it first. AI makes confident mistakes.' },
  { title: 'Don\'t rely on AI for live facts', detail: 'AI models have a knowledge cutoff date and don\'t browse the web (unless explicitly given that capability). Don\'t ask it for today\'s prices, live data, or recent events.' },
  { title: 'Don\'t share confidential data', detail: 'Treat public AI tools like a public forum. Don\'t paste internal financial data, unreleased product plans, personal user data, or API keys.' },
  { title: 'Don\'t over-trust AI on legal or compliance matters', detail: 'AI is not a lawyer. For anything involving contracts, privacy law, GDPR compliance, or IP questions — always check with a qualified person.' },
  { title: 'Don\'t use AI to impersonate a person', detail: 'Creating fake quotes, fake emails, or fake social media content attributed to real people is unethical and potentially illegal.' },
  { title: 'Don\'t treat AI as infallible', detail: 'Disagreeing with AI output is allowed and often correct. Your domain knowledge, context, and judgment are not replaceable.' },
  { title: 'Don\'t ignore tone and brand voice', detail: 'AI-generated copy often sounds generic. Review all copy for Headout\'s voice — warm, confident, and clear — before publishing.' },
  { title: 'Don\'t use AI images without checking rights', detail: 'AI-generated images may resemble copyrighted work. Review before using commercially. Check your company\'s guidelines on AI-generated assets.' },
]

export default function DosDontsPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Do's & Don'ts"
        description="Guidelines for using AI responsibly at Headout. These apply to all teams."
        badge="Use AI Responsibly"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Do's */}
        <div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg mb-4 text-sm font-semibold"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.15)',
              color: '#86efac',
            }}
          >
            <span className="text-base">✓</span>
            Do
          </div>
          <div className="space-y-3">
            {dos.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(14,14,28,0.8)',
                  border: '1px solid rgba(34,197,94,0.08)',
                  borderRadius: '12px',
                  borderLeft: '3px solid rgba(34,197,94,0.3)',
                }}
              >
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#86efac' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Don'ts */}
        <div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg mb-4 text-sm font-semibold"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
              color: '#fca5a5',
            }}
          >
            <span className="text-base">✗</span>
            Don&apos;t
          </div>
          <div className="space-y-3">
            {donts.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(14,14,28,0.8)',
                  border: '1px solid rgba(239,68,68,0.08)',
                  borderRadius: '12px',
                  borderLeft: '3px solid rgba(239,68,68,0.25)',
                }}
              >
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#fca5a5' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
