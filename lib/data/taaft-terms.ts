import { GlossaryTerm, Category } from '@/types'
import taaftData from './taaft-glossary.json'

// Map TAAFT categories to our internal Category type
function mapCategory(taaftCategory: string): Category {
  const map: Record<string, Category> = {
    'Machine Learning': 'ai_basics',
    'Deep Learning': 'ai_basics',
    'Natural Language Processing': 'ai_basics',
    'Language Models and NLP': 'ai_basics',
    'Language Models and Natural Language Processing': 'ai_basics',
    'Computer Vision': 'ai_basics',
    'Generative AI and Multimedia': 'ai_basics',
    'Artificial Intelligence': 'ai_basics',
    'AI Fundamentals': 'ai_basics',
    'AI Applications': 'ai_basics',
    'AI in Society': 'ai_basics',
    'Ethics & Safety': 'ai_basics',
    'Robotics': 'ai_basics',
    'Model Evaluation': 'ai_basics',
    'Data Science': 'ai_basics',
    'AI Infrastructure': 'coding',
    'AI Companies and Platforms': 'tools',
    'User-Facing AI Concepts': 'prompting',
  }
  return map[taaftCategory] ?? 'ai_basics'
}

// Tool tags based on term relevance
function buildToolTags(term: string, definition: string, taaftCategory: string): string[] {
  const t = term.toLowerCase()
  const d = definition.toLowerCase()
  const combined = t + ' ' + d
  const tags: string[] = []

  if (combined.includes('image') || combined.includes('vision') || combined.includes('visual')) {
    tags.push('Midjourney', 'DALL·E')
  }
  if (combined.includes('language model') || combined.includes('llm') || combined.includes('gpt') || combined.includes('text generation')) {
    tags.push('ChatGPT', 'Claude')
  }
  if (combined.includes('code') || combined.includes('programming') || combined.includes('software')) {
    tags.push('GitHub Copilot', 'Claude')
  }
  if (combined.includes('speech') || combined.includes('audio') || combined.includes('voice')) {
    tags.push('ElevenLabs', 'Whisper')
  }
  if (combined.includes('embedding') || combined.includes('vector') || combined.includes('retrieval')) {
    tags.push('OpenAI Embeddings', 'Pinecone')
  }
  if (combined.includes('fine-tun') || combined.includes('training') || combined.includes('model train')) {
    tags.push('Hugging Face', 'OpenAI Fine-tuning')
  }
  if (combined.includes('agent') || combined.includes('workflow') || combined.includes('orchestrat')) {
    tags.push('LangChain', 'n8n')
  }
  if (taaftCategory === 'AI Companies and Platforms') {
    tags.push('ChatGPT', 'Claude', 'Gemini')
  }
  if (combined.includes('search') || combined.includes('retrieval')) {
    tags.push('Perplexity', 'ChatGPT')
  }
  if (combined.includes('summariz') || combined.includes('document') || combined.includes('pdf')) {
    tags.push('Claude', 'ChatGPT')
  }

  // Deduplicate and limit to 3
  return [...new Set(tags)].slice(0, 3)
}

// Where you'd encounter this term in real work
function buildWhereUsed(term: string, taaftCategory: string, definition: string): string[] | null {
  const t = term.toLowerCase()
  const d = definition.toLowerCase()
  const combined = t + ' ' + d

  const places: string[] = []

  if (taaftCategory === 'Ethics & Safety' || taaftCategory === 'AI in Society') {
    places.push('Policy discussions', 'AI audits', 'Team guidelines')
  }
  if (taaftCategory === 'User-Facing AI Concepts' || combined.includes('prompt')) {
    places.push('Daily AI usage', 'Content creation', 'Automation workflows')
  }
  if (taaftCategory === 'Machine Learning' || taaftCategory === 'Deep Learning') {
    places.push('Technical conversations', 'ML product specs', 'Vendor evaluations')
  }
  if (taaftCategory === 'Natural Language Processing' || taaftCategory === 'Language Models and Natural Language Processing') {
    places.push('Chatbot projects', 'Content tools', 'Search systems')
  }
  if (taaftCategory === 'AI Infrastructure' || taaftCategory === 'AI Companies and Platforms') {
    places.push('Engineering planning', 'Tool selection', 'Cost reviews')
  }
  if (taaftCategory === 'Generative AI and Multimedia') {
    places.push('Creative campaigns', 'Content production', 'Marketing workflows')
  }
  if (taaftCategory === 'Model Evaluation') {
    places.push('Vendor benchmarks', 'QA processes', 'Model comparisons')
  }
  if (taaftCategory === 'Data Science') {
    places.push('Analytics work', 'Data pipelines', 'Reporting')
  }
  if (taaftCategory === 'Computer Vision') {
    places.push('Product imagery', 'Visual search', 'Media processing')
  }
  if (places.length === 0) {
    places.push('AI project discussions', 'Team learning sessions')
  }

  return [...new Set(places)].slice(0, 3)
}

