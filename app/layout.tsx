import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const halyardDisplay = localFont({
  src: '../public/fonts/HalyardDisplay-Regular.otf',
  variable: '--font-halyard',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'AI Playbook',
  description: 'A practical AI reference for teams, prompt systems, skills, and tools.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A0010',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${halyardDisplay.variable}`}>
      <body style={{ minHeight: '100vh', background: '#0A0010', fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  )
}
