import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeTerm } from '@/lib/utils/normalize'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: existing } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('id', id)
    .single()

  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const updates: Record<string, unknown> = { ...body, updated_by: user.id }

  if (body.term && body.term !== existing.term) {
    const normalized = normalizeTerm(body.term)
    const { data: dup } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('normalized_term', normalized)
      .neq('id', id)
      .maybeSingle()

    if (dup) {
      return NextResponse.json({ error: 'duplicate', existingTerm: dup }, { status: 409 })
    }
    updates.normalized_term = normalized
  }

  const { data: updated, error } = await supabase
    .from('glossary_terms')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const action =
    body.status === 'published' && existing.status === 'draft' ? 'published' : 'updated'

  await supabase.from('glossary_edits').insert({
    term_id: id,
    editor_id: user.id,
    action,
    previous_data: existing,
    new_data: updated,
  })

  return NextResponse.json(updated)
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: existing } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('id', id)
    .single()

  await supabase.from('glossary_edits').insert({
    term_id: id,
    editor_id: user.id,
    action: 'deleted',
    previous_data: existing,
  })

  const { error } = await supabase.from('glossary_terms').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
