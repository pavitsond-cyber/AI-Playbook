import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'size-4', md: 'size-6', lg: 'size-8' }

export default function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'border-2 border-white/20 border-t-purple-500 rounded-full animate-spin',
        sizes[size],
        className
      )}
    />
  )
}
