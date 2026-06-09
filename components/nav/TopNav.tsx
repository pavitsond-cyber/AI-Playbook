'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import InlineSearch from '@/components/search/InlineSearch'
import MobileSearchSheet from '@/components/search/MobileSearchSheet'

const navItems = [
  { href: '/prompts',   label: 'Prompts' },
  { href: '/skills',    label: 'Skills' },
  { href: '/glossary',  label: 'Glossary' },
  { href: '/dos-donts', label: 'Principles' },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isHome = pathname === '/'
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
    {/* On homepage: only show on mobile (sm:hidden hides on desktop, homepage has its own nav) */}
    <header className={isHome ? 'sm:hidden' : ''} style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 64,
      background: 'rgba(10,0,16,0.65)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      zIndex: 100,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        padding: '0 clamp(16px,3vw,40px)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        {/* Headout logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/images/headout-logo.svg"
            alt="headout"
            style={{ height: 16, width: 109, display: 'block' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex" style={{ flex: 1, alignItems: 'center', gap: 2, paddingLeft: 8 }}>
          {navItems.map(item => {
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href} style={{
                padding: '6px 14px', borderRadius: 100,
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 400,
                color: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'transparent' }}}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop search */}
        {!isHome && (
          <div className="hidden sm:block shrink-0" style={{ width: 'clamp(280px, 30vw, 420px)' }}>
            <InlineSearch placeholder="Search…" compact />
          </div>
        )}

        {/* Mobile: search icon + hamburger */}
        <div className="sm:hidden flex items-center" style={{ marginLeft: 'auto', gap: 4 }}>
          {/* Search icon */}
          <button
            onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 6, position: 'relative', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Menu icon — fades out when open */}
            <span style={{
              position: 'absolute',
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? 'rotate(45deg) scale(0.7)' : 'rotate(0deg) scale(1)',
              transition: 'opacity 0.22s ease-out, transform 0.25s ease-out',
              display: 'flex',
            }}>
              <Menu size={20} />
            </span>
            {/* X icon — fades in when open */}
            <span style={{
              position: 'absolute',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'rotate(0deg) scale(1)' : 'rotate(-45deg) scale(0.7)',
              transition: 'opacity 0.22s ease-out, transform 0.25s ease-out',
              display: 'flex',
            }}>
              <X size={20} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown — always mounted, animates in/out with opacity + maxHeight */}
      <div
        className="sm:hidden"
        style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'rgba(10,0,16,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: mobileOpen ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          overflow: 'hidden',
          maxHeight: mobileOpen ? '500px' : '0px',
          opacity: mobileOpen ? 1 : 0,
          transition: mobileOpen
            ? 'max-height 0.35s ease-out, opacity 0.25s ease-out, border-color 0.25s ease-out'
            : 'max-height 0.28s ease-in, opacity 0.2s ease-in, border-color 0.2s ease-in',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div style={{ padding: '12px 20px 16px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '10px 12px', borderRadius: 8,
                fontFamily: 'var(--font-body)', fontSize: 14,
                color: pathname === '/' ? '#ffffff' : 'rgba(255,255,255,0.55)',
                background: pathname === '/' ? 'rgba(255,255,255,0.08)' : 'transparent',
                textDecoration: 'none',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
            >
              Home
            </Link>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '10px 12px', borderRadius: 8,
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  background: isActive(item.href) ? 'rgba(255,255,255,0.08)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease, background 0.15s ease',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>

    {/* Full-screen mobile search sheet */}
    <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
