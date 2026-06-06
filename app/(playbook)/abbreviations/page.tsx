'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

type Category = 'ai_concepts' | 'prompting_ops' | 'design_vision' | 'workflow_data'

interface AbbreviationEntry {
  abbr: string
  full: string
  meaning: string
  example: string
  links: Array<{ label: string; href: string }>
  category: Category
}

const GROUPS: { id: Category; label: string; color: string; bg: string }[] = [
  { id: 'ai_concepts',   label: 'AI Concepts',    color: '#9B3FFF',  bg: 'rgba(155,63,255,0.06)' },
  { id: 'prompting_ops', label: 'Prompting & Ops', color: '#00CCA8',  bg: 'rgba(0,204,168,0.06)' },
  { id: 'design_vision', label: 'Design & Vision', color: '#FF69DB',  bg: 'rgba(255,105,219,0.06)' },
  { id: 'workflow_data', label: 'Workflow & Data', color: '#C27FFF',  bg: 'rgba(194,127,255,0.06)' },
]

const abbreviations: AbbreviationEntry[] = [

  // ─── AI Concepts (8) ──────────────────────────────────────────────────────

  {
    abbr: 'LLM',
    full: 'Large Language Model',
    meaning: 'The AI engine inside Claude, ChatGPT, and Gemini — trained on massive text to understand and generate language. Powers content creation, ideation, and analysis.',
    example: 'Write "Act as a senior UX writer, generate 8 empty-state copy options — headline under 6 words, warm tone, no emoji" and get 8 distinct options in seconds. That\'s an LLM predicting the most useful continuation of your prompt from everything it was trained on.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Context Engineering skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'MCP',
    full: 'Model Context Protocol',
    meaning: 'A standard that lets AI models connect to external tools, files, and data — like USB-C for AI. Designing prompts tailored to the AI\'s strengths and context to improve output relevance and accuracy.',
    example: 'With MCP configured, Claude can read your Figma file, check Notion for the PRD, write updated copy, and mark the task complete — all in one conversation. No tab switching. It\'s what turns a chatbot into an actual workflow tool.',
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'RAG',
    full: 'Retrieval-Augmented Generation',
    meaning: 'Combining external data with AI to generate accurate, contextual outputs — AI searches a knowledge base before generating, reducing hallucinations and adding depth.',
    example: 'Upload 12 interview transcripts to NotebookLM. Ask "What are the three most common pain points?" It searches all 12 documents before responding — the answer is grounded in actual quotes, not guesswork. Perplexity does the same with live web search before every answer.',
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'RLHF',
    full: 'Reinforcement Learning from Human Feedback',
    meaning: 'Fine-tuning AI with human preference feedback for better alignment — teaching AI via feedback loops to improve model accuracy and alignment with human goals.',
    example: 'RLHF is how Claude and ChatGPT learned to be genuinely helpful rather than just technically correct. Human reviewers compared pairs of model responses and their preferences shaped behavior. When AI feels naturally useful rather than robotic, RLHF is why.',
    links: [{ label: 'Operating Principles', href: '/dos-donts' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'NLP-AI',
    full: 'Natural Language Processing AI',
    meaning: 'AI systems that understand and generate human-like text — enabling natural conversations, copy generation, and content automation. AI reads and writes text like humans.',
    example: 'When a support bot reads "my booking is messed up, I need help asap" and correctly classifies it as urgent + booking issue + escalation needed — without any keywords — that\'s NLP-AI interpreting tone, urgency, and topic simultaneously. Enables natural interfaces and automation.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Support Ticket Insight prompt', href: '/prompts' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'CV-AI',
    full: 'Computer Vision AI',
    meaning: 'AI that analyzes visual content, detecting elements, objects, or scenes — helps AI "see" images and understand them. Enables AR/VR, accessibility, and automation.',
    example: 'Run competitor app screens through Claude\'s vision: "List all UI patterns and design decisions visible here." CV-AI returns a structured breakdown of card types, navigation models, interaction patterns — a full visual audit in minutes that would take hours manually.',
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'FAL',
    full: 'Fine-tuned AI Layer',
    meaning: 'Customizing pre-trained AI models with your domain data — making AI models learn your style and data. Produces higher quality, brand-specific AI outputs.',
    example: 'If you trained a model on 3 years of your brand\'s copy and style guide, it would write in your exact voice without needing a lengthy style brief in every prompt. That customised model is a Fine-tuned AI Layer — fewer prompt iterations, consistently on-brand output.',
    links: [{ label: 'Context Engineering skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'MLE',
    full: 'Model Latency Evaluation',
    meaning: 'Measuring AI response time and efficiency — checking how fast and efficient AI is. Helps optimize AI usage and cost for real-time product features.',
    example: 'Before shipping an AI copy generator into a live checkout flow, benchmark MLE. If the model takes 4+ seconds per response, users abandon. MLE identifies which model tier fits your latency budget — so you choose the right one before launch, not after users churn.',
    links: [{ label: 'Operating Principles', href: '/dos-donts' }],
    category: 'ai_concepts',
  },

  // ─── Prompting & Ops (7) ──────────────────────────────────────────────────

  {
    abbr: 'AIQ',
    full: 'AI Quality Audit',
    meaning: 'Reviewing AI outputs for brand tone, accuracy, bias, and consistency — an AI output health check for brands. Maintains brand consistency and trust.',
    example: 'Before any AI-generated campaign goes live, run an AIQ pass: does this match our voice? Are facts correct? Could this be misread in any market? AIQ is the editorial gate between AI generation and human approval. Without it, AI output quality degrades silently at scale.',
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI output evaluation skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'GPT-ops',
    full: 'Generative Prompt Operations',
    meaning: 'Managing, versioning, and testing AI prompts for scale and reliability — a toolbox for creating and managing AI prompts. Scales AI content and experimentation.',
    example: 'Instead of each designer running their own ad-hoc prompts, GPT-ops means your team has a shared, versioned library of tested prompts with rollback when an update breaks quality. The same discipline as software deployments, applied to your AI prompt library.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'ARF',
    full: 'AI Response Filtering',
    meaning: 'Post-processing AI outputs to remove noise, bias, or irrelevant content — filtering AI results before showing them. Reduces errors and improves output quality.',
    example: 'AI generates 20 product descriptions but 3 drift from the brief and 2 have factual errors. ARF is the filtering layer — automated or human — that removes those before the batch gets used. Think of it as quality control that runs between generation and publication.',
    links: [{ label: 'AI output evaluation skill', href: '/skills' }, { label: 'Operating Principles', href: '/dos-donts' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'MCPR',
    full: 'Multi-Context Prompt Refinement',
    meaning: 'Iteratively improving prompts with feedback from multiple contexts — teaching AI better with real-world examples. Produces better outputs with fewer iterations.',
    example: 'A copy prompt that works brilliantly for one product category but fails for another fails MCPR testing. You refine across 10+ real contexts until output quality holds consistently. The result is a prompt you can confidently hand to the whole team — not just use yourself.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Context Engineering skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'IPA',
    full: 'Intelligent Prompt Automation',
    meaning: 'Automating repeated AI prompt workflows — AI runs repetitive prompt tasks itself. Saves time and ensures consistency at scale.',
    example: 'Instead of manually pasting new listings into Claude each week for copy generation, IPA automates it — a trigger fires, the prompt runs, outputs land in your workspace, all without manual input. The same quality bar, delivered automatically on schedule.',
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }, { label: 'Prompt Systems', href: '/prompts' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'AGI',
    full: 'Automated Generative Iteration',
    meaning: 'Generating multiple design or copy variations automatically — lets AI create multiple options in seconds. Increases creativity speed and productivity.',
    example: 'Brief in a campaign concept, trigger AGI, get 12 distinct headline variations and 6 visual directions in minutes. Humans make the creative call; AI generates the option space. The value is in exploration speed — you see more before committing to less.',
    links: [{ label: 'Brand Campaign Territory prompt', href: '/prompts' }, { label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'C2A',
    full: 'Context-to-Action',
    meaning: 'AI interprets data and outputs actionable steps or recommendations — AI reads context and tells you what to do next. AI becomes actionable, not just informative.',
    example: 'Instead of asking "what does this data mean?", C2A prompting asks "given this data, what should I do next?" Output: specific, prioritised actions rather than analysis. The shift from AI-as-analyst to AI-as-advisor — tells you what to do, not just what happened.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'AI-assisted experimentation planning skill', href: '/skills' }],
    category: 'prompting_ops',
  },

  // ─── Design & Vision (9) ──────────────────────────────────────────────────

  {
    abbr: 'T2I',
    full: 'Text-to-Image',
    meaning: 'Generating images from text prompts — writing text and getting an image. Enables rapid prototyping for visual ideas.',
    example: 'Write "overhead flat-lay of travel essentials on warm terracotta tiles, natural light, editorial feel —ar 4:3" in Midjourney. You describe; AI renders. T2I lets you explore 12 visual directions in the time it used to take to brief one shoot.',
    links: [{ label: 'Brand Campaign Territory prompt', href: '/prompts' }, { label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'I2I',
    full: 'Image-to-Image',
    meaning: 'Transforming or refining images via AI — AI edits your image based on a prompt. Speeds up design iteration without starting from scratch.',
    example: 'Upload a rough design comp with "refine the lighting, make it warmer, more editorial." AI evolves your existing image rather than generating blind. Faster iteration, better control — you stay in the creative direction seat while AI handles the production.',
    links: [{ label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'D2P',
    full: 'Data-to-Prototype',
    meaning: 'AI generates prototype suggestions from structured data — turning spreadsheets or data into design mockups. Enables faster ideation and prototyping.',
    example: 'Feed in user flow data and feature requirements. D2P produces wireframe options showing how that data could be structured as screens. Not production-ready, but rapid ideation from information — faster than starting from a blank canvas every time.',
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'DPE',
    full: 'Design Pattern Extraction',
    meaning: 'Using AI to detect patterns from multiple design or content samples — lets AI find common design patterns for you. Speeds up discovery of reusable solutions.',
    example: 'Upload 20 screens from your product. Ask AI to "extract all recurring UI patterns." DPE returns: 7 distinct card types, 3 modal patterns, 4 navigation models — a full component audit in minutes that used to require a dedicated design sprint.',
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'VFE',
    full: 'Visual Feature Extraction',
    meaning: 'AI detects key visual elements from designs or images — AI finds important parts of visuals. Improves insights from visual data.',
    example: 'Run competitor app screens through Claude\'s vision: "List all visual elements and design decisions visible here." VFE returns a structured breakdown of layout, hierarchy, components, and color use — competitive analysis without a single note taken manually.',
    links: [{ label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'DEX-AI',
    full: 'Design Experience AI',
    meaning: 'AI analyzes design consistency and UX heuristics — AI audits designs and provides feedback. Automates design quality and consistency checks.',
    example: 'Before each sprint review, run screens through a DEX-AI prompt checking against your UX principles. It flags inconsistencies in spacing, label terminology, and interaction patterns that a manual review might miss. Design quality review that scales with your output.',
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'CLS',
    full: 'Contextual Label Suggestion',
    meaning: 'AI automatically labels flows, variants, or components — AI tags things intelligently. Speeds up organisation and design system workflows.',
    example: 'A Figma component named "Frame 127" gets suggested as "Booking confirmation — success state, desktop" by CLS. AI reads what the component does and names it correctly — making design system search actually work and handoffs self-documenting.',
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'AI-POI',
    full: 'AI-Powered Observation & Insight',
    meaning: 'Analyzing user recordings or analytics for AI-driven insights — AI watches and understands user behavior. Accelerates UX research and understanding.',
    example: 'Feed session recordings into an AI tool with "what are users struggling with on the payment screen?" AI-POI synthesizes patterns across 50+ sessions in hours — behavioral research that would take days of manual watching, delivered as structured, actionable findings.',
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'POI-AI',
    full: 'Predictive Optimization for AI Insights',
    meaning: 'AI suggests the next best user action — AI predicts what a user will do next. Increases conversion, retention, and engagement.',
    example: '"Based on this user\'s browsing and booking patterns, surface a guided tour rather than solo activity." That prediction, used to personalize a home screen in real time, is POI-AI. The difference between showing users what you have and showing users what they\'ll want.',
    links: [{ label: 'AI-assisted experimentation planning skill', href: '/skills' }],
    category: 'design_vision',
  },

  // ─── Workflow & Data (6) ──────────────────────────────────────────────────

  {
    abbr: 'E2E AI',
    full: 'End-to-End AI Workflow',
    meaning: 'Integrating AI from ideation to deployment in a seamless pipeline — from start to finish AI workflow. Streamlines complex AI-driven processes.',
    example: 'Research brief → AI synthesises research (RAG) → AI generates visual concepts (T2I) → AI writes copy (LLM) → AI QAs output (AIQ) → deploy. When AI connects every step in a continuous workflow rather than isolated tasks, that\'s E2E AI delivering compound leverage.',
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }, { label: 'Prompt Systems', href: '/prompts' }],
    category: 'workflow_data',
  },
  {
    abbr: 'AIM',
    full: 'AI Iteration Metrics',
    meaning: 'Measuring effectiveness of AI outputs across iterations — metrics to check if AI is helping or not. Helps validate AI impact and ROI.',
    example: 'After refining your copy prompt 3 times, AIM gives you the evidence: brand voice compliance 60% → 85%, factual accuracy 70% → 95%. Without AIM you improve by feel. With it, you improve by data — and can show stakeholders exactly what the iteration investment produced.',
    links: [{ label: 'AI output evaluation skill', href: '/skills' }, { label: 'Operating Principles', href: '/dos-donts' }],
    category: 'workflow_data',
  },
  {
    abbr: 'DAG',
    full: 'Data-Augmented Generation',
    meaning: 'Feeding structured data into AI for output generation — giving AI spreadsheets or databases to work with. Improves relevance and factual accuracy.',
    example: 'Instead of prompting "write a description for this product", feed Claude your full data export: name, location, inclusions, reviews, booking patterns. DAG means the output is grounded in real product specifics — not generic AI copy that could apply to anything.',
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'UGC-AI',
    full: 'AI for User-Generated Content',
    meaning: 'Summarizing, tagging, or cleaning user content at scale with AI — let AI handle mass user reviews, photos, or moderation. Enhances moderation and user engagement.',
    example: '50,000 user reviews across your product. UGC-AI classifies them by sentiment, product area, and specific feedback type — in hours, not months. Your team acts on structured insights rather than a raw firehose. The data was always there; AI makes it usable.',
    links: [{ label: 'Support Ticket Insight prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'LFC',
    full: 'Long-Form Content Summarization',
    meaning: 'AI condenses articles or pages into short insights — turns long content into bite-size summaries. Saves time and improves knowledge access.',
    example: 'A 60-page competitor research PDF → paste into Claude with "summarize into: key findings, strategic implications, and 5 action points." LFC turns 3 hours of reading into 5 minutes of reviewing — without losing the signal buried in the middle chapters.',
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'OCR-AI',
    full: 'Optical Character Recognition AI',
    meaning: 'Extracting text from images or screenshots for automation — let AI read pictures for text. Saves manual typing and speeds up tasks.',
    example: 'Screenshot a competitor\'s pricing page or photograph a whiteboard brief. OCR-AI extracts all the text cleanly — preserving structure. Paste into a prompt for analysis, comparison, or restructuring. No manual retyping, no data loss, straight to AI processing.',
    links: [{ label: 'Context Engineering skill', href: '/skills' }, { label: 'Prompt Systems', href: '/prompts' }],
    category: 'workflow_data',
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────

interface CardProps { item: AbbreviationEntry; groupColor: string; isLast: boolean }

function AbbreviationCard({ item, groupColor, isLast }: CardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
      <button
        onClick={() => setExpanded(p => !p)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3 transition-colors duration-100"
        style={{ background: hovered && !expanded ? 'rgba(155,63,255,0.05)' : expanded ? 'rgba(155,63,255,0.07)' : 'transparent' }}
      >
        <span
          className="shrink-0 px-2 py-0.5 rounded-md text-xs font-bold font-mono text-center"
          style={{ background: `${groupColor}1A`, color: groupColor, border: `1px solid ${groupColor}30`, minWidth: '60px' }}
        >
          {item.abbr}
        </span>
        <div className="flex-1 min-w-0 text-left">
          <span className="text-sm font-medium block" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{item.full}</span>
          {!expanded && (
            <span className="text-xs truncate block" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{item.meaning}</span>
          )}
        </div>
        <ChevronDown
          size={14}
          className="shrink-0 transition-transform duration-200"
          style={{ color: expanded ? groupColor : 'rgba(255,255,255,0.25)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? '560px' : '0px' }}
      >
        <div className="px-4 pb-4 space-y-3" style={{ paddingTop: '2px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.meaning}</p>
          <div
            style={{ background: 'rgba(155,63,255,0.07)', border: '1px solid rgba(155,63,255,0.15)', borderRadius: 10, padding: '12px 14px' }}
          >
            <div style={{ color: '#C27FFF', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-body)', marginBottom: 6 }}>
              How it&apos;s used
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>{item.example}</p>
          </div>
          {item.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.links.map(link => (
                <a
                  key={link.href + link.label} href={link.href}
                  className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-150"
                  style={{ background: 'rgba(155,63,255,0.1)', border: '1px solid rgba(155,63,255,0.2)', color: '#C27FFF', borderRadius: 100, padding: '4px 12px', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#9B3FFF'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#9B3FFF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(155,63,255,0.1)'; e.currentTarget.style.color = '#C27FFF'; e.currentTarget.style.borderColor = 'rgba(155,63,255,0.2)' }}
                >
                  <span>→</span> {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AbbreviationsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return abbreviations
    return abbreviations.filter(a =>
      a.abbr.toLowerCase().includes(q) ||
      a.full.toLowerCase().includes(q) ||
      a.meaning.toLowerCase().includes(q) ||
      a.example.toLowerCase().includes(q)
    )
  }, [query])

  const filteredByGroup = useMemo(() =>
    GROUPS.map(g => ({ ...g, items: filtered.filter(a => a.category === g.id) })).filter(g => g.items.length > 0),
    [filtered]
  )

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(64px,6vw,100px) clamp(20px,4vw,48px)", maxWidth: 960, margin: "0 auto" }}>
        <PageHeader title="Abbreviations" description="30 advanced AI abbreviations for designers — expand any to see how it's used in real work." />

        <div className="mb-6">
          <div
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', marginBottom: 24 }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search abbreviations…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', outline: 'none', fontSize: 14, fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.88)', border: 'none' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, color: 'rgba(255,255,255,0.45)', fontSize: 11, padding: '2px 8px', cursor: 'pointer' }}>
                Clear
              </button>
            )}
          </div>
        </div>

        {query && (
          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </p>
        )}

        {filteredByGroup.length === 0 ? (
          <div className="py-12 text-center"><p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>No results for &ldquo;{query}&rdquo;</p></div>
        ) : (
          <div className="space-y-6">
            {filteredByGroup.map(group => (
              <div key={group.id}>
                <div style={{ background: group.bg, borderRadius: 8, padding: '6px 12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: group.color }} />
                  <span style={{ color: group.color, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group.label}</span>
                  <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ background: `${group.color}20`, color: group.color }}>
                    {group.items.length}
                  </span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
                  {group.items.map((item, i) => (
                    <AbbreviationCard key={item.abbr} item={item} groupColor={group.color} isLast={i === group.items.length - 1} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>
          {abbreviations.length} abbreviations across 4 categories.
        </p>
      </div>
    </div>
  )
}
