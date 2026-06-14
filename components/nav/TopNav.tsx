'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { ArrowLeft, Menu, Search, X, ArrowUpRight } from 'lucide-react'
import MobileSearchSheet from '@/components/search/MobileSearchSheet'
import { usePageChrome } from '@/components/nav/PageChromeContext'
import { searchAll, SearchItemType } from '@/lib/data/search-index'

const navItems = [
  { href: '/skills',   label: 'Skills'   },
  { href: '/prompts',  label: 'Prompts'  },
  { href: '/glossary', label: 'Glossary' },
  { href: '/tools',    label: 'Tools'    },
]

const mobileNavItems = [
  { href: '/',         label: 'Home'              },
  { href: '/prompts',  label: 'Prompts'           },
  { href: '/skills',   label: 'Skills'            },
  { href: '/glossary', label: 'Glossary'          },
  { href: '/tools',    label: 'Tools'             },
  { href: '/contribute', label: 'Contribute to playbook' },
]

const ORDER: SearchItemType[] = ['abbreviation', 'term', 'skill', 'prompt', 'tool']

const TYPE_LABEL: Record<SearchItemType, string> = {
  abbreviation: 'Abbreviations',
  term:         'Terms',
  skill:        'Skills',
  prompt:       'Prompt Systems',
  tool:         'Tools',
}

const TYPE_COLOR: Record<SearchItemType, string> = {
  abbreviation: '#E8C840',
  term:         '#00CCA8',
  skill:        '#9B3FFF',
  prompt:       '#C27FFF',
  tool:         '#E8C840',
}

