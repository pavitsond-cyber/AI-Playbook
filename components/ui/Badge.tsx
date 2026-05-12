import { cn } from '@/lib/utils/cn'
import { Category, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types'

interface CategoryBadgeProps {
  category: Category
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        CATEGORY_COLORS[category],
        className
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
        'bg-white/8 text-white/60 border border-white/10',
        className
      )}
    >
      {children}
    </span>
  )
}
