'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import TopNav from '@/components/nav/TopNav'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  /* Scroll to the very top instantly on every route change */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0010' }}>
      <TopNav />
      <main style={{ paddingTop: isHome ? 0 : 64 }}>
        {children}
      </main>
    </div>
  )
}
