import GlossaryPage from '@/components/glossary/GlossaryPage'
import { staticTerms } from '@/lib/data/glossary-static'

// No Supabase, no taaft — only curated static terms
export default function Page() {
  return <GlossaryPage terms={staticTerms} />
}
