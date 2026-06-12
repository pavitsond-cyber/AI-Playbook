import { staticTerms } from './glossary-static'

export type SearchItemType = 'abbreviation' | 'term' | 'skill' | 'prompt' | 'tool'

export interface SearchItem {
  id: string
  type: SearchItemType
  title: string
  subtitle?: string
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

// ─── Tools — synced with app/(playbook)/tools/page.tsx groups ──────────────
// IDs match the `id=` added to each card: 'tool-' + name.toLowerCase().replace(/[^a-z0-9]+/g,'-')

const toolItems: SearchItem[] = [
  // Capture, Notes & Prompting
  { id: 'tool-granola',      type: 'tool', title: 'Granola',       subtitle: 'Capture',  snippet: 'Capture design reviews, PM calls, research calls, decisions, and action items.',              href: '/tools#tool-granola',      keywords: 'granola meeting notes capture design reviews pm calls research decisions action items' },
  { id: 'tool-notebooklm',   type: 'tool', title: 'NotebookLM',    subtitle: 'Capture',  snippet: 'Upload docs, PRDs, research notes, and transcripts to ask grounded questions.',               href: '/tools#tool-notebooklm',   keywords: 'notebooklm google notebook docs prd research notes transcripts grounded questions' },
  { id: 'tool-notion-ai',    type: 'tool', title: 'Notion AI',     subtitle: 'Capture',  snippet: 'Clean rough notes, summarize meetings, create decision logs, and organize playbooks.',        href: '/tools#tool-notion-ai',    keywords: 'notion ai notes summarize meetings decision logs playbooks organize drafting editing' },
  { id: 'tool-raycast-ai',   type: 'tool', title: 'Raycast AI',    subtitle: 'Capture',  snippet: 'Rewrite selected text, summarize snippets, and trigger quick AI actions.',                   href: '/tools#tool-raycast-ai',   keywords: 'raycast ai rewrite text summarize snippets quick actions launcher' },
  // Whiteboarding, Flows & Thinking
  { id: 'tool-excalidraw',   type: 'tool', title: 'Excalidraw',    subtitle: 'Capture',  snippet: 'Create rough flows, product logic diagrams, workshop sketches, and wireframes.',             href: '/tools#tool-excalidraw',   keywords: 'excalidraw whiteboard flows product logic diagrams workshop sketches wireframes drawing' },
  { id: 'tool-mermaid',      type: 'tool', title: 'Mermaid',       subtitle: 'Capture',  snippet: 'Turn written flows into diagrams using simple text syntax.',                                  href: '/tools#tool-mermaid',      keywords: 'mermaid diagrams text syntax flowchart sequence diagram code chart' },
  { id: 'tool-tldraw',       type: 'tool', title: 'tldraw',        subtitle: 'Capture',  snippet: 'Sketch flows, map journeys, create quick diagrams, and explain system logic visually.',      href: '/tools#tool-tldraw',       keywords: 'tldraw sketch flows journeys diagrams system logic canvas visual' },
  // Research & References
  { id: 'tool-mobbin',       type: 'tool', title: 'Mobbin',        subtitle: 'Capture',  snippet: 'Find real product flows like checkout, onboarding, cancellation, settings, and empty states.',href: '/tools#tool-mobbin',       keywords: 'mobbin product flows checkout onboarding cancellation settings empty states ux reference' },
  { id: 'tool-refero',       type: 'tool', title: 'Refero',        subtitle: 'Capture',  snippet: 'Search web and mobile interface references for visual and interaction patterns.',             href: '/tools#tool-refero',       keywords: 'refero interface references visual interaction patterns web mobile design' },
  // MCPs
  { id: 'tool-mobbin-mcp',   type: 'tool', title: 'Mobbin MCP',    subtitle: 'MCP',      snippet: 'Let AI tools use Mobbin-style references while generating or critiquing UI.',               href: '/tools#tool-mobbin-mcp',   keywords: 'mobbin mcp ai tools references ui critique generation model context protocol' },
  { id: 'tool-refero-mcp',   type: 'tool', title: 'Refero MCP',    subtitle: 'MCP',      snippet: 'Let AI agents inspect product screens and flows before giving design suggestions.',          href: '/tools#tool-refero-mcp',   keywords: 'refero mcp ai agents screens flows design suggestions model context protocol' },
  // Prompt-to-UI & Design Generation
  { id: 'tool-banani',       type: 'tool', title: 'Banani',        subtitle: 'Design',   snippet: 'Generate editable UI screens, wireframes, prototypes, and website layouts from prompts.',   href: '/tools#tool-banani',       keywords: 'banani ui screens wireframes prototypes website layouts prompts design generation' },
  { id: 'tool-galileo-ai',   type: 'tool', title: 'Galileo AI',    subtitle: 'Design',   snippet: 'Create polished UI directions from written prompts.',                                         href: '/tools#tool-galileo-ai',   keywords: 'galileo ai ui directions prompts polished design generation' },
  { id: 'tool-paper',        type: 'tool', title: 'Paper',         subtitle: 'Design',   snippet: 'Quickly create HTML-like UI concepts and editable layouts without heavy setup.',             href: '/tools#tool-paper',        keywords: 'paper design html ui concepts editable layouts quick prototype' },
  { id: 'tool-replit-agent', type: 'tool', title: 'Replit Agent',  subtitle: 'Design',   snippet: 'Build small tools, forms, dashboards, and interactive prototypes.',                          href: '/tools#tool-replit-agent', keywords: 'replit agent tools forms dashboards interactive prototypes build' },
  { id: 'tool-super-design', type: 'tool', title: 'Super Design',  subtitle: 'Design',   snippet: 'Generate UI mockups, components, and layouts inside coding tools like Cursor or VS Code.',  href: '/tools#tool-super-design', keywords: 'super design ui mockups components layouts cursor vscode coding tools' },
  { id: 'tool-tome',         type: 'tool', title: 'Tome',          subtitle: 'Design',   snippet: 'Create AI-powered presentations and visual narratives.',                                      href: '/tools#tool-tome',         keywords: 'tome presentations visual narratives ai powered slides decks' },
  // Vibe Coding & Design-to-Code
  { id: 'tool-claude-code',  type: 'tool', title: 'Claude Code',   subtitle: 'Design',   snippet: 'Ask an agent to inspect files, make UI changes, explain code, or implement small flows.',   href: '/tools#tool-claude-code',  keywords: 'claude code agent inspect files ui changes explain implement flows agentic terminal' },
  { id: 'tool-codex',        type: 'tool', title: 'Codex',         subtitle: 'Design',   snippet: 'Generate, refactor, explain, and test code from plain English.',                             href: '/tools#tool-codex',        keywords: 'codex openai generate refactor explain test code plain english' },
  { id: 'tool-cursor',       type: 'tool', title: 'Cursor',        subtitle: 'Design',   snippet: 'Edit UI, create components, fix layout issues, explain code, and build prototypes.',         href: '/tools#tool-cursor',       keywords: 'cursor ai code editor ui components layout explain build prototypes vscode' },
  { id: 'tool-github-desktop',type:'tool', title: 'GitHub Desktop', subtitle: 'Design',  snippet: 'Commit changes, switch branches, and create small PRs without terminal-heavy workflows.',   href: '/tools#tool-github-desktop',keywords: 'github desktop commits branches prs pull requests no terminal git workflow' },
  { id: 'tool-vercel',       type: 'tool', title: 'Vercel',        subtitle: 'Design',   snippet: 'Deploy vibe-coded prototypes and share live URLs.',                                           href: '/tools#tool-vercel',       keywords: 'vercel deploy prototypes live urls hosting nextjs frontend' },
  // Workflow Automation & Integrations
  { id: 'tool-airtable',     type: 'tool', title: 'Airtable',      subtitle: 'Automate', snippet: 'Create research repos, design QA trackers, prompt libraries, and ops dashboards.',          href: '/tools#tool-airtable',     keywords: 'airtable research repos design qa trackers prompt libraries ops dashboards database' },
  { id: 'tool-make',         type: 'tool', title: 'Make',          subtitle: 'Automate', snippet: 'Build multi-step automations with conditions and branching.',                                 href: '/tools#tool-make',         keywords: 'make integromat automations conditions branching workflow multi-step' },
  { id: 'tool-n8n',          type: 'tool', title: 'n8n',           subtitle: 'Automate', snippet: 'Create internal automations, AI workflows, alerts, summaries, and tool-to-tool handoffs.',  href: '/tools#tool-n8n',          keywords: 'n8n automations ai workflows alerts summaries tool-to-tool handoffs internal' },
  { id: 'tool-zapier',       type: 'tool', title: 'Zapier',        subtitle: 'Automate', snippet: 'Connect Slack, Gmail, Notion, Airtable, Sheets, forms, and webhooks.',                      href: '/tools#tool-zapier',       keywords: 'zapier slack gmail notion airtable sheets forms webhooks connect integration' },
  // Browser Agents, UI Screening & QA
  { id: 'tool-agentation',   type: 'tool', title: 'Agentation',    subtitle: 'Automate', snippet: 'Prompt a browser agent to inspect, compare, and operate websites.',                         href: '/tools#tool-agentation',   keywords: 'agentation browser agent inspect compare operate websites automation ui' },
  { id: 'tool-dialkit',      type: 'tool', title: 'Dialkit',       subtitle: 'Automate', snippet: 'Run browser-based prompting and workflow execution.',                                         href: '/tools#tool-dialkit',      keywords: 'dialkit browser prompting workflow execution automation' },
  { id: 'tool-playwright',   type: 'tool', title: 'Playwright',    subtitle: 'Automate', snippet: 'Open pages, click through flows, test UI states, and detect broken experiences.',           href: '/tools#tool-playwright',   keywords: 'playwright testing automation browser ui states flows broken experiences end to end' },
  { id: 'tool-scribe',       type: 'tool', title: 'Scribe',        subtitle: 'Automate', snippet: 'Auto-create step-by-step guides from actions.',                                              href: '/tools#tool-scribe',       keywords: 'scribe guides documentation step by step actions auto create howto' },
  // Visual Exploration, Imagery & Motion
  { id: 'tool-elevenlabs',   type: 'tool', title: 'ElevenLabs',    subtitle: 'Audio Visuals',  snippet: 'Create narration, audio mockups, and voice concepts.',                                       href: '/tools#tool-elevenlabs',   keywords: 'elevenlabs voice synthesis tts text to speech audio voiceover narration mockups' },
  { id: 'tool-jitter',       type: 'tool', title: 'Jitter',        subtitle: 'Audio Visuals',  snippet: 'Quickly animate UI, social posts, product moments, and lightweight motion concepts.',        href: '/tools#tool-jitter',       keywords: 'jitter animate ui social posts product moments motion animation lightweight' },
  { id: 'tool-krea',         type: 'tool', title: 'Krea',          subtitle: 'Audio Visuals',  snippet: 'Create visuals, icons, style explorations, and campaign imagery.',                           href: '/tools#tool-krea',         keywords: 'krea visuals icons style explorations campaign imagery generation ai image' },
  { id: 'tool-lottiefiles',  type: 'tool', title: 'LottieFiles',   subtitle: 'Audio Visuals',  snippet: 'Preview, manage, and export lightweight animations.',                                        href: '/tools#tool-lottiefiles',  keywords: 'lottiefiles animations lightweight preview manage export lottie json' },
  { id: 'tool-midjourney',   type: 'tool', title: 'Midjourney',    subtitle: 'Audio Visuals',  snippet: 'Generate moodboards, visual territories, concept imagery, and campaign directions.',        href: '/tools#tool-midjourney',   keywords: 'midjourney image generation art moodboard visual concept cinematic campaign directions' },
  { id: 'tool-rive',         type: 'tool', title: 'Rive',          subtitle: 'Audio Visuals',  snippet: 'Create production-ready interactive animations and state-based motion.',                     href: '/tools#tool-rive',         keywords: 'rive interactive animations state machine motion production ready flutter' },
  { id: 'tool-runway',       type: 'tool', title: 'Runway',        subtitle: 'Audio Visuals',  snippet: 'Generate short videos, motion experiments, and cinematic visual treatments.',               href: '/tools#tool-runway',       keywords: 'runway video generation editing motion background removal clips cinematic' },
  // Presentation & Storytelling
  { id: 'tool-gamma',        type: 'tool', title: 'Gamma',         subtitle: 'Audio Visuals',  snippet: 'Turn rough ideas into structured decks, concept pitches, and workshop material.',           href: '/tools#tool-gamma',        keywords: 'gamma presentations decks concept pitches workshop material ai slides' },
  { id: 'tool-pitch',        type: 'tool', title: 'Pitch',         subtitle: 'Audio Visuals',  snippet: 'Create clean team presentations and design review decks.',                                   href: '/tools#tool-pitch',        keywords: 'pitch presentations design review decks team slides clean' },
]

// ─── Combined index ────────────────────────────────────────────────────────

export const searchIndex: SearchItem[] = [
  ...glossaryItems,
  ...skillItems,
  ...promptItems,
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
