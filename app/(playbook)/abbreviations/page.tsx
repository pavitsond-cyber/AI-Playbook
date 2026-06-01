'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

type Category = 'ai_ml' | 'technical' | 'product_design' | 'media'

interface AbbreviationEntry {
  abbr: string
  full: string
  meaning: string
  laymanExample: string
  links: Array<{ label: string; href: string }>
  category: Category
}

const GROUPS: { id: Category; label: string; color: string; bg: string }[] = [
  { id: 'ai_ml', label: 'AI & Machine Learning', color: '#533afd', bg: 'rgba(83,58,253,0.06)' },
  { id: 'technical', label: 'Technical & Development', color: '#0d7a5f', bg: 'rgba(13,122,95,0.06)' },
  { id: 'product_design', label: 'Product & Design', color: '#b45309', bg: 'rgba(180,83,9,0.06)' },
  { id: 'media', label: 'Media & Content', color: '#be185d', bg: 'rgba(190,24,93,0.06)' },
]

const abbreviations: AbbreviationEntry[] = [
  // AI & ML
  {
    abbr: 'AI',
    full: 'Artificial Intelligence',
    meaning: 'Technology that enables machines to simulate human intelligence — learning, reasoning, generating, and deciding.',
    laymanExample: 'Your team using ChatGPT to draft a PRD is using AI. Midjourney generating a moodboard is AI.',
    links: [{ label: 'Tool Library', href: '/tools' }, { label: 'AI Skills', href: '/skills' }],
    category: 'ai_ml',
  },
  {
    abbr: 'AGI',
    full: 'Artificial General Intelligence',
    meaning: 'Hypothetical AI that can perform any intellectual task a human can. We\'re not there yet.',
    laymanExample: "We don't have AGI yet. ChatGPT and Claude are powerful but narrow — they can't learn entirely new skills the way a human can.",
    links: [{ label: 'AI Risks', href: '/risks' }],
    category: 'ai_ml',
  },
  {
    abbr: 'LLM',
    full: 'Large Language Model',
    meaning: 'An AI model trained on vast text to understand and generate human language.',
    laymanExample: "ChatGPT, Claude, Gemini — these are all LLMs. When you chat with them, you're sending prompts to an LLM.",
    links: [{ label: 'Prompt Library', href: '/prompts' }, { label: 'Tool Library', href: '/tools' }],
    category: 'ai_ml',
  },
  {
    abbr: 'GPT',
    full: 'Generative Pre-trained Transformer',
    meaning: "The architecture behind OpenAI's ChatGPT — pre-trained on massive text data, Transformer is the underlying architecture.",
    laymanExample: "ChatGPT runs on GPT-4o. If your team uses ChatGPT for anything, they're using a GPT model.",
    links: [{ label: 'ChatGPT', href: '/tools' }],
    category: 'ai_ml',
  },
  {
    abbr: 'RAG',
    full: 'Retrieval-Augmented Generation',
    meaning: 'AI retrieves relevant documents from a knowledge base before generating an answer — making responses more accurate.',
    laymanExample: 'Perplexity uses RAG — it searches the web for relevant content before generating its answer.',
    links: [{ label: 'Perplexity', href: '/tools' }, { label: 'Research skill', href: '/skills' }],
    category: 'ai_ml',
  },
  {
    abbr: 'MCP',
    full: 'Model Context Protocol',
    meaning: 'A standard way for AI models to connect with external tools, files, APIs, and systems — like USB-C for AI.',
    laymanExample: 'Claude with MCP can read your Notion docs, search your Drive, and update your database — all in one conversation.',
    links: [{ label: 'Workflows', href: '/workflows' }, { label: 'Agent', href: '/glossary' }],
    category: 'ai_ml',
  },
  {
    abbr: 'NLP',
    full: 'Natural Language Processing',
    meaning: 'AI that helps computers understand and process human language — not just keywords, but meaning and context.',
    laymanExample: "When Headout search understands 'romantic Paris tour' even if the listing says 'couples activities Seine', that's NLP.",
    links: [{ label: 'Tool Library', href: '/tools' }],
    category: 'ai_ml',
  },
  {
    abbr: 'ML',
    full: 'Machine Learning',
    meaning: 'A subset of AI where systems learn patterns from data rather than being programmed with explicit rules.',
    laymanExample: "Headout's recommendation engine learns from millions of bookings which tours users tend to book together — that's ML.",
    links: [{ label: 'AI Risks', href: '/risks' }],
    category: 'ai_ml',
  },
  {
    abbr: 'GPU',
    full: 'Graphics Processing Unit',
    meaning: 'The processing chip that powers AI model training and inference — originally built for games, now essential for AI.',
    laymanExample: 'When Midjourney generates an image in 30 seconds, hundreds of GPUs in a data centre are doing the heavy work.',
    links: [{ label: 'Image generation skill', href: '/skills' }],
    category: 'ai_ml',
  },
  {
    abbr: 'RLHF',
    full: 'Reinforcement Learning from Human Feedback',
    meaning: "A training technique that uses human preference feedback to fine-tune AI models to be more helpful, harmless, and honest.",
    laymanExample: "This is how ChatGPT and Claude learned to be good assistants — human raters compared model responses and their preferences taught the model what 'good' looks like.",
    links: [{ label: 'AI Risks', href: '/risks' }, { label: 'AI Basics', href: '/glossary' }],
    category: 'ai_ml',
  },
  {
    abbr: 'GAN',
    full: 'Generative Adversarial Network',
    meaning: 'A generative model with two competing networks — a generator creates fake samples and a discriminator tries to detect them. Together they learn to create convincing synthetic content.',
    laymanExample: 'Deepfakes and AI face generation tools originally used GANs. Two AIs argue until the fake looks real enough to fool the judge.',
    links: [{ label: 'Generative AI', href: '/glossary' }, { label: 'Image generation', href: '/skills' }],
    category: 'ai_ml',
  },
  {
    abbr: 'CNN',
    full: 'Convolutional Neural Network',
    meaning: 'A deep learning architecture designed for images — uses filters to detect visual features (edges, shapes, textures) that build into complex representations.',
    laymanExample: "Face unlock on your phone uses a CNN. It scans the image layer by layer, picking up features like 'two eyes above a nose above a mouth'.",
    links: [{ label: 'Tech Basics', href: '/tech-basics' }, { label: 'Computer Vision', href: '/glossary' }],
    category: 'ai_ml',
  },
  {
    abbr: 'BERT',
    full: 'Bidirectional Encoder Representations from Transformers',
    meaning: "A Google language model that understands text by reading it in both directions at once — making it better at grasping meaning and context.",
    laymanExample: "BERT is why Google Search understands 'can you bank on the river?' differently from 'can you bank money?'. It powers modern search understanding.",
    links: [{ label: 'AI Glossary', href: '/glossary' }, { label: 'Tech Basics', href: '/tech-basics' }],
    category: 'ai_ml',
  },
  {
    abbr: 'LoRA',
    full: 'Low-Rank Adaptation',
    meaning: 'A parameter-efficient fine-tuning method that customises large AI models cheaply by adding small trainable matrices to a frozen base model.',
    laymanExample: "LoRA lets you personalise a large model (like teaching it your company's writing style) without retraining the whole thing. Like adding a stylesheet on top of the base model.",
    links: [{ label: 'Fine-tuning', href: '/glossary' }, { label: 'AI Skills', href: '/skills' }],
    category: 'ai_ml',
  },
  {
    abbr: 'NLG',
    full: 'Natural Language Generation',
    meaning: 'The AI capability to produce coherent, fluent human-readable text from data or internal representations. All LLMs are NLG systems.',
    laymanExample: "When an AI converts a table of sales numbers into a readable summary paragraph — that's NLG. Or when ChatGPT writes a product description from bullet points.",
    links: [{ label: 'Prompt Library', href: '/prompts' }, { label: 'AI Glossary', href: '/glossary' }],
    category: 'ai_ml',
  },
  {
    abbr: 'NLU',
    full: 'Natural Language Understanding',
    meaning: "The AI ability to understand the meaning and intent behind human language input — not just keywords, but context and purpose.",
    laymanExample: "NLU is why your voice assistant understands 'turn it up a bit' (volume) vs 'turn it up here' (navigation). Siri, Alexa, and Gemini rely on NLU.",
    links: [{ label: 'AI Glossary', href: '/glossary' }, { label: 'Tool Library', href: '/tools' }],
    category: 'ai_ml',
  },
  {
    abbr: 'ASR',
    full: 'Automatic Speech Recognition',
    meaning: "Technology that converts spoken words into written text. Powers voice assistants, meeting transcription tools, and real-time captions.",
    laymanExample: "When you say 'Hey Siri' and it types out what you said — that's ASR. OpenAI Whisper is the leading open-source ASR model.",
    links: [{ label: 'NotebookLM', href: '/tools' }, { label: 'Research skills', href: '/skills' }],
    category: 'ai_ml',
  },
  {
    abbr: 'SLM',
    full: 'Small Language Model',
    meaning: "Smaller, more efficient language models that can run directly on devices (phones, laptops) without cloud infrastructure — enabling private, fast, on-device AI.",
    laymanExample: "Apple Intelligence runs on-device using SLMs — your prompts don't leave your phone. Microsoft Phi-3 is a popular SLM that runs on a laptop.",
    links: [{ label: 'Tool Library', href: '/tools' }, { label: 'AI Glossary', href: '/glossary' }],
    category: 'ai_ml',
  },
  {
    abbr: 'VAE',
    full: 'Variational Autoencoder',
    meaning: "A generative model that compresses data into a probabilistic 'latent space' and can generate new variations. Used as a component inside image generation systems.",
    laymanExample: "VAEs are part of how Stable Diffusion works — the image is compressed into a mathematical representation, edited in that space, then decoded back into pixels.",
    links: [{ label: 'Image generation', href: '/skills' }, { label: 'AI Glossary', href: '/glossary' }],
    category: 'ai_ml',
  },
  {
    abbr: 'MLOps',
    full: 'Machine Learning Operations',
    meaning: "Practices and tools for deploying, monitoring, and maintaining ML models in production. Like DevOps, but for AI — covering versioning, pipelines, drift monitoring, and retraining.",
    laymanExample: "Your recommendation model is live. MLOps is what ensures it keeps working well: monitoring for data drift, retraining when it degrades, versioning model updates.",
    links: [{ label: 'Workflows', href: '/workflows' }, { label: 'Tech Basics', href: '/tech-basics' }],
    category: 'ai_ml',
  },
  {
    abbr: 'CLIP',
    full: 'Contrastive Language-Image Pre-Training',
    meaning: "An OpenAI model that learns to associate images and text together — enabling it to understand visual content described in natural language.",
    laymanExample: "CLIP is what lets text-to-image tools like DALL·E understand what 'a futuristic Tokyo cityscape at dusk' should look like. It bridges language and visual understanding.",
    links: [{ label: 'Image generation', href: '/skills' }, { label: 'Tool Library', href: '/tools' }],
    category: 'ai_ml',
  },

  // Technical & Development
  {
    abbr: 'API',
    full: 'Application Programming Interface',
    meaning: 'A defined way for two software systems to communicate — the menu that tells you what a service can do and how to ask for it.',
    laymanExample: "When a designer asks Claude to generate copy, the app calls Claude's API in the background — like placing an order in a restaurant kitchen.",
    links: [{ label: 'Tech Basics', href: '/tech-basics' }, { label: 'AI-assisted coding', href: '/skills' }],
    category: 'technical',
  },
  {
    abbr: 'JSON',
    full: 'JavaScript Object Notation',
    meaning: 'The standard format for structured data exchange — what AI tools return when you ask for structured output.',
    laymanExample: 'When you ask an AI to "return as a structured list", you\'re usually getting JSON back.',
    links: [{ label: 'Tech Basics: JSON', href: '/tech-basics' }, { label: 'Data structuring', href: '/skills' }],
    category: 'technical',
  },
  {
    abbr: 'XML',
    full: 'Extensible Markup Language',
    meaning: 'A format for storing and transporting data using tags — used in localization files and document formats.',
    laymanExample: 'Localization strings files in iOS and Android apps use XML. That\'s why product copy lives in XML rather than hardcoded in the app.',
    links: [{ label: 'Tech Basics', href: '/tech-basics' }],
    category: 'technical',
  },
  {
    abbr: 'CSV',
    full: 'Comma-Separated Values',
    meaning: 'A simple text format for storing tabular data — each row is a record, each value separated by a comma.',
    laymanExample: 'When someone exports analytics data or a supplier price list to share with AI, it\'s usually a CSV file.',
    links: [{ label: 'Data structuring skill', href: '/skills' }],
    category: 'technical',
  },
  {
    abbr: 'SDK',
    full: 'Software Development Kit',
    meaning: 'A pre-built package of code that makes it easier to integrate with a service — the starting kit for building with an AI tool.',
    laymanExample: "When an engineer integrates Claude into a product, they use Anthropic's SDK so they don't have to write API calls from scratch.",
    links: [{ label: 'AI-assisted coding skill', href: '/skills' }],
    category: 'technical',
  },
  {
    abbr: 'DB',
    full: 'Database',
    meaning: 'An organised collection of structured data that can be searched, updated, and managed.',
    laymanExample: "All of Headout's experiences, bookings, users, and reviews live in databases. AI can help write queries and structure data.",
    links: [{ label: 'Tech Basics', href: '/tech-basics' }],
    category: 'technical',
  },
  {
    abbr: 'SQL',
    full: 'Structured Query Language',
    meaning: 'A language for managing and querying relational databases.',
    laymanExample: "SELECT * FROM experiences WHERE city = 'Rome' — that's SQL. AI tools like ChatGPT can write SQL queries from plain English.",
    links: [{ label: 'Data structuring skill', href: '/skills' }],
    category: 'technical',
  },
  {
    abbr: 'NoSQL',
    full: 'Not Only SQL',
    meaning: 'A database approach for storing unstructured or flexible data — documents, graphs, or key-value pairs.',
    laymanExample: "MongoDB is a NoSQL database. It stores data as flexible documents rather than rigid tables — good for variable structures like product listings.",
    links: [{ label: 'Tech Basics', href: '/tech-basics' }],
    category: 'technical',
  },
  {
    abbr: 'CPU',
    full: 'Central Processing Unit',
    meaning: 'The main processor in a computer that runs general-purpose instructions.',
    laymanExample: 'The CPU handles general-purpose tasks. For AI, GPUs are more important — but CPUs manage the orchestration.',
    links: [{ label: 'GPU', href: '/abbreviations' }],
    category: 'technical',
  },

  // Product & Design
  {
    abbr: 'UI',
    full: 'User Interface',
    meaning: 'Everything the user sees and interacts with — buttons, text, layouts, forms.',
    laymanExample: 'The booking form, the search bar, the experience card — all UI. AI helps generate copy and code for UI faster.',
    links: [{ label: 'UX copy skill', href: '/skills' }, { label: 'Figma Make', href: '/tools' }],
    category: 'product_design',
  },
  {
    abbr: 'UX',
    full: 'User Experience',
    meaning: 'The end-to-end experience of using a product — how intuitive, clear, and effective it feels.',
    laymanExample: "If users drop off at the payment screen, that's a UX problem. AI helps identify these patterns from research data.",
    links: [{ label: 'AI for Designers', href: '/by-team' }, { label: 'Research synthesis', href: '/skills' }],
    category: 'product_design',
  },
  {
    abbr: 'PRD',
    full: 'Product Requirements Document',
    meaning: 'A document that defines what a product feature should do, why it exists, and how success is measured.',
    laymanExample: "The PM briefs Claude: 'I want to add a co-traveller feature.' Claude drafts a full PRD with goals, user stories, edge cases, and metrics.",
    links: [{ label: 'PRD creation skill', href: '/skills' }, { label: 'Product prompts', href: '/prompts' }],
    category: 'product_design',
  },
  {
    abbr: 'QA',
    full: 'Quality Assurance',
    meaning: 'The process of testing and ensuring product quality before release.',
    laymanExample: 'AI tools can generate test cases, edge cases, and even write automated tests to speed up the QA process.',
    links: [{ label: 'AI for Engineers', href: '/by-team' }],
    category: 'product_design',
  },
  {
    abbr: 'PR',
    full: 'Pull Request',
    meaning: 'A way to propose and review code changes in a version control system before merging.',
    laymanExample: "Cursor helps engineers write better code faster. They still submit PRs for review — the human check doesn't go away.",
    links: [{ label: 'AI-assisted coding', href: '/skills' }, { label: 'Cursor', href: '/tools' }],
    category: 'product_design',
  },
  {
    abbr: 'CMS',
    full: 'Content Management System',
    meaning: 'Software for managing and publishing digital content without needing to write code.',
    laymanExample: "If Headout has a CMS for destination pages, AI can help generate and localise that content at scale.",
    links: [{ label: 'Content skills', href: '/skills' }],
    category: 'product_design',
  },
  {
    abbr: 'DAM',
    full: 'Digital Asset Management',
    meaning: 'A system for organising, storing, and distributing digital files — images, videos, brand assets.',
    laymanExample: "When the brand team stores all AI-generated images in an organised library for reuse — that's a DAM.",
    links: [{ label: 'Image generation skill', href: '/skills' }],
    category: 'product_design',
  },

  // Media & Content
  {
    abbr: 'OCR',
    full: 'Optical Character Recognition',
    meaning: 'Technology that converts images of text — photos, scans, PDFs — into editable, searchable text.',
    laymanExample: 'Upload a scanned supplier contract PDF. OCR extracts the text. Claude reads the text and pulls out the key terms.',
    links: [{ label: 'Data structuring skill', href: '/skills' }],
    category: 'media',
  },
  {
    abbr: 'TTS',
    full: 'Text-to-Speech',
    meaning: 'AI that converts written text into natural-sounding spoken audio.',
    laymanExample: 'The content team writes the audio guide script. ElevenLabs converts it to a natural-sounding voiceover in 3 languages.',
    links: [{ label: 'ElevenLabs', href: '/tools' }, { label: 'Voice generation skill', href: '/skills' }],
    category: 'media',
  },
  {
    abbr: 'STT',
    full: 'Speech-to-Text',
    meaning: 'AI that transcribes spoken audio into written text.',
    laymanExample: 'Record a 60-minute user interview. Upload it to an STT tool. Get a clean transcript in 2 minutes. Paste into Claude to synthesise.',
    links: [{ label: 'Research synthesis skill', href: '/skills' }, { label: 'NotebookLM', href: '/tools' }],
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
    <div
      style={{
        borderBottom: isLast ? 'none' : '1px solid #e3e8ee',
      }}
    >
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
        style={{ maxHeight: expanded ? '400px' : '0px' }}
      >
        <div className="px-4 pb-4 space-y-3" style={{ paddingTop: '2px' }}>
          {/* Full meaning */}
          <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>
            {item.meaning}
          </p>

          {/* In plain English block */}
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: '#fdf8f0',
              border: '1px solid rgba(155,104,41,0.15)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span style={{ fontSize: '11px' }}>💡</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#9b6829' }}>
                In plain English
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#5c3d1a' }}>
              {item.laymanExample}
            </p>
          </div>

          {/* Quick links */}
          {item.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.links.map((link) => (
                <a
                  key={link.href}
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
        a.laymanExample.toLowerCase().includes(q)
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
        description="Quick reference for common AI and technical abbreviations — scan collapsed, expand to go deeper."
        badge="Reference"
      />

      {/* Search */}
      <div className="mb-6">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl transition-colors duration-150"
          style={{
            background: '#f6f9fc',
            border: '1px solid #e3e8ee',
          }}
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

      {/* Count */}
      {query && (
        <p className="text-xs mb-4" style={{ color: '#64748d' }}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Groups */}
      {filteredByGroup.length === 0 ? (
        <div className="py-12 text-center" style={{ color: '#64748d' }}>
          <p className="text-sm">No abbreviations found for &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredByGroup.map((group) => (
            <div key={group.id}>
              {/* Group header */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2"
                style={{ background: group.bg }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: group.color }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: group.color }}
                >
                  {group.label}
                </span>
                <span
                  className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: `${group.color}18`,
                    color: group.color,
                  }}
                >
                  {group.items.length}
                </span>
              </div>

              {/* Cards */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: '1px solid #e3e8ee',
                  boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
                  background: '#ffffff',
                }}
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

      <p className="text-xs mt-6" style={{ color: '#64748d' }}>
        {abbreviations.length} abbreviations total
      </p>
    </div>
  )
}
