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
    label: 'Understand AI',
    items: [
      { href: '/glossary', label: 'AI Glossary' },
      { href: '/abbreviations', label: 'Abbreviations' },
      { href: '/tech-basics', label: 'Tech Basics' },
    ],
  },
  {
    label: 'Use AI',
    items: [
      { href: '/skills', label: 'Skills Library' },
      { href: '/tools', label: 'Tool Library' },
      { href: '/prompts', label: 'Prompt Library' },
      { href: '/workflows', label: 'Workflows' },
    ],
  },
  {
    label: 'See AI in Action',
    items: [
      { href: '/case-studies', label: 'Case Studies' },
    ],
  },
  {
    label: 'Use AI Responsibly',
    items: [
      { href: '/dos-donts', label: "Do's & Don'ts" },
      { href: '/risks', label: 'Risks & Limitations' },
    ],
  },
  {
    label: 'Keep Improving It',
    items: [
      { href: '/templates', label: 'Templates' },
      { href: '/resources', label: 'Resources' },
      { href: '/contribute', label: 'Contribute' },
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
          background: 'rgba(7,7,14,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <div
            className="size-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 0 10px rgba(124,58,237,0.3)',
            }}
          >
            <span className="text-white text-xs font-bold leading-none">H</span>
          </div>
          <span className="text-sm font-semibold text-white/85">AI Playbook</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center size-8 rounded-lg transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)' }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full z-50 w-64 overflow-y-auto scrollbar-hide transition-transform duration-300"
        style={{
          background: 'rgba(10,10,22,0.98)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
            <div
              className="size-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 0 12px rgba(124,58,237,0.35)',
              }}
            >
              <span className="text-white text-sm font-bold leading-none">H</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">AI Playbook</div>
              <div className="text-[10px] text-white/30 leading-tight">Headout · 2026</div>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center size-7 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="px-3 pt-4 pb-8">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div
                className="text-[10px] font-semibold uppercase tracking-wider px-2 mb-1.5"
                style={{ color: 'rgba(255,255,255,0.25)' }}
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
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      background: isActive ? 'rgba(124,58,237,0.12)' : 'transparent',
                      borderLeft: isActive ? '2px solid #8b5cf6' : '2px solid transparent',
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
