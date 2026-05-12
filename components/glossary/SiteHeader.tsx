import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface SiteHeaderProps {
  showBack?: boolean
}

export default function SiteHeader({ showBack }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 h-14 flex items-center animate-fade-in delay-0"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(7,7,14,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-5 flex items-center gap-3">
        {showBack && (
          <Link
            href="/"
            className="flex items-center justify-center size-8 rounded-xl
              text-white/25 hover:text-white/70 transition-all duration-150
              hover:bg-white/[0.05]"
          >
            <ArrowLeft size={15} />
          </Link>
        )}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="size-7 rounded-lg flex items-center justify-center
              shadow-md transition-all duration-200 group-hover:shadow-purple-600/50"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 0 12px rgba(124,58,237,0.35)',
            }}
          >
            <span className="text-white text-xs font-bold leading-none">H</span>
          </div>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-150">
            AI Library
          </span>
        </Link>
      </div>
    </header>
  )
}
