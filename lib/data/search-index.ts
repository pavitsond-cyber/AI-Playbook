import { staticTerms } from './glossary-static'

export type SearchItemType = 'abbreviation' | 'term' | 'skill' | 'prompt' | 'principle'

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
  href: '/glossary',
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

// ─── Skills ────────────────────────────────────────────────────────────────

const skillItems: SearchItem[] = [
  {
    id: 'skill-workflow-design',
    type: 'skill',
    title: 'AI workflow design',
    subtitle: 'Product · Design · Research · Ops · Brand',
    snippet: 'Design a reusable AI-assisted workflow for a recurring team task — input spec, prompt chain, review step, output format, quality bar.',
    href: '/skills',
    keywords: 'ai workflow design reusable recurring team task input spec prompt chain review step output format quality bar systematise owner',
  },
  {
    id: 'skill-output-eval',
    type: 'skill',
    title: 'AI output evaluation',
    subtitle: 'Research · Design · Product · Brand · Content',
    snippet: 'Build rubrics and checklists to evaluate AI output quality before scaling any workflow to the full team.',
    href: '/skills',
    keywords: 'ai output evaluation rubric checklist quality assessment scaling team pass fail criteria consistent rating',
  },
  {
    id: 'skill-context-engineering',
    type: 'skill',
    title: 'Context engineering',
    subtitle: 'Everyone',
    snippet: 'Write prompts that give AI the specific product, user, or task context needed to produce high-quality output. The difference between generic and useful output is almost always context.',
    href: '/skills',
    keywords: 'context engineering prompt writing specific product user task context generic useful output off-target consistent inputs',
  },
  {
    id: 'skill-research-synthesis',
    type: 'skill',
    title: 'AI-assisted research synthesis',
    subtitle: 'Research · Product · Design',
    snippet: 'Extract themes, frequency counts, and contradictions from research data. Assign confidence levels to each insight based on evidence quality.',
    href: '/skills',
    keywords: 'research synthesis themes frequency contradictions evidence confidence insights interviews transcripts grading qualitative',
  },
  {
    id: 'skill-design-qa',
    type: 'skill',
    title: 'AI-powered design QA',
    subtitle: 'Product Design · UX Writing',
    snippet: 'Use AI to systematically review a design for missing states, copy inconsistencies, brand voice issues, and edge cases before engineering handoff.',
    href: '/skills',
    keywords: 'design qa quality assurance review missing states copy inconsistencies brand voice edge cases handoff figma screens',
  },
  {
    id: 'skill-product-critique',
    type: 'skill',
    title: 'AI-assisted product critique',
    subtitle: 'Product',
    snippet: 'Pressure-test a PRD, product decision, or feature spec for unvalidated assumptions, missing edge cases, and weak success metrics.',
    href: '/skills',
    keywords: 'product critique prd pressure test assumptions edge cases success metrics feature spec review pm',
  },
  {
    id: 'skill-localization',
    type: 'skill',
    title: 'AI for localization at scale',
    subtitle: 'UX Writing · Content · Ops',
    snippet: 'Build a QA system for translated copy that catches cultural mismatches, truncation risks, and translation quality issues before market launch.',
    href: '/skills',
    keywords: 'localization qa translation copy cultural mismatches truncation market launch language international',
  },
  {
    id: 'skill-creative-direction',
    type: 'skill',
    title: 'AI creative direction systems',
    subtitle: 'Brand Design · Marketing',
    snippet: 'Use AI to rapidly explore and evaluate multiple visual or creative territories from a brief before committing to one direction.',
    href: '/skills',
    keywords: 'creative direction territories brand campaign visual midjourney image generation brief art direction explore options',
  },
  {
    id: 'skill-governance',
    type: 'skill',
    title: 'AI governance for product teams',
    subtitle: 'Product · Design · Research · Ops',
    snippet: 'Define quality bars, review processes, data handling rules, and ownership structure for AI use across a team.',
    href: '/skills',
    keywords: 'governance quality bars review processes data handling ownership structure automation sign-off team scale',
  },
  {
    id: 'skill-experimentation',
    type: 'skill',
    title: 'AI-assisted experimentation planning',
    subtitle: 'Product · Research',
    snippet: 'Sharpen hypotheses, define complete metric sets with guardrails, and identify experiment risks before a test runs.',
    href: '/skills',
    keywords: 'experimentation ab test hypothesis metrics guardrails risks planning experiment design falsifiable',
  },
  {
    id: 'skill-adoption',
    type: 'skill',
    title: 'AI adoption strategy',
    subtitle: 'Leads · Directors',
    snippet: 'Build a plan for moving a team from individual prompting to quality-controlled systems. Workflows, owners, quality bars, timeline.',
    href: '/skills',
    keywords: 'adoption strategy team plan workflows owners quality bars timeline scale ad-hoc systematic operating model',
  },
]

