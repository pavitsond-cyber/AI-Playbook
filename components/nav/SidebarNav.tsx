'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <div
      className="flex flex-col h-full py-5"
      style={{
        background: 'rgba(14,14,28,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div className="px-4 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0"
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
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 pt-4 overflow-y-auto scrollbar-hide">
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
                  className="flex items-center px-2 py-1.5 rounded-lg text-sm mb-0.5 transition-all duration-150"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                    background: isActive ? 'rgba(124,58,237,0.12)' : 'transparent',
                    borderLeft: isActive ? '2px solid #8b5cf6' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                      e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div
        className="px-4 pt-4 mt-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="text-[10px] text-white/20 leading-relaxed">
          Internal use only · Headout AI Session
        </p>
      </div>
    </div>
  )
}
