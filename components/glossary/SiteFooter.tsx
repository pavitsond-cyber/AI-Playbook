export default function SiteFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'transparent',
      marginTop: 64,
    }}>
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column' as const, gap: 6, alignItems: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>A practical AI reference · 2026</p>
      </div>
    </footer>
  )
}