function Hi({ text, q }: { text: string; q: string }) {
  if (!q || !text) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: 'rgba(155,63,255,0.18)', color: '#C27FFF', borderRadius: 2, padding: '0 1px', fontWeight: 600, fontStyle: 'normal' }}>
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  )
}

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false)
  const [desktopQuery, setDesktopQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const { dockedTitle } = usePageChrome()
  const isHome = pathname === '/'
  const showSearch = pathname !== '/contribute'
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const grouped = useMemo(
    () => (desktopSearchOpen ? searchAll(desktopQuery) : {} as ReturnType<typeof searchAll>),
    [desktopQuery, desktopSearchOpen]
  )
  const flat = useMemo(() => ORDER.flatMap(t => grouped[t] ?? []), [grouped])
  const hasQ = desktopQuery.trim().length >= 2

  const closeDesktopSearch = useCallback(() => {
    setDesktopSearchOpen(false)
    setDesktopQuery('')
  }, [])

  useEffect(() => {
    if (desktopSearchOpen) {
      const t = setTimeout(() => desktopInputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [desktopSearchOpen])

  useEffect(() => {
    if (!desktopSearchOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDesktopSearch() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [desktopSearchOpen, closeDesktopSearch])

  useEffect(() => {
    if (!desktopSearchOpen) return
    const h = () => { if (window.innerWidth < 640) closeDesktopSearch() }
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [desktopSearchOpen, closeDesktopSearch])

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const goBack = () => {
    if (isHome) { window.location.href = '/'; return }
    router.push('/')
  }

  const handleSearchClick = () => {
    if (window.innerWidth >= 640) {
      setDesktopSearchOpen(true)
    } else {
      setMenuOpen(false)
      setSearchOpen(true)
    }
  }

  return (
    <>
      {/* Mobile scrim */}
      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        className={menuOpen ? 'playbook-menu-scrim is-open' : 'playbook-menu-scrim'}
        onClick={() => setMenuOpen(false)}
      />

      {/* Desktop search click-outside (no blur) */}
      {desktopSearchOpen && (
        <div
          className="hidden sm:block"
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
          onClick={closeDesktopSearch}
        />
      )}

      <header
        className="playbook-page-header"
        data-docked={dockedTitle ? 'true' : 'false'}
        data-scrolled={scrolled ? 'true' : 'false'}
        data-menu-open={menuOpen ? 'true' : 'false'}
        data-home={isHome ? 'true' : 'false'}
        data-no-search={!showSearch ? 'true' : 'false'}
      >
        <div className="playbook-page-header__backdrop" aria-hidden />

        <div className="playbook-page-header__content">
          {/* Back arrow */}
          <button
            type="button"
            onClick={goBack}
            aria-label={isHome ? 'Back to events landing page' : 'Back to AI Playbook'}
            className="playbook-header-control playbook-header-control--frost"
          >
            <ArrowLeft size={24} strokeWidth={2} aria-hidden />
          </button>

          {/* Mobile: docked title */}
          {!isHome && (
            <span
              aria-hidden={!dockedTitle}
              className="playbook-page-header__title sm:hidden"
            >
              {dockedTitle}
            </span>
          )}

          {/* ── Desktop center: nav links (always visible) ───────────── */}
          <div
            className="hidden sm:flex"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              alignItems: 'center',
              gap: 4,
              pointerEvents: 'auto',
            }}
          >
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  fontWeight: isActive(item.href) ? 500 : 400,
                  color: isActive(item.href) ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  background: isActive(item.href) ? 'rgba(255,255,255,0.10)' : 'transparent',
                  transition: 'color 0.18s ease, background 0.18s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive(item.href)) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(item.href)) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ── Mobile actions pill (search + menu) ─────────────────── */}
          <div className="playbook-header-actions sm:hidden">
            <span className="playbook-glass-shine" aria-hidden />

            {showSearch && (
              <button
                type="button"
                onClick={handleSearchClick}
                aria-label="Search"
                className="playbook-header-action"
              >
                <Search size={20} strokeWidth={2} aria-hidden />
              </button>
            )}

            {!isHome && (
              <>
                {showSearch && <span className="playbook-header-actions__divider" aria-hidden />}
                <button
                  type="button"
                  onClick={() => setMenuOpen(v => !v)}
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

          {/* ── Desktop right: search button → expands into search bar + inline dropdown ── */}
          {showSearch && (
            <div
              className="hidden sm:flex"
              style={{ marginLeft: 'auto', alignItems: 'center', pointerEvents: 'auto', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Animated width container — overflow:hidden clips the input bar during slide */}
              <div
                style={{
                  position: 'relative',
                  width: desktopSearchOpen ? 'clamp(200px, 18vw, 260px)' : 44,
                  height: 44,
                  flexShrink: 0,
                  transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                }}
              >
                {/* Search icon button — fades out when bar slides open */}
                <button
                  type="button"
                  onClick={handleSearchClick}
                  aria-label="Search"
                  className="playbook-header-control playbook-header-control--frost"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    opacity: desktopSearchOpen ? 0 : 1,
                    transition: 'opacity 0.15s ease',
                    pointerEvents: desktopSearchOpen ? 'none' : 'auto',
                  }}
                >
                  <Search size={20} strokeWidth={2} aria-hidden />
                </button>

                {/* Search input row — fades in as bar expands */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '0 8px 0 16px',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: hasQ ? '22px 22px 0 0' : 9999,
                    borderBottom: hasQ ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                    opacity: desktopSearchOpen ? 1 : 0,
                    transition: 'border-radius 0.15s ease, opacity 0.18s ease',
                    transitionDelay: desktopSearchOpen ? '0.08s' : '0s',
                    pointerEvents: desktopSearchOpen ? 'auto' : 'none',
                  }}
                >
                  <Search size={16} style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
                  <input
                    ref={desktopInputRef}
                    type="text"
                    value={desktopQuery}
                    onChange={e => setDesktopQuery(e.target.value)}
                    placeholder="Search skills, prompts, terms…"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontSize: 15,
                      color: 'rgba(255,255,255,0.9)',
                      fontFamily: 'var(--font-body)',
                      minWidth: 0,
                      textOverflow: 'ellipsis',
                    }}
                  />
                  <button
                    onClick={closeDesktopSearch}
                    aria-label="Close search"
                    style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={13} color="rgba(255,255,255,0.7)" />
                  </button>
                </div>
              </div>

              {/* Dropdown — outside the overflow:hidden container so it isn't clipped */}
              {desktopSearchOpen && hasQ && (
                <div
                  style={{
                    position: 'absolute',
                    top: 44,
                    right: 0,
                    width: 'clamp(200px, 18vw, 260px)',
                    maxHeight: 480,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none' as const,
                    background: 'rgba(13,11,30,0.98)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderTop: 'none',
                    borderRadius: '0 0 16px 16px',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                    zIndex: 200,
                  }}
                >
                  {flat.length === 0 && (
                    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                        Nothing found for &ldquo;<strong>{desktopQuery}</strong>&rdquo;
                      </p>
                    </div>
                  )}

                  {flat.length > 0 && ORDER.map(type => {
                    const items = grouped[type] ?? []
                    if (!items.length) return null
                    const color = TYPE_COLOR[type]
                    const label = TYPE_LABEL[type]

                    return (
                      <div key={type}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px 6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color }}>
                            {label}
                          </span>
                          <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 8, background: `${color}18`, color, fontFamily: 'var(--font-body)' }}>
                            {items.length}
                          </span>
                        </div>
                        {items.map(item => (
                          <div
                            key={item.id}
                            onClick={() => { router.push(item.href); closeDesktopSearch() }}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.12s ease' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.9)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <Hi text={item.title} q={desktopQuery} />
                              </p>
                              {item.snippet && (
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.32)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  <Hi text={item.snippet} q={desktopQuery} />
                                </p>
                              )}
                            </div>
                            <ArrowUpRight size={13} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0 }} />
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Mobile dropdown menu */}
          <nav
            id="playbook-header-menu"
            aria-hidden={!menuOpen}
            className={menuOpen ? 'playbook-glass-menu is-open sm:hidden' : 'playbook-glass-menu sm:hidden'}
          >
            <span className="playbook-glass-shine" aria-hidden />
            {mobileNavItems.map(item => (
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

      {showSearch && <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </>
  )
}
