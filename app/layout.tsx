import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Headout AI Playbook',
  description: 'A practical AI learning hub — built for the Headout AI Session 2026.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        {/* Gradient mesh backdrop — Stripe-style */}
        <div aria-hidden className="fixed inset-x-0 top-0 z-0 pointer-events-none overflow-hidden" style={{ height: '420px' }}>
          {/* Cream blob — far left */}
          <div style={{ position: 'absolute', top: '-60px', left: '-80px', width: '500px', height: '400px', borderRadius: '50%', background: 'rgba(245,233,212,0.9)', filter: 'blur(80px)' }} />
          {/* Lemon/orange blob — left-center */}
          <div style={{ position: 'absolute', top: '-40px', left: '15%', width: '420px', height: '360px', borderRadius: '50%', background: 'rgba(255,190,80,0.35)', filter: 'blur(90px)' }} />
          {/* Lavender blob — center */}
          <div style={{ position: 'absolute', top: '-80px', left: '38%', width: '480px', height: '420px', borderRadius: '50%', background: 'rgba(185,165,255,0.45)', filter: 'blur(80px)' }} />
          {/* Indigo blob — right-center */}
          <div style={{ position: 'absolute', top: '-60px', left: '58%', width: '440px', height: '380px', borderRadius: '50%', background: 'rgba(83,58,253,0.28)', filter: 'blur(85px)' }} />
          {/* Ruby blob — far right */}
          <div style={{ position: 'absolute', top: '-40px', right: '-60px', width: '380px', height: '320px', borderRadius: '50%', background: 'rgba(234,34,97,0.22)', filter: 'blur(80px)' }} />
          {/* Fade-to-white at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
