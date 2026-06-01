import { GlossaryTerm } from '@/types'

export function filterTerms(terms: GlossaryTerm[], query: string): GlossaryTerm[] {
  const q = query.toLowerCase().trim()
  if (!q) return terms
  return terms.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.full_form?.toLowerCase().includes(q) ||
      t.short_definition?.toLowerCase().includes(q) ||
      t.detailed_explanation?.toLowerCase().includes(q) ||
      t.aliases.some((a) => a.toLowerCase().includes(q)) ||
      t.tool_tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.layman_explanation?.toLowerCase().includes(q) ||
      t.where_used?.some((w) => w.toLowerCase().includes(q))
  )
}
