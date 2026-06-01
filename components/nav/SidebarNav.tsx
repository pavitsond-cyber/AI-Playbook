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

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <div
      className="flex flex-col h-full py-5"
      style={{
        background: '#ffffff',
        borderRight: '1px solid #e3e8ee',
      }}
    >
      {/* Logo */}
      <div className="px-4 pb-5" style={{ borderBottom: '1px solid #e3e8ee' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0"
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
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 pt-4 overflow-y-auto scrollbar-hide">
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
                  className="flex items-center px-2 py-1.5 rounded-lg text-sm mb-0.5 transition-all duration-150"
                  style={{
                    color: isActive ? '#0d253d' : '#61718a',
                    background: isActive ? 'rgba(83,58,253,0.06)' : 'transparent',
                    borderLeft: isActive ? '2px solid #533afd' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#0d253d'
                      e.currentTarget.style.background = '#f6f9fc'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#61718a'
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
        style={{ borderTop: '1px solid #e3e8ee' }}
      >
        <p className="text-[10px] leading-relaxed" style={{ color: '#64748d' }}>
          Internal use only · Headout AI Session
        </p>
      </div>
    </div>
  )
}
