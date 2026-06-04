'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

type Category = 'ai_concepts' | 'prompting_ops' | 'design_vision' | 'workflow_data' | 'media'

interface AbbreviationEntry {
  abbr: string
  full: string
  meaning: string
  example: string
  links: Array<{ label: string; href: string }>
  category: Category
}

const GROUPS: { id: Category; label: string; color: string; bg: string }[] = [
  { id: 'ai_concepts',    label: 'AI Concepts',         color: '#533afd', bg: 'rgba(83,58,253,0.06)' },
  { id: 'prompting_ops',  label: 'Prompting & Ops',      color: '#0d7a5f', bg: 'rgba(13,122,95,0.06)' },
  { id: 'design_vision',  label: 'Design & Vision',      color: '#b45309', bg: 'rgba(180,83,9,0.06)' },
  { id: 'workflow_data',  label: 'Workflow & Data',      color: '#7c3aed', bg: 'rgba(124,58,237,0.06)' },
  { id: 'media',          label: 'Media & Voice',        color: '#be185d', bg: 'rgba(190,24,93,0.06)' },
]

const abbreviations: AbbreviationEntry[] = [

  // ─── AI Concepts ──────────────────────────────────────────────────────────

  {
    abbr: 'AI',
    full: 'Artificial Intelligence',
    meaning: 'Technology that lets machines understand, reason, generate, and act — the umbrella for everything from Claude to Midjourney.',
    example: "Upload a competitor's checkout screenshot to Claude and ask it to critique the UX patterns. That's AI doing visual reasoning. Ask Midjourney to generate a campaign moodboard. That's AI doing visual generation. Same word, completely different modalities.",
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Skills', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'LLM',
    full: 'Large Language Model',
    meaning: 'The AI engine inside Claude, ChatGPT, and Gemini — trained on massive text to understand and generate language. Using GPT, Claude, or similar models for complex design tasks.',
    example: 'Write "Act as a senior UX writer, generate 8 options for this empty state — headline under 6 words, warm tone, no emoji" and get 8 distinct well-crafted options in seconds. That\'s an LLM predicting what would be most useful next, drawing on everything it was trained on.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Context Engineering skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'GPT',
    full: 'Generative Pre-trained Transformer',
    meaning: "OpenAI's model series (GPT-4, GPT-4o) — \"Pre-trained\" means it learned from massive text before you used it. \"Transformer\" is the underlying architecture that changed AI.",
    example: "When your team uses ChatGPT to draft a PRD, critique copy, or generate Midjourney prompts — they're using a GPT-4o model. The \"generative\" part means it creates new text rather than retrieving stored answers.",
    links: [{ label: 'Prompt Systems', href: '/prompts' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'RAG',
    full: 'Retrieval-Augmented Generation',
    meaning: 'AI that searches a knowledge base before generating an answer — combining external data with AI to generate accurate, contextual outputs. Reduces hallucinations and adds depth.',
    example: 'Upload 12 interview transcripts to NotebookLM. Ask "What are the three most common pain points?" NotebookLM uses RAG to search all 12 documents before generating its synthesis — the answer is grounded in quotes, not guesswork. Perplexity does the same with live web search.',
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
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
    abbr: 'NLP',
    full: 'Natural Language Processing',
    meaning: 'The AI capability that lets machines understand the meaning behind words — not just keyword matching, but intent and context.',
    example: "When you write \"make this copy warmer\" and the AI understands you mean tone, not temperature — that's NLP reading intent from context. Every LLM is built on NLP. It's why AI understands \"budget-friendly sunset tours\" without needing exact keyword matches.",
    links: [{ label: 'Prompt Systems', href: '/prompts' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'NLP-AI',
    full: 'Natural Language Processing AI',
    meaning: 'AI systems that understand and generate human-like text, enabling natural conversations, copy generation, and content automation at scale.',
    example: 'When a customer support bot reads "my booking is messed up, I need help asap" and correctly classifies it as urgent + booking issue + escalation needed — without keywords — that\'s NLP-AI interpreting tone, urgency, and topic simultaneously.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Support Ticket Insight prompt', href: '/prompts' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'CV-AI',
    full: 'Computer Vision AI',
    meaning: 'AI that analyzes visual content — detecting elements, objects, scenes, and layout patterns in images and designs.',
    example: "Run competitor app screens through Claude's vision with \"list all the UI patterns and design decisions visible here.\" CV-AI returns a structured breakdown: card types, navigation models, interaction patterns. A visual audit in minutes.",
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'RLHF',
    full: 'Reinforcement Learning from Human Feedback',
    meaning: 'Fine-tuning AI models using human preference feedback to improve helpfulness, accuracy, and alignment with human goals.',
    example: "RLHF is how Claude and ChatGPT learned to be genuinely useful rather than just technically correct. Human reviewers compared pairs of model responses and their preferences shaped the model's behavior. When AI feels naturally helpful rather than robotic, RLHF is the reason.",
    links: [{ label: 'Operating Principles', href: '/dos-donts' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'FAL',
    full: 'Fine-tuned AI Layer',
    meaning: 'A pre-trained AI model further trained on your specific domain data — making it brand-aware, contextually accurate, and vocabulary-consistent without heavy prompting.',
    example: 'If you trained a model on 3 years of your brand\'s copy and style guide, it would write in your exact voice without needing a lengthy system prompt every time. That customised model is a Fine-tuned AI Layer — higher quality, fewer iteration cycles.',
    links: [{ label: 'Context Engineering skill', href: '/skills' }],
    category: 'ai_concepts',
  },
  {
    abbr: 'MLE',
    full: 'Model Latency Evaluation',
    meaning: 'Measuring how fast an AI model responds and how efficiently it uses compute — critical before shipping real-time AI features.',
    example: "Before shipping an AI copy generator into a live checkout flow, run MLE benchmarks. If the model takes 4+ seconds to respond, users abandon. MLE tells you which model tier fits the latency budget — so you pick the right one before launch, not after.",
    links: [{ label: 'Operating Principles', href: '/dos-donts' }],
    category: 'ai_concepts',
  },

  // ─── Prompting & Ops ──────────────────────────────────────────────────────

  {
    abbr: 'AIQ',
    full: 'AI Quality Audit',
    meaning: 'A systematic review of AI outputs for brand tone, factual accuracy, potential bias, and consistency before publishing.',
    example: 'Before any AI-generated campaign goes live, run an AIQ pass: does this match our voice? Are facts correct? Could this be misread in any market? AIQ is the editorial gate that sits between AI generation and human approval — maintains brand consistency and trust.',
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI output evaluation skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'GPT-ops',
    full: 'Generative Prompt Operations',
    meaning: 'Managing, versioning, testing, and maintaining AI prompts at team scale — like DevOps but for your prompt library.',
    example: "Instead of each designer having their own random prompt for copy generation, GPT-ops means your team has a shared, versioned library of tested prompts — with rollback when a prompt update breaks output quality. Scales AI content and experimentation across the whole team.",
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'ARF',
    full: 'AI Response Filtering',
    meaning: 'Post-processing AI outputs to remove noise, off-brand language, bias, or irrelevant content before it reaches the user or gets published.',
    example: 'AI generates 20 product descriptions but 3 drift from the brief and 2 have factual errors. ARF is the filtering layer — automated checks or human review — that removes those before the batch is used. Reduces errors and improves output quality at scale.',
    links: [{ label: 'AI output evaluation skill', href: '/skills' }, { label: 'Operating Principles', href: '/dos-donts' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'MCPR',
    full: 'Multi-Context Prompt Refinement',
    meaning: 'Iteratively improving prompts by testing them across multiple real-world contexts until they perform consistently — not just on the one case you wrote them for.',
    example: 'A copy prompt that works brilliantly for one market but poorly for another fails MCPR testing. You refine it across 10+ contexts until output quality is reliably consistent regardless of input. Better outputs, fewer iteration cycles, more confidence before scaling.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'Context Engineering skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'IPA',
    full: 'Intelligent Prompt Automation',
    meaning: 'Automating repetitive AI prompt workflows so they run on a schedule or trigger without manual input each time.',
    example: "Instead of manually pasting new tour listings into Claude each Monday for copy generation, IPA automates that — the trigger fires, the prompt runs, outputs land in Notion, all without a human in the loop. Saves time and ensures the same quality bar every time.",
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }, { label: 'Prompt Systems', href: '/prompts' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'AGI',
    full: 'Automated Generative Iteration',
    meaning: 'Using AI to automatically generate multiple design or copy variations in one pass — expanding the option space before human selection.',
    example: 'Brief in a campaign concept, trigger AGI, get 12 distinct headline variations and 6 visual directions in minutes instead of hours. Humans make the creative call; AI generates the option space. Increases creative speed and productivity without replacing creative judgment.',
    links: [{ label: 'Brand Campaign Territory prompt', href: '/prompts' }, { label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'prompting_ops',
  },
  {
    abbr: 'C2A',
    full: 'Context-to-Action',
    meaning: 'AI that interprets provided context and outputs specific, actionable recommendations — not just analysis, but concrete next steps.',
    example: "Instead of asking \"what does this data mean?\", C2A prompting asks \"given this data, what should I do next?\" Output: \"Increase budget on Rome experiences 20%, pause Paris, test sunset keywords in Dubai.\" AI becomes actionable, not just informative.",
    links: [{ label: 'Prompt Systems', href: '/prompts' }, { label: 'AI-assisted experimentation planning skill', href: '/skills' }],
    category: 'prompting_ops',
  },

  // ─── Design & Vision ──────────────────────────────────────────────────────

  {
    abbr: 'UI',
    full: 'User Interface',
    meaning: 'Everything the user sees and touches — buttons, copy, layouts, forms. AI can generate, audit, and iterate on UI faster than any manual process.',
    example: "Export all screen copy from Figma. Paste into the Design QA prompt. Claude flags missing states, inconsistent CTAs, and weak copy before engineering sees it. Or describe an empty state in plain text, ask for 10 copy options, pick the best for A/B testing.",
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'UX',
    full: 'User Experience',
    meaning: 'The end-to-end experience of using a product — whether it\'s intuitive, clear, and actually solves the problem.',
    example: "Paste 8 user interview transcripts into Claude: \"Extract the top 5 friction points with frequency counts and quotes.\" A 4-hour synthesis job becomes 20 minutes. The researcher challenges the AI's clusters with their own judgment — AI does the heavy lifting, human does the thinking.",
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'T2I',
    full: 'Text-to-Image',
    meaning: 'AI that generates images from written text descriptions — the core mechanic behind Midjourney, DALL·E, and Stable Diffusion.',
    example: "Write \"overhead flat-lay of travel essentials on warm terracotta tiles, natural light, editorial feel —ar 4:3\" in Midjourney. You describe, AI renders. T2I is how you explore 12 visual directions in the time it used to take to brief one shoot.",
    links: [{ label: 'Brand Campaign Territory prompt', href: '/prompts' }, { label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'I2I',
    full: 'Image-to-Image',
    meaning: 'AI that transforms or refines an existing image based on a prompt — evolving what\'s already there rather than generating from scratch.',
    example: "Upload a rough design comp with the prompt \"refine the lighting, make it warmer, more editorial.\" The AI evolves your existing image. Faster iteration than restarting, better control than generating blind. Speeds up design iteration significantly.",
    links: [{ label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'D2P',
    full: 'Data-to-Prototype',
    meaning: 'AI generating UI prototype suggestions or wireframe concepts directly from structured data — turning specs into design starting points.',
    example: "Feed in user flow data and feature requirements. D2P produces wireframe options showing how the data could be structured as screens. Not production-ready, but rapid ideation from information — faster than starting from a blank Figma canvas.",
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'DPE',
    full: 'Design Pattern Extraction',
    meaning: 'Using AI to analyze multiple design samples and identify recurring patterns, inconsistencies, or reusable components across a system.',
    example: "Upload 20 screens from your product. Ask AI to \"extract all recurring UI patterns.\" DPE returns: 7 distinct card types, 3 modal patterns, 4 navigation models — a full component audit in minutes that used to take a design audit workshop.",
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'VFE',
    full: 'Visual Feature Extraction',
    meaning: 'AI detecting and labeling key visual elements from designs or images — layout structure, hierarchy, components, color usage.',
    example: "Run competitor app screens through Claude's vision: \"List all visual elements and design decisions visible in this screen.\" VFE returns a structured breakdown of what's there and why it works — competitive analysis without manual note-taking.",
    links: [{ label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'DEX-AI',
    full: 'Design Experience AI',
    meaning: 'AI that audits design work for consistency, UX heuristics, and quality standards — automated design quality review.',
    example: 'Before each sprint review, run screens through a DEX-AI prompt checking against your UX principles. It flags inconsistencies in spacing, label terminology, and interaction patterns that a manual review might miss. Automates design quality and consistency at scale.',
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'CLS',
    full: 'Contextual Label Suggestion',
    meaning: 'AI automatically suggesting labels, names, or tags for design components, flows, or variants based on their content and context.',
    example: "A Figma component named \"Frame 127\" gets suggested as \"Booking confirmation — success state, desktop\" by CLS. AI reads what the component does and names it correctly — speeding up design system organisation and making search actually work.",
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'AI-POI',
    full: 'AI-Powered Observation & Insight',
    meaning: 'Using AI to analyze user session recordings, heatmaps, or analytics and produce structured behavioral insights at scale.',
    example: "Feed session recordings into an AI analysis tool with \"what are users struggling with on the payment screen?\" AI-POI synthesizes patterns across 50+ sessions in hours — work that would take a researcher days to watch manually. Accelerates UX research significantly.",
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'design_vision',
  },
  {
    abbr: 'POI-AI',
    full: 'Predictive Optimization for AI Insights',
    meaning: "AI predicting the next best action for a user based on behavioral patterns — proactive rather than reactive recommendations.",
    example: "\"Based on this user's browsing history and booking patterns, the next best surface is a guided tour rather than solo activity.\" That prediction, used to personalize a home screen in real time, is POI-AI in action. Increases conversion, retention, and engagement.",
    links: [{ label: 'AI-assisted experimentation planning skill', href: '/skills' }],
    category: 'design_vision',
  },

  // ─── Workflow & Data ──────────────────────────────────────────────────────

  {
    abbr: 'API',
    full: 'Application Programming Interface',
    meaning: 'The bridge that lets two apps talk to each other. When you vibe-code an AI feature into a product, you\'re connecting to an API.',
    example: "A Lovable or v0 prototype that uses Claude to generate content makes API calls to Claude behind the scenes every time it responds. No API call = no AI response. When you ask Cursor to \"add a Claude-powered copy generator to this form\", it writes code that calls the Claude API.",
    links: [{ label: 'Context Engineering skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'JSON',
    full: 'JavaScript Object Notation',
    meaning: 'The structured data format AI returns when you ask for organised output — labelled fields any system can read and use.',
    example: 'Ask Claude: "Return 5 UX improvements as JSON — each with title, priority: high/medium/low, and effort: small/medium/large." You get machine-readable output you can paste straight into your codebase or database. Vibe coding relies on JSON constantly.',
    links: [{ label: 'Prompt Systems', href: '/prompts' }],
    category: 'workflow_data',
  },
  {
    abbr: 'PRD',
    full: 'Product Requirements Document',
    meaning: 'A document that defines what a feature should do, why it exists, and how success is measured — AI can draft and pressure-test these.',
    example: '"Act as a senior PM. I\'m building a wishlist feature for a travel app. Write a PRD: problem statement, 5 user stories, 3 success metrics, 5 edge cases, open questions." Then run the PRD Pressure-Testing prompt to challenge every assumption before handoff.',
    links: [{ label: 'PRD Pressure-Testing prompt', href: '/prompts' }, { label: 'AI-assisted product critique skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'QA',
    full: 'Quality Assurance',
    meaning: 'Systematically checking output quality before it ships — AI can run a first pass on copy, states, and consistency faster than manual review.',
    example: "Before any handoff: export your screen copy inventory from Figma, run it through the Design QA prompt. Claude catches missing empty states, inconsistent button labels, and copy that drifts in tone — in minutes, not hours. The designer then reviews every flag and decides what to fix.",
    links: [{ label: 'Design QA Review prompt', href: '/prompts' }, { label: 'AI-powered design QA skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'E2E AI',
    full: 'End-to-End AI Workflow',
    meaning: 'Integrating AI across the entire production pipeline — from ideation through to deployment — in a connected, seamless sequence.',
    example: "Research brief → AI synthesises research (RAG) → AI generates visual concepts (T2I) → AI writes copy (LLM) → AI QAs output (AIQ) → deploy. When AI is involved at every step in a connected workflow, that's E2E AI. Streamlines complex AI-driven processes.",
    links: [{ label: 'AI Workflow Design skill', href: '/skills' }, { label: 'Prompt Systems', href: '/prompts' }],
    category: 'workflow_data',
  },
  {
    abbr: 'AIM',
    full: 'AI Iteration Metrics',
    meaning: 'Measuring the effectiveness of AI outputs across iterations — tracking whether prompt changes actually improve quality, not just change it.',
    example: "After refining your copy prompt 3 times, AIM gives you the data: brand voice compliance 60% → 85%, factual accuracy 70% → 95%. Without AIM you're improving by feel. With it, you're improving by evidence. Helps validate AI impact and ROI.",
    links: [{ label: 'AI output evaluation skill', href: '/skills' }, { label: 'Operating Principles', href: '/dos-donts' }],
    category: 'workflow_data',
  },
  {
    abbr: 'DAG',
    full: 'Data-Augmented Generation',
    meaning: 'Providing AI with structured datasets — spreadsheets, databases, live data — to generate more accurate, context-specific outputs.',
    example: "Instead of prompting \"write a description for this tour\", feed Claude your full product data CSV: name, location, duration, inclusions, past reviews. DAG means the output is grounded in real specifics — not generic AI copy. Improves relevance and factual accuracy.",
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI Workflow Design skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'UGC-AI',
    full: 'AI for User-Generated Content',
    meaning: 'Using AI to summarize, tag, moderate, or extract insights from user-generated content at scale — reviews, photos, comments.',
    example: "50,000 user reviews across your product. UGC-AI classifies them by sentiment, product area, and feedback type — in hours, not months. Your team acts on structured insights rather than a firehose of raw text. Enhances moderation and user engagement.",
    links: [{ label: 'Support Ticket Insight prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'LFC',
    full: 'Long-Form Content Summarization',
    meaning: 'AI condensing lengthy documents, articles, or research reports into concise, structured summaries without losing key information.',
    example: "A 60-page competitor research PDF → paste into Claude with \"summarize into: key findings, strategic implications, and 5 action points.\" LFC turns 3 hours of reading into 5 minutes of reviewing. Saves time and improves knowledge access.",
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'OCR',
    full: 'Optical Character Recognition',
    meaning: 'Technology that converts images of text — photos, scanned PDFs, whiteboards — into editable text AI can then work with.',
    example: "Photograph a brief written on a whiteboard. OCR extracts the text. Paste into Claude to structure into a proper brief. Upload a scanned contract PDF — OCR reads it, Claude pulls out the key terms. Once it's text, AI can summarise, translate, or restructure it.",
    links: [{ label: 'Context Engineering skill', href: '/skills' }],
    category: 'workflow_data',
  },
  {
    abbr: 'OCR-AI',
    full: 'Optical Character Recognition AI',
    meaning: 'AI that extracts text from images and screenshots for downstream processing, automation, or search — beyond simple scanning.',
    example: "Screenshot a competitor's pricing page. OCR-AI extracts all the text cleanly, preserving structure. Paste into a prompt to compare their messaging against yours — without manual retyping. Saves manual typing and speeds up competitive research tasks.",
    links: [{ label: 'Context Engineering skill', href: '/skills' }, { label: 'Prompt Systems', href: '/prompts' }],
    category: 'workflow_data',
  },

  // ─── Media & Voice ────────────────────────────────────────────────────────

  {
    abbr: 'TTS',
    full: 'Text-to-Speech',
    meaning: 'AI that converts written text into natural-sounding audio — used for voiceovers, content, and accessibility without a recording studio.',
    example: "Write an audio guide script for an experience. Paste into ElevenLabs. Generate a professional voiceover in 3 languages in 10 minutes. No studio booking, no voice actor scheduling. The brand team uses TTS for marketing videos and accessibility audio at a fraction of the cost.",
    links: [{ label: 'AI Creative Direction Systems skill', href: '/skills' }],
    category: 'media',
  },
  {
    abbr: 'STT',
    full: 'Speech-to-Text',
    meaning: 'AI that transcribes spoken audio into written text — the essential first step before any AI research synthesis.',
    example: "Record a 60-minute user interview. Upload to Whisper via Otter or Fireflies. Get a clean, punctuated transcript with speaker labels in under 2 minutes. Paste it into the Research Synthesis prompt. What used to take a full day of manual transcription is now a 5-minute setup task.",
    links: [{ label: 'UX Research Synthesis prompt', href: '/prompts' }, { label: 'AI-assisted research synthesis skill', href: '/skills' }],
    category: 'media',
  },
]

// ─── Card component ───────────────────────────────────────────────────────

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
        onClick={() => setExpanded(p => !p)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3 transition-colors duration-100"
        style={{ background: hovered && !expanded ? 'rgba(83,58,253,0.02)' : expanded ? 'rgba(83,58,253,0.03)' : '#ffffff' }}
      >
        <span
          className="shrink-0 px-2 py-0.5 rounded-md text-xs font-bold font-mono text-center"
          style={{
            background: `${groupColor}14`, color: groupColor,
            border: `1px solid ${groupColor}28`, minWidth: '56px',
          }}
        >
          {item.abbr}
        </span>

        <div className="flex-1 min-w-0 text-left">
          <span className="text-sm font-medium block" style={{ color: '#273951' }}>{item.full}</span>
          {!expanded && (
            <span className="text-xs truncate block" style={{ color: '#64748d' }}>{item.meaning}</span>
          )}
        </div>

        <ChevronDown
          size={14}
          className="shrink-0 transition-transform duration-200"
          style={{ color: expanded ? groupColor : '#a8c3de', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? '560px' : '0px' }}
      >
        <div className="px-4 pb-4 space-y-3" style={{ paddingTop: '2px' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{item.meaning}</p>

          <div
            className="rounded-xl px-4 py-3"
            style={{ background: 'rgba(83,58,253,0.04)', border: '1px solid rgba(83,58,253,0.12)' }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#533afd' }}>
              How it&apos;s used
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{item.example}</p>
          </div>

          {item.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.links.map(link => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
                  style={{
                    background: 'rgba(83,58,253,0.07)', border: '1px solid rgba(83,58,253,0.18)',
                    color: '#4434d4', textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#533afd'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#533afd' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(83,58,253,0.07)'; e.currentTarget.style.color = '#4434d4'; e.currentTarget.style.borderColor = 'rgba(83,58,253,0.18)' }}
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
    GROUPS.map(g => ({ ...g, items: filtered.filter(a => a.category === g.id) }))
      .filter(g => g.items.length > 0),
    [filtered]
  )

  return (
    <div className="px-5 sm:px-8 py-8 max-w-3xl mx-auto">
      <PageHeader
        title="Abbreviations"
        description={`${abbreviations.length} AI abbreviations for designers — from core concepts to advanced workflow and vision terms. Expand any to see how it's used in practice.`}
        badge="Reference"
      />

      {/* Search */}
      <div className="mb-6">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{ background: '#f6f9fc', border: '1px solid #e3e8ee' }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0" style={{ color: '#a8c3de' }}>
            <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search abbreviations…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#0d253d' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs px-2 py-0.5 rounded" style={{ color: '#64748d', background: '#e3e8ee' }}>
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
          {filteredByGroup.map(group => (
            <div key={group.id}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2" style={{ background: group.bg }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: group.color }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: group.color }}>
                  {group.label}
                </span>
                <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ background: `${group.color}18`, color: group.color }}>
                  {group.items.length}
                </span>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e3e8ee', boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px', background: '#ffffff' }}>
                {group.items.map((item, i) => (
                  <AbbreviationCard key={item.abbr} item={item} groupColor={group.color} isLast={i === group.items.length - 1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs mt-6" style={{ color: '#a8c3de' }}>
        {abbreviations.length} abbreviations across 5 categories.
      </p>
    </div>
  )
}
