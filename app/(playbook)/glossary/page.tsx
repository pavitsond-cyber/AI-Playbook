import GlossaryPage from '@/components/glossary/GlossaryPage'
import { staticTerms } from '@/lib/data/glossary-static'

// Static — data is fully embedded at build time, no runtime rendering needed
export default function Page() {
  return <GlossaryPage terms={staticTerms} />
}
