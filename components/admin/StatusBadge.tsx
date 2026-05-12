import { TermStatus } from '@/types'
import { cn } from '@/lib/utils/cn'

interface StatusBadgeProps {
  status: TermStatus
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border',
        status === 'published'
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25'
          : 'bg-amber-500/15 text-amber-300 border-amber-500/25',
        className
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
        )}
      />
      {status === 'published' ? 'Published' : 'Draft'}
    </span>
  )
}
