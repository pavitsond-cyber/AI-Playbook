import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Headout AI Library',
  description: 'A plain-English glossary of AI terms, abbreviations and tools — Headout AI Session 2026.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#07070e',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen" style={{ backgroundColor: '#07070e' }}>

        {/* ── Ambient glow — Waitlister-style ── */}
        <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

          {/* Central dominant orb — large, soft, purple */}
          <div
            className="animate-float"
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '720px',
              height: '520px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.28) 0%, rgba(124,58,237,0.12) 45%, transparent 75%)',
              filter: 'blur(48px)',
            }}
          />

          {/* Inner bright core */}
          <div
            className="animate-float-slow"
            style={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '320px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.22) 0%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />

          {/* Bottom-right secondary orb */}
          <div style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-60px',
            width: '480px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.14) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />

          {/* Top-left accent */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-80px',
            width: '360px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />

        </div>

        {/* Content sits above grain (z-10) and grain sits above bg (z-1) */}
        <div className="relative z-10">{children}</div>

      </body>
    </html>
  )
}
