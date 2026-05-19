import { createClient } from '@/lib/supabase/server'
import GlossaryPage from '@/components/glossary/GlossaryPage'
import { GlossaryTerm } from '@/types'

export const revalidate = 60

export default async function Page() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('status', 'published')
    .order('term', { ascending: true })

  const terms: GlossaryTerm[] = data ?? []

  return <GlossaryPage terms={terms} />
}
