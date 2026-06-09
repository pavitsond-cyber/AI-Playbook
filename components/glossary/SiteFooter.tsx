export default function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 64 }}>
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column' as const, gap: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#FF00CC,#9B3FFF)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.01em' }}>AI Playbook</span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 19, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>A practical AI reference · 2026</p>
      </div>
    </footer>
  )
}
