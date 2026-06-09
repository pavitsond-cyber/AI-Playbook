'use client'

import { usePathname } from 'next/navigation'
import TopNav from '@/components/nav/TopNav'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div style={{ minHeight: '100vh', background: '#0A0010' }}>
      {!isHome && <TopNav />}
      <main style={{ paddingTop: isHome ? 0 : 64 }}>{children}</main>
    </div>
  )
}
