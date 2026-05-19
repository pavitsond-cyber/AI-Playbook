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
  ai_basics: 'bg-blue-50 text-blue-700 border-blue-200',
  tools: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  coding: 'bg-orange-50 text-orange-700 border-orange-200',
  prompting: 'bg-violet-50 text-violet-700 border-violet-200',
  workflow: 'bg-pink-50 text-pink-700 border-pink-200',
}
