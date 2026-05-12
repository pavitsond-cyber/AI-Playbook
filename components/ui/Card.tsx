import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl bg-[#111111] border border-white/[0.06] overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