// Generate a brief, practical example of how the term shows up
function buildExample(term: string, definition: string, taaftCategory: string): string | null {
  const t = term.toLowerCase()
  const d = definition.toLowerCase()

  // Specific high-value terms
  const specific: Record<string, string> = {
    'hallucination': 'ChatGPT confidently stating a made-up statistic in a report — sounds true, isn\'t.',
    'prompt engineering': 'Writing "You are a travel copywriter. Write 3 punchy subject lines for a Tokyo tour email" instead of just "write email subject lines".',
    'fine-tuning': 'Taking GPT and training it further on your company\'s customer support tickets so it answers in your brand voice.',
    'rag': 'Connecting Claude to your internal wiki so it answers questions based on your actual documents, not just its training data.',
    'retrieval-augmented generation': 'Connecting Claude to your internal wiki so it answers questions based on your actual documents, not just its training data.',
    'embedding': 'Converting "Bali tour with sunset views" into a list of numbers so a search engine can find similar listings.',
    'token': 'GPT-4 charges per token — roughly every 4 characters. A 1,000-word document ≈ 750 tokens.',
    'temperature': 'Setting temperature=0 for factual extraction tasks, temperature=0.9 for creative copy generation.',
    'context window': 'GPT-4\'s 128k context window means you can paste an entire contract and ask it to summarise key clauses.',
    'llm': 'ChatGPT, Claude, and Gemini are all LLMs — trained on huge text datasets to generate human-like responses.',
    'large language model': 'ChatGPT, Claude, and Gemini are all LLMs — trained on huge text datasets to generate human-like responses.',
    'lora': 'Fine-tuning a 7B-parameter model with LoRA on a laptop instead of needing a full GPU cluster.',
    'rlhf': 'How ChatGPT was trained to be helpful — human raters scored its responses and those scores shaped its behaviour.',
    'chain-of-thought': 'Asking Claude "Think step by step: what\'s the best pricing strategy for this tour?" gets better answers than asking directly.',
    'zero-shot learning': 'Asking Claude to classify customer reviews by sentiment without giving it any examples first.',
    'few-shot learning': 'Showing ChatGPT 3 examples of the tone you want before asking it to write a new tour description.',
    'overfitting': 'A model that aces test data but fails on real customer queries — it memorised examples instead of learning patterns.',
    'transformer': 'The architecture behind ChatGPT, Claude, and Gemini — processes all words in a sentence simultaneously.',
    'attention mechanism': 'How a model reading "book the tour in Paris" knows "it" in "book it" refers to the tour, not Paris.',
    'diffusion model': 'How Midjourney and DALL·E generate images — they start from random noise and gradually refine it.',
    'gan': 'Two networks competing — one generates fake product images, the other tries to detect them — until the fakes are indistinguishable.',
    'vector database': 'Storing tour descriptions as vectors so a search for "romantic beach sunset" finds semantically similar listings.',
    'a/b testing': 'Testing two AI-generated email subject lines with 10% of users each before sending the winner to everyone.',
    'api': 'Using OpenAI\'s API to call GPT-4 directly from a product\'s backend to auto-generate listing descriptions at scale.',
    'mlops': 'The system that monitors whether your AI recommendation model\'s accuracy drops after a data update.',
    'mcp': 'Giving Claude access to your database so it can look up live booking data while answering team questions.',
    'model context protocol': 'Giving Claude access to your database so it can look up live booking data while answering team questions.',
    'ai hallucination': 'An AI confidently stating "This tour has a 4.9 rating" when it actually has 3.2 — fabricated with confidence.',
    'ai agents': 'An agent that researches a destination, writes a tour description, checks availability, and posts it — without being asked at each step.',
    'agentic ai': 'An agent that researches a destination, writes a tour description, checks availability, and posts it — without being asked at each step.',
    'bert': 'Google Search uses BERT to understand "tours near me with no walking" as a mobility-access query, not just a keyword match.',
    'gpt': 'The model family behind ChatGPT — GPT-3.5 for speed, GPT-4 for accuracy and complex reasoning.',
    'sentiment analysis': 'Automatically classifying 10,000 customer reviews as positive, neutral, or negative to spot tour quality issues.',
    'named entity recognition': 'Extracting "Eiffel Tower", "Monday", and "€120" from a customer message to auto-fill a booking form.',
    'speech recognition': 'Transcribing a customer support call so it can be analysed for common complaints.',
    'text-to-speech': 'Generating an audio tour guide narration from a text script using ElevenLabs.',
    'recommendation system': 'Suggesting "Colosseum Skip-the-Line" to a user who just booked a Rome food tour.',
    'neural network': 'The system that learns to predict which tours a user will click based on their browsing history.',
    'gradient descent': 'The algorithm that slowly adjusts model weights each training step to reduce prediction errors.',
    'transfer learning': 'Starting with a model trained on millions of images, then teaching it specifically to recognise tour venue types.',
    'multimodal': 'GPT-4V reading a photo of a landmark and writing a tour description for it.',
    'tokenization': 'How "I\'d like to book a sunset tour" gets split into [I, \'d, like, to, book, a, sunset, tour] before an LLM processes it.',
  }

  const key = t.replace(/[^a-z0-9\s]/g, '').trim()
  if (specific[key]) return specific[key]

  // Category-based fallbacks
  if (taaftCategory === 'Ethics & Safety') {
    return 'Relevant when evaluating AI tools for fairness, privacy compliance, or potential misuse in your workflows.'
  }
  if (taaftCategory === 'User-Facing AI Concepts') {
    return 'Comes up when using ChatGPT, Claude, or other AI assistants in your day-to-day work.'
  }
  if (taaftCategory === 'AI Infrastructure') {
    return 'Relevant when your engineering team is deploying, scaling, or monitoring AI features in production.'
  }
  if (taaftCategory === 'Generative AI and Multimedia') {
    return 'Used by creative and marketing teams to generate images, videos, or audio with AI tools.'
  }
  if (taaftCategory === 'Model Evaluation') {
    return 'Comes up when your team is comparing AI tools or measuring whether an AI feature is performing well.'
  }
  if (taaftCategory === 'Machine Learning' || taaftCategory === 'Deep Learning') {
    return 'Relevant in technical conversations about how AI systems are trained or how they work under the hood.'
  }
  if (taaftCategory === 'Natural Language Processing' || taaftCategory === 'Language Models and Natural Language Processing') {
    return 'Relevant whenever text is being processed — chatbots, search, summarisation, content generation.'
  }
  if (taaftCategory === 'Data Science') {
    return 'Comes up in analytics, experimentation, and data pipeline work across product and growth teams.'
  }
  if (taaftCategory === 'Robotics') {
    return 'Relevant in discussions about physical AI systems, autonomous hardware, or robot-assisted operations.'
  }
  if (taaftCategory === 'Computer Vision') {
    return 'Used when building or evaluating AI that works with images — product photos, visual search, or media processing.'
  }

  return null
}

