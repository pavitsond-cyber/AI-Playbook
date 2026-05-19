import { Search } from 'lucide-react'

interface EmptyStateProps {
  query: string
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="size-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: '#f6f9fc', border: '1px solid #e3e8ee' }}
      >
        <Search size={24} style={{ color: '#a8c3de' }} />
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: '#64748d' }}>No results found</p>
      {query && (
        <p className="text-sm" style={{ color: '#a8c3de' }}>
          No terms match <span style={{ color: '#64748d' }}>&ldquo;{query}&rdquo;</span>
        </p>
      )}
    </div>
  )
}
