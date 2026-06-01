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
            background: '#b9b9f9',
            color: '#4434d4',
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: '#533afd' }}
          />
          {badge}
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl leading-tight mb-2" style={{ color: '#0d253d', fontWeight: 300, letterSpacing: '-0.64px' }}>{title}</h1>
      {description && (
        <p className="text-base leading-relaxed" style={{ color: '#64748d', fontWeight: 300 }}>
          {description}
        </p>
      )}
    </div>
  )
}
