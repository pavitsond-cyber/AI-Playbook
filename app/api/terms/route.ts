import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeTerm } from '@/lib/utils/normalize'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let query = supabase.from('glossary_terms').select('*').order('term', { ascending: true })

  if (!user) {
    query = query.eq('status', 'published')
  }
  if (category) {
    query = query.eq('category', category)
  }
  if (q) {
    query = query.or(
      `term.ilike.%${q}%,full_form.ilike.%${q}%,short_definition.ilike.%${q}%,detailed_explanation.ilike.%${q}%`
    )
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { term, ...rest } = body

  if (!term) return NextResponse.json({ error: 'term is required' }, { status: 400 })

  const normalized = normalizeTerm(term)

  // Check for duplicates
  const { data: existingByNorm } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('normalized_term', normalized)
    .maybeSingle()

  if (existingByNorm) {
    return NextResponse.json(
      { error: 'duplicate', existingTerm: existingByNorm },
      { status: 409 }
    )
  }

  const { data: existingByAlias } = await supabase
    .from('glossary_terms')
    .select('*')
    .contains('aliases', [normalized])
    .maybeSingle()

  if (existingByAlias) {
    return NextResponse.json(
      { error: 'duplicate', existingTerm: existingByAlias },
      { status: 409 }
    )
  }

  const { data: created, error } = await supabase
    .from('glossary_terms')
    .insert({ term, normalized_term: normalized, ...rest, updated_by: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Write audit record
  await supabase.from('glossary_edits').insert({
    term_id: created.id,
    editor_id: user.id,
    action: 'created',
    new_data: created,
  })

  return NextResponse.json(created, { status: 201 })
}
