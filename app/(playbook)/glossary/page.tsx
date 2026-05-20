import { createClient } from '@/lib/supabase/server'
import GlossaryPage from '@/components/glossary/GlossaryPage'
import { GlossaryTerm } from '@/types'
import { staticTerms } from '@/lib/data/glossary-static'

export const revalidate = 60

export default async function Page() {
  let terms: GlossaryTerm[] = staticTerms

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('status', 'published')
      .order('term', { ascending: true })

    if (data && data.length > 0) {
      terms = data
    }
  } catch {
    // Fall back to static data
  }

  return <GlossaryPage terms={terms} />
}
