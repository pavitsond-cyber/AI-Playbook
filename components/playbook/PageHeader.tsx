interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {badge && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: 'rgba(124,58,237,0.1)',
            color: 'rgba(167,139,250,0.9)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: '#8b5cf6' }}
          />
          {badge}
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">{title}</h1>
      {description && (
        <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {description}
        </p>
      )}
    </div>
  )
}
