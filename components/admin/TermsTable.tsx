'use client'

import Link from 'next/link'
import { Edit2, Trash2 } from 'lucide-react'

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
import { GlossaryTerm, CATEGORY_LABELS } from '@/types'
import StatusBadge from './StatusBadge'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TermsTableProps {
  terms: GlossaryTerm[]
}

export default function TermsTable({ terms }: TermsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string, termName: string) {
    if (!confirm(`Delete "${termName}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      await fetch(`${BP}/api/terms/${id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setDeletingId(null)
    }
  }

  if (terms.length === 0) {
    return (
      <div className="text-center py-16 text-white/30 text-sm">
        No terms yet.{' '}
        <Link href="/admin/terms/new" className="text-purple-400 hover:text-purple-300">
          Add the first one →
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.07] bg-white/[0.02]">
            <th className="text-left px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wide">
              Term
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wide hidden sm:table-cell">
              Category
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wide">
              Status
            </th>
            <th className="text-right px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {terms.map((term) => (
            <tr key={term.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-3">
                <div>
                  <span className="font-medium text-white">{term.term}</span>
                  {term.full_form && (
                    <span className="block text-xs text-white/30 mt-0.5">{term.full_form}</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <span className="text-white/50">{CATEGORY_LABELS[term.category]}</span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={term.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/terms/${term.id}/edit`}
                    className="p-1.5 rounded-lg text-white/30 hover:text-purple-400 hover:bg-purple-500/10 transition-all"
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(term.id, term.term)}
                    disabled={deletingId === term.id}
                    className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