// Quick links based on category and term
function buildRelatedLinks(term: string, taaftCategory: string): Array<{ label: string; href: string }> {
  const links: Array<{ label: string; href: string }> = []
  const t = term.toLowerCase()

  if (taaftCategory === 'AI Companies and Platforms') {
    links.push({ label: 'Tool Library', href: '/tools' })
  }
  if (taaftCategory === 'Ethics & Safety' || taaftCategory === 'AI in Society') {
    links.push({ label: 'Risks & Limitations', href: '/risks' })
  }
  if (taaftCategory === 'User-Facing AI Concepts' || t.includes('prompt')) {
    links.push({ label: 'Prompt Library', href: '/prompts' })
  }
  if (taaftCategory === 'AI Infrastructure' || taaftCategory === 'AI Applications') {
    links.push({ label: 'Workflows', href: '/workflows' })
    links.push({ label: 'Skills Library', href: '/skills' })
  }
  if (taaftCategory === 'Machine Learning' || taaftCategory === 'Deep Learning') {
    links.push({ label: 'Tech Basics', href: '/tech-basics' })
  }
  if (taaftCategory === 'Generative AI and Multimedia') {
    links.push({ label: 'Tool Library', href: '/tools' })
    links.push({ label: 'Skills Library', href: '/skills' })
  }
  if (taaftCategory === 'Language Models and Natural Language Processing') {
    links.push({ label: 'Skills Library', href: '/skills' })
    links.push({ label: 'Prompt Library', href: '/prompts' })
  }
  if (links.length === 0) {
    links.push({ label: 'AI Glossary', href: '/glossary' })
  }

  const seen = new Set<string>()
  return links.filter((l) => {
    if (seen.has(l.href)) return false
    seen.add(l.href)
    return true
  }).slice(0, 3)
}

// Convert TAAFT JSON entries to GlossaryTerm format
export const taaftTerms: GlossaryTerm[] = taaftData.terms.map((t) => {
  const slug = t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const category: Category = (t.category as Category) ?? mapCategory(t.taaft_category)

  const sentences = t.definition.split('. ').filter(Boolean)
  const shortDef = sentences[0] + (sentences[0].endsWith('.') ? '' : '.')
  // Only set detailed_explanation if there's more than the first sentence
  const detailedExp = t.definition.trim()
  const hasMoreDetail = detailedExp.length > shortDef.length + 5

  const exampleUsage = buildExample(t.term, t.definition, t.taaft_category)

  return {
    id: t.id,
    term: t.term,
    normalized_term: slug,
    full_form: t.full_form ?? null,
    short_definition: shortDef,
    detailed_explanation: hasMoreDetail ? detailedExp : null,
    category,
    aliases: [],
    tool_tags: [],
    example_usage: exampleUsage,
    session_relevance: null,
    status: 'published' as const,
    updated_by: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    layman_explanation: null,
    where_used: null,
    related_links: [],
  }
})

// Abbreviations only (for the abbreviations page)
export const taaftAbbreviations = taaftTerms.filter((t) => {
  const raw = taaftData.terms.find((r) => r.id === t.id)
  return raw?.type === 'abbreviation'
})

// Terminology only
export const taaftTerminology = taaftTerms.filter((t) => {
  const raw = taaftData.terms.find((r) => r.id === t.id)
  return raw?.type === 'terminology'
})
