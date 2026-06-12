'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import TopNav from '@/components/nav/TopNav'
import BlobLayer from '@/components/ui/BlobLayer'
import MobileBg from '@/components/ui/MobileBg'
import SiteFooter from '@/components/glossary/SiteFooter'
import { PageChromeProvider } from '@/components/nav/PageChromeContext'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

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

        {/* ── Back to event site — fixed top-left, above TopNav on all pages ── */}
        <a
          href="/"
          aria-label="Back to the event site"
          style={{
            position: 'fixed',
            top: 'calc(env(safe-area-inset-top) + 1rem)',
            left: 'calc(env(safe-area-inset-left) + 1rem)',
            zIndex: 110,
            width: 44,
            height: 44,
            borderRadius: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            textDecoration: 'none',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.22)'
            ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.3)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'
            ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.18)'
          }}
        >
          <ArrowLeft size={18} color="#ffffff" />
        </a>

        <TopNav />
        {/* flex:1 pushes footer to viewport bottom even on short pages */}
        <main style={{
          paddingTop: isHome ? 0 : 64,
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
