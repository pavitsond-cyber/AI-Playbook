import { createClient } from '@/lib/supabase/server'
import GlossaryPage from '@/components/glossary/GlossaryPage'
import { GlossaryTerm } from '@/types'
import { staticTerms } from '@/lib/data/glossary-static'
import { taaftTerms } from '@/lib/data/taaft-terms'

export const revalidate = 60

// Merge static + TAAFT terms, deduplicating by normalized term (static takes precedence)
function mergeTerms(base: GlossaryTerm[], extra: GlossaryTerm[]): GlossaryTerm[] {
  const seen = new Set(base.map((t) => t.normalized_term))
  const unique = extra.filter((t) => !seen.has(t.normalized_term))
  return [...base, ...unique].sort((a, b) => a.term.localeCompare(b.term))
}

export default async function Page() {
  // Start with all local data merged
  let terms: GlossaryTerm[] = mergeTerms(staticTerms, taaftTerms)

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('status', 'published')
      .order('term', { ascending: true })

    if (data && data.length > 0) {
      // If Supabase has data, merge it with TAAFT (Supabase takes precedence)
      terms = mergeTerms(data as GlossaryTerm[], taaftTerms)
    }
  } catch {
    // Fall back to merged static + TAAFT data
  }

  return <GlossaryPage terms={terms} />
}
