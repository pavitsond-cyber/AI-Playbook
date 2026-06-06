import GlossaryPage from '@/components/glossary/GlossaryPage'
import { staticTerms } from '@/lib/data/glossary-static'

// Abbreviations tab: 30 curated PDF entries
// Terminologies tab: 25 curated terms (19 AI terminologies + 6 prompt design terms)
export const dynamic = 'force-dynamic'

export default function Page() {
  return <GlossaryPage terms={staticTerms} />
}
