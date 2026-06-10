'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import TopNav from '@/components/nav/TopNav'
import BlobLayer from '@/components/ui/BlobLayer'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  /* Scroll to the very top instantly on every route change */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0010' }}>
      {/* Single BlobLayer instance shared across all inner pages — never remounts,
          so switching tabs/routes never causes the background to shift */}
      {!isHome && <BlobLayer />}

      <TopNav />

      {/* position: relative + z-index: 1 ensures all page content renders
          above the fixed BlobLayer (z-index: 0) without needing per-page wrappers */}
      <main style={{ paddingTop: isHome ? 0 : 64, position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}
