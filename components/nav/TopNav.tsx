'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import InlineSearch from '@/components/search/InlineSearch'
import MobileSearchSheet from '@/components/search/MobileSearchSheet'

const navItems = [
  { href: '/prompts',    label: 'Prompts' },
  { href: '/skills',     label: 'Skills' },
  { href: '/glossary',   label: 'Glossary' },
  { href: '/tools',      label: 'Tools' },
  { href: '/contribute', label: 'Contribute', mobileLabel: 'Contribute to playbook' },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isHome = pathname === '/'
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
    {/* Always visible — on homepage desktop hides nav links but keeps logo+search */}
    <header
      className="flex items-center"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64,
        /* Translucent glass — same on all pages. Solidifies when hamburger opens. */
        /* Homepage: transparent (video visible through nav).
           Other pages: frosted glass. Hamburger open: always solid. */
        background: mobileOpen
          ? 'rgba(10,0,16,0.97)'
          : 'rgba(10,0,16,0.45)',
        backdropFilter: mobileOpen ? 'blur(24px)' : 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: mobileOpen ? 'blur(24px)' : 'blur(28px) saturate(180%)',
        borderBottom: mobileOpen
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(255,255,255,0.06)',
        zIndex: 100,
        transition: 'background 0.28s ease, backdrop-filter 0.28s ease, border-color 0.28s ease',
      }}
    >
      <div style={{
        maxWidth: 1440, margin: '0 auto', width: '100%',
        padding: '0 clamp(20px, 8.33vw, 120px)',
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

        {/* Desktop nav — hidden on homepage (no links needed there) */}
        <nav className={`${isHome ? 'hidden' : 'hidden sm:flex'}`} style={{ flex: 1, alignItems: 'center', gap: 2, paddingLeft: 8 }}>
          {navItems.map(item => {
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href} style={{
                padding: '6px 14px', borderRadius: 100,
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 400,
                color: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                textDecoration: 'none', transition: 'color 0.18s ease, background 0.18s ease', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'transparent' }}}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop search — hidden on contribute page */}
        {pathname !== '/contribute' && (
          <div className="hidden sm:block shrink-0" style={{ width: 'clamp(300px, 34vw, 480px)' }}>
            <InlineSearch placeholder="Search" compact />
          </div>
        )}

        {/* Mobile: search icon + hamburger (hamburger hidden on home) */}
        <div className="sm:hidden flex items-center" style={{ marginLeft: 'auto', gap: 4 }}>
          {/* Search icon */}
          <button
            onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Hamburger — hidden on homepage */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: 6, position: 'relative', width: 32, height: 32, display: isHome ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}
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

      {/* Mobile dropdown — GPU-composited clip-path reveal (no layout recalc).
          clip-path: inset(0 0 100% 0) = fully clipped from bottom (hidden)
          clip-path: inset(0 0 0% 0)   = fully visible
          No maxHeight, no overflow:hidden on fixed — eliminates iOS jank.   */}
      <div
        className="sm:hidden"
        style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          zIndex: 99,
          clipPath: mobileOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: mobileOpen
            ? 'clip-path 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : 'clip-path 0.22s cubic-bezier(0.55, 0, 1, 0.45)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div style={{
          background: '#08000F',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
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
                  transition: 'color 0.18s ease, background 0.18s ease',
                }}
              >
                {(item as any).mobileLabel ?? item.label}
              </Link>
            ))}
          </nav>
        </div>
        </div> {/* end inner panel */}
      </div>
    </header>

    {/* Full-screen mobile search sheet */}
    <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
