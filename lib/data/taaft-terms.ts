import { GlossaryTerm, Category } from '@/types'
import taaftData from './taaft-glossary.json'

// Map TAAFT categories to our internal Category type
function mapCategory(taaftCategory: string): Category {
  const map: Record<string, Category> = {
    'Machine Learning': 'ai_basics',
    'Deep Learning': 'ai_basics',
    'Natural Language Processing': 'ai_basics',
    'Language Models and NLP': 'ai_basics',
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

// Quick links based on category and term
function buildRelatedLinks(term: string, taaftCategory: string): Array<{ label: string; href: string }> {
  const links: Array<{ label: string; href: string }> = []

  if (taaftCategory === 'AI Companies and Platforms' || taaftCategory === 'User-Facing AI Concepts') {
    links.push({ label: 'Tool Library', href: '/tools' })
  }
  if (taaftCategory === 'Language Models and NLP' || taaftCategory === 'Artificial Intelligence') {
    links.push({ label: 'AI Glossary', href: '/glossary' })
  }
  if (taaftCategory === 'Ethics & Safety' || taaftCategory === 'AI in Society') {
    links.push({ label: 'Risks & Limitations', href: '/risks' })
    links.push({ label: "Do's & Don'ts", href: '/dos-donts' })
  }
  if (taaftCategory === 'User-Facing AI Concepts' || term.toLowerCase().includes('prompt')) {
    links.push({ label: 'Prompt Library', href: '/prompts' })
  }
  if (taaftCategory === 'AI Infrastructure' || taaftCategory === 'AI Applications') {
    links.push({ label: 'Workflows', href: '/workflows' })
    links.push({ label: 'Skills Library', href: '/skills' })
  }
  if (taaftCategory === 'Machine Learning' || taaftCategory === 'Deep Learning') {
    links.push({ label: 'Tech Basics', href: '/tech-basics' })
  }

  // Deduplicate by href
  const seen = new Set<string>()
  return links.filter((l) => {
    if (seen.has(l.href)) return false
    seen.add(l.href)
    return true
  }).slice(0, 3) // max 3 links
}

// Build a short, plain-English layman explanation from the full definition
function buildLaymanExplanation(term: string, definition: string): string {
  // Return the first sentence as a simpler explanation fallback
  // In a real app this could be AI-generated; here we derive it from the definition
  const sentences = definition.split('. ')
  return sentences[0] + (sentences.length > 1 ? '.' : '')
}

// Convert TAAFT JSON entries to GlossaryTerm format
export const taaftTerms: GlossaryTerm[] = taaftData.terms.map((t) => {
  const slug = t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const category: Category = (t.category as Category) ?? mapCategory(t.taaft_category)

  return {
    id: t.id,
    term: t.term,
    normalized_term: slug,
    full_form: t.full_form ?? null,
    short_definition: t.definition.split('. ')[0] + '.',
    detailed_explanation: t.definition,
    category,
    aliases: [],
    tool_tags: [],
    example_usage: null,
    session_relevance: null,
    status: 'published' as const,
    updated_by: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    layman_explanation: buildLaymanExplanation(t.term, t.definition),
    where_used: null,
    related_links: buildRelatedLinks(t.term, t.taaft_category),
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
