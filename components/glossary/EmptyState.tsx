import { Search } from 'lucide-react'

interface EmptyStateProps {
  query: string
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="size-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4">
        <Search size={24} className="text-white/20" />
      </div>
      <p className="text-white/50 text-sm font-medium mb-1">No results found</p>
      {query && (
        <p className="text-white/30 text-sm">
          No terms match <span className="text-white/50">&ldquo;{query}&rdquo;</span>
        </p>
      )}
    </div>
  )
}
