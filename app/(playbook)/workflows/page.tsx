'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const workflows = [
  {
    id: 'research-opportunity-map',
    title: 'Turn raw research into a decision-ready opportunity map',
    team: 'Research · Product',
    time: '2–4 hrs',
    tools: ['Claude', 'NotebookLM'],
    problem: 'Research synthesis stays at the theme level and never becomes a prioritised, actionable opportunity map. Findings inform nothing.',
    whenToUse: 'After completing a research round with 5+ interviews or a significant data set. Before a product planning cycle.',
    inputNeeded: 'Interview transcripts, survey data, support tickets, or NPS verbatims. Clean transcripts preferred (labelled P1, P2, etc.).',
    aiSteps: [
      { step: 1, action: 'Extract pain statements with frequency', detail: 'Prompt: "Read these transcripts. Extract every pain statement as a direct quote. Group identical or near-identical pains. Provide a frequency count per pain (how many participants mentioned it). Format as a table: Pain | Quote | Frequency | Participant IDs."' },
      { step: 2, action: 'Cluster by job to be done', detail: 'Prompt: "Group these pain statements by the underlying job the user is trying to do. Name each cluster. Provide 2 representative quotes per cluster."' },
      { step: 3, action: 'Map each cluster to a product opportunity', detail: 'Prompt: "For each cluster, write one product opportunity statement: [User type] needs a way to [job to be done] without [pain]. Rate each opportunity High/Medium/Low by: user frequency, severity, and whether Headout is positioned to address it."' },
      { step: 4, action: 'Surface contradictions', detail: 'Prompt: "Find any pain or theme where participants disagreed or had opposing experiences. List the contradiction, the participants on each side, and what might explain the difference."' },
    ],
    humanSteps: [
      'Validate AI-identified cluster labels against your own reading',
      'Challenge AI severity scores with product context AI does not have',
      'Investigate contradictions — the reason they exist is often the most valuable insight',
      'Add the strategic framing: which of these opportunities align with Headout\'s current direction?',
      'Final prioritisation decision stays with PM + research lead',
    ],
    output: 'Prioritised opportunity map: clusters of pain → opportunity statements → frequency/severity scores → evidence trail → contradictions → strategic recommendation',
    qualityBar: 'Every opportunity links to 3+ source quotes with participant IDs. Frequency is counted, not estimated. Contradictions are named, not averaged away.',
    risks: 'AI may over-cluster similar themes and lose nuance. Severity scores are guesses without product context. Contradictions may be hidden if you only ask for themes.',
    whatNotToAutomate: 'Final prioritisation. Strategic framing. Contradiction resolution. The decision about which opportunity to pursue.',
  },
  {
    id: 'prd-pressure-test',
    title: 'Pressure-test a PRD before engineering handoff',
    team: 'Product',
    time: '45–90 min',
    tools: ['Claude'],
    problem: 'PRDs go to engineering with unresolved edge cases, unchallenged assumptions, and unmeasurable success metrics. Engineers find the gaps in sprint planning.',
    whenToUse: 'After the PM has written a draft PRD and before it goes to engineering. Not instead of a human review — in addition to it.',
    inputNeeded: 'Draft PRD in any format. The more detail in the PRD, the more useful the challenge session.',
    aiSteps: [
      { step: 1, action: 'Extract and list all assumptions', detail: 'Prompt: "Read this PRD. List every assumption it makes — explicit and implicit. For each, rate how validated it is: (a) tested with users, (b) team consensus only, (c) not stated but assumed. Format as a table."' },
      { step: 2, action: 'List missing edge cases by user flow', detail: 'Prompt: "Walk through every user flow in this PRD. For each flow, list edge cases that are not addressed: error states, empty states, concurrent actions, time-sensitive states, and unexpected user behaviour."' },
      { step: 3, action: 'Challenge each success metric', detail: 'Prompt: "Review the success metrics in this PRD. For each metric: (1) Is it measurable? (2) Is it attributable to this feature specifically? (3) Does it measure what matters or just what is easy to track? Suggest a sharper alternative for any metric that fails these tests."' },
      { step: 4, action: 'Flag unstated dependencies', detail: 'Prompt: "What dependencies — technical, design, data, or cross-team — are implied by this PRD but not explicitly listed? List each one and which team or system it involves."' },
    ],
    humanSteps: [
      'Review the assumption list: which challenges are real risks vs model noise?',
      'Decide which edge cases are in scope for this release vs explicitly deferred',
      'Rewrite the success metrics that failed the AI challenge',
      'Add the missing dependencies to the PRD and resolve or accept each one',
      'The PM owns the final PRD — AI is challenging it, not approving it',
    ],
    output: 'Annotated PRD with: assumption validation table, edge case log, success metric review, and dependency list',
    qualityBar: 'Every assumption is either validated (with evidence) or explicitly listed as an accepted risk. Every success metric is measurable and attributable.',
    risks: 'AI may flag concerns that are irrelevant to your specific context. Not all edge cases it raises are worth solving. Use judgment to filter signal from noise.',
    whatNotToAutomate: 'The decision about which gaps to close before launch. Stakeholder alignment. The final sign-off.',
  },
  {
    id: 'support-to-opportunities',
    title: 'Convert customer support tickets into product opportunities',
    team: 'Product · Ops',
    time: '3–5 hrs',
    tools: ['Claude', 'NotebookLM'],
    problem: 'Support tickets contain high-signal product feedback but get buried in volume. The patterns that should reach the product roadmap never do.',
    whenToUse: 'Monthly or quarterly. Before any roadmap review cycle. After a spike in ticket volume following a launch.',
    inputNeeded: 'Exported support ticket data: minimum 100 tickets. Include ticket text, category (if tagged), and resolution status.',
    aiSteps: [
      { step: 1, action: 'Classify by complaint type', detail: 'Prompt: "Read these support tickets. Classify each into one of these categories: (1) Bug/broken experience, (2) Missing feature, (3) Confusion about how something works, (4) Policy or pricing complaint, (5) Other. Return a count per category."' },
      { step: 2, action: 'Extract recurring friction patterns', detail: 'Prompt: "From the \'bug\' and \'missing feature\' tickets, extract the top 10 recurring friction patterns. For each: pattern name, example tickets (3 verbatim quotes), frequency, and the likely product area."' },
      { step: 3, action: 'Map to opportunity statements', detail: 'Prompt: "For each friction pattern, write a product opportunity statement: [User type] is frequently blocked by [pain]. This costs [frequency] support contacts and suggests a gap in [product area]. Potential opportunity: [one-line fix direction]."' },
      { step: 4, action: 'Score by volume and severity', detail: 'Prompt: "Rank these opportunities by: (1) ticket volume, (2) likely customer impact (churn risk, repeat occurrence), and (3) addressability in the product. Score each 1–5 on each dimension and produce a ranked list."' },
    ],
    humanSteps: [
      'Validate AI classification: spot-check 10% of tickets manually',
      'Add context AI cannot know: which patterns are known vs new? Which are already in the roadmap?',
      'Challenge the scoring: some high-volume tickets are low-value fixes; some rare tickets are high-value signal',
      'Present the top 5 opportunities to the product team with your own framing',
    ],
    output: 'Ranked opportunity report: pattern name → ticket volume → representative quotes → opportunity statement → addressability score',
    qualityBar: 'Every opportunity backed by minimum 10 ticket quotes. Frequency is a real count, not an estimate.',
    risks: 'AI classification can drift for ambiguous tickets. "Other" category hides signal. Frequency bias: loud complainers skew the pattern.',
    whatNotToAutomate: 'Roadmap prioritisation. Deciding which opportunities are strategic versus tactical.',
  },
  {
    id: 'design-qa-loop',
    title: 'Build a reusable AI-assisted design QA loop',
    team: 'Product Design · UX Writing',
    time: '2–3 hrs to set up, 30–60 min per run',
    tools: ['Claude'],
    problem: 'Design QA before engineering handoff is manual, inconsistent, and catches errors late. Missing copy states, inconsistent tone, and unaddressed edge cases get found in development.',
    whenToUse: 'Before every engineering handoff for a significant feature or screen set. Run it after the designer has done their own review.',
    inputNeeded: 'Export all screen copy from the design file into a structured document. Include: screen name, state (default, empty, error, loading, success), copy text, character limit if known.',
    aiSteps: [
      { step: 1, action: 'Check copy completeness', detail: 'Prompt: "Review this screen copy inventory. For each screen, flag: (1) Missing states — does every screen have a default, loading, error, and success state? (2) Empty states — is there a message for when there is no content? (3) Edge cases — what states are missing given the user flows described?"' },
      { step: 2, action: 'Audit for consistency', detail: 'Prompt: "Check for inconsistency across this copy set: (1) Terminology — is the same feature/action named consistently? (2) Tone — does the writing style stay consistent across states? (3) Tense — is the language consistently present-tense or action-oriented? List all inconsistencies found."' },
      { step: 3, action: 'Check against brand voice', detail: 'Prompt: "Headout\'s copy voice is warm, direct, and specific. It avoids generic filler, passive voice, and over-apology. Review this copy against that standard. Flag: (1) Generic or placeholder-feeling copy, (2) Passive constructions, (3) Over-apologetic error messages, (4) Vague CTAs."' },
      { step: 4, action: 'Character limit check', detail: 'Prompt: "For copy with character limits specified, flag any text that exceeds the limit. Suggest a shortened alternative that maintains meaning."' },
    ],
    humanSteps: [
      'Designer reviews every AI flag — do not apply blindly',
      'Writer validates brand voice flags: AI may flag bold choices as "inconsistent"',
      'PM reviews edge case gaps: which missing states are in scope?',
      'Keep a record of recurring flags across releases — they indicate systemic issues',
    ],
    output: 'QA report: missing states list, inconsistency log, brand voice flags, character limit violations — with suggested fixes for each',
    qualityBar: 'Every flag is actioned: either fixed, or explicitly marked "accepted" with a reason.',
    risks: 'AI flags false positives. Bold copy choices may be flagged as inconsistent. Review every finding, do not bulk-accept.',
    whatNotToAutomate: 'Final copy decisions. Tone calls on sensitive messages. The sign-off step.',
  },
  {
    id: 'campaign-production-system',
    title: 'Create a campaign production system using AI',
    team: 'Brand Design · Marketing',
    time: '4–6 hrs (first time), 2–3 hrs per subsequent campaign',
    tools: ['Claude', 'Midjourney', 'Krea'],
    problem: 'Campaign production is slow because creative territory exploration takes days, briefing is inconsistent, and asset adaptation is manual.',
    whenToUse: 'At the start of any campaign that requires multiple visual directions or a volume of adapted assets.',
    inputNeeded: 'Campaign brief: objective, audience, key message, markets, asset formats needed, brand constraints, reference examples if any.',
    aiSteps: [
      { step: 1, action: 'Generate 8 visual territory concepts', detail: 'Prompt Claude: "Based on this brief, generate 8 distinct visual territory concepts. For each: concept name, mood description (3 words), visual language (colour direction, texture, spatial feel), what emotion it should create in the viewer, and 3 reference image prompts for Midjourney."' },
      { step: 2, action: 'Generate reference imagery', detail: 'Run the Midjourney prompts for each territory. Generate 4 variations per territory. Present all 32 as a visual reference set, not final assets.' },
      { step: 3, action: 'Score and shortlist territories', detail: 'Prompt Claude: "Review these 8 territories against the brief objectives. Score each 1–5 on: (1) alignment with brief, (2) differentiation from Headout\'s typical visual language, (3) scalability across markets and formats, (4) brand safety. Recommend top 3 for development."' },
      { step: 4, action: 'Develop the shortlisted territories', detail: 'For the top 3 territories, generate a deeper visual set: hero image, supporting assets, copy direction pairings. Use Krea for real-time iteration.' },
    ],
    humanSteps: [
      'Creative director reviews and selects 1–2 territories from the shortlist',
      'Art direction of final assets remains fully human',
      'Brand review before any asset goes to production',
      'Market-specific adaptation reviewed by local team',
    ],
    output: 'Visual territory set with reference imagery → shortlisted concepts → developed assets per territory → final approved direction',
    qualityBar: 'Reference imagery must be brand-safe, visually coherent, and conceptually distinct from each other. No asset goes to market without art direction review.',
    risks: 'Midjourney can generate visually impressive but conceptually shallow territory. AI scoring can bias toward safe over differentiated.',
    whatNotToAutomate: 'Creative direction. Final asset approval. Brand decisions. Market-specific judgment.',
  },
  {
    id: 'localization-qa',
    title: 'Use AI to improve localization quality across markets',
    team: 'UX Writing · Content · Ops',
    time: '1–2 hrs per review cycle',
    tools: ['Claude'],
    problem: 'Translated copy goes to market with truncation issues, culturally off phrases, and untranslatable references that were not caught in English review.',
    whenToUse: 'Before any translated copy goes to production. Especially for new market launches and high-traffic product pages.',
    inputNeeded: 'Source copy (English), translated copy, target language/market, screenshots of UI with the copy in context.',
    aiSteps: [
      { step: 1, action: 'Flag untranslatable or risky source phrases', detail: 'Prompt: "Review this English copy for phrases that may be difficult to translate or culturally risky in [target market]. Flag: idioms, wordplay, culturally specific references, informal register that may not carry over, and length-sensitive strings."' },
      { step: 2, action: 'Review the translated copy', detail: 'Prompt: "Review this translated copy for [language/market]. Check: (1) Does it convey the same meaning as the source? (2) Are there phrases that sound unnatural or overly formal for a consumer product? (3) Are there cultural mismatches? (4) Are any strings likely to truncate in the UI based on length?"' },
      { step: 3, action: 'Check UI truncation risk', detail: 'Prompt: "Given these character limits, flag any translated strings that exceed or are close to the limit. Provide a shortened alternative that keeps the core meaning."' },
    ],
    humanSteps: [
      'Native speaker review of all flagged items — AI catches patterns but cannot replace fluency',
      'Designer checks actual UI in the target language for visual truncation',
      'Final approval from market manager or local team',
    ],
    output: 'QA report per market: flagged source phrases, translation quality issues, truncation risks, native review checklist',
    qualityBar: 'Every flagged item is reviewed by a native speaker or market manager before sign-off.',
    risks: 'AI cannot fully assess cultural nuance, especially for subtle tone or register issues. Formal/informal address (tu/Sie, tu/vous) often requires human judgment.',
    whatNotToAutomate: 'Final translation decisions. Cultural judgment for sensitive or brand-critical copy.',
  },
  {
    id: 'decision-memo',
    title: 'Turn messy context into a decision memo',
    team: 'Product · Research · Ops',
    time: '45–90 min',
    tools: ['Claude'],
    problem: 'Important decisions are made with all the context scattered across Slack threads, meeting notes, and docs. The decision rationale is never captured clearly.',
    whenToUse: 'Before any significant product, hiring, vendor, or strategic decision. When context is spread across too many places to synthesise manually.',
    inputNeeded: 'Dump the relevant context: Slack threads, meeting notes, research findings, data, stakeholder positions. No formatting required.',
    aiSteps: [
      { step: 1, action: 'Extract the decision and constraints', detail: 'Prompt: "Read all of this context. What is the decision that needs to be made? What are the hard constraints that cannot change? What are the soft constraints (preferences, tradeoffs)? List them separately."' },
      { step: 2, action: 'Map the options', detail: 'Prompt: "Based on this context, what are the realistic options for this decision? For each option: what it is, who supports it and why, what it risks, and what it would take to execute."' },
      { step: 3, action: 'Surface unknowns and disagreements', detail: 'Prompt: "What information is missing that would materially change this decision? What are the points of genuine disagreement among the stakeholders in this context? List both."' },
      { step: 4, action: 'Draft the memo', detail: 'Prompt: "Draft a 1-page decision memo: (1) The decision to be made, (2) The options, (3) The recommendation and why, (4) What is being deliberately left unresolved. Tone: direct and clear, not hedged."' },
    ],
    humanSteps: [
      'Review AI-extracted options: are any missing? Are any mischaracterised?',
      'Add context AI could not access: interpersonal dynamics, political considerations, strategic framing',
      'Decision-maker reviews and approves the final memo',
    ],
    output: 'One-page decision memo with: decision statement, options, recommendation, and open questions',
    qualityBar: 'The memo can be shared with any stakeholder with full context — no verbal preamble required.',
    risks: 'AI may create a false sense of completeness. Unknowns it cannot surface (things not in the context dump) are often the most important. Always ask: "what is not in here?"',
    whatNotToAutomate: 'The decision itself. Stakeholder alignment. The accountability for the outcome.',
  },
  {
    id: 'landing-page-audit',
    title: 'AI-assisted landing page audit',
    team: 'Product · Marketing · Brand',
    time: '1–2 hrs',
    tools: ['Claude', 'Perplexity'],
    problem: 'Landing pages drift from strategic intent. Copy becomes generic, CTAs weaken, and competitive positioning erodes — usually without anyone noticing until metrics decline.',
    whenToUse: 'Quarterly for high-traffic pages. Before any major campaign or market push. When conversion rates are declining.',
    inputNeeded: 'Page URL or full copy export. Define the page goal (conversion, trust-building, information), target audience, and 2–3 competitive alternatives.',
    aiSteps: [
      { step: 1, action: 'Structural audit', detail: 'Prompt: "Audit this landing page structure. Evaluate: (1) Does the hero communicate the value proposition in under 6 seconds? (2) Is the hierarchy of information logical? (3) Is every section earning its place — does it move the user toward the goal? (4) Where might users drop off and why?"' },
      { step: 2, action: 'Copy quality review', detail: 'Prompt: "Review the page copy against these criteria: (1) Specific vs vague — is every claim concrete? (2) Customer-centric vs product-centric — is it about what the user gets, not what we built? (3) Trust signals — where are they present or missing? (4) CTA clarity — is it clear what happens next and why the user should do it?"' },
      { step: 3, action: 'Competitive gap', detail: 'Use Perplexity to research how 2–3 competitors position the same product. Then prompt Claude: "Compare this page\'s positioning to these competitor approaches. Where are we weaker? Where are we stronger? What are we not saying that we should be?"' },
    ],
    humanSteps: [
      'Validate AI structural findings with actual user data (scroll maps, drop-off data if available)',
      'Brand and copy team reviews flagged copy — not all "vague" copy is actually underperforming',
      'PM or marketing lead decides what changes to test vs implement directly',
    ],
    output: 'Audit report: structural issues, copy quality flags, competitive gaps, prioritised improvement list',
    qualityBar: 'Every recommendation ties to a specific page goal or user behaviour, not just a quality observation.',
    risks: 'AI audit is based on best-practice heuristics, not your actual user data. Always cross-reference with real behavioural data.',
    whatNotToAutomate: 'Decisions about what to test. Brand voice changes. Positioning shifts.',
  },
  {
    id: 'creative-qa',
    title: 'Evaluate creative output against brand standards',
    team: 'Brand Design · Marketing',
    time: '30–60 min per review cycle',
    tools: ['Claude'],
    problem: 'Brand consistency degrades at volume. Creative output from multiple contributors drifts from the brand standard without a systematic review mechanism.',
    whenToUse: 'Before any batch of creative assets goes to production. When working with external vendors or multiple designers on the same campaign.',
    inputNeeded: 'Creative assets (or descriptions/copy from them), brand guidelines (or key criteria extracted from them), the brief the work was responding to.',
    aiSteps: [
      { step: 1, action: 'Extract brand criteria as a rubric', detail: 'Prompt: "From these brand guidelines, extract a QA rubric for copy: a list of 8–10 specific pass/fail criteria. Example format: Criterion | Pass looks like | Fail looks like."' },
      { step: 2, action: 'Review creative against the rubric', detail: 'Prompt: "Score this creative output against the brand rubric. For each criterion: Pass, Fail, or Flag (borderline). For every Fail or Flag, quote the specific element and explain why."' },
      { step: 3, action: 'Identify pattern failures', detail: 'Prompt: "Across this full batch of assets, which brand criteria are failing most frequently? What is the likely root cause — briefing gap, style drift, or context mismatch?"' },
    ],
    humanSteps: [
      'Creative director reviews every flagged item — the rubric helps focus attention, not replace judgment',
      'Distinguish between brand rule violations and intentional creative choices',
      'Feed pattern failures back into the briefing process, not just the output review',
    ],
    output: 'Asset-by-asset brand QA scores, pattern failure report, root cause analysis, briefing improvement recommendations',
    qualityBar: 'Every failing asset has a specific, actionable note — not just "off-brand."',
    risks: 'AI rubric application is mechanical. It will flag bold creative choices that break the rules intentionally. Human art direction judgment is required to distinguish violations from decisions.',
    whatNotToAutomate: 'Creative direction. Brand evolution decisions. Overriding the rubric for strategic reasons.',
  },
  {
    id: 'experiment-learnings',
    title: 'AI workflow for post-launch experiment learnings',
    team: 'Product · Research',
    time: '2–3 hrs',
    tools: ['Claude'],
    problem: 'Experiment results are reviewed, a winner is shipped, and the learning is lost. Patterns across experiments never compound into knowledge.',
    whenToUse: 'After every A/B test or experiment. Before any experiment is archived.',
    inputNeeded: 'Experiment brief, metrics results, any qualitative data collected, the decision made.',
    aiSteps: [
      { step: 1, action: 'Extract the finding beyond the metric', detail: 'Prompt: "This experiment tested [hypothesis]. The metric result was [result]. What does this tell us about user behaviour beyond the metric? What underlying need or behaviour does this confirm, challenge, or reveal?"' },
      { step: 2, action: 'Connect to past experiments', detail: 'Prompt: "Here are 3 previous experiments on related features: [summaries]. Does this result confirm, contradict, or extend their findings? What pattern is emerging?"' },
      { step: 3, action: 'Generate hypotheses for next experiments', detail: 'Prompt: "Based on this result, what are the 3 highest-value follow-up hypotheses to test? For each: what it would test, why it matters, and what a positive or negative result would mean."' },
      { step: 4, action: 'Write the reusable learning', detail: 'Prompt: "Write a one-paragraph \'learning statement\' for the team knowledge base: what we tested, what we found, why it matters, and what to do differently in future work."' },
    ],
    humanSteps: [
      'PM validates the behavioural interpretation — AI infers from metrics, but context matters',
      'Research lead connects the finding to qualitative data if available',
      'Learning statement is reviewed before adding to the team knowledge base',
    ],
    output: 'Learning statement, follow-up hypotheses, connection to prior experiments',
    qualityBar: 'The learning statement is specific enough that a new team member reading it in 6 months would understand what to do differently.',
    risks: 'AI can confabulate patterns across experiments if the input summaries are not accurate. Garbage in, garbage out for pattern-finding.',
    whatNotToAutomate: 'The decision about what to build next. The interpretation of unexpected results.',
  },
]

