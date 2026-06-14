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

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: 'AI Playbook',
  description: 'A practical AI reference for teams, prompt systems, skills, and tools.',
  icons: {
    icon: [
      { url: `${BASE}/favicon/favicon-16x16.png`,  sizes: '16x16',  type: 'image/png' },
      { url: `${BASE}/favicon/favicon-32x32.png`,  sizes: '32x32',  type: 'image/png' },
      { url: `${BASE}/favicon/favicon-96x96.png`,  sizes: '96x96',  type: 'image/png' },
      { url: `${BASE}/favicon/favicon-192x192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${BASE}/favicon/favicon-512x512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: `${BASE}/favicon/favicon-180x180.png`, sizes: '180x180', type: 'image/png' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0D0B1E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${halyardDisplay.variable}`}>
      <body style={{ minHeight: '100vh', background: '#0D0B1E', fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  )
}
