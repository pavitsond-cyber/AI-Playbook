export type Category = 'ai_basics' | 'tools' | 'coding' | 'prompting' | 'workflow'
export type TermStatus = 'draft' | 'published'

export interface GlossaryTerm {
  id: string
  term: string
  normalized_term: string
  full_form: string | null
  short_definition: string | null
  detailed_explanation: string | null
  category: Category
  aliases: string[]
  tool_tags: string[]
  example_usage: string | null
  session_relevance: string | null
  status: TermStatus
  updated_by: string | null
  created_at: string
  updated_at: string
}

export interface GlossaryEdit {
  id: string
  term_id: string
  editor_id: string
  action: 'created' | 'updated' | 'published' | 'deleted'
  previous_data: Partial<GlossaryTerm> | null
  new_data: Partial<GlossaryTerm> | null
  edited_at: string
}

export interface DuplicateCheckResult {
  isDuplicate: boolean
  existingTerm: GlossaryTerm | null
}

export const CATEGORY_LABELS: Record<Category, string> = {
  ai_basics: 'AI Basics',
  tools: 'Tools',
  coding: 'Coding',
  prompting: 'Prompting',
  workflow: 'Workflow',
}

export const CATEGORY_ORDER: Category[] = [
  'ai_basics',
  'tools',
  'coding',
  'prompting',
  'workflow',
]

export const CATEGORY_COLORS: Record<Category, string> = {
  ai_basics: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  tools: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  coding: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  prompting: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  workflow: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}
