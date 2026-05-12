import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import TermForm from '@/components/admin/TermForm'

export default function NewTermPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/dashboard"
          className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">New Term</h1>
          <p className="text-sm text-white/40 mt-0.5">Add a term to the glossary</p>
        </div>
      </div>
      <TermForm mode="create" />
    </div>
  )
}
