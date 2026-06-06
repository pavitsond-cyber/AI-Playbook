import GlossaryPage from '@/components/glossary/GlossaryPage'
import { staticTerms } from '@/lib/data/glossary-static'

// Abbreviations: 30 curated PDF entries
// Terminologies: exactly the 19 senior-level terms from ai_terms_playbook.md
// No taaft terms — only the curated static set
export default function Page() {
  return <GlossaryPage terms={staticTerms} />
}
