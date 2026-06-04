'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { useSearch } from '@/lib/context/search-context'

const navItems = [
  { href: '/dos-donts', label: 'Operating Principles' },
  { href: '/prompts', label: 'Prompt Systems' },
  { href: '/skills', label: 'Skills' },
  { href: '/glossary', label: 'Reference' },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: openSearch } = useSearch()

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: '#ffffff', borderBottom: '1px solid #e3e8ee' }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-2">
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
        <nav className="hidden sm:flex items-center gap-0.5 flex-1">
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

        {/* Search button — desktop */}
        <button
          onClick={openSearch}
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 shrink-0"
          style={{
            background: '#f6f9fc',
            border: '1px solid #e3e8ee',
            color: '#a8c3de',
            minWidth: '180px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(83,58,253,0.3)'
            e.currentTarget.style.color = '#64748d'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e3e8ee'
            e.currentTarget.style.color = '#a8c3de'
          }}
        >
          <Search size={14} />
          <span className="flex-1 text-left text-xs">Search everything…</span>
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{ background: '#e3e8ee', color: '#a8c3de' }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Mobile: search icon + hamburger */}
        <div className="sm:hidden flex items-center gap-1 ml-auto">
          <button
            onClick={openSearch}
            className="p-2 rounded-lg"
            style={{ color: '#61718a' }}
          >
            <Search size={18} />
          </button>
          <button
            className="p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: '#61718a' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
