'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/dos-donts', label: 'Operating Principles' },
  { href: '/prompts', label: 'Prompt Systems' },
  { href: '/skills', label: 'Skills' },
  { href: '/glossary', label: 'Reference' },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: '#ffffff', borderBottom: '1px solid #e3e8ee' }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="size-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #533afd, #4434d4)' }}
          >
            <span className="text-white text-xs font-bold leading-none">AI</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: '#0d253d' }}>
            AI Playbook
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-lg text-sm transition-all duration-150"
                style={{
                  color: active ? '#533afd' : '#61718a',
                  background: active ? 'rgba(83,58,253,0.07)' : 'transparent',
                  fontWeight: active ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#0d253d'
                    e.currentTarget.style.background = '#f6f9fc'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#61718a'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1.5 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: '#61718a' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="sm:hidden"
          style={{ background: '#ffffff', borderBottom: '1px solid #e3e8ee' }}
        >
          <nav className="max-w-5xl mx-auto px-5 py-3 flex flex-col gap-0.5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm"
              style={{
                color: pathname === '/' ? '#533afd' : '#61718a',
                background: pathname === '/' ? 'rgba(83,58,253,0.07)' : 'transparent',
              }}
            >
              Home
            </Link>
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm"
                  style={{
                    color: active ? '#533afd' : '#61718a',
                    background: active ? 'rgba(83,58,253,0.07)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
