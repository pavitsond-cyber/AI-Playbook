import { createClient } from '@/lib/supabase/server'
import GlossaryPage from '@/components/glossary/GlossaryPage'
import { GlossaryTerm } from '@/types'
import { staticTerms } from '@/lib/data/glossary-static'
import { taaftTerms } from '@/lib/data/taaft-terms'

export const revalidate = 60

function mergeTerms(base: GlossaryTerm[], extra: GlossaryTerm[]): GlossaryTerm[] {
  const seen = new Set(base.map((t) => t.normalized_term))
  const unique = extra.filter((t) => !seen.has(t.normalized_term))
  return [...base, ...unique].sort((a, b) => a.term.localeCompare(b.term))
}

export default async function Page() {
  // ── Abbreviations: ONLY the 30 curated static entries — no Supabase, no taaft extras ──
  const staticAbbr = staticTerms.filter((t) => t.full_form && t.full_form.trim() !== '')

  // ── Terminologies: merge from static + taaft (Supabase overrides if available) ──
  const taaftTerminologiesOnly = taaftTerms.filter((t) => !t.full_form || t.full_form.trim() === '')
  const staticTerminologiesOnly = staticTerms.filter((t) => !t.full_form || t.full_form.trim() === '')

  let terminologies: GlossaryTerm[] = mergeTerms(staticTerminologiesOnly, taaftTerminologiesOnly)

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('status', 'published')
      .order('term', { ascending: true })

    if (data && data.length > 0) {
      // Only pull terminologies from Supabase — never abbreviations
      const supabaseTerminologies = (data as GlossaryTerm[]).filter(
        (t) => !t.full_form || t.full_form.trim() === ''
      )
      terminologies = mergeTerms(supabaseTerminologies, taaftTerminologiesOnly)
    }
  } catch {
    // Fall back to static + taaft terminologies
  }

  // Final terms: exactly 30 abbreviations + all terminologies
  const terms = [...staticAbbr, ...terminologies].sort((a, b) =>
    a.term.localeCompare(b.term)
  )

  return <GlossaryPage terms={terms} />
}
