import PageHeader from '@/components/playbook/PageHeader'

const shifts = [
  {
    id: 'tools-to-workflows',
    title: 'From tools to workflows',
    what: 'The dominant AI narrative in 2023–2024 was about tools: which tool is best, which to use for what. By 2025, the conversation shifted. The teams creating real leverage are not the ones with the best tools — they are the ones with the best workflows. A good prompt system running on a standard tool beats an expert user improvising on a frontier model.',
    whyItMatters: 'Tool selection is still important, but it is no longer the primary variable. The question to ask is not "which AI tool should we use?" — it is "how do we build a repeatable workflow around this task?" Teams that only optimise for tool choice are optimising the wrong thing.',
    whatToDoDifferently: 'Invest time in documenting and refining workflows, not just exploring new tools. When a prompt works well, systematise it. When a workflow produces consistent output, share it across the team.',
  },
  {
    id: 'prompts-to-systems',
    title: 'From prompts to systems',
    what: 'Early AI adoption was characterised by individual prompting — one person, one question, one output. The shift is toward prompt systems: multi-step chains where each step feeds the next, with defined inputs, quality checks, and human review steps built in.',
    whyItMatters: 'A single prompt can produce a good output occasionally. A prompt system produces consistently good outputs at team scale. The difference between Level 1 and Level 3 maturity is almost entirely about this shift.',
    whatToDoDifferently: 'For any task you use AI for more than twice a week, build a prompt system. Define: what the inputs are, what each step produces, what review is required, and what good output looks like.',
  },
  {
    id: 'experiments-to-operating-models',
    title: 'From one-off experiments to repeatable operating models',
    what: 'Many teams tried AI in 2023. Most did not operationalise what they learned. The teams at Level 4+ have moved past experimentation — AI is embedded in how research synthesis, design QA, content production, and product documentation actually get done.',
    whyItMatters: 'Experiments produce learning. Operating models produce compound leverage. A workflow that saves 4 hours every time it runs is worth significantly more than ten experiments each saving 30 minutes once.',
    whatToDoDifferently: 'After any successful AI experiment, ask: can this become a repeatable workflow? If yes, document it, assign it an owner, and run it consistently. Stop accumulating successful experiments that never become standard practice.',
  },
  {
    id: 'generic-to-context-aware',
    title: 'From generic AI tools to internal context-aware tools',
    what: 'Generic AI tools like Claude and ChatGPT are powerful but context-blind. They do not know Headout\'s brand voice, product patterns, supplier data, or customer history. The most significant leverage shift happens when AI is connected to internal context — through prompt engineering, retrieval, or internal tooling.',
    whyItMatters: 'The gap between generic AI output and Headout-specific AI output is almost entirely explained by context. The more internal context AI has, the more useful its output is. This is why teams building internal tools at Level 5 see disproportionately high returns.',
    whatToDoDifferently: 'Identify the tasks where generic AI output is noticeably inferior because it lacks internal context. These are the highest-value candidates for internal tooling or retrieval-augmented workflows.',
  },
  {
    id: 'manual-to-ai-qa',
    title: 'From manual QA to AI-assisted review',
    what: 'Manual QA — for copy, design, code, research, and translations — is slow, inconsistent, and does not scale. The shift is toward AI-assisted review as a first-pass filter: AI catches the 80% of issues that are systematic and predictable, freeing human reviewers to focus on the 20% that require judgment.',
    whyItMatters: 'AI QA does not replace human review — it makes human review more effective. Reviewers who use AI as a first filter spend less time on obvious issues and more time on subtle ones. Quality goes up; review time goes down.',
    whatToDoDifferently: 'Identify your highest-volume, most inconsistency-prone review tasks. Build an AI QA pass for each. The design copy QA, localization pre-screen, and PRD pressure-test workflows in this playbook are all examples of this pattern.',
  },
  {
    id: 'adoption-to-governance',
    title: 'From AI adoption to AI governance',
    what: 'In 2023, the challenge was getting teams to use AI at all. By 2025–2026, the challenge for mature teams is governance: who owns which workflows, what review is required, what data can be used, and how to prevent quality degradation over time.',
    whyItMatters: 'Ungoverned AI use at team scale creates quality inconsistency, data risk, and accountability gaps. The teams that are furthest ahead on AI capability are also the ones most focused on governance — because they have the most at stake.',
    whatToDoDifferently: 'Every AI workflow that runs at team scale needs: an owner, a review step, a quality bar, and a data handling rule. If any of these are missing, the workflow is ungoverned — which means quality and safety are managed by luck, not design.',
  },
  {
    id: 'generation-to-decision-support',
    title: 'From content generation to decision support',
    what: 'The first wave of AI use was about generating things: copy, images, code, presentations. The second wave is about supporting decisions: synthesising research, pressure-testing product decisions, surfacing patterns in support tickets, mapping risks before build.',
    whyItMatters: 'Generating content is useful but the leverage ceiling is lower. Decision support — helping senior people make better, faster, more informed decisions — is where AI creates disproportionate value. A better-informed product decision compounding over a roadmap cycle is worth more than 50 hours of faster copy generation.',
    whatToDoDifferently: 'Audit your current AI use. What percentage is generation (drafting, creating) vs decision support (synthesising, challenging, mapping)? If it is mostly generation, there is a significant untapped opportunity in decision support workflows.',
  },
  {
    id: 'text-to-multimodal',
    title: 'From text-only AI to multimodal production workflows',
    what: 'AI has moved from text-in, text-out to multimodal: image generation and editing, video generation, voice synthesis, and increasingly, models that reason across formats simultaneously. Production workflows are shifting to integrate these capabilities — not as gimmicks but as genuine accelerators for creative and content production.',
    whyItMatters: 'For brand design, marketing, and content teams, multimodal AI represents a step-change in the speed of visual territory exploration and asset adaptation. The constraint is no longer "how fast can we generate options?" but "how do we maintain quality and brand consistency at scale?"',
    whatToDoDifferently: 'Use AI image and video tools for exploration and concepting, with human art direction owning the final direction. Build brand QA into any multimodal workflow before assets reach production. The speed gain is real; the risk is real too.',
  },
  {
    id: 'isolated-to-infrastructure',
    title: 'From isolated AI use to team-wide AI infrastructure',
    what: 'The most advanced teams are no longer treating AI as a collection of tools that individuals use. They are building AI infrastructure: shared prompt libraries, internal tools with company context, connected workflows, and governance systems. AI is becoming part of how the team operates, not just how individuals work.',
    whyItMatters: 'Infrastructure creates compounding returns. Every workflow documented, every tool built, every quality bar defined makes the next one easier to build and better to use. Teams that invest in AI infrastructure early will have a significant capability advantage.',
    whatToDoDifferently: 'Think of AI investment in terms of infrastructure, not just tools. What shared systems, documented workflows, and internal tools would compound across the team? These are worth prioritising over individual tool exploration.',
  },
]

