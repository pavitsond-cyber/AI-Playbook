const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function SiteFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'transparent',
      marginTop: 64,
    }}>
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column' as const, gap: 10, alignItems: 'center' }}>
        <img
          src={`${BP}/images/headout-logo.svg`}
          alt="Headout"
          style={{ height: 16, width: 'auto', opacity: 0.3, filter: 'brightness(0) invert(1)' }}
        />
      </div>
    </footer>
  )
}
