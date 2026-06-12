'use client'

import { useDockedTitle } from '@/components/nav/PageChromeContext'

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  const titleRef = useDockedTitle(title)
  const words = title.split(' ')
  const first = words[0]
  const rest = words.slice(1).join(' ')
  return (
    <div
      ref={titleRef}
      data-page-title
      className="animate-fade-up delay-75"
      style={{ marginBottom: 20 }}
    >
      {badge && (
        <div className="eyebrow-tag" style={{ marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#FF00CC,#9B3FFF)', display: 'inline-block', flexShrink: 0 }} />
          {badge}
        </div>
      )}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px,4vw,64px)',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: '#ffffff',
        marginBottom: description ? 14 : 0,
      }}>
        <span className="gradient-text">{first}</span>
        {rest && <span style={{ color: '#ffffff' }}>{' '}{rest}</span>}
      </h1>
      {description && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'rgba(255,255,255,0.3)',
        }}>
          {description}
        </p>
      )}
    </div>
  )
}