export default function WorkflowsPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Workflow Library"
        description="Senior-level AI workflows for product, design, research, ops, and brand. Each workflow is built for a real problem — with AI steps, human steps, quality bars, and what not to automate."
        badge="Workflow Systems"
      />

      <div className="space-y-3">
        {workflows.map((workflow) => {
          const isOpen = openId === workflow.id
          return (
            <div
              key={workflow.id}
              className="rounded-xl overflow-hidden transition-all duration-150"
              style={{
                background: '#ffffff',
                border: `1px solid ${isOpen ? 'rgba(83,58,253,0.25)' : '#e3e8ee'}`,
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : workflow.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>{workflow.title}</div>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#64748d' }}>
                    <span>{workflow.team}</span>
                    <span>·</span>
                    <span>{workflow.time}</span>
                    <span>·</span>
                    <span>{workflow.tools.join(', ')}</span>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{ color: '#64748d', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isOpen && (
                <div style={{ borderTop: '1px solid #e3e8ee', background: '#f6f9fc' }}>
                  <div className="px-5 pt-5 pb-6 space-y-6">

                    {/* Problem + when */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>Problem</div>
                        <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{workflow.problem}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>When to use it</div>
                        <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{workflow.whenToUse}</p>
                      </div>
                    </div>

                    {/* Input */}
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>Input needed</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{workflow.inputNeeded}</p>
                    </div>

                    {/* AI Steps */}
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#533afd' }}>AI steps</div>
                      <div className="space-y-3">
                        {workflow.aiSteps.map((step) => (
                          <div key={step.step} className="flex gap-3">
                            <div
                              className="shrink-0 size-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                              style={{ background: 'rgba(83,58,253,0.1)', color: '#533afd', border: '1px solid rgba(83,58,253,0.2)', minWidth: '24px' }}
                            >
                              {step.step}
                            </div>
                            <div>
                              <div className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>{step.action}</div>
                              <p className="text-xs leading-relaxed" style={{ color: '#64748d' }}>{step.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Human steps */}
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#dc2626' }}>Human steps (required)</div>
                      <ul className="space-y-1.5">
                        {workflow.humanSteps.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#273951' }}>
                            <span className="shrink-0 mt-1.5 size-1.5 rounded-full" style={{ background: '#dc2626', opacity: 0.7 }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Output + Quality + Risks grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e3e8ee' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>Output</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{workflow.output}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#16a34a' }}>Quality bar</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{workflow.qualityBar}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#dc2626' }}>Risks</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{workflow.risks}</p>
                      </div>
                    </div>

                    {/* What not to automate */}
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(83,58,253,0.04)', border: '1px solid rgba(83,58,253,0.12)' }}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#533afd' }}>What not to automate</div>
                      <p className="text-sm" style={{ color: '#273951' }}>{workflow.whatNotToAutomate}</p>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
