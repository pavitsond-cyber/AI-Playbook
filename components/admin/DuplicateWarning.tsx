'use client'

import { AlertTriangle, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { GlossaryTerm } from '@/types'

interface DuplicateWarningProps {
  existingTerm: GlossaryTerm
  onDismiss: () => void
}

export default function DuplicateWarning({ existingTerm, onDismiss }: DuplicateWarningProps) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
      <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-amber-200 font-medium">Duplicate term detected</p>
        <p className="text-xs text-amber-300/70 mt-0.5">
          &ldquo;{existingTerm.term}&rdquo; already exists in the glossary.
        </p>
        <Link
          href={`/admin/terms/${existingTerm.id}/edit`}
          className="inline-flex items-center gap-1 mt-2 text-xs text-amber-300 hover:text-amber-100
            font-medium transition-colors"
        >
          Edit existing term instead <ArrowRight size={12} />
        </Link>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-amber-400/50 hover:text-amber-400 transition-colors flex-shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  )
}
