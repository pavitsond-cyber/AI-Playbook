'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import InlineSearch from '@/components/search/InlineSearch'

const navItems = [
  { href: '/dos-donts', label: 'Principles' },
  { href: '/prompts',   label: 'Prompts' },
  { href: '/skills',    label: 'Skills' },
  { href: '/glossary',  label: 'Reference' },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header style={{
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
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#FF00CC,#9B3FFF)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#ffffff', letterSpacing: '-0.01em' }}>
            AI Playbook
          </span>
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
          <div className="hidden sm:block shrink-0" style={{ width: 200 }}>
            <InlineSearch placeholder="Search…" compact alignRight dropdownWidth={460} />
          </div>
        )}

        {/* Mobile hamburger */}
        <div className="sm:hidden" style={{ marginLeft: 'auto' }}>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 6 }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden" style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'rgba(10,0,16,0.96)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 20px 16px',
        }}>
          {!isHome && <div style={{ marginBottom: 10 }}><InlineSearch placeholder="Search everything…" compact /></div>}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ padding: '10px 12px', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 14, color: pathname === '/' ? '#ffffff' : 'rgba(255,255,255,0.55)', background: pathname === '/' ? 'rgba(255,255,255,0.08)' : 'transparent', textDecoration: 'none' }}>Home</Link>
            {navItems.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ padding: '10px 12px', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 14, color: isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.55)', background: isActive(item.href) ? 'rgba(255,255,255,0.08)' : 'transparent', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
