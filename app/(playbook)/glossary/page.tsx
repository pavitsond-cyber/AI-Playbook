import GlossaryPage from '@/components/glossary/GlossaryPage'
import { GlossaryTerm } from '@/types'
import { staticTerms } from '@/lib/data/glossary-static'
import { taaftTerms } from '@/lib/data/taaft-terms'

function mergeTerms(base: GlossaryTerm[], extra: GlossaryTerm[]): GlossaryTerm[] {
  const seen = new Set(base.map((t) => t.normalized_term))
  const unique = extra.filter((t) => !seen.has(t.normalized_term))
  return [...base, ...unique].sort((a, b) => a.term.localeCompare(b.term))
}

export default function Page() {
  // Abbreviations: ONLY the 30 curated static entries — never taaft
  const staticAbbr = staticTerms.filter((t) => t.full_form && t.full_form.trim() !== '')

  // Terminologies: static 17 + all 646 taaft terminologies, deduped
  const staticTermOnly = staticTerms.filter((t) => !t.full_form || t.full_form.trim() === '')
  const taaftTermOnly  = taaftTerms.filter((t)  => !t.full_form || t.full_form.trim() === '')
  const terminologies  = mergeTerms(staticTermOnly, taaftTermOnly)

  const terms = [...staticAbbr, ...terminologies].sort((a, b) => a.term.localeCompare(b.term))

  return <GlossaryPage terms={terms} />
}