export default function AIShiftsPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="AI Shifts"
        description="Nine structural changes in how AI is used — not product launches or tool updates, but shifts in how the most effective teams operate."
        badge="Reference"
      />

      <div
        className="mb-8 p-4 rounded-xl text-sm"
        style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.15)' }}
      >
        <strong style={{ color: '#273951' }}>This is not a timeline of product launches.</strong>
        <span style={{ color: '#64748d' }}> These are the structural shifts that explain why some teams are using AI to create leverage while others are stuck doing it one prompt at a time. Knowing where the shift is going helps you build toward it — not react to it.</span>
      </div>

      <div className="space-y-4">
        {shifts.map((shift, i) => (
          <div
            key={shift.id}
            className="p-5 rounded-xl"
            style={{
              background: '#ffffff',
              border: '1px solid #e3e8ee',
              borderRadius: '12px',
              boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
            }}
          >
            <div className="flex items-start gap-4">
              <span
                className="shrink-0 size-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: 'rgba(83,58,253,0.1)', color: '#533afd', minWidth: '28px' }}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-3" style={{ color: '#0d253d' }}>{shift.title}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#64748d' }}>What changed</div>
                    <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{shift.what}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#533afd' }}>Why it matters for Headout</div>
                    <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{shift.whyItMatters}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#f6f9fc', border: '1px solid #e3e8ee' }}>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#16a34a' }}>What to do differently</div>
                    <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{shift.whatToDoDifferently}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
