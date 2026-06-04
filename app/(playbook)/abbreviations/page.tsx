'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

type Category = 'ai_concepts' | 'building' | 'design' | 'media'

interface AbbreviationEntry {
  abbr: string
  full: string
  meaning: string
  example: string
  links: Array<{ label: string; href: string }>
  category: Category
}

const GROUPS: { id: Category; label: string; color: string; bg: string }[] = [
  { id: 'ai_concepts', label: 'AI Concepts', color: '#533afd', bg: 'rgba(83,58,253,0.06)' },
  { id: 'building', label: 'Building with AI', color: '#0d7a5f', bg: 'rgba(13,122,95,0.06)' },
  { id: 'design', label: 'Product & Design', color: '#b45309', bg: 'rgba(180,83,9,0.06)' },
  { id: 'media', label: 'Media & Voice', color: '#be185d', bg: 'rgba(190,24,93,0.06)' },
]

const abbreviations: AbbreviationEntry[] = [
  // AI Concepts
  {
    abbr: 'AI',
    full: 'Artificial Intelligence',
    meaning: 'Technology that lets machines understand, reason, generate, and act — the umbrella for everything from Claude to Midjourney.',
    example: "You upload a screenshot of a competitor's checkout to Claude and ask it to critique the UX patterns. That's AI doing visual reasoning. You ask Midjourney to generate a campaign moodboard. That's AI doing visual generation. Both are AI, different modalities.",
    links: [
      { label: 'Prompt Systems', href: '/prompts' },
      { label: 'Skills', href: '/skills' },
    ],
    category: 'ai_concepts',
  },
  {
    abbr: 'LLM',
    full: 'Large Language Model',
    meaning: 'The AI engine inside Claude, ChatGPT, and Gemini — trained on massive text to understand and generate language.',
    example: 'When you write "Act as a senior UX writer, generate 8 options for this empty state", you\'re sending a prompt to an LLM. It doesn\'t look things up — it generates the most useful continuation of your text based on everything it was trained on. Claude, GPT-4o, and Gemini are all LLMs.',
    links: [
      { label: 'Prompt Systems', href: '/prompts' },
      { label: 'Context Engineering skill', href: '/skills' },
    ],
    category: 'ai_concepts',
  },
  {
    abbr: 'GPT',
    full: 'Generative Pre-trained Transformer',
    meaning: 'OpenAI\'s model series (GPT-4, GPT-4o) powering ChatGPT. "Pre-trained" = learned from massive text before you used it. "Transformer" = the underlying architecture.',
    example: 'When your team uses ChatGPT to draft copy, pressure-test a PRD, or write Midjourney prompts — they\'re using a GPT model. GPT-4o is the current standard. The "pre-trained" part means it arrived already knowing how to write, reason, and code — you just direct it.',
    links: [
      { label: 'Prompt Systems', href: '/prompts' },
    ],
    category: 'ai_concepts',
  },
  {
    abbr: 'RAG',
    full: 'Retrieval-Augmented Generation',
    meaning: 'AI that searches a knowledge base before generating an answer — making responses more accurate and grounded in real sources.',
    example: 'Perplexity finds relevant web articles before answering your question — that\'s RAG. NotebookLM reads your uploaded documents before responding — also RAG. Without it, the AI answers purely from training data (which may be outdated or incomplete). RAG adds a "look it up first" step.',
    links: [
      { label: 'UX Research Synthesis prompt', href: '/prompts' },
      { label: 'AI-assisted research synthesis skill', href: '/skills' },
    ],
    category: 'ai_concepts',
  },
  {
    abbr: 'MCP',
    full: 'Model Context Protocol',
    meaning: 'A standard that lets AI models connect to external tools and data — files, databases, apps — like USB-C for AI.',
    example: 'With MCP enabled, Claude can read your Figma file, check Notion docs, and update a spreadsheet — all in one conversation without you switching apps. Cursor uses MCP to read your entire codebase and make changes across files. It\'s what turns a chatbot into an actual workflow tool.',
    links: [
      { label: 'AI Workflow Design skill', href: '/skills' },
    ],
    category: 'ai_concepts',
  },
  {
    abbr: 'NLP',
    full: 'Natural Language Processing',
    meaning: 'The AI capability that lets machines understand the meaning behind words — not just keyword matching, but intent and context.',
    example: 'When a search bar understands "easy tours for kids in Rome" and returns relevant results even though no listing uses those exact words — that\'s NLP. When Claude understands that "make this warmer" in a copy context means tone, not temperature — that\'s NLP. Every LLM is built on NLP.',
    links: [
      { label: 'Prompt Systems', href: '/prompts' },
    ],
    category: 'ai_concepts',
  },

  // Building with AI
  {
    abbr: 'API',
    full: 'Application Programming Interface',
    meaning: 'The bridge that lets two apps talk to each other. When you vibe-code an AI feature into a product, you\'re connecting to an API.',
    example: 'A Lovable or v0 prototype that uses Claude to generate content makes API calls to Claude behind the scenes every time it responds. No API call = no AI response. When you ask Cursor to "add a Claude-powered copy generator to this form", it writes code that calls the Claude API. You don\'t see it — it\'s happening in the background.',
    links: [
      { label: 'Context Engineering skill', href: '/skills' },
    ],
    category: 'building',
  },
  {
    abbr: 'JSON',
    full: 'JavaScript Object Notation',
    meaning: 'The structured data format AI returns when you ask for organised output — labelled fields any system can read and use.',
    example: 'Ask Claude: "Return a list of 5 UX improvements as JSON — each with title, priority (high/medium/low), and estimated effort." You get structured data you can paste straight into your codebase, database, or design tool. Vibe coding relies on JSON constantly — it\'s how AI output moves between systems.',
    links: [
      { label: 'Prompt Systems', href: '/prompts' },
    ],
    category: 'building',
  },

  // Product & Design
  {
    abbr: 'UI',
    full: 'User Interface',
    meaning: 'Everything the user sees and touches — buttons, copy, layouts, forms. AI can generate, audit, and iterate on UI faster than any manual process.',
    example: 'Export all screen copy from Figma. Paste it into the Design QA prompt. Claude flags missing states, inconsistent CTAs, and weak copy before engineering sees it. Or: describe an empty state in plain text, ask Claude for 10 copy options, pick the best for A/B testing.',
    links: [
      { label: 'Design QA Review prompt', href: '/prompts' },
      { label: 'AI-powered design QA skill', href: '/skills' },
    ],
    category: 'design',
  },
  {
    abbr: 'UX',
    full: 'User Experience',
    meaning: 'The end-to-end experience of using a product — whether it\'s intuitive, clear, and actually solves the problem.',
    example: 'Paste 8 user interview transcripts into Claude with: "Extract the top 5 friction points with frequency counts and quotes." A 4-hour synthesis job becomes 20 minutes. Or run the Research Synthesis prompt on a full research round to get a prioritised opportunity map instead of a raw notes doc.',
    links: [
      { label: 'UX Research Synthesis prompt', href: '/prompts' },
      { label: 'AI-assisted research synthesis skill', href: '/skills' },
    ],
    category: 'design',
  },
  {
    abbr: 'PRD',
    full: 'Product Requirements Document',
    meaning: 'A document that defines what a feature should do, why it exists, and how success is measured — AI can draft, critique, and pressure-test these.',
    example: '"Act as a senior PM. I\'m building a wishlist feature for a travel booking app. Write a PRD with problem statement, user stories, 5 edge cases, success metrics, and open questions." Then run the PRD Pressure-Testing prompt to challenge every assumption before handing it to engineering.',
    links: [
      { label: 'PRD Pressure-Testing prompt', href: '/prompts' },
      { label: 'AI-assisted product critique skill', href: '/skills' },
    ],
    category: 'design',
  },
  {
    abbr: 'QA',
    full: 'Quality Assurance',
    meaning: 'The practice of systematically checking output quality before it ships — AI can run a first pass on copy, states, and consistency faster than any manual review.',
    example: 'Before any handoff: export your screen copy inventory from Figma, run it through the Design QA prompt. Claude catches missing empty states, inconsistent button labels, and copy that drifts in tone — in minutes, not hours. The designer then reviews every flag and decides what to fix.',
    links: [
      { label: 'Design QA Review prompt', href: '/prompts' },
      { label: 'AI-powered design QA skill', href: '/skills' },
    ],
    category: 'design',
  },

  // Media & Voice
  {
    abbr: 'OCR',
    full: 'Optical Character Recognition',
    meaning: 'Technology that converts images of text — photos, scanned PDFs, whiteboards — into readable, editable text AI can then work with.',
    example: 'Photograph a brief written on a whiteboard. OCR extracts the text. Paste into Claude to structure into a proper brief. Or upload a scanned contract PDF — OCR reads it, Claude pulls out the key terms. Once it\'s text, AI can summarise, translate, or restructure it.',
    links: [
      { label: 'Context Engineering skill', href: '/skills' },
    ],
    category: 'media',
  },
  {
    abbr: 'TTS',
    full: 'Text-to-Speech',
    meaning: 'AI that converts written text into natural-sounding audio — used for voiceovers, content, and accessibility without a recording studio.',
    example: 'Write an audio guide script for an experience. Paste it into ElevenLabs. Generate a professional voiceover in 3 languages in 10 minutes. No studio booking, no voice actor scheduling. The brand team uses TTS for marketing videos, explainer content, and accessibility audio — at a fraction of traditional cost.',
    links: [
      { label: 'AI Creative Direction Systems skill', href: '/skills' },
    ],
    category: 'media',
  },
  {
    abbr: 'STT',
    full: 'Speech-to-Text',
    meaning: 'AI that transcribes spoken audio into written text — the essential first step before any AI research synthesis.',
    example: 'Record a 60-minute user interview. Upload to Whisper (via Otter, Fireflies, or directly). Get a clean, punctuated transcript with speaker labels in under 2 minutes. Paste it into the Research Synthesis prompt. What used to take a full day of manual transcription is now a 5-minute setup task.',
    links: [
      { label: 'UX Research Synthesis prompt', href: '/prompts' },
      { label: 'AI-assisted research synthesis skill', href: '/skills' },
    ],
    category: 'media',
  },
]

