'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import TopNav from '@/components/nav/TopNav'
import BlobLayer from '@/components/ui/BlobLayer'
import MobileBg from '@/components/ui/MobileBg'
import SiteFooter from '@/components/glossary/SiteFooter'
import { PageChromeProvider } from '@/components/nav/PageChromeContext'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  /* Tag <html> for Safari-specific glass overrides */
  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      document.documentElement.classList.add('safari-glass')
    }
  }, [])

  /* Scroll to the very top instantly on every route change */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <PageChromeProvider>
      <div style={{
        minHeight: '100vh',
        background: '#0A0010',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <MobileBg />
        <BlobLayer />

        <TopNav />
        {/* flex:1 pushes footer to viewport bottom even on short pages */}
        <main style={{
          paddingTop: isHome ? 0 : 'var(--playbook-content-top)',
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </PageChromeProvider>
  )
}
