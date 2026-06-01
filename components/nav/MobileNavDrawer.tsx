'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navSections = [
  {
    label: 'Start here',
    items: [
      { href: '/', label: 'Home' },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { href: '/dos-donts', label: 'Operating Principles' },
      { href: '/maturity', label: 'AI Maturity Model' },
      { href: '/build-vs-buy', label: 'Build vs Buy' },
    ],
  },
  {
    label: 'Workflow Systems',
    items: [
      { href: '/workflows', label: 'Workflows' },
      { href: '/prompts', label: 'Prompt Systems' },
      { href: '/skills', label: 'Skills' },
    ],
  },
  {
    label: 'Tool Framework',
    items: [
      { href: '/tools', label: 'Tools' },
    ],
  },
  {
    label: 'Evidence',
    items: [
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/by-team', label: 'AI by Team' },
    ],
  },
  {
    label: 'Governance',
    items: [
      { href: '/risks', label: 'Risk & Governance' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { href: '/timeline', label: 'AI Shifts' },
      { href: '/glossary', label: 'AI Reference' },
      { href: '/tech-basics', label: 'Impl. Basics' },
    ],
  },
]

export default function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile header */}
      <header
        className="fixed top-0 left-0 right-0 z-30 h-14 flex items-center justify-between px-5"
        style={{
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #e3e8ee',
        }}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <div
            className="size-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #533afd, #4434d4)',
            }}
          >
            <span className="text-white text-xs font-bold leading-none">H</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: '#0d253d' }}>AI Playbook</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center size-8 rounded-lg transition-colors duration-150"
          style={{ color: '#64748d', background: '#f6f9fc' }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(13,37,61,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full z-50 w-64 overflow-y-auto scrollbar-hide transition-transform duration-300"
        style={{
          background: '#ffffff',
          borderRight: '1px solid #e3e8ee',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: '1px solid #e3e8ee' }}
        >
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
            <div
              className="size-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #533afd, #4434d4)',
              }}
            >
              <span className="text-white text-sm font-bold leading-none">H</span>
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight" style={{ color: '#0d253d' }}>AI Playbook</div>
              <div className="text-[10px] leading-tight" style={{ color: '#64748d' }}>Headout · 2026</div>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center size-7 rounded-lg"
            style={{ color: '#64748d', background: '#f6f9fc' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="px-3 pt-4 pb-8">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div
                className="text-[10px] font-normal uppercase tracking-wider px-2 mb-1.5"
                style={{ color: '#64748d' }}
              >
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-2 py-2 rounded-lg text-sm mb-0.5 transition-all duration-150"
                    style={{
                      color: isActive ? '#0d253d' : '#61718a',
                      background: isActive ? 'rgba(83,58,253,0.06)' : 'transparent',
                      borderLeft: isActive ? '2px solid #533afd' : '2px solid transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