interface CardProps {
  item: AbbreviationEntry
  groupColor: string
  isLast: boolean
}

function AbbreviationCard({ item, groupColor, isLast }: CardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid #e3e8ee' }}>
      <button
        onClick={() => setExpanded((p) => !p)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3 transition-colors duration-100"
        style={{
          background: hovered && !expanded ? 'rgba(83,58,253,0.02)' : expanded ? 'rgba(83,58,253,0.03)' : '#ffffff',
        }}
      >
        {/* Abbr badge */}
        <span
          className="shrink-0 px-2 py-0.5 rounded-md text-xs font-bold font-mono w-16 text-center"
          style={{
            background: `${groupColor}14`,
            color: groupColor,
            border: `1px solid ${groupColor}28`,
          }}
        >
          {item.abbr}
        </span>

        {/* Full form + meaning */}
        <div className="flex-1 min-w-0 text-left">
          <span className="text-sm font-medium block" style={{ color: '#273951' }}>
            {item.full}
          </span>
          {!expanded && (
            <span className="text-xs truncate block" style={{ color: '#64748d' }}>
              {item.meaning}
            </span>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown
          size={14}
          className="shrink-0 transition-transform duration-200"
          style={{
            color: expanded ? groupColor : '#a8c3de',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Expanded body */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? '480px' : '0px' }}
      >
        <div className="px-4 pb-4 space-y-3" style={{ paddingTop: '2px' }}>
          {/* Meaning */}
          <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>
            {item.meaning}
          </p>

          {/* How it's used */}
          <div
            className="rounded-xl px-4 py-3"
            style={{ background: 'rgba(83,58,253,0.04)', border: '1px solid rgba(83,58,253,0.12)' }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#533afd' }}>
              How it's used
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>
              {item.example}
            </p>
          </div>

          {/* Playbook connections */}
          {item.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.links.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
                  style={{
                    background: 'rgba(83,58,253,0.07)',
                    border: '1px solid rgba(83,58,253,0.18)',
                    color: '#4434d4',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#533afd'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.borderColor = '#533afd'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(83,58,253,0.07)'
                    e.currentTarget.style.color = '#4434d4'
                    e.currentTarget.style.borderColor = 'rgba(83,58,253,0.18)'
                  }}
                >
                  <span>→</span>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AbbreviationsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return abbreviations
    return abbreviations.filter(
      (a) =>
        a.abbr.toLowerCase().includes(q) ||
        a.full.toLowerCase().includes(q) ||
        a.meaning.toLowerCase().includes(q) ||
        a.example.toLowerCase().includes(q)
    )
  }, [query])

  const filteredByGroup = useMemo(() => {
    return GROUPS.map((g) => ({
      ...g,
      items: filtered.filter((a) => a.category === g.id),
    })).filter((g) => g.items.length > 0)
  }, [filtered])

  return (
    <div className="px-5 sm:px-8 py-8 max-w-3xl mx-auto">
      <PageHeader
        title="Abbreviations"
        description="15 abbreviations a designer doing vibe coding actually needs to know. Expand any to see how it's used in real work."
        badge="Reference"
      />

      {/* Search */}
      <div className="mb-6">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl transition-colors duration-150"
          style={{ background: '#f6f9fc', border: '1px solid #e3e8ee' }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0" style={{ color: '#a8c3de' }}>
            <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search abbreviations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#0d253d' }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs px-2 py-0.5 rounded"
              style={{ color: '#64748d', background: '#e3e8ee' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {query && (
        <p className="text-xs mb-4" style={{ color: '#64748d' }}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      )}

      {filteredByGroup.length === 0 ? (
        <div className="py-12 text-center" style={{ color: '#64748d' }}>
          <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredByGroup.map((group) => (
            <div key={group.id}>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2"
                style={{ background: group.bg }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: group.color }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: group.color }}>
                  {group.label}
                </span>
                <span
                  className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full"
                  style={{ background: `${group.color}18`, color: group.color }}
                >
                  {group.items.length}
                </span>
              </div>

              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid #e3e8ee', boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px', background: '#ffffff' }}
              >
                {group.items.map((item, i) => (
                  <AbbreviationCard
                    key={item.abbr}
                    item={item}
                    groupColor={group.color}
                    isLast={i === group.items.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs mt-6" style={{ color: '#a8c3de' }}>
        {abbreviations.length} abbreviations — the ones that actually come up in design and AI workflow conversations.
      </p>
    </div>
  )
}
