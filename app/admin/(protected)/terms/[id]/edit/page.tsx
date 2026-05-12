import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import TermForm from '@/components/admin/TermForm'
import StatusBadge from '@/components/admin/StatusBadge'
import { GlossaryTerm } from '@/types'

type Params = { params: Promise<{ id: string }> }

export default async function EditTermPage({ params }: Params) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const term = data as GlossaryTerm

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{term.term}</h1>
              <StatusBadge status={term.status} />
            </div>
            <p className="text-sm text-white/40 mt-0.5">Edit term</p>
          </div>
        </div>
      </div>
      <TermForm mode="edit" initialData={term} />
    </div>
  )
}
