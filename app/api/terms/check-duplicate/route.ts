import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeTerm } from '@/lib/utils/normalize'

export async function POST(request: NextRequest) {
  const { term, excludeId } = await request.json()

  if (!term) return NextResponse.json({ isDuplicate: false, existingTerm: null })

  const supabase = await createClient()
  const normalized = normalizeTerm(term)

  // Check normalized_term exact match
  let q1 = supabase
    .from('glossary_terms')
    .select('*')
    .eq('normalized_term', normalized)

  if (excludeId) q1 = q1.neq('id', excludeId)
  const { data: termMatch } = await q1.maybeSingle()

  if (termMatch) {
    return NextResponse.json({ isDuplicate: true, existingTerm: termMatch })
  }

  // Check aliases array
  let q2 = supabase
    .from('glossary_terms')
    .select('*')
    .contains('aliases', [normalized])

  if (excludeId) q2 = q2.neq('id', excludeId)
  const { data: aliasMatch } = await q2.maybeSingle()

  return NextResponse.json({
    isDuplicate: !!aliasMatch,
    existingTerm: aliasMatch ?? null,
  })
}
