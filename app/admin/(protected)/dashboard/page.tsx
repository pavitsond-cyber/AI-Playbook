import Link from 'next/link'
import { Plus, Globe, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { GlossaryTerm, CATEGORY_LABELS } from '@/types'
import TermsTable from '@/components/admin/TermsTable'
import StatusBadge from '@/components/admin/StatusBadge'

export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ data: terms }, { data: recentEdits }] = await Promise.all([
    supabase.from('glossary_terms').select('*').order('updated_at', { ascending: false }),
    supabase
      .from('glossary_edits')
      .select('*, glossary_terms(term)')
      .order('edited_at', { ascending: false })
      .limit(5),
  ])

  const allTerms = (terms ?? []) as GlossaryTerm[]
  const published = allTerms.filter((t) => t.status === 'published')
  const drafts = allTerms.filter((t) => t.status === 'draft')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-white/40 mt-0.5">{allTerms.length} total terms</p>
        </div>
        <Link
          href="/admin/terms/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600
            hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} /> New Term
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: allTerms.length, color: 'text-white' },
          { label: 'Published', value: published.length, color: 'text-emerald-400' },
          { label: 'Drafts', value: drafts.length, color: 'text-amber-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-[#111111] border border-white/[0.06] px-4 py-3.5 text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      {recentEdits && recentEdits.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} className="text-white/30" />
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wide">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-1.5">
            {recentEdits.map((edit: {
              id: string
              action: string
              edited_at: string
              glossary_terms: { term: string } | null
            }) => (
              <div
                key={edit.id}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#111111]
                  border border-white/[0.05] text-sm"
              >
                <span className="text-white/60 capitalize">{edit.action}</span>
                <span className="text-white font-medium">
                  {edit.glossary_terms?.term ?? 'Unknown'}
                </span>
                <span className="ml-auto text-xs text-white/25">
                  {new Date(edit.edited_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10
            text-sm text-white/50 hover:text-white hover:border-white/20 transition-all"
        >
          <Globe size={14} /> View public glossary
        </Link>
      </div>

      {/* All terms table */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
          All Terms
        </h2>
        <TermsTable terms={allTerms} />
      </div>
    </div>
  )
}
