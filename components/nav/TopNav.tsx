'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Menu, Search, X } from 'lucide-react'
import MobileSearchSheet from '@/components/search/MobileSearchSheet'
import { usePageChrome } from '@/components/nav/PageChromeContext'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/prompts', label: 'Prompts' },
  { href: '/skills', label: 'Skills' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/tools', label: 'Tools' },
  { href: '/contribute', label: 'Contribute to playbook' },
]

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { dockedTitle } = usePageChrome()
  const isHome = pathname === '/'
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const goBack = () => router.push('/')

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        className={menuOpen ? 'playbook-menu-scrim is-open' : 'playbook-menu-scrim'}
        onClick={() => setMenuOpen(false)}
      />

      <header
        className="playbook-page-header"
        data-docked={dockedTitle ? 'true' : 'false'}
        data-menu-open={menuOpen ? 'true' : 'false'}
        data-home={isHome ? 'true' : 'false'}
      >
        <div className="playbook-page-header__backdrop" aria-hidden />

        <div className="playbook-page-header__content">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back to AI Playbook"
            className="playbook-header-control playbook-header-control--frost"
          >
            <ArrowLeft size={24} strokeWidth={2} aria-hidden />
          </button>

          {!isHome && (
            <span
              aria-hidden={!dockedTitle}
              className="playbook-page-header__title"
            >
              {dockedTitle}
            </span>
          )}

          <div className="playbook-header-actions">
            <span className="playbook-glass-shine" aria-hidden />

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setSearchOpen(true)
              }}
              aria-label="Search"
              className="playbook-header-action"
            >
              <Search size={20} strokeWidth={2} aria-hidden />
            </button>

            {!isHome && (
              <>
                <span className="playbook-header-actions__divider" aria-hidden />

                <button
                  type="button"
                  onClick={() => setMenuOpen(current => !current)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  aria-controls="playbook-header-menu"
                  className="playbook-header-action playbook-header-action--menu"
                >
                  <span className={menuOpen ? 'menu-icon menu-icon--open' : 'menu-icon'}>
                    <Menu className="menu-icon__menu" size={20} strokeWidth={2} aria-hidden />
                    <X className="menu-icon__close" size={20} strokeWidth={2} aria-hidden />
                  </span>
                </button>
              </>
            )}
          </div>

          <nav
            id="playbook-header-menu"
            aria-hidden={!menuOpen}
            className={menuOpen ? 'playbook-glass-menu is-open' : 'playbook-glass-menu'}
          >
            <span className="playbook-glass-shine" aria-hidden />
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className={isActive(item.href) ? 'playbook-glass-menu__item is-active' : 'playbook-glass-menu__item'}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