// ─── Prompt Systems ────────────────────────────────────────────────────────

const promptItems: SearchItem[] = [
  {
    id: 'prompt-prd',
    type: 'prompt',
    title: 'PRD Pressure-Testing System',
    subtitle: 'Product · 4 prompts',
    snippet: 'Challenge a draft PRD for assumptions, missing edge cases, and weak success metrics before engineering handoff.',
    href: '/prompts',
    keywords: 'prd product requirements document pressure test assumptions edge cases success metrics dependencies engineering handoff pm',
  },
  {
    id: 'prompt-research',
    type: 'prompt',
    title: 'UX Research Synthesis System',
    subtitle: 'Research · Product · 4 prompts',
    snippet: 'Extract themes, evidence, contradictions, and opportunity signals from interview transcripts or survey data.',
    href: '/prompts',
    keywords: 'ux research synthesis themes evidence contradictions opportunities interviews survey transcripts pain points frequency clustering jtbd',
  },
  {
    id: 'prompt-design-qa',
    type: 'prompt',
    title: 'Design QA Review System',
    subtitle: 'Product Design · UX Writing · 3 prompts',
    snippet: 'Systematically review all copy, states, and consistency in a design before engineering handoff.',
    href: '/prompts',
    keywords: 'design qa review copy states consistency missing empty error loading success brand voice figma handoff',
  },
  {
    id: 'prompt-landing-page',
    type: 'prompt',
    title: 'Landing Page Teardown System',
    subtitle: 'Product · Marketing · Brand · 3 prompts',
    snippet: 'Audit a landing page for structural weaknesses, copy quality, and competitive positioning gaps.',
    href: '/prompts',
    keywords: 'landing page teardown audit copy quality competitive positioning hero value proposition structure conversion',
  },
  {
    id: 'prompt-localization',
    type: 'prompt',
    title: 'Localization QA System',
    subtitle: 'UX Writing · Content · Ops · 3 prompts',
    snippet: 'Catch cultural mismatches, truncation risks, and translation quality issues before market launch.',
    href: '/prompts',
    keywords: 'localization qa translation cultural mismatches truncation market launch language international copy',
  },
  {
    id: 'prompt-campaign',
    type: 'prompt',
    title: 'Brand Campaign Territory System',
    subtitle: 'Brand Design · Marketing · 3 prompts',
    snippet: 'Generate and evaluate multiple visual and creative territories from a campaign brief before committing to one direction.',
    href: '/prompts',
    keywords: 'brand campaign territory creative direction midjourney image visual brief scoring marketing brand design',
  },
  {
    id: 'prompt-experiment',
    type: 'prompt',
    title: 'Experiment Design System',
    subtitle: 'Product · Research · 3 prompts',
    snippet: 'Design a rigorous A/B test with a clear hypothesis, metrics, guardrails, and edge cases before running it.',
    href: '/prompts',
    keywords: 'experiment design ab test hypothesis metrics guardrails risks falsifiable primary secondary attribution',
  },
  {
    id: 'prompt-support',
    type: 'prompt',
    title: 'Support Ticket Insight System',
    subtitle: 'Product · Ops · 3 prompts',
    snippet: 'Extract product opportunities, friction patterns, and churn signals from a batch of support tickets.',
    href: '/prompts',
    keywords: 'support tickets insights opportunities friction patterns churn signals classification product ops',
  },
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

// ─── Combined index ────────────────────────────────────────────────────────

export const searchIndex: SearchItem[] = [
  ...glossaryItems,
  ...skillItems,
  ...promptItems,
  ...principleItems,
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
