import { staticTerms } from './glossary-static'

export type SearchItemType = 'abbreviation' | 'term' | 'skill' | 'prompt' | 'principle' | 'tool'

export interface SearchItem {
  id: string
  type: SearchItemType
  title: string
  subtitle?: string   // full_form for abbrevs, team for prompts, theme for principles
  snippet: string     // short display text
  href: string
  keywords: string    // full concatenated text for matching
}

// ─── Glossary terms ────────────────────────────────────────────────────────

const glossaryItems: SearchItem[] = staticTerms.map((t) => ({
  id: t.id,
  type: (t.full_form ? 'abbreviation' : 'term') as SearchItemType,
  title: t.term,
  subtitle: t.full_form ?? undefined,
  snippet: t.short_definition ?? '',
  href: '/glossary#' + t.id,
  keywords: [
    t.term,
    t.full_form,
    t.short_definition,
    t.detailed_explanation,
    t.layman_explanation,
    t.example_usage,
    ...(t.aliases ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase(),
}))

// ─── Skills — synced with the actual skills in app/(playbook)/skills/page.tsx ──

const skillItems: SearchItem[] = [
  { id: 'sk-research-synthesis',    type: 'skill', title: 'Research Synthesis',          subtitle: 'Research & Analysis', snippet: 'Automate and enhance research synthesis: summarize, organize, and analyze data from multiple sources to deliver actionable insights.',               href: '/skills#' + encodeURIComponent('Research Synthesis'),          keywords: 'research synthesis summarize organize analyze data actionable insights competitive product discovery strategy stakeholder' },
  { id: 'sk-persona-researcher',    type: 'skill', title: 'Persona Researcher',           subtitle: 'Research & Analysis', snippet: 'Collect, synthesize, and analyze data from multiple sources to generate structured, actionable persona profiles.',                                   href: '/skills#' + encodeURIComponent('Persona Researcher'),          keywords: 'persona researcher ux product marketing segments profiles goals pain points behaviors data sources' },
  { id: 'sk-extract-design-system', type: 'skill', title: 'Extract Design System',        subtitle: 'Design / Frontend',   snippet: 'Reverse-engineer design tokens (colors, typography, spacing) from any public website and generate starter JSON and CSS properties.',                href: '/skills#' + encodeURIComponent('Extract Design System'),        keywords: 'design system tokens colors typography spacing extract reverse engineer css json figma variables' },
  { id: 'sk-ui-audit-reporter',     type: 'skill', title: 'UI Audit Reporter',            subtitle: 'Design',              snippet: 'Audit screens for visual consistency, spacing, and design system compliance at a senior or lead level.',                                          href: '/skills#' + encodeURIComponent('UI Audit Reporter'),           keywords: 'ui audit reporter visual consistency spacing design system figma handoff accessibility' },
  { id: 'sk-handoff-documenter',    type: 'skill', title: 'Design Handoff Documenter',    subtitle: 'Design',              snippet: 'Generate developer-ready specifications from design files with precise measurements, interactions, and tokens.',                                    href: '/skills#' + encodeURIComponent('Design Handoff Documenter'),   keywords: 'handoff documenter developer spec figma measurements interactions tokens responsive states animations' },
  { id: 'sk-user-flow-wireframer',  type: 'skill', title: 'User Flow Wireframer',         subtitle: 'Design',              snippet: 'Generate wireframe specifications for multi-step user journeys: happy paths, error states, and edge cases fully mapped.',                        href: '/skills#' + encodeURIComponent('User Flow Wireframer'),         keywords: 'user flow wireframer journey map happy path error states edge cases screens figma' },
  { id: 'sk-design-engineering',    type: 'skill', title: 'Design Engineering',           subtitle: 'Design',              snippet: 'Review UI code and interactions for animation quality, responsiveness, and micro-details that make interfaces feel right.',                       href: '/skills#' + encodeURIComponent('Design Engineering'),           keywords: 'design engineering animation responsiveness micro-details ui code framer motion css interactions' },
  { id: 'sk-design-taste-frontend', type: 'skill', title: 'Design Taste Frontend',        subtitle: 'Frontend Design',     snippet: 'Evaluate and upgrade AI-generated interfaces for layout, typography, motion, and spacing quality.',                                               href: '/skills#' + encodeURIComponent('Design Taste Frontend'),        keywords: 'design taste frontend anti-slop layout typography motion spacing cursor v0 lovable ai generated' },
  { id: 'sk-visual-hierarchy',      type: 'skill', title: 'Visual Hierarchy Analyzer',    subtitle: 'Design',              snippet: 'Analyze and optimize visual hierarchy for user attention flow, ensuring designs guide attention in the right order.',                              href: '/skills#' + encodeURIComponent('Visual Hierarchy Analyzer'),    keywords: 'visual hierarchy attention flow conversion cta heatmap eye tracking figma mobile' },
  { id: 'sk-localization-qa',       type: 'skill', title: 'Localization QA Agent',        subtitle: 'Systems & Quality',   snippet: 'Check translated product content for accuracy, fluency, tone, and cultural appropriateness against the source language version.',                  href: '/skills#' + encodeURIComponent('Localization QA Agent'),        keywords: 'localization qa translation accuracy fluency tone cultural appropriateness language ux writing content' },
  { id: 'sk-taste-skill',           type: 'skill', title: 'Taste Skill',                  subtitle: 'Craft & Taste',       snippet: 'Enforce anti-slop design decisions across UI, motion quality, and frontend architecture. A senior-level filter that raises the bar.',              href: '/skills#' + encodeURIComponent('Taste Skill'),                  keywords: 'taste skill anti-slop design quality motion frontend architecture senior bar generic mediocre' },
  { id: 'sk-emil-design-eng',       type: 'skill', title: 'Emil Design Engineering',      subtitle: 'Craft & Taste',       snippet: 'Apply Emil Kowalski\'s design-engineering philosophy: production-ready frontend craft and animation precision.',                                   href: '/skills#' + encodeURIComponent('Emil Design Engineering'),       keywords: 'emil kowalski design engineering animation precision active states origin aware production craft' },
  { id: 'sk-impeccable',            type: 'skill', title: 'Impeccable',                   subtitle: 'Craft & Taste',       snippet: 'Production-grade, anti-generic frontend: the reference standard for what "done" looks like at a high bar.',                                       href: '/skills#' + encodeURIComponent('Impeccable'),                   keywords: 'impeccable production grade anti-generic frontend done quality bar empty loading error states pixel intentional' },
  { id: 'sk-soft-skill',            type: 'skill', title: 'Soft Skill',                   subtitle: 'Craft & Taste',       snippet: 'Premium visual design guidance for typography, spacing, depth, and animation systems: the qualities that separate good from exceptional.',         href: '/skills#' + encodeURIComponent('Soft Skill'),                   keywords: 'soft skill typography spacing depth animation premium quality exceptional visual design' },
  { id: 'sk-animate',               type: 'skill', title: 'Animate',                      subtitle: 'Motion & Interaction',snippet: 'Design purposeful animation and micro-interactions that support usability and delight, not decoration.',                                           href: '/skills#' + encodeURIComponent('Animate'),                      keywords: 'animate purposeful animation micro-interactions usability delight ease-out framer motion css' },
  { id: 'sk-12-principles',         type: 'skill', title: '12 Principles of Animation',   subtitle: 'Motion & Interaction',snippet: 'Apply Disney\'s 12 classic animation principles to web interfaces: squash & stretch, anticipation, follow-through.',                               href: '/skills#' + encodeURIComponent('12 Principles of Animation'),   keywords: '12 principles animation disney squash stretch anticipation follow through slow in out timing weight' },
  { id: 'sk-animate-presence',      type: 'skill', title: 'Mastering Animate Presence',   subtitle: 'Motion & Interaction',snippet: 'Deep dive into Framer Motion AnimatePresence patterns: correct mount, unmount, and transition orchestration.',                                     href: '/skills#' + encodeURIComponent('Mastering Animate Presence'),   keywords: 'animate presence framer motion mount unmount exit animation key mode wait sync popLayout' },
  { id: 'sk-spring',                type: 'skill', title: 'To Spring or Not to Spring',   subtitle: 'Motion & Interaction',snippet: 'Decide when to use spring physics vs. easing: the judgment that separates mid-level from senior motion work.',                                     href: '/skills#' + encodeURIComponent('To Spring or Not to Spring'),   keywords: 'spring easing physics gesture driven state change framer motion stiffness damping' },
  { id: 'sk-feel-better',           type: 'skill', title: 'Make Interfaces Feel Better',  subtitle: 'Motion & Interaction',snippet: 'Polish micro-interactions, typography details, and visual refinements: the small decisions users never notice but definitely feel.',                  href: '/skills#' + encodeURIComponent('Make Interfaces Feel Better'),  keywords: 'micro-interactions typography visual refinements hover focus states loading skeletons feedback' },
  { id: 'sk-shape',                 type: 'skill', title: 'Shape',                        subtitle: 'Systems & Quality',   snippet: 'Structured design interview that produces an actionable brief before any coding starts: think before you build.',                                    href: '/skills#' + encodeURIComponent('Shape'),                        keywords: 'shape brief problem statement success criteria constraints scope open questions design sprint' },
  { id: 'sk-motion-performance',    type: 'skill', title: 'Motion Performance',           subtitle: 'Performance',         snippet: 'Fix compositor property issues, layout thrashing, and scroll-linked motion: the CPU-heavy animation problems senior engineers own.',              href: '/skills#' + encodeURIComponent('Motion Performance'),           keywords: 'motion performance compositor layout thrashing scroll linked animation gpu will-change devtools jank' },
]

// ─── Prompt Systems — synced with actual prompt IDs in app/(playbook)/prompts/page.tsx

const promptItems: SearchItem[] = [
  { id: 'prompt-problem-framing',              type: 'prompt', title: 'Problem framing',             subtitle: 'Strategy', snippet: 'Clarify a vague or solution-first problem into a clear problem statement, scope, assumptions, risks, and next step.',                     href: '/prompts#prompt-problem-framing',              keywords: 'problem framing vague stakeholder statement scope assumptions risks next step product strategy' },
  { id: 'prompt-opportunity-mapping',          type: 'prompt', title: 'Opportunity mapping',          subtitle: 'Strategy', snippet: 'Identify meaningful opportunity areas from scattered notes, research signals, ideas, complaints, or stakeholder inputs.',                  href: '/prompts#prompt-opportunity-mapping',          keywords: 'opportunity mapping research signals ideas complaints stakeholder areas evidence validation priority' },
  { id: 'prompt-idea-framing',                 type: 'prompt', title: 'Idea to Stakeholder Pitch',    subtitle: 'Strategy', snippet: 'Shape, pitch, align, or get approval for an idea before it moves into design, build, or experimentation.',                                href: '/prompts#prompt-idea-framing-alignment-approval', keywords: 'stakeholder pitch idea approval alignment approval direction evidence concerns trade-offs mvp metrics' },
  { id: 'prompt-product-critique',             type: 'prompt', title: 'Product critique',             subtitle: 'Research', snippet: 'Evaluate a flow, screen, or journey before moving ahead: identify clarity gaps, friction, risks, and missing states.',                   href: '/prompts#prompt-product-critique',             keywords: 'product critique flow screen journey clarity friction risks missing states conversion copy ux review' },
  { id: 'prompt-ux-copy',                      type: 'prompt', title: 'UX copy',                      subtitle: 'Content',  snippet: 'Write clear product copy for empty, error, success, confirmation, warning, onboarding, or decision point states.',                      href: '/prompts#prompt-ux-copy',                      keywords: 'ux copy writing empty error success confirmation warning onboarding cta title description states' },
  { id: 'prompt-research-synthesis',           type: 'prompt', title: 'Research Insight',subtitle: 'Research', snippet: 'Turn raw research inputs into themes, insight statements, evidence, implications, opportunities, and possible next actions.',            href: '/prompts#prompt-research-synthesis-insight',   keywords: 'research synthesis themes insight evidence implications opportunities interview survey transcripts' },
  { id: 'prompt-user-interview',               type: 'prompt', title: 'User interview guide',         subtitle: 'Research', snippet: 'Prepare an interview guide that reveals real behaviour, decision-making, motivations, pain points, and useful follow-up probes.',         href: '/prompts#prompt-user-interview-guide',         keywords: 'user interview guide behaviour decision making motivations pain points probes questions research' },
  { id: 'prompt-survey-design',                type: 'prompt', title: 'Survey design',                subtitle: 'Research', snippet: 'Create a survey that is easy to answer, easy to analyse, and structured to avoid weak or misleading response data.',                      href: '/prompts#prompt-survey-design',                keywords: 'survey design questions screening rating scale open ended analysis research quantitative' },
  { id: 'prompt-edge-case-finder',             type: 'prompt', title: 'Edge case finder',             subtitle: 'Execution',snippet: 'Stress-test a feature or flow before handoff: broken states, confusing states, policy gaps, system failures, and platform differences.',   href: '/prompts#prompt-edge-case-finder',             keywords: 'edge case finder stress test feature flow broken states policy gaps system failures platform' },
  { id: 'prompt-experiment-measurement',       type: 'prompt', title: 'Experiment and measurement',   subtitle: 'Execution',snippet: 'Design an experiment and define how success, failure, guardrails, segments, and decision criteria should be measured.',                    href: '/prompts#prompt-experiment-and-measurement',   keywords: 'experiment measurement ab test hypothesis metrics guardrails segments decision criteria launch' },
  { id: 'prompt-trade-off-analysis',           type: 'prompt', title: 'Trade-off analysis',           subtitle: 'Strategy', snippet: 'Compare multiple directions and make a clearer recommendation across user value, business value, effort, risk, and speed.',               href: '/prompts#prompt-trade-off-analysis',           keywords: 'trade-off analysis options compare user value business effort risk speed scalability reversibility' },
  { id: 'prompt-prioritisation',               type: 'prompt', title: 'Prioritisation',               subtitle: 'Strategy', snippet: 'Order ideas, bugs, experiments, or features by impact, confidence, effort, risk, learning value, and strategic relevance.',              href: '/prompts#prompt-prioritisation',               keywords: 'prioritisation ideas bugs features impact confidence effort risk learning strategic relevance' },
  { id: 'prompt-prd',                          type: 'prompt', title: 'Generate PRD',                 subtitle: 'Execution',snippet: 'Convert a feature or initiative into a structured product requirements document with goals, non-goals, edge cases, and metrics.',          href: '/prompts#prompt-prd',                          keywords: 'prd product requirements document goals non-goals user stories requirements edge cases metrics rollout' },
  { id: 'prompt-implementation',               type: 'prompt', title: 'Implementation',               subtitle: 'Execution',snippet: 'Hand off a design or product change to an AI coding tool or engineer with clear scope, constraints, and acceptance criteria.',               href: '/prompts#prompt-implementation',               keywords: 'implementation handoff ai coding cursor claude code scope constraints acceptance criteria engineer' },
  { id: 'prompt-launch-readiness',             type: 'prompt', title: 'Launch readiness',             subtitle: 'Execution',snippet: 'Check whether a feature, experiment, or product change is ready to go live across product, design, engineering, analytics, and support.',   href: '/prompts#prompt-launch-readiness',             keywords: 'launch readiness checklist product design engineering analytics support rollout rollback blockers' },
]

// ─── Operating Principles ──────────────────────────────────────────────────

const principleItems: SearchItem[] = [
  {
    id: 'principle-define-good',
    type: 'principle',
    title: "Define 'good' before you run AI",
    subtitle: 'Quality',
    snippet: "If you can't write a one-line quality bar for the output, AI won't produce it reliably. The quality bar comes first.",
    href: '/dos-donts',
    keywords: 'define good quality bar output criteria standard evaluation rubric first before running ai',
  },
  {
    id: 'principle-fast-wrong',
    type: 'principle',
    title: 'Fast and wrong is worse than slow and right',
    subtitle: 'Quality',
    snippet: "AI-assisted output at lower quality than manual work is not progress. The goal is better output. Speed is a bonus.",
    href: '/dos-donts',
    keywords: 'fast wrong slow right quality speed progress output lower bar regression test 10 inputs',
  },
  {
    id: 'principle-test-set',
    type: 'principle',
    title: 'No workflow without a test set',
    subtitle: 'Quality',
    snippet: 'Every prompt system that runs at team scale needs a representative sample of inputs it has been tested against.',
    href: '/dos-donts',
    keywords: 'workflow test set representative inputs tested evaluated scale team deployment quality consistent',
  },
  {
    id: 'principle-own-output',
    type: 'principle',
    title: 'You own the output. Not the model.',
    subtitle: 'Ownership',
    snippet: "There is no 'AI did it' as an excuse. If you ran the prompt, reviewed the output, and published it — you authored it.",
    href: '/dos-donts',
    keywords: 'ownership own output model accountability responsibility authored published reviewed professional',
  },
  {
    id: 'principle-taste-human',
    type: 'principle',
    title: 'Taste, ethics, and final decisions stay human',
    subtitle: 'Ownership',
    snippet: 'AI drafts, synthesises, challenges, and classifies. It does not decide. Creative direction and final approval belong to the person responsible.',
    href: '/dos-donts',
    keywords: 'taste ethics decisions human creative direction approval judgment responsibility strategic call',
  },
  {
    id: 'principle-verification',
    type: 'principle',
    title: 'Customer-facing output requires a verification path',
    subtitle: 'Ownership',
    snippet: 'Any AI output that reaches a customer needs a human review step. Ship without a verification path only when the cost of error is negligible.',
    href: '/dos-donts',
    keywords: 'customer facing verification path human review ship error cost negligible review step product',
  },
  {
    id: 'principle-systems',
    type: 'principle',
    title: 'A prompt that works once is a note. A prompt system is leverage.',
    subtitle: 'Systems over one-offs',
    snippet: "If a prompt produces consistent useful output across inputs and team members, document it. If it works three times, build a reusable workflow.",
    href: '/dos-donts',
    keywords: 'prompt system workflow leverage document reusable one-off consistent team members compound',
  },
  {
    id: 'principle-evaluate',
    type: 'principle',
    title: "Don't build workflows you can't evaluate",
    subtitle: 'Systems over one-offs',
    snippet: "If you can't tell whether the output is good or bad, you can't run it at scale. Evaluation criteria are not optional.",
    href: '/dos-donts',
    keywords: 'evaluate evaluation criteria scale workflow quality bad good output standard cannot assess',
  },
  {
    id: 'principle-context',
    type: 'principle',
    title: 'Context before prompts',
    subtitle: 'Systems over one-offs',
    snippet: 'Weak output is almost always a context problem, not a model problem. Invest in context first.',
    href: '/dos-donts',
    keywords: 'context prompts weak output model problem invest context engineering quality disappointing',
  },
  {
    id: 'principle-right-task',
    type: 'principle',
    title: 'Use AI where tasks repeat, inputs are predictable, quality bar is clear',
    subtitle: 'Right task for AI',
    snippet: 'Three conditions define where AI creates real leverage: high-volume, well-defined tasks where the quality bar can be articulated.',
    href: '/dos-donts',
    keywords: 'right task repeat volume predictable inputs quality bar leverage conditions automation candidates',
  },
  {
    id: 'principle-singular-judgment',
    type: 'principle',
    title: "Don't use AI where judgment is singular",
    subtitle: 'Right task for AI',
    snippet: 'Some work requires irreplaceable human context: knowing the person, the room, the history. AI cannot substitute for this.',
    href: '/dos-donts',
    keywords: 'singular judgment human context irreplaceable relationships institutional knowledge strategic personal history room',
  },
  {
    id: 'principle-sharpen-review',
    type: 'principle',
    title: 'AI should sharpen review, not replace it',
    subtitle: 'Right task for AI',
    snippet: 'The best use of AI in a review process is as a first-pass filter — surfacing the 80% that is systematic so humans focus on the 20% requiring judgment.',
    href: '/dos-donts',
    keywords: 'sharpen review replace filter first pass 80% systematic judgment human focus quality assurance',
  },
]

// ─── Tools ────────────────────────────────────────────────────────────────

const toolItems: SearchItem[] = [
  { id: 'tool-claude',     type: 'tool', title: 'Claude',          subtitle: 'Writing & Thinking', snippet: 'Long-form thinking, document analysis, structured reasoning.',       href: '/tools', keywords: 'claude anthropic ai assistant reasoning document analysis brief prd writing thinking' },
  { id: 'tool-chatgpt',    type: 'tool', title: 'ChatGPT',         subtitle: 'Writing & Thinking', snippet: 'Quick answers, brainstorming, drafting.',                              href: '/tools', keywords: 'chatgpt openai gpt4 gpt writing drafting brainstorming ideas' },
  { id: 'tool-perplexity', type: 'tool', title: 'Perplexity',      subtitle: 'Writing & Thinking', snippet: 'Real-time research with citations.',                                   href: '/tools', keywords: 'perplexity search research citations sources live web' },
  { id: 'tool-notion',     type: 'tool', title: 'Notion AI',       subtitle: 'Writing & Thinking', snippet: 'Drafting and editing inside Notion docs.',                             href: '/tools', keywords: 'notion ai drafting editing notes summarise meeting docs' },
  { id: 'tool-mj',         type: 'tool', title: 'Midjourney',      subtitle: 'Design & Image',     snippet: 'Cinematic image generation for concepts and moodboards.',               href: '/tools', keywords: 'midjourney image generation art moodboard visual concept cinematic' },
  { id: 'tool-dalle',      type: 'tool', title: 'DALL-E 3',        subtitle: 'Design & Image',     snippet: 'Quick image generation via ChatGPT.',                                  href: '/tools', keywords: 'dalle dall-e image generation openai illustration' },
  { id: 'tool-firefly',    type: 'tool', title: 'Adobe Firefly',   subtitle: 'Design & Image',     snippet: 'Brand-safe generative fill and image editing.',                         href: '/tools', keywords: 'adobe firefly generative fill image editing photoshop licensed' },
  { id: 'tool-v0',         type: 'tool', title: 'v0',              subtitle: 'Design & Image',     snippet: 'UI generation from text prompts.',                                      href: '/tools', keywords: 'v0 vercel ui generation react tailwind component design frontend' },
  { id: 'tool-cursor',     type: 'tool', title: 'Cursor',          subtitle: 'Code & Build',       snippet: 'AI-native code editor for product teams.',                              href: '/tools', keywords: 'cursor ai code editor vscode autocomplete codebase engineering' },
  { id: 'tool-cc',         type: 'tool', title: 'Claude Code',     subtitle: 'Code & Build',       snippet: 'Agentic coding from the terminal.',                                     href: '/tools', keywords: 'claude code agentic coding terminal cli refactor implement' },
  { id: 'tool-copilot',    type: 'tool', title: 'GitHub Copilot',  subtitle: 'Code & Build',       snippet: 'Inline code suggestions in any editor.',                                href: '/tools', keywords: 'github copilot code suggestions vscode jetbrains inline' },
  { id: 'tool-runway',     type: 'tool', title: 'Runway',          subtitle: 'Video & Motion',     snippet: 'Video generation and editing.',                                         href: '/tools', keywords: 'runway video generation editing motion background removal clips' },
  { id: 'tool-pika',       type: 'tool', title: 'Pika',            subtitle: 'Video & Motion',     snippet: 'Fast short video generation from images.',                              href: '/tools', keywords: 'pika video animation short clips social content motion' },
  { id: 'tool-elevenlabs', type: 'tool', title: 'ElevenLabs',      subtitle: 'Video & Motion',     snippet: 'Voice synthesis and audio generation.',                                 href: '/tools', keywords: 'elevenlabs voice synthesis tts text to speech audio voiceover' },
]

// ─── Combined index ────────────────────────────────────────────────────────

export const searchIndex: SearchItem[] = [
  ...glossaryItems,
  ...skillItems,
  ...promptItems,
  ...principleItems,
  ...toolItems,
]

// ─── Search function ───────────────────────────────────────────────────────

export function searchAll(query: string): Record<SearchItemType, SearchItem[]> {
  const q = query.toLowerCase().trim()

  const empty: Record<SearchItemType, SearchItem[]> = {
    abbreviation: [],
    term: [],
    skill: [],
    prompt: [],
    principle: [],
    tool: [],
  }

  if (q.length < 2) return empty

  const results = searchIndex.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(q)
    const subtitleMatch = item.subtitle?.toLowerCase().includes(q) ?? false
    const keywordMatch = item.keywords.includes(q)
    return titleMatch || subtitleMatch || keywordMatch
  })

  // Sort: title matches first, then subtitle, then body
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(q) ? 0 : 1
    const bTitle = b.title.toLowerCase().includes(q) ? 0 : 1
    return aTitle - bTitle
  })

  const grouped: Record<SearchItemType, SearchItem[]> = { ...empty }
  for (const item of results) {
    const bucket = grouped[item.type]
    const cap = item.type === 'abbreviation' || item.type === 'term' ? 5 : 4
    if (bucket.length < cap) bucket.push(item)
  }

  return grouped
}
