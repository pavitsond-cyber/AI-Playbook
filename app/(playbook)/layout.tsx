'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import TopNav from '@/components/nav/TopNav'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const mainRef = useRef<HTMLElement>(null)

  // Retrigger the page-enter animation every time the route changes
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight        // force reflow so the reset takes effect
    el.style.animation = ''     // let the CSS class re-apply
  }, [pathname])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0010' }}>
      <TopNav />
      <main
        ref={mainRef}
        className="page-enter"
        style={{ paddingTop: isHome ? 0 : 64 }}
      >
        {children}
      </main>
    </div>
  )
}
